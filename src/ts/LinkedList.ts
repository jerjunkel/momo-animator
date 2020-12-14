export default class LinkedList<T> {
  private head: ListNode<T>;
  constructor(val: T) {
    this.head = new ListNode<T>(val);
  }

  add(val: T) {
    let current = this.head;
    const node = new ListNode<T>(val);

    while (current.next !== null) {
      current = current.next;
    }

    current.next = node;
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
}

class ListNode<T> {
  val: T;
  next: ListNode<T> | null = null;
  constructor(val: T) {
    this.val = val;
  }
}
