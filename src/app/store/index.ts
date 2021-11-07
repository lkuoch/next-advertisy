import { configureStore } from "@reduxjs/toolkit";
import getConfig from "next/config";

import api from "./api";
import listenerMiddleware from "./listenerMiddleware";
import reducers from "./reducers";

const { publicRuntimeConfig } = getConfig();

export const store = configureStore({
  devTools: !publicRuntimeConfig.isProd,
  reducer: { [api.reducerPath]: api.reducer, ...reducers },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, listenerMiddleware),
});
