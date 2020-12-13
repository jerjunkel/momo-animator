export class OptionsList {
    constructor(node) {
        this.head = node;
    }
    add(val) {
        let current = this.head;
        const node = new OptionNode(val);
        while (current.next !== null) {
            current = current.next;
        }
        current.next = node;
    }
}
export class OptionNode {
    constructor(val) {
        this.next = null;
        this.val = val;
    }
}
