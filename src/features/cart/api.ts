import api from "@app/store/api";
import type { Product } from "./types";

const TAG = "Products" as const;

export const cartApi = api
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchProducts: builder.query<Product[], void>({
        query: () => ({ url: "/products" }),
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
