export default class LinkedList<T> {
  private head: ListNode<T>;
  private current: ListNode<T> | null;
  constructor(item: T) {
    this.head = new ListNode<T>(item);
    this.current = this.head;
  }

  add(item: T) {
    let current = this.head;
    const node = new ListNode<T>(item);

    while (current.next !== null) {
      current = current.next;
    }

    current.next = node;
  }

  next(): T | null {
    if (this.current == null) return null;

    const item = this.current.item;
    this.current = this.current.next;
    return item;
  }

  get currentItem(): T | null {
    return null;
  }

  get count(): number {
    let count = 0;
    let current: ListNode<T> | null = this.head;

    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  get firstItem(): T | null {
    return this.head.item;
  }
}

class ListNode<T> {
  item: T;
  next: ListNode<T> | null = null;
  constructor(item: T) {
    this.item = item;
  }
}
