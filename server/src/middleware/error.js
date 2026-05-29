// Wraps async route handlers so thrown errors hit the error middleware.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// App-level error with an HTTP status.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function notFound(req, res) {
  res.status(404).json({ error: "Not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  if (status >= 500) console.error(err);

  // Unique-violation from Postgres -> 409.
  if (err.code === "23505") {
    return res.status(409).json({ error: "Resource already exists" });
  }

  res.status(status).json({ error: err.message || "Internal server error" });
}
