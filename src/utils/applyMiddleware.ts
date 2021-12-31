import { applyTransportMiddlewares } from "../createTransport";
import type { Middleware, Transport } from "../types";

export function applyMiddleware<Resource extends (transport: Transport) => any>(
  resource: Resource,
  middlewares: Middleware | Middleware[]
): (trasnport: Transport) => ReturnType<Resource> {
  return (transport: Transport) =>
    resource(applyTransportMiddlewares(transport, middlewares));
}
