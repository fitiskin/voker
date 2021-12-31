import type {
  ResourceParams,
  ResourceConfig,
  BaseParams,
  Transport,
  Path,
  ResourcePublicConfig,
} from "./types";

export function createResource<
  Params extends BaseParams = never,
  Data = unknown
>(initialConfig: ResourceConfig<Params> | Path) {
  if (typeof initialConfig === "string") {
    initialConfig = {
      path: initialConfig,
    };
  }

  const { path } = initialConfig;

  return (transport: Transport) =>
    (...[params]: ResourceParams<Params>) => {
      const publicConfig: ResourcePublicConfig = Object.assign(
        {},
        initialConfig,
        {
          path: typeof path === "function" ? path(params?.query) : path,
        }
      );

      if (params && typeof params.payload !== "undefined") {
        publicConfig.payload = params.payload;
      }

      return transport<Data>(publicConfig);
    };
}
