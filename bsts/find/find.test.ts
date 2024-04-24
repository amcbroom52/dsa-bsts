import { beforeEach, describe, expect, it } from "vitest";
import { BSTNum } from "../common/bst";
import { find, findRecursively } from "./find";
import { smBst, lgBst } from "../common/bst.test";

let sm: BSTNum, lg: BSTNum;

beforeEach(function () {
  sm = smBst();
  lg = lgBst();
});


describe("find", function () {
  it("finds leaf", function () {
    expect(find(sm.root, 20)!.val).toEqual(20);
    expect(find(lg.root, 10)!.val).toEqual(10);
  });

  it("finds root", function () {
    expect(find(sm.root, 10)!.val).toEqual(10);
  });

  it("returns null if not found", function () {
    expect(find(lg.root, 120)).toBe(null);
  });
});

describe("find recursively", function () {
  it("finds leaf", function () {
    expect(findRecursively(sm.root, 20)!.val).toEqual(20);
    expect(findRecursively(lg.root, 10)!.val).toEqual(10);
  });

  it("finds root", function () {
    expect(findRecursively(sm.root, 10)!.val).toEqual(10);
  });

  it("returns null if not found", function () {
    expect(findRecursively(lg.root, 120)).toBe(null);
  });
});
