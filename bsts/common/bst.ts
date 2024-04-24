import { Queue } from "./queue";

class BNode<T> {
  val: T;
  left: BNode<T> | null;
  right: BNode<T> | null;

  constructor(
      val: T,
      left: BNode<T> | null = null,
      right: BNode<T> | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}


class BST<T> {
  root: BNode<T> | null;

  constructor(root: BNode<T> | null = null, vals: T[] = []) {
    this.root = root;
    for (const num of vals) this.insert(num);
  }

  /** insert(val): Insert a new node into the BST with value val.
   * Uses iteration. */

  insert(val: T): void {
    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new BNode<T>(val);
      return;
    }

    // Otherwise, find the correct spot for the new node.
    let curr = this.root;

    while (true) {
      if (val < curr.val) {
        if (curr.left === null) {
          curr.left = new BNode<T>(val);
          return;
        } else {
          curr = curr.left;
        }
      } else if (val > curr.val) {
        if (curr.right === null) {
          curr.right = new BNode<T>(val);
          return;
        } else {
          curr = curr.right;
        }
      }
    }
  }

  /** serialize(): Output string of a binary tree in DFS order:
   *
   *      a
   *   b    c
   *  d    e
   *
   *  would become "a b c d - e - - - - -"
   *
   *  This could be used to create trees from the string, but here
   *  it's used for easy validation testing.
   **/

  serialize(): string {
    let queue = new Queue<BNode<T> | null>();
    let vals: string[] = [];

    if (this.root) queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      if (!node) {
        vals.push("-");
      } else {
        vals.push(String(node.val));
        queue.enqueue(node.left);
        queue.enqueue(node.right);
      }
    }

    return vals.join(" ");
  }

  /** validate that BST is valid and return the values in order.
   *
   * If tree is not valid, throws error.
   *
   * This is useful for testing.
   */
  validate(): T[] {
    const vals: T[] = [];

    function _accumValsInOrder(node: BNode<T> | null): void {
      if (!node) return;
      _accumValsInOrder(node.left);
      vals.push(node.val);
      _accumValsInOrder(node.right);
    }

    _accumValsInOrder(this.root);

    // a valid BST will produce in-order traversal that is sorted
    if (vals.some((n: T, idx: number, arr: T[]): boolean => n < arr[idx - 1])) {
      throw new Error("Invalid BST");
    }
    return vals;
  }
}


// Convenience classes for people less comfortable with generics:

class BNodeNum extends BNode<number> { }
class BNodeStr extends BNode<string> { }
class BSTNum extends BST<number> { }
class BSTStr extends BST<string> { }

export { BNodeNum, BSTNum, BNodeStr, BSTStr, BST, BNode };
