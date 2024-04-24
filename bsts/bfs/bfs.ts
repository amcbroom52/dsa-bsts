import { BNodeNum } from "../common/bst";
import { Queue } from "../common/queue";


/** bfs(): Traverse the BST using BFS.
 * Returns an array of visited nodes. */

function bfs(node: BNodeNum | null): number[] {
  if (node === null) return [];
  const toVisitQueue = new Queue<BNodeNum>([node]);
  const visited = [];

  while (!toVisitQueue.isEmpty()) {
    const currNode = toVisitQueue.dequeue();

    visited.push(currNode.val);
    if (currNode.left) toVisitQueue.enqueue(currNode.left);
    if (currNode.right) toVisitQueue.enqueue(currNode.right);
  }

  return visited;
}

export { bfs };