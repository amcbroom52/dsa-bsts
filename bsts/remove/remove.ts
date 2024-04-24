import { BNodeNum, BSTNum } from "../common/bst";
import { find } from "../find/find";

/* returns the value */
function findAndRemoveSuccessor(node: BNodeNum): number {
  // if (!node || !node.right) return null;

  // let current = node.right;
  // while (current.left !== null) {
  //   current = current.left;
  // }

  // return current;
}

/* return the value */
function findAndRemovePredecessor(node: BNodeNum): number {
  return 42;
}

/** remove(bst, val): Removes a node in the BST with the value val.
 * Returns the removed node. */

function remove(bst: BSTNum, val: number): BNodeNum {
  const nodeToRemove = find(bst.root, val)!;

  const rootHasNoChildren = (!bst.root!.left && !bst.root!.right);
  if (nodeToRemove === bst.root && rootHasNoChildren) {
    bst.root = null;
    return nodeToRemove;
  }

  if (nodeToRemove.right) {
    nodeToRemove.val = findAndRemoveSuccessor(nodeToRemove);
  } else if (nodeToRemove.left) {
    nodeToRemove.val = findAndRemovePredecessor(nodeToRemove);
  } else {
    const parent = findParent(bst.root, nodeToRemove)
    // set child to null
  }

  return new BNodeNum(val);
}






  // edge case: remove root
  // find parent of node to remove
  // if node to remove is leaf, trivial, set parent.left or parent.right to be null
  // if node to remove is not leaf
  // if node has right child, want to find successor
  // if node has no right child, want to find predecessor
  // in either case, want to find parent of element in question in order to set its child to null
  // replace node with predecesor or successor, set right and left.






export { remove };
