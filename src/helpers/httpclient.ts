import { logger } from "./logger";

export class HttpClient {
  private baseURL;
  private defaultHeaders;

  constructor(baseURL = '', defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  // Helper method to make requests
  async request(method: string, endpoint: string, options = {}) {
    const url = this.baseURL + endpoint;
    const { headers, body, query, ...rest } = options;

    // Add query parameters to the URL if present
    const queryString = query
      ? '?' +
        Object.entries(query)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&')
      : '';
    
    try {
      const response = await fetch(url + queryString, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
      });

      // Check for HTTP errors
      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      // Parse response
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text();
    } catch (error) {
      logger.error(`Error during ${method} request to ${url}:`, error);
      throw error;
    }
  }

  // Convenience methods for common HTTP verbs
  get(endpoint: string, options = {}) {
    return this.request('GET', endpoint, options);
  }

  post(endpoint: string, options = {}) {
    return this.request('POST', endpoint, options);
  }

  put(endpoint: string, options = {}) {
    return this.request('PUT', endpoint, options);
  }

  delete(endpoint: string, options = {}) {
    return this.request('DELETE', endpoint, options);
  }
}
