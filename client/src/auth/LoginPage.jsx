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
import "./LoginPage.css";

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
  { value: "librarian", label: "Librarian" },
];

const ABOUT_LINKS = [
  "About Option 1",
  "About Option 2",
  "About Option 3",
  "About Option 4",
  "About Option 5",
  "About Option 6",
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
  const handleLogin = useCallback(() => {
    setErrorMsg("");
    if (!selectedRole) {
      setErrorMsg("Please select a role.");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    // Persist remember-me preference
    if (rememberMe && username) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    // Navigate based on role
    if (selectedRole === "student") {
      navigate("/dashboard");
    } else if (selectedRole === "faculty") {
      setStoredFacultyCourseKey(resolveFacultyCourseKey(username));
      navigate("/faculty/my-courses");
    } else if (selectedRole === "guardian") {
      navigate("/parent/dashboard");
    } else if (selectedRole === "director") {
      navigate("/director/dashboard");
    } else if (selectedRole === "registrar") {
      navigate("/registrar/dashboard");
    } else if (selectedRole === "admin") {
      navigate("/admin/dashboard");
    } else if (selectedRole === "admin-officer") {
      navigate("/ao/dashboard");
    } else if (selectedRole === "librarian") {
      navigate("/librarian/dashboard");
    } else if (selectedRole === "hod") {
      navigate("/hod/dashboard");
    } else if (selectedRole === "staff") {
      navigate("/staff/dashboard");
    } else {
      // For other roles, extend later
      alert(`Logging in as ${selectedRole}...`);
    }
  }, [selectedRole, username, rememberMe, navigate]);

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
    closeTimeoutRef.current = setTimeout(() => setAboutOpen(false), 200);
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

      {/* Header */}
      <header className="lp-header">
        <div className="lp-header-title">
          The LNM Institute of Information Technology
        </div>

        <div
          ref={aboutRef}
          className={`lp-about-container${aboutOpen ? " active" : ""}`}
          onMouseEnter={handleAboutEnter}
          onMouseLeave={handleAboutLeave}
        >
          <button
            className="lp-about-btn"
            onClick={(e) => {
              e.stopPropagation();
              setAboutOpen((v) => !v);
            }}
          >
            About
          </button>
          <div className="lp-about-dropdown">
            {ABOUT_LINKS.map((link, i) => (
              <a key={i} href="#">
                {link}
              </a>
            ))}
          </div>
        </div>
      </header>

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
          <input
            type="text"
            className="lp-input"
            placeholder="CAPTCHA"
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
          >
            Login
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="lp-footer">© 2026 LNMIIT. All rights reserved.</div>
    </div>
  );
};

export default LoginPage;
