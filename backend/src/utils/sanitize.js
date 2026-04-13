const stripUnsafeChars = (value) =>
  value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();

export const sanitizePayload = (value) => {
  if (Array.isArray(value)) {
    return value.map(sanitizePayload);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, sanitizePayload(entry)])
    );
  }

  if (typeof value === "string") {
    return stripUnsafeChars(value);
  }

  return value;
};
