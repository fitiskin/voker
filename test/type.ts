import { createResource } from "voker";

type ExpectNever = (...args: never) => void;
type ExpectType = <T>(value: T) => void;

const expectType: ExpectType = () => {};
const expectNever: ExpectNever = () => {};

export function genericResourceParams() {
  createResource<{ query: { id: string | number } }>({
    path: ({ id }) => {
      expectType<string | number>(id);

      return `/api/${id}`;
    },
  });

  createResource<{ query: never }>({
    path: (query) => {
      expectNever(query);

      return "/api";
    },
  });

  createResource<never>({
    path: (query) => {
      expectNever(query);

      return "/api";
    },
  });

  createResource({
    path: (query) => {
      expectNever(query);

      return "/api";
    },
  });
}

export function stringResourceParams() {
  createResource("/api");
}
