type ApiError = {
  error: {
    message: string;
    extensions: Record<string, any>;
  };
};

const createApiError = (message: string, property?: string): ApiError => ({
  error: {
    message,
    extensions: {
      property,
    },
  },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type { ApiError };
export { createApiError, delay };
