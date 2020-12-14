export default class LinkedList {
    constructor(val) {
        this.head = new ListNode(val);
    }
    add(val) {
        let current = this.head;
        const node = new ListNode(val);
        while (current.next !== null) {
            current = current.next;
        }
        current.next = node;
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
    constructor(val) {
        this.next = null;
        this.val = val;
    }
}
