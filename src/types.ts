export type Result<Data> = Promise<{ data: Data }>;
export type BaseHeaders = Record<string, string>;
export type BaseQuery = Record<string, unknown>;
export type BasePayload = unknown;
export type Path = `/${string}`;
export type Method =
  | "GET"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "POST"
  | "PUT"
  | "PATCH"
  | "PURGE"
  | "LINK"
  | "UNLINK";

export type BaseParams = { query?: BaseQuery; payload?: BasePayload };

export type ResourceParams<Params> = Params extends {
  query: BaseQuery;
  payload: BasePayload;
}
  ? [params: Params]
  : Params extends { query?: BaseQuery; payload: BasePayload }
  ? [params: Params]
  : Params extends { query: BaseQuery; payload?: BasePayload }
  ? [params: Params]
  : Params extends BaseParams
  ? [params?: Params]
  : [];

export interface ResourceConfig<Params extends BaseParams = never> {
  method?: Method;
  headers?: BaseHeaders;
  path: Path | ((query: Params["query"]) => Path);
}

export interface ResourcePublicConfig {
  method?: Method;
  path: Path;
  headers?: BaseHeaders;
  payload?: BasePayload;
}

export interface TransportConfig {
  baseUrl?: string;
  headers?: BaseHeaders;
  fetcher: Fetcher;
  middlewares?: Middleware[];
}

export interface TransportDefaultConfig {
  baseUrl: string;
  headers: BaseHeaders;
  middlewares: Middleware[];
}

export type TransportPrivateConfig = Required<TransportConfig>;

export interface FetcherConfig {
  method: Method;
  url: string;
  headers?: BaseHeaders;
  payload?: BasePayload;
}

export interface Fetcher {
  <Data>(config: FetcherConfig): Result<Data>;
}

export interface Transport {
  <Data>(config: ResourcePublicConfig): Result<Data>;
}

export interface Middleware {
  (transport: Transport): Transport;
}
