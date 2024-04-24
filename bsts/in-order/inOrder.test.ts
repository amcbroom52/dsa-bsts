import { beforeEach, describe, expect, it } from "vitest";
import { BSTNum } from "../common/bst";
import { inOrder, inOrderAccum } from "./inOrder";
import { lgBst, smBst } from "../common/bst.test";

let sm: BSTNum, lg: BSTNum;

beforeEach(function () {
  sm = smBst();
  lg = lgBst();
});

describe("inOrder", function () {
  it("returns values found in-order", function () {
    expect(inOrder(sm.root)).toEqual([10, 20]);
    expect(inOrder(lg.root)).toEqual([10, 15, 25, 40, 50, 75, 100]);
    expect(inOrder(null)).toEqual([]);
  });
});

describe("inOrderAccum", function () {
  it("returns values found in-order", function () {
    expect(inOrderAccum(sm.root)).toEqual([10, 20]);
    expect(inOrderAccum(lg.root)).toEqual([10, 15, 25, 40, 50, 75, 100]);
    expect(inOrderAccum(null)).toEqual([]);
  });
});
