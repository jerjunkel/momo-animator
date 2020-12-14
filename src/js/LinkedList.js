export default class LinkedList {
    constructor(item) {
        this.head = new ListNode(item);
        this.current = this.head;
    }
    add(item) {
        let current = this.head;
        const node = new ListNode(item);
        while (current.next !== null) {
            current = current.next;
        }
        current.next = node;
    }
    next() {
        if (this.current == null)
            return null;
        const item = this.current.item;
        this.current = this.current.next;
        return item;
    }
    get currentItem() {
        return null;
    }
    get count() {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }
}
class ListNode {
    constructor(item) {
        this.next = null;
        this.item = item;
    }
}
