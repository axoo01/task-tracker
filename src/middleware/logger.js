// A simple, clean console logger middleware
export const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} request to ${url}`);

  // 🟢 Critical: Tell Express to move to the next processor on the conveyor belt!
  next();
};
