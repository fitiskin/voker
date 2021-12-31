import { DEFAULTS } from "./consts";
import type {
  ResourcePublicConfig,
  TransportConfig,
  TransportPrivateConfig,
  TransportDefaultConfig,
  Path,
} from "./types";
import type { Middleware, Transport } from "./types";

const TRANSPORT_DEFAULTS: TransportDefaultConfig = {
  baseUrl: DEFAULTS.baseUrl,
  middlewares: DEFAULTS.middlewares,
  headers: DEFAULTS.headers,
};

export function createTransport(initialConfig: TransportConfig) {
  const config: TransportPrivateConfig = Object.assign(
    {},
    TRANSPORT_DEFAULTS,
    initialConfig
  );

  const transport = <T = unknown>(resourceConfig: ResourcePublicConfig) =>
    config.fetcher<T>({
      url: buildUrl(config.baseUrl, resourceConfig.path),
      method: resourceConfig.method ?? DEFAULTS.method,
      headers: Object.assign({}, config.headers, resourceConfig.headers),
      payload: resourceConfig.payload,
    });

  return applyTransportMiddlewares(transport, config.middlewares);
}

export function applyTransportMiddlewares(
  transport: Transport,
  middlewares: Middleware | Middleware[]
) {
  if (!Array.isArray(middlewares)) {
    middlewares = [middlewares];
  }

  for (const middleware of middlewares) {
    transport = middleware(transport);
  }

  return transport;
}

export function buildUrl(baseUrl: string, path: Path): `${string}${Path}` {
  return `${baseUrl}${path}`;
}
