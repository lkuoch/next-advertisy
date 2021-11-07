import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import getConfig from "next/config";

import { store } from "../app/store";

import type { AppProps } from "next/app";

const { publicRuntimeConfig } = getConfig();

export default function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async function boot() {
      if (!publicRuntimeConfig.isProd) {
        const { worker } = require("../../mocks/browser");
        await worker.start();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) {
    return <h1>LOADING BIATCH</h1>;
  }

  if (isLoaded) {
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
