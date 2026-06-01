import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  resolveFacultyCourseKey,
  setStoredFacultyCourseKey,
} from "../shared/cifCompletionData";
import { login as apiLogin } from "./authApi";
import "./LoginPage.css";

// Where each role lands after login.
const ROLE_ROUTES = {
  student: "/dashboard",
  faculty: "/faculty/my-courses",
  guardian: "/parent/dashboard",
  director: "/director/dashboard",
  registrar: "/registrar/dashboard",
  admin: "/admin/dashboard",
  "admin-officer": "/ao/dashboard",
  librarian: "/librarian/dashboard",
  "library-operator": "/library-operator/dashboard",
  hod: "/hod/dashboard",
  staff: "/staff/dashboard",
};

const ROLES = [
  { value: "student", label: "Student" },
  { value: "faculty", label: "Faculty" },
  { value: "director", label: "Director" },
  { value: "registrar", label: "Registrar" },
  { value: "admin", label: "Website Admin" },
  { value: "admin-officer", label: "Admin Officer" },
  { value: "guardian", label: "Guardian/Parent" },
  { value: "staff", label: "Staff" },
  { value: "hod", label: "HOD" },
  { value: "librarian", label: "Library Administrator" },
  { value: "library-operator", label: "Library Operator" },
];

const ABOUT_LINKS = [
  "Course Registration",
  "Multimedia Studio Booking",
  "Latest News",
  "Notice Board",
];

const createCaptchaURI = (text, rotation, lineX1, lineY1, lineX2, lineY2) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='40'><rect width='120' height='40' fill='#e2e8f0'/><text x='20' y='28' font-family='monospace' font-size='22' font-weight='bold' fill='#1e293b' transform='rotate(${rotation} 60 20)'>${text}</text><line x1='${lineX1}' y1='${lineY1}' x2='${lineX2}' y2='${lineY2}' stroke='#64748b' stroke-width='2'/><line x1='${lineX2}' y1='${lineY1}' x2='${lineX1}' y2='${lineY2}' stroke='#94a3b8' stroke-width='1.5'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const CAPTCHA_IMAGES = [
  { text: "QW3E4", src: createCaptchaURI("QW3E4", -5, 0, 10, 120, 30) },
  { text: "X9YZ2", src: createCaptchaURI("X9YZ2", 3, 10, 0, 100, 40) },
  { text: "P7M8N", src: createCaptchaURI("P7M8N", -2, 0, 20, 120, 15) },
  { text: "K2L5P", src: createCaptchaURI("K2L5P", 4, 20, 40, 100, 0) },
  { text: "T4J9R", src: createCaptchaURI("T4J9R", -3, 0, 30, 120, 10) },
];

const LoginPage = () => {
  const navigate = useNavigate();

  /* ---- state ---- */

  const [selectedRole, setSelectedRole] = useState("");
  const [roleLabel, setRoleLabel] = useState("Select Role");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem("rememberedUsername") || "";
    } catch {
      return "";
    }
  });
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return Boolean(localStorage.getItem("rememberedUsername"));
    } catch {
      return false;
    }
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentCaptchaIndex, setCurrentCaptchaIndex] = useState(0);

  useEffect(() => {
    setCurrentCaptchaIndex(Math.floor(Math.random() * CAPTCHA_IMAGES.length));
  }, []);

  /* ---- refs ---- */
  const cursorRef = useRef(null);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const aboutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const [dropdownPlacement, setDropdownPlacement] = useState("bottom");
  const [dropdownMaxHeight, setDropdownMaxHeight] = useState(320);

  /* ---- Custom cursor ---- */
  useEffect(() => {
    const handleMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };
    const handleEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  /* ---- Click-outside to close role dropdown ---- */
  useEffect(() => {
    const handler = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* ---- Login handler ---- */
  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }, []);

  const handleLogin = useCallback(async () => {
    setErrorMsg("");
    if (!selectedRole) {
      setErrorMsg("Please select a role.");
      triggerShake();
      return;
    }
    if (!username || !password) {
      setErrorMsg("Please enter username and password.");
      triggerShake();
      return;
    }
    if (!captcha || captcha.toUpperCase() !== CAPTCHA_IMAGES[currentCaptchaIndex].text.toUpperCase()) {
      setErrorMsg("Invalid CAPTCHA. Please try again.");
      triggerShake();
      setCurrentCaptchaIndex(Math.floor(Math.random() * CAPTCHA_IMAGES.length));
      setCaptcha("");
      return;
    }

    setLoading(true);
    try {
      // Authenticate against the backend; the role is validated server-side
      // and the login mode is recorded in the database.
      const { user } = await apiLogin({
        username,
        password,
        role: selectedRole,
      });

      // Persist remember-me preference
      if (rememberMe && username) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }

      if (user.role === "faculty") {
        setStoredFacultyCourseKey(resolveFacultyCourseKey(username));
      }

      const route = ROLE_ROUTES[user.role];
      if (route) {
        navigate(route);
      } else {
        setErrorMsg(`No interface configured for role '${user.role}'.`);
      }
    } catch (err) {
      setErrorMsg(err.message || "Login failed.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  }, [selectedRole, username, password, rememberMe, navigate, triggerShake, captcha, currentCaptchaIndex]);

  /* ---- Forgot password ---- */
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Password reset functionality will be implemented here.");
  };

  /* ---- About hover handlers ---- */
  const handleAboutEnter = () => {
    clearTimeout(closeTimeoutRef.current);
    setAboutOpen(true);
  };
  const handleAboutLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setAboutOpen(false), 500);
  };

  const updateDropdownLayout = useCallback(() => {
    if (!selectRef.current || !dropdownRef.current) {
      return;
    }

    const selectRect = selectRef.current.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    const viewportGap = 12;
    const preferredMaxHeight = 320;
    const availableBelow = Math.max(
      viewportHeight - selectRect.bottom - viewportGap,
      0,
    );
    const availableAbove = Math.max(selectRect.top - viewportGap, 0);
    const needsMoreSpaceThanBelow =
      availableBelow < Math.min(dropdownHeight, preferredMaxHeight);
    const shouldOpenUpward =
      needsMoreSpaceThanBelow && availableAbove > availableBelow;
    const availableSpace = shouldOpenUpward ? availableAbove : availableBelow;

    setDropdownPlacement(shouldOpenUpward ? "top" : "bottom");
    setDropdownMaxHeight(
      Math.min(Math.max(availableSpace, 0), preferredMaxHeight),
    );
  }, []);

  useLayoutEffect(() => {
    if (!dropdownOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      updateDropdownLayout();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [dropdownOpen, updateDropdownLayout]);

  useEffect(() => {
    if (!dropdownOpen) {
      return;
    }

    const handleViewportChange = () => updateDropdownLayout();

    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [dropdownOpen, updateDropdownLayout]);

  return (
    <div className="login-page">
      {/* Custom cursor */}
      <div className="lp-cursor-wrapper">
        <div className="lp-custom-cursor" ref={cursorRef} />
      </div>

      {/* Background */}
      <div className="lp-background">
        <img src="/lnmiit.jpg" alt="Campus Background" />
      </div>

      {/* About floating menu */}
      <div
        ref={aboutRef}
        className={`lp-about-container lp-about-floating${aboutOpen ? " active" : ""}`}
        onMouseEnter={handleAboutEnter}
        onMouseLeave={handleAboutLeave}
      >
        <button
          className="lp-about-btn"
          onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
          onClick={(e) => {
            e.stopPropagation();
            setAboutOpen((v) => !v);
          }}
        >
          About
        </button>
        <div
          className="lp-about-dropdown"
          onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
          onMouseLeave={() =>
            (closeTimeoutRef.current = setTimeout(
              () => setAboutOpen(false),
              500,
            ))
          }
        >
          {ABOUT_LINKS.map((link, i) => (
            <a key={i} href="#">
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Login form */}
      <div className="lp-login-wrapper">
        <div className={`lp-login-box${shake ? " shake" : ""}`}>
          <img
            src="/LNMIIT-Logo-Transperant-Background.png"
            alt="LNMIIT Logo"
            className="lp-logo"
          />

          {/* Role selector */}
          <div className="lp-custom-select" ref={selectRef}>
            <div
              className={`lp-select-selected${dropdownOpen ? " active" : ""}`}
              onClick={() => setDropdownOpen((v) => !v)}
            >
              {roleLabel}
            </div>
            <div
              ref={dropdownRef}
              className={`lp-select-items${dropdownOpen ? " active" : ""}${dropdownPlacement === "top" ? " open-up" : ""}`}
              style={
                dropdownOpen
                  ? { maxHeight: `${dropdownMaxHeight}px` }
                  : undefined
              }
            >
              {ROLES.map((role) => (
                <div
                  key={role.value}
                  className="lp-select-item"
                  onClick={() => {
                    setSelectedRole(role.value);
                    setRoleLabel(role.label);
                    setDropdownOpen(false);
                  }}
                >
                  {role.label}
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <input
            type="text"
            className="lp-input"
            placeholder="Username"
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="lp-input"
            placeholder="Password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <img 
              src={CAPTCHA_IMAGES[currentCaptchaIndex].src} 
              alt="CAPTCHA" 
              style={{ borderRadius: '4px', border: '1px solid #cbd5e1' }} 
            />
            <button 
              type="button" 
              onClick={() => {
                setCurrentCaptchaIndex(Math.floor(Math.random() * CAPTCHA_IMAGES.length));
                setCaptcha("");
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6', textDecoration: 'underline', fontSize: '14px', padding: 0 }}
            >
              Refresh
            </button>
          </div>
          <input
            type="text"
            className="lp-input"
            placeholder="Enter CAPTCHA"
            id="login-captcha"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
          />

          {/* Options row */}
          <div className="lp-login-options">
            <label className="lp-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <button className="lp-forgot" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </div>

          {/* Error */}
          <div className="lp-error-msg">{errorMsg}</div>

          {/* Submit */}
          <button
            className="lp-submit-btn"
            onClick={handleLogin}
            id="login-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="lp-footer">© 2026 LNMIIT. All rights reserved.</div>
    </div>
  );
};

export default LoginPage;
