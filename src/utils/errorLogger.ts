
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
  
  // Log 3D rendering specific errors
  if (context?.includes('SuitcaseModel') || 
      (error instanceof Error && error.message.includes('WebGL'))) {
    console.error(`3D Rendering Error: This might be related to WebGL compatibility.`);
    console.error(`Try using a different browser or enabling hardware acceleration.`);
  }
  
  // Add detailed logging for GLB loading errors
  if ((error instanceof Error && error.message.includes('Could not load')) ||
      (error instanceof Error && error.message.includes('GLB'))) {
    console.error(`3D Model Loading Error: Failed to load the suitcase model.`);
    console.error(`Check network connection or try a different model format.`);
  }
};

// Catch unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, 'Unhandled Promise Rejection');
  });
  
  // Add specific listener for WebGL context lost events
  window.addEventListener('webglcontextlost', (event) => {
    logError(new Error('WebGL context lost'), 'WebGL');
    event.preventDefault();
  });
}
