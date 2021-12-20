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

export type { ApiError };
export { createApiError };
