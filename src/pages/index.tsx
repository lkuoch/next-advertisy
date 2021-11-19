import App from "../components/index";
import Head from "next/head";
import type { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <body>
        <App />
      </body>
    </div>
  );
};

export default IndexPage;
