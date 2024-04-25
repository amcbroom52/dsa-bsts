import { BNodeNum, BSTNum } from "../common/bst";
import { findSuccessor } from "../successor/successor";
import { find } from "../find/find";
import { b } from "vitest/dist/suite-HPAKvIxA";

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

function removeOld(bst: BSTNum, val: number): BNodeNum {
  const nodeToRemove = find(bst.root, val)!;
  if (!nodeToRemove) throw new Error();
  const parentNode = findParent(bst.root, val);

  // If node to remove is the root
  if (!parentNode) {

    // If root has both children
    if (bst.root?.right && bst.root?.left) {
      const successor = findSuccessor(nodeToRemove)!;
      remove(bst, successor.val);
      successor.left = nodeToRemove.left;
      successor.right = nodeToRemove.right;
      bst.root = successor;

      // If root has just left child
    } else if (bst.root?.left) {
      bst.root = bst.root?.left;

      // If root has just right child
    } else if (bst.root?.right) {
      bst.root = bst.root!.right;

      // If root has no children
    } else {
      bst.root = null;
    }

    return nodeToRemove;
  }

  let toSet;

  // If node to remove has two children
  if (nodeToRemove.right && nodeToRemove.left) {
    const successor = findSuccessor(nodeToRemove)!;
    remove(bst, successor.val);
    successor.left = nodeToRemove.left;
    successor.right = nodeToRemove.right;
    toSet = successor;

    // If node to remove has just left child
  } else if (nodeToRemove.left) {
    toSet = nodeToRemove.left;

    // If node to remove has just right child or no children
  } else {
    toSet = nodeToRemove.right;
  }


  if (nodeToRemove === parentNode?.left) {
    parentNode!.left = toSet;
  } else {
    parentNode!.right = toSet;
  }


  return nodeToRemove;
}
//find node and parent
//if node is leaf, remove from parent
//if node has one child, make child node into child of parent
// if node has two children, call remove on successor and make found node into successor node
// if node is root with no children, set bst.root = null



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
