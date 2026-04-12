export const BTP_STORAGE_KEY = "btp-project-request-state";

export const BTP_PROGRESS_STEPS = [
  { id: "topic-approved", label: "Topic approved by faculty" },
  { id: "proposal-submitted", label: "Proposal submitted" },
  { id: "literature-review", label: "Literature review completed" },
  { id: "implementation", label: "Implementation reviewed" },
  { id: "final-review", label: "Final review scheduled" },
];

export const BTP_PROJECT_OPTIONS = [
  {
    id: "btp-ai-mentor",
    title: "AI Mentor for Student Support",
    domain: "CSE",
    guide: "Dr. V. Sharma",
    description:
      "Build a smart assistant for student guidance, reminders, and progress tracking.",
  },
  {
    id: "btp-campus-navigator",
    title: "Campus Navigation Assistant",
    domain: "CSE / IT",
    guide: "Dr. A. Gupta",
    description:
      "Create a route and location helper for campus services, events, and resources.",
  },
  {
    id: "btp-secure-submission",
    title: "Secure Assignment Submission Portal",
    domain: "Software Systems",
    guide: "Dr. R. Mehta",
    description:
      "Design a secure digital workflow for assignment upload, review, and approval.",
  },
  {
    id: "btp-resource-planner",
    title: "Project Resource Planner",
    domain: "Data Engineering",
    guide: "Dr. S. Khanna",
    description:
      "Plan project milestones, resources, and review checkpoints in one dashboard.",
  },
];

const createProgressSteps = () =>
  BTP_PROGRESS_STEPS.map((step) => ({ ...step, completed: false }));

export const getDefaultBtpState = () => ({
  status: "idle",
  requestedProjectId: null,
  requestedProjectTitle: "",
  requestedProjectDomain: "",
  requestedProjectGuide: "",
  requestedAt: null,
  approvedAt: null,
  facultyNote: "",
  progressSteps: createProgressSteps(),
});

export const normalizeBtpState = (value) => {
  const fallback = getDefaultBtpState();

  if (!value || typeof value !== "object") {
    return fallback;
  }

  const incomingSteps = Array.isArray(value.progressSteps)
    ? value.progressSteps
    : [];
  const stepById = new Map(
    incomingSteps.map((step) => [step.id, Boolean(step.completed)]),
  );

  return {
    ...fallback,
    ...value,
    progressSteps: createProgressSteps().map((step) => ({
      ...step,
      completed: stepById.get(step.id) || false,
    })),
  };
};

export const calculateBtpProgress = (progressSteps) => {
  if (!Array.isArray(progressSteps) || progressSteps.length === 0) {
    return 0;
  }

  const completedCount = progressSteps.filter((step) => step.completed).length;
  return Math.round((completedCount / progressSteps.length) * 100);
};

export const formatDateLabel = (value) => {
  if (!value) return "";

  try {
    return new Date(value).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
};
