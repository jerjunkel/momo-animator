export class OptionsList<T> {
  private head: OptionNode<T>;
  constructor(node: OptionNode<T>) {
    this.head = node;
  }

  add(val: T) {
    let current = this.head;
    const node = new OptionNode<T>(val);

    while (current.next !== null) {
      current = current.next;
    }

    current.next = node;
  }
}

export class OptionNode<T> {
  val: T;
  next: OptionNode<T> | null = null;
  constructor(val: T) {
    this.val = val;
  }
}
