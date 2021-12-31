import { applyMiddleware } from "voker";
import type { Middleware } from "voker";

describe("utils - applyMiddleware", () => {
  it("should be possible to create client", async () => {
    const mockedTransport = jest.fn();
    const mockedResource = jest.fn();

    const mockedSideEffect = jest.fn();

    const middleware: Middleware = (transport) => {
      mockedSideEffect();

      return transport;
    };

    const enhancedResource = applyMiddleware(mockedResource, middleware);

    enhancedResource(mockedTransport);

    expect(mockedResource).toHaveBeenCalledTimes(1);
    expect(mockedSideEffect).toHaveBeenCalledTimes(1);
  });
});
