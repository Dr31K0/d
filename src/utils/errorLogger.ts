
// Simple utility to log errors to console
// This can be expanded with error reporting services if needed

export const logError = (error: unknown, context?: string) => {
  const timestamp = new Date().toISOString();
  const contextMessage = context ? `[${context}]` : '';
  
  console.error(`${timestamp} ${contextMessage} Error:`, error);
  
  if (error instanceof Error) {
    console.error(`Name: ${error.name}`);
    console.error(`Message: ${error.message}`);
    console.error(`Stack: ${error.stack}`);
  }
};

// Catch unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, 'Unhandled Promise Rejection');
  });
}
