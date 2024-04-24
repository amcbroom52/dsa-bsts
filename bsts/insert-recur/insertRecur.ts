import { BNodeNum, BSTNum } from "../common/bst";

/** insertRecursively(val): Insert a new node into the BST with value val.
 * Uses recursion. */

function insertRecur(bst: BSTNum, val: number): void {
  const newNode = new BNodeNum(val);

  function insert(node: BNodeNum) {
    if (node.val > newNode.val) {
      if(node.left === null) {
        node.left = newNode;
      } else {
        insert(node.left);
      }
    } else {
      if(node.right === null) {
        node.right = newNode;
      } else {
        insert(node.right);
      }
    }
  }

  if (bst.root === null) {
    bst.root = newNode;
  } else {
    insert(bst.root!);
  }
}

export { insertRecur };

