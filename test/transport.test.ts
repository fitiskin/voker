import { createTransport } from "voker";
import { applyTransportMiddlewares } from "../src/createTransport";

describe("transport - createTransport", () => {
  it("should call fetcher with current URL", async () => {
    const mockFetcher = jest.fn();

    const transport = createTransport({
      fetcher: mockFetcher,
      baseUrl: "/api/v1",
    });

    transport({
      path: "/ping",
    });

    expect(mockFetcher.mock.calls[0][0]).toMatchObject({
      url: "/api/v1/ping",
    });
  });

  it("should pass method", async () => {
    const mockFetcher = jest.fn();

    const transport = createTransport({
      fetcher: mockFetcher,
      baseUrl: "/api/v1",
    });

    transport({
      path: "/ping",
      method: "POST",
    });

    expect(mockFetcher.mock.calls[0][0]).toHaveProperty("method", "POST");
  });
});

describe("transport - applyTransportMiddlewares", () => {
  it("should apply middlewares", () => {
    const mockedTransport = jest.fn();

    const mw1 = jest.fn();
    const mw2 = jest.fn();
    const mw3 = jest.fn();

    const middlewares = [mw1, mw2, mw3];

    applyTransportMiddlewares(mockedTransport, middlewares);

    expect(mockedTransport).not.toBeCalled();

    expect(mw1).toBeCalledWith(mockedTransport);
    expect(mw1).toBeCalledTimes(1);

    expect(mw2).not.toBeCalledWith(mockedTransport);
    expect(mw2).toBeCalledTimes(1);

    expect(mw3).not.toBeCalledWith(mockedTransport);
    expect(mw3).toBeCalledTimes(1);
  });

  it("should apply single middleware", () => {
    const mockedTransport = jest.fn();

    const mw = jest.fn();

    applyTransportMiddlewares(mockedTransport, mw);

    expect(mockedTransport).not.toBeCalled();

    expect(mw).toBeCalledWith(mockedTransport);
    expect(mw).toBeCalledTimes(1);
  });
});
