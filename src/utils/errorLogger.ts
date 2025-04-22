// Simple utility to log errors to console
// This can be expanded with error reporting services if needed

type ErrorContext = string | {
  component?: string;
  action?: string;
  details?: Record<string, unknown>;
};

export const logError = (error: unknown, context?: ErrorContext) => {
  const timestamp = new Date().toISOString();
  const contextMessage = typeof context === 'string' 
    ? `[${context}]` 
    : context 
      ? `[${context.component || 'Unknown'}:${context.action || 'Unknown'}]`
      : '';
  
  console.error(`${timestamp} ${contextMessage} Error:`, error);
  
  if (error instanceof Error) {
    console.error({
      name: error.name,
      message: error.message,
      stack: error.stack,
      ...(context && typeof context === 'object' ? { context } : {})
    });
  }
  
  // Enhanced 3D rendering error handling
  if (
    (typeof context === 'string' && context.includes('SuitcaseModel')) || 
    (error instanceof Error && error.message.includes('WebGL'))
  ) {
    console.error({
      type: '3D_RENDERING_ERROR',
      suggestion: 'Try using a different browser or enabling hardware acceleration',
      browserInfo: {
        userAgent: navigator.userAgent,
        webglSupported: !!window.WebGLRenderingContext
      }
    });
  }
  
  // Enhanced GLB loading error handling
  if (error instanceof Error && (
    error.message.includes('Could not load') || 
    error.message.includes('GLB') ||
    error.message.includes('fetch') ||
    error.message.includes('404')
  )) {
    const urlMatch = error.message.match(/fetch for "([^"]+)"/);
    console.error({
      type: 'MODEL_LOADING_ERROR',
      attemptedUrl: urlMatch?.[1] || 'Unknown URL',
      fallbackUrl: 'https://raw.githubusercontent.com/Dr31K0/models/main/suitcase-texture.glb',
      suggestion: 'Check network connection or try a different model format'
    });
  }
  
  // Enhanced error logging for 3D model loading
  if (error instanceof Error && error.message.includes('GLTFLoader')) {
    console.error({
      timestamp,
      type: '3D_MODEL_LOADING_ERROR',
      context,
      details: {
        message: error.message,
        url: SUITCASE_MODEL_URL,
        browserInfo: {
          userAgent: navigator.userAgent,
          webgl: !!window.WebGLRenderingContext,
          webgl2: !!window.WebGL2RenderingContext
        }
      },
      suggestion: 'Try the following:\n' +
        '1. Check your internet connection\n' +
        '2. Clear browser cache\n' +
        '3. Try a different browser\n' +
        '4. Enable hardware acceleration'
    });
    return;
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
