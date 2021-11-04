import { baseApi } from "@features/common";
import type { Product } from "./types";

const TAG = "Products" as const;

export const cartApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchProducts: builder.query<Array<Product>, void>({
        query: () => `/products`,
        providesTags: (products = []) => [
          TAG,
          ...products.map((product) => ({
            type: TAG,
            id: product.id,
          })),
        ],
      }),
    }),
    overrideExisting: false,
  });
