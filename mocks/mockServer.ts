import { rest, setupWorker } from "msw";
import customers from "./data/customers";
import products from "./data/products";

const BASE_URL = CONFIG.vars.base_graphql_endpoint;

const handlers = [
  rest.get(`${BASE_URL}/customers`, async (_, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res(ctx.status(200), ctx.json(customers));
  }),
  rest.get(`${BASE_URL}/products`, async (_, res, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res(ctx.status(200), ctx.json(products));
  }),
];

export const worker = setupWorker(...handlers);
