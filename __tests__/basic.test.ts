import { assert, expect, test } from "vitest";

// Test for Math.sqrt()
test("Math.sqrt()", () => {
  // Arrange: Define inputs
  const input1 = 4;
  const input2 = 144;
  const input3 = 2;

  // Act: Perform operations
  const result1 = Math.sqrt(input1);
  const result2 = Math.sqrt(input2);
  const result3 = Math.sqrt(input3);

  // Assert: Check the results
  expect(result1).toBe(2);
  expect(result2).toBe(12);
  expect(result3).toBe(Math.SQRT2);
});

// Test for JSON stringification and parsing
test("JSON", () => {
  // Arrange: Define the input object
  const input = {
    foo: "hello",
    bar: "world",
  };

  // Act: Perform stringification and parsing operations
  const stringifiedOutput = JSON.stringify(input);
  const parsedOutput = JSON.parse(stringifiedOutput);

  // Assert: Check the results
  expect(stringifiedOutput).eq('{"foo":"hello","bar":"world"}');
  assert.deepEqual(parsedOutput, input, "matches original");
});
