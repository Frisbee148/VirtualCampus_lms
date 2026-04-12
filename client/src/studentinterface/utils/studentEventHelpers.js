export const MONTHLY_EVENTS_STORAGE_KEY = "student-monthly-events";
export const WEEKLY_EVENTS_STORAGE_KEY = "student-weekly-events";
export const DAILY_EVENTS_STORAGE_KEY = "student-daily-events";

export const loadStoredArray = (storageKey) => {
  try {
    const rawValue = localStorage.getItem(storageKey);
    return rawValue ? JSON.parse(rawValue) : [];
  } catch {
    return [];
  }
};

export const saveStoredArray = (storageKey, value) => {
  localStorage.setItem(storageKey, JSON.stringify(value));
};

export const formatTimeInputLabel = (value) => {
  if (!value) return "";

  const [hourText, minuteText] = value.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);
  const period = hour >= 12 ? "PM" : "AM";

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour -= 12;
  }

  return `${hour}:${String(minute).padStart(2, "0")} ${period}`;
};

export const timeLabelToMinutes = (value) => {
  if (!value) return 0;

  const normalizedValue = value.trim().toUpperCase();
  const twelveHourMatch = normalizedValue.match(
    /^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/,
  );
  if (twelveHourMatch) {
    let hour = Number(twelveHourMatch[1]);
    const minute = Number(twelveHourMatch[2] || 0);
    const period = twelveHourMatch[3];

    if (hour === 12) {
      hour = 0;
    }
    if (period === "PM") {
      hour += 12;
    }

    return hour * 60 + minute;
  }

  const twentyFourHourMatch = normalizedValue.match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (twentyFourHourMatch) {
    return (
      Number(twentyFourHourMatch[1]) * 60 + Number(twentyFourHourMatch[2] || 0)
    );
  }

  return 0;
};

export const formatWeeklyTimeRange = (startTime, durationHours) => {
  const [hourText, minuteText] = startTime.split(":");
  const startMinutes = Number(hourText) * 60 + Number(minuteText);
  const endMinutes = startMinutes + Number(durationHours) * 60;

  const formatMinutes = (minutes) => {
    let hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const period = hour >= 12 ? "PM" : "AM";

    if (hour === 0) {
      hour = 12;
    } else if (hour > 12) {
      hour -= 12;
    }

    return `${hour}:${String(minute).padStart(2, "0")} ${period}`;
  };

  return `${formatMinutes(startMinutes)} - ${formatMinutes(endMinutes)}`;
};
