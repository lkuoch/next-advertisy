import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: publicRuntimeConfig.vars.base_graphql_endpoint }),
  endpoints: () => ({}),
});

export default api;
