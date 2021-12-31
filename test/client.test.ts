import { createClient } from "voker";

describe("client - createClient", () => {
  it("should be possible to create client", async () => {
    const mockedTransport = jest.fn();
    const mockedResource = jest.fn();

    const client = createClient(mockedTransport, {
      endpoint: mockedResource,
    });

    expect(client).toHaveProperty("endpoint");
    expect(mockedResource).toHaveBeenCalledTimes(1);
    expect(mockedResource).toHaveBeenCalledWith(mockedTransport);
  });
});
