import { baseApi } from "@features/common";
import type { Customer } from "./types";

const TAG = "Customers" as const;

export const customerApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchCustomers: builder.query<Array<Customer>, void>({
        query: () => `/customers`,
        providesTags: (customers) => [
          TAG,
          ...(customers?.map((customer) => ({
            type: TAG,
            id: customer.id,
          })) ?? []),
        ],
      }),
    }),
    overrideExisting: false,
  });
