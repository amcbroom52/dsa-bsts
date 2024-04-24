import { beforeEach, describe, expect, it } from "vitest";
import { BSTNum } from "../common/bst";
import { bfs } from "./bfs";
import { lgBst, smBst } from "../common/bst.test";

let sm: BSTNum, lg: BSTNum;

beforeEach(function () {
  sm = smBst();
  lg = lgBst();
});

describe("bfs", function () {
  it("returns values from BFS", function () {
    expect(bfs(sm.root)).toEqual([10, 20]);
    expect(bfs(lg.root)).toEqual([50, 25, 75, 10, 40, 100, 15]);
    expect(bfs(null)).toEqual([]);
  });
});
