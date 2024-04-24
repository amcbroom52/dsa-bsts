import { BNodeNum, BSTNum } from "./bst";
import { beforeEach, describe, expect, it } from "vitest";


/** Small tree for tests:
 *
 *          10
 *            \
 *             20
 */

function smBst(): BSTNum {
  return new BSTNum(
      new BNodeNum(10,
          null,
          new BNodeNum(20)));
}

/** Large tree for tests:
 *
 *               50
 *           /       \
 *        25           75
 *      /    \            \
 *   10       40           100
 *     \
 *      15
 */

function lgBst(): BSTNum {
  return new BSTNum(
      new BNodeNum(50,
          new BNodeNum(25,
              new BNodeNum(10,
                  null,
                  new BNodeNum(15)),
              new BNodeNum(40)),
          new BNodeNum(75,
              null,
              new BNodeNum(100))));
}


describe("serialize", function () {
  it("should serialize", function () {
    expect(smBst().serialize()).toEqual("10 - 20 - -");
    expect(lgBst().serialize()).toEqual(
        "50 25 75 10 40 - 100 - 15 - - - - - -");
  });
});

describe("validate", function () {
  it("works for valid trees", function () {
    expect(smBst().validate()).toEqual([10, 20]);
    expect(lgBst().validate()).toEqual([10, 15, 25, 40, 50, 75, 100]);
  });

  it("throws error for invalid trees", function () {
    const bst = new BSTNum(
        new BNodeNum(10, new BNodeNum(20), new BNodeNum(20)));
    expect(() => bst.validate()).toThrowError("Invalid BST");
  })
});

describe("insert", function () {
  let sm: BSTNum, lg: BSTNum;

  beforeEach(function () {
    sm = smBst();
    lg = lgBst();
  });

  it("adds at root to empty", function () {
    const bst = new BSTNum();
    bst.insert(15);
    expect(bst.validate()).toEqual([15]);
    expect(bst.serialize()).toEqual("15 - -");
  });

  it("inserts larger than curr largest at far right", function () {
    sm.insert(21);
    expect(sm.validate()).toEqual([10, 20, 21]);
    expect(sm.serialize()).toEqual("10 - 20 - 21 - -");

    lg.insert(101);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 50, 75, 100, 101]);
    expect(lg.serialize()).toEqual("50 25 75 10 40 - 100 - 15 - - - 101 - - - -");

    lg.insert(9);
    expect(lg.validate()).toEqual([9, 10, 15, 25, 40, 50, 75, 100, 101]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 9 15 - - - 101 - - - - - -");
  });

  it("inserts penultimate largest as L of far R", function () {
    sm.insert(19);
    expect(sm.validate()).toEqual([10, 19, 20]);
    expect(sm.serialize()).toEqual("10 - 20 19 - - -");

    lg.insert(99);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 50, 75, 99, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 - 15 - - 99 - - - - -");
  });

  it("inserts penultimate smallest to right place", function () {
    sm.insert(11);
    expect(sm.validate()).toEqual([10, 11, 20]);
    expect(sm.serialize()).toEqual("10 - 20 11 - - -");

    lg.insert(11);
    expect(lg.validate()).toEqual([10, 11, 15, 25, 40, 50, 75, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 - 15 - - - - 11 - - -");
  });

  it("inserts BNodeNum one bigger than root", function () {
    lg.insert(51);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 50, 51, 75, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 51 100 - 15 - - - - - - - -");
  });

  it("inserts BNodeNum one smaller than root (small)", function () {
    sm.insert(9);
    expect(sm.validate()).toEqual([9, 10, 20]);
    expect(sm.serialize()).toEqual("10 9 20 - - - -");

    lg.insert(49);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 49, 50, 75, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 - 15 - 49 - - - - - -");
  });
});


export { smBst, lgBst };