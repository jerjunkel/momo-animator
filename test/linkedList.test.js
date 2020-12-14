import LinkedList from "../src/js/LinkedList";

describe("Testing a linked list for animations", () => {
  test("creating a new list", () => {
    const list = new LinkedList("Foo");
    expect(list.head.item).toBe("Foo");
    expect(list.count).toBe(1);
  });

  test("add two elements to list", () => {
    const list = new LinkedList("Foo");
    list.add("Bar");
    expect(list.head.next.item).toBe("Bar");
    expect(list.count).toBe(2);
  });

  test("add five elements to list", () => {
    const list = new LinkedList("Foo");
    list.add("Bar");
    list.add("FooBar");
    list.add("BarFoo");
    list.add("FooBarFoo");

    expect(list.head.next.next.next.next.item).toBe("FooBarFoo");
    expect(list.count).toBe(5);
  });

  test("test next method", () => {
    const list = new LinkedList("Foo");
    list.add("Bar");
    list.add("FooBar");

    expect(list.next()).toBe("Foo");
    expect(list.next()).toBe("Bar");
    expect(list.next()).toBe("FooBar");
    expect(list.next()).toBe(null);
  });
});
