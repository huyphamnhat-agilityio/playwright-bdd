export type ApiErrorResponse = {
  data: {
    [key: string]: {
      code: string;
      message: string;
    };
  };
  message: string;
  status: number;
};

export type ApiMetadataReponse = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  items: T[];
} & ApiMetadataReponse;
