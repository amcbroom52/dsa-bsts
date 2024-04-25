import { BNodeNum, BSTNum } from "../common/bst";
import { findSuccessor } from "../successor/successor";
import { find } from "../find/find";

function findParent(node: BNodeNum | null, val: number): BNodeNum | null {

  while (node !== null) {
    if (node.left?.val === val || node.right?.val === val) return node;

    if (node.val > val) {
      node = node.left;
    } else {
      node = node.right;
    }
  }

  return null;
}

/** remove(bst, val): Removes a node in the BST with the value val.
 * Returns the removed node. */

function remove(bst: BSTNum, val: number): BNodeNum {
  const nodeToRemove = find(bst.root, val)!;
  if (!nodeToRemove) throw new Error();
  const parentNode = findParent(bst.root, val);

  const rootHasNoChildren = (!bst.root!.left && !bst.root!.right);

  if (!parentNode) {
    if (rootHasNoChildren) {
      bst.root = null;
      return nodeToRemove;

    } else if (bst.root?.right && bst.root?.left) {
      const successor = findSuccessor(nodeToRemove)!;
      remove(bst, successor.val);
      successor.left = nodeToRemove.left;
      successor.right = nodeToRemove.right;
      bst.root = successor;
      return nodeToRemove;

    } else if (bst.root?.left) {
      bst.root = bst.root?.left;
      return nodeToRemove;

    } else {
      bst.root = bst.root!.right;
      return nodeToRemove;
    }
  }


  if (nodeToRemove.right && nodeToRemove.left) {
    const successor = findSuccessor(nodeToRemove)!;
    remove(bst, successor.val);
    successor.left = nodeToRemove.left;
    successor.right = nodeToRemove.right;

    if (nodeToRemove === parentNode?.left) {
      parentNode!.left = successor;
    } else {
      parentNode!.right = successor;
    }

  } else if (nodeToRemove.left) {

    if (nodeToRemove === parentNode?.left) {
      parentNode!.left = nodeToRemove.left;
    } else {
      parentNode!.right = nodeToRemove.left;
    }

  } else {

    if (nodeToRemove === parentNode?.left) {
      parentNode!.left = nodeToRemove.right;
    } else {
      parentNode!.right = nodeToRemove.right;
    }

  }

  return nodeToRemove;
}
//find node and parent
//if node is leaf, remove from parent
//if node has one child, make child node into child of parent
// if node has two children, call remove on successor and make found node into successor node
// if node is root with no children, set bst.root = null





// edge case: remove root
// find parent of node to remove
// if node to remove is leaf, trivial, set parent.left or parent.right to be null
// if node to remove is not leaf
// if node has right child, want to find successor
// if node has no right child, want to find predecessor
// in either case, want to find parent of element in question in order to set its child to null
// replace node with predecesor or successor, set right and left.






export { remove };
