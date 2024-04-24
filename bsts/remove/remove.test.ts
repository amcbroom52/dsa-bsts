import { beforeEach, describe, expect, it } from "vitest";
import { BSTNum } from "../common/bst";
import { remove } from "./remove";
import { lgBst, smBst } from "../common/bst.test";

let sm: BSTNum, lg: BSTNum;

beforeEach(function () {
  sm = smBst();
  lg = lgBst();
});

describe("remove", function () {
  it("removes root with no children", function () {
    const bst = new BSTNum(null, [10]);
    remove(bst, 10);
    expect(bst.root).toBe(null);
  });

  it("removes a node with no children", function () {
    remove(sm, 20);
    expect(sm.validate()).toEqual([10]);
    expect(sm.serialize()).toEqual("10 - -");
  });

  it("removes a (root) node with 1 child (small)", function () {
    remove(sm, 10);
    expect(sm.validate()).toEqual([20]);
    expect(sm.serialize()).toEqual("20 - -");
  });

  it("removes node with 1 child (large)", function () {
    remove(lg, 75);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 50, 100]);
    expect(lg.serialize()).toEqual("50 25 100 10 40 - - - 15 - - - -");

    remove(lg, 10);
    expect(lg.validate()).toEqual([15, 25, 40, 50, 100]);
    expect(lg.serialize()).toEqual("50 25 100 15 40 - - - - - -");
  });

  it("removes (root) node with 2 children (small)", function () {
    sm.insert(5);

    // After insert:
    //
    //            root
    //              |
    //              v
    //              10
    //            /    \
    //           5      20
    //

    remove(sm, 10);
    expect(sm.validate()).toEqual([5, 20]);
    expect(sm.serialize()).toEqual("20 5 - - -");
  });

  it("removes node with 2 children (large)", function () {
    remove(lg, 25);
    expect(lg.serialize()).toEqual("50 40 75 10 - - 100 - 15 - - - -");
    expect(lg.validate()).toEqual([10, 15, 40, 50, 75, 100]);
  });

  it("removes (root) node with 2 children (complex)", function () {
    // find inorder successor, complex)
    lg.insert(60);
    lg.insert(59);

    // After             50
    // inserts       /        \
    //            25            75
    //          /    \         /    \
    //       10       40      60     100
    //         \             /
    //          15          59
    //

    remove(lg, 50);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 59, 60, 75, 100]);
    expect(lg.serialize()).toEqual(
        "59 25 75 10 40 60 100 - 15 - - - - - - - -");
  });

  it("throws error on not found", function () {
    expect(() => remove(sm, -1)).toThrow(Error);
    expect(() => remove(new BSTNum(), -1)).toThrow(Error);
  })
});