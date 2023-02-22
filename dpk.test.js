const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the expected hash with a set string 'event'", () => {
    const key = deterministicPartitionKey('event');
    expect(key).toBe("99618d75a8a4844bf0c26ca451ea18d104fb040a881825dedf53a4a716e3537b6374e5f84ce13ef5af948a70a872c8116d104012ef1a39f76d42ce1ededb4f9a");
  });

  it("Returns the expected hash with a set string 'this is a longer event'", () => {
    const trivialKey = deterministicPartitionKey('this is a longer event');
    expect(trivialKey).toBe("caa9b94ce826e6e79b47fb667d7575fb6265cee73baca5d562cfc1a6fec2f2ff708dc63915b2c2350040ff855caf532bf5bcfbf5d93d2037e4e8ca3b2c46786a");
  });

  it("Returns the expected hash with a set object", () => {
    const trivialKey = deterministicPartitionKey({abc:123});
    expect(trivialKey).toBe("73911271eabc9e1b8b10429a068b2e899330179f7552bf12a2a4037783c7b2a7001f894e321a8315a37f43be7c97875e9c2841b45a3e4799c853456c1a1d1166");
  });

  it("Returns the expected hash with a set array", () => {
    const trivialKey = deterministicPartitionKey([0,1,2]);
    expect(trivialKey).toBe("cfb6c11a6d712be76b4be8a0f98b3750c5ab91c7e32bd403c5eb13db5f20a83cea80ac0e36116c8bde6d76bbc0f622fde6fb018e2efd3521d2f4f102fd29d077");
  });

  it("Returns the expected hash with a set number", () => {
    const trivialKey = deterministicPartitionKey(123);
    expect(trivialKey).toBe("48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc");
  });

  it("Returns the expected hash with a set boolean", () => {
    const trivialKey = deterministicPartitionKey(true);
    expect(trivialKey).toBe("ff2c82ed266dc30b1afe862bee32cf996b213513bc6b3e242ff605ddd9d5bbd1e7eebf6dde586b8700125cb7b95d35aec2f4e750d092cd359b202e3d2be41e1a");
  });

  it("Returns the expected hash when passed a partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 'key'});
    expect(trivialKey).toBe("key");
  });

  it("Returns the expected hash when passed a very long string", () => {
    const veryLongString = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    const trivialKey = deterministicPartitionKey(veryLongString);
    expect(trivialKey).toBe("59d87963222f633daa27d771273825134e55d15b481d9d76227982b24ea494b2898955a66b7d85a8504e60b1fe5a9704e2cb72f1e1ad25bdb7fed82b9d22ebf9");
  });

  it("Returns the expected hash when passed a very long partition key", () => {
    const veryLongString = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz';
    const trivialKey = deterministicPartitionKey({partitionKey: veryLongString});
    expect(trivialKey).toBe("fcb4027b4cd9412e4560308f02799c2f44323e2905d72cbb3232205b131407bb9addb1c8e74c40762ec96f2a978366846e80387dbc7bc62ac147dac98af70cce");
  });

  it("Returns the expected hash when passed a number partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 123});
    expect(trivialKey).toBe("123");
  });

  it("Returns the expected hash when passed an object partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: {abc: 123}});
    expect(trivialKey).toBe("{\"abc\":123}");
  });

  it("Returns the expected hash when passed a boolean partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: true});
    expect(trivialKey).toBe("true");
  });

  it("Returns the expected hash when passed an array partition key", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: [0,1,2]});
    expect(trivialKey).toBe("[0,1,2]");
  });
});
