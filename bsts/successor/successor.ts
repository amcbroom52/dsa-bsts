import { BNodeNum } from "../common/bst";

/** findSuccessor(node): Find and return node with next largest value.
 * Returns null if no successor. */

function findSuccessor(node: BNodeNum | null): BNodeNum | null {
  if (!node || !node.right) return null;

  let current = node.right;
  while (current.left !== null) {
    current = current.left;
  }

  return current;
}

export { findSuccessor };