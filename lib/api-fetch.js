/**
 * API Fetch utility - automatically routes to the backend API
 * instead of local frontend API routes
 */

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://deployer-msd-1.onrender.com/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'https://deployer-msd-1.onrender.com/api';
};

/**
 * Wrapper around fetch that automatically prepends the backend API URL
 * Usage: apiFetch('/projects') instead of fetch('/api/projects')
 */
export async function apiFetch(endpoint, options = {}) {
  const baseUrl = getBaseUrl();
  
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Remove /api prefix if it exists (since baseUrl already includes /api)
  const cleanEndpoint = normalizedEndpoint.replace(/^\/api/, '');
  
  const url = `${baseUrl}${cleanEndpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    return response;
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
}

export default apiFetch;
