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

  let replacementNode;

  if (nodeToRemove.right && nodeToRemove.left) {
    const successor = findSuccessor(nodeToRemove)!;
    remove(bst, successor.val);
    successor.left = nodeToRemove.left;
    successor.right = nodeToRemove.right;
    replacementNode = successor;

  } else if (nodeToRemove.left) {
    replacementNode = nodeToRemove.left;

  } else if (nodeToRemove.right) {
    replacementNode = nodeToRemove.right;

  } else {
    replacementNode = null;
  }

  const parentNode = findParent(bst.root, val);
  if (parentNode) {
    if (nodeToRemove === parentNode?.left) {
      parentNode!.left = replacementNode;
    } else {
      parentNode!.right = replacementNode;
    }
  } else {
    bst.root = replacementNode;
  }

  return nodeToRemove;
}

export { remove };
