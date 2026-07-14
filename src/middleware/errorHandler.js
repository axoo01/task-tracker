// Centralized Error Handler Middleware
// Note: In Express, error-handling middleware MUST take exactly 4 parameters!
export const errorHandler = (err, req, res, next) => {
  console.error("❌ CRITICAL ERROR CAUGHT:", err.stack);

  const statusCode = err.statusCode || 500;
  const responseStatus = statusCode >= 500 ? "error" : "fail";

  res.status(statusCode).json({
    status: responseStatus,
    message: err.message || "Internal Server Error occurred on our systems.",
  });
};
