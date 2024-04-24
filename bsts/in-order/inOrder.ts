import { BNodeNum } from "../common/bst";

/** inOrder(): Traverse from the invoking node using in-order DFS.
 * Returns an array of visited nodes. */

function inOrder(node: BNodeNum | null): number[] {
  if (node === null) return [];
  const nodeArr = [];

  nodeArr.push(...inOrder(node.left));
  nodeArr.push(node.val);
  nodeArr.push(...inOrder(node.right));

  return nodeArr;
}



/** inOrderAccum(): Traverse the BST using in-order DFS.
 * Returns an array of visited nodes.
 * Uses an "accumulator"
 */

function inOrderAccum(
  node: BNodeNum | null = null,
  accum: number[] = []): number[] {
  if (node === null) return [];

  accum.push(...inOrder(node.left));
  accum.push(node.val);
  accum.push(...inOrder(node.right));

  return accum;
}


export { inOrder, inOrderAccum };
