import LinkedList from "../src/js/LinkedList";

describe("Testing a linked list for animations", () => {
  test("creating a new list", () => {
    const list = new LinkedList("Foo");
    expect(list.head.val).toEqual("Foo");
    expect(list.count).toEqual(1);
  });

  test("add two elements to list", () => {
    const list = new LinkedList("Foo");
    list.add("Bar");
    expect(list.head.next.val).toEqual("Bar");
    expect(list.count).toEqual(2);
  });

  test("add five elements to list", () => {
    const list = new LinkedList("Foo");
    list.add("Bar");
    list.add("FooBar");
    list.add("BarFoo");
    list.add("FooBarFoo");

    expect(list.head.next.next.next.next.val).toEqual("FooBarFoo");
    expect(list.count).toEqual(5);
  });
});
