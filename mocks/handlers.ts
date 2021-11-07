import { rest } from "msw";
import customers from "./data/customers";
import products from "./data/products";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const BASE_URL = publicRuntimeConfig.vars.base_graphql_endpoint;

export const handlers = [
  rest.get(`${BASE_URL}/customers`, async (_, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res(ctx.status(200), ctx.json(customers));
  }),
  rest.get(`${BASE_URL}/products`, async (_, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res(ctx.status(200), ctx.json(products));
  }),
];
