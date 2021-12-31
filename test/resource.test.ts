import { createResource } from "voker";

describe("resource - createResource - path", () => {
  it("should be possible to create resource from a path", async () => {
    const mockedTransport = jest.fn();

    const resource = createResource("/ping");
    const handler = resource(mockedTransport);

    handler();

    expect(mockedTransport.mock.calls[0][0]).toMatchObject({
      path: "/ping",
    });
  });
});

describe("resource - createResource - payload", () => {
  it("should not pass payload when `undefined`", async () => {
    const mockedTransport = jest.fn();

    const resource = createResource("/ping");
    const handler = resource(mockedTransport);

    handler();

    expect(mockedTransport.mock.calls[0][0]).not.toHaveProperty("payload");
  });

  it("should pass payload when `null`", async () => {
    const mockedTransport = jest.fn();

    const resource = createResource<{ payload: null }>("/ping");
    const handler = resource(mockedTransport);

    handler({ payload: null });

    expect(mockedTransport.mock.calls[0][0]).toHaveProperty("payload", null);
  });
});

describe("resource - createResource - method", () => {
  it("should pass method", async () => {
    const mockedTransport = jest.fn();

    const resource = createResource({
      path: "/ping",
      method: "POST",
    });

    const handler = resource(mockedTransport);

    handler();

    expect(mockedTransport.mock.calls[0][0]).toHaveProperty("method", "POST");
  });

  it("should not pass method when `undefined`", async () => {
    const mockedTransport = jest.fn();

    const resource = createResource({
      path: "/ping",
    });

    const handler = resource(mockedTransport);

    handler();

    expect(mockedTransport.mock.calls[0][0]).not.toHaveProperty("method");
  });

  it("should handle string path", async () => {
    const mockedTransport = jest.fn();

    const resource = createResource({
      path: "/ping",
    });

    const handler = resource(mockedTransport);

    handler();

    expect(mockedTransport.mock.calls[0][0]).toHaveProperty("path", "/ping");
  });

  it("should handle function path", async () => {
    const mockedTransport = jest.fn();
    const mockedPath = jest.fn().mockImplementation(() => "/users/123");

    const resource = createResource<{ query: { id: number } }>({
      path: mockedPath,
    });

    const handler = resource(mockedTransport);
    const query = { id: 123 };

    handler({ query });

    expect(mockedPath).toBeCalledWith(query);
    expect(mockedPath).toBeCalledTimes(1);
    expect(mockedTransport.mock.calls[0][0]).toHaveProperty("path");
  });

  it("should handle function path without query", async () => {
    const mockedTransport = jest.fn();
    const mockedPath = jest.fn().mockImplementation(() => "/users/fixed");

    const resource = createResource({
      path: mockedPath,
    });

    const handler = resource(mockedTransport);

    handler();

    expect(mockedPath).toBeCalledWith(undefined);
    expect(mockedPath).toBeCalledTimes(1);
    expect(mockedTransport.mock.calls[0][0]).toHaveProperty(
      "path",
      "/users/fixed"
    );
  });
});
