import source, { createContentSource } from "./";

describe("content source object", () => {
  it("Checks that Source is an object", () => {
    expect(typeof source).toBe("object");
  });

  it("Checks that Source includes the params key", () => {
    expect(Object.keys(source).includes("params")).toBe(true);
  });

  it("Checks that Source includes the resolve key", () => {
    expect(Object.keys(source).includes("resolve")).toBe(true);
  });

  it("Checks that Source includes the schemaName key", () => {
    expect(Object.keys(source).includes("schemaName")).toBe(true);
  });

  describe("source.schemaName string", () => {
    it("Checks that source.schemaName is a string", () => {
      expect(typeof source.schemaName).toBe("string");
    });

    it('Checks that source.schemaName equals "ans-feed"', () => {
      expect(source.schemaName).toBe("ans-feed");
    });

    it('Checks that the "contentAlias" param has a value of "text"', () => {
      expect(source.params.contentAlias).toBe("text");
    });
  });

  describe("source.params object", () => {
    it("Checks that source.params is an object", () => {
      expect(typeof source.params).toBe("object");
    });

    it('Checks that the source has a params with an object with key equal to "contentAlias"', () => {
      expect(Object.keys(source.params).includes("contentAlias")).toBe(true);
    });

    it('Checks that the "contentAlias" param has a value of "text"', () => {
      expect(source.params.contentAlias).toBe("text");
    });
  });

  describe("source.resolve function", () => {
    const key = {
      "arc-site": "test-site",
      contentAlias: "content-alias",
      feedOffset: 0,
      feedSize: 3
    };

    it("Checks that source.resolve is a function", () => {
      expect(typeof source.resolve).toBe("function");
    });

    it("Checks that source.resolve returns the right pattern from the key", () => {
      const endpoint = `/content/v4/collections?website=${
        key["arc-site"]
      }&content_alias=${key.contentAlias}&size=${key.feedSize}&from=${key.feedOffset}`;
      expect(source.resolve(key)).toBe(endpoint);
    });

    it('Checks that source.resolve returns "Arc Site is not defined', () => {
      const endpoint =
        "/content/v4/collections?website=Arc Site is not defined&content_alias=undefined&size=undefined&from=undefined";
      expect(source.resolve()).toBe(endpoint);
    });
  });
});

describe("createContentSource", () => {
  it("allows custom webiste", () => {
    const customSource = createContentSource("foo");
    expect(customSource.resolve()).toBe(
      "/content/v4/collections?website=foo&content_alias=undefined&size=undefined&from=undefined"
    );
  });
});
