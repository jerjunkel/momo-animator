import { OptionsList, OptionNode } from "../src/js/OptionsList";

describe("Testing a linked list for animations", () => {
  test("creating a new list", () => {
    const aNode = new OptionNode("Foo");
    const list = new OptionsList(aNode);
    expect(list.head.val).toEqual("Foo");
  });
});
