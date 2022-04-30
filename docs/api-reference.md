# API Reference

## Top-Level Exports

- [createResource(resourceConfig)](#createresourceresourceconfig)
- [createTransport(transportConfig)](#createtransporttransportconfig)
- [createClient(transport, resources)](#createclienttransport-resources)

## Importing

Every function described above is a top-level export. You can import any of them like this:

**ES Modules**

```ts
import { createResource } from "voker";
```

**CommonJS**

```js
var createResource = require("voker").createResource;
```

**UMD**

```js
var createResource = Voker.createResource;
```

## API

### createResource(resourceConfig)

The `createResource` helper function turns an object called `resourceConfig` whose values are request settings into a single function you can pass to `createClient`.

As your app grows more complex, you'll want to split your data fetching requests into separate functions called resources each retrieving independent parts of the data.

#### Parameters

1. `resourceConfig` (_Object_): An object defines config for making resource. Only the `path` is required.

#### Returns

(_`Resource`_): A function that applies the given config. That function holds the complete logic how to retrieve data for a particular case.

#### Example: createUser resource

```ts
import { createResource } from "voker";

type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
  location?: string;
};

const createUser = createResource<{ payload: Omit<User, "id"> }, User>({
  method: "POST",
  path: "/users/create",
});
```

#### Tips

**Common:**

- You can create as many resources as you need.
- Prefer `createResource` helper over defining resource as a function to reduce the code boilerplate.

**For TypeScript users:**

- Share `payload`, `query` and `data` generic types between `resources` to reuse a code.

### createTransport(transportConfig)

TODO

### createClient(transport, resources)

TODO
