import { Middleware, Method, BaseHeaders } from "./types";

export const DEFAULTS: {
  method: Method;
  middlewares: Middleware[];
  headers: BaseHeaders;
  baseUrl: string;
} = {
  method: "GET",
  middlewares: [],
  headers: {},
  baseUrl: "/",
};
