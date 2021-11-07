import api from "@app/store/api";
import type { Customer } from "./types";

const TAG = "Customers" as const;

export const customerApi = api
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchCustomers: builder.query<Customer[], void>({
        query: () => ({ url: "/customers" }),
        providesTags: (customers = []) => [
          TAG,
          ...customers.map((customer) => ({
            type: TAG,
            id: customer.id,
          })),
        ],
      }),
    }),
    overrideExisting: false,
  });
