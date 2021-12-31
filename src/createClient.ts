import type { Transport } from "./types";

export function createClient<
  Resources extends { [K in keyof Resources]: Resources[K] }
>(transport: Transport, resources: Resources) {
  return (Object.keys(resources) as Array<keyof typeof resources>).reduce(
    (accumulator, current) => {
      accumulator[current] = resources[current](transport);
      return accumulator;
    },
    {} as { [K in keyof Resources]: ReturnType<Resources[K]> }
  );
}
