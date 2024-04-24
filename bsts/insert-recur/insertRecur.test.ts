import { beforeEach, describe, expect, it } from "vitest";
import { BSTNum } from "../common/bst";
import { insertRecur } from "./insertRecur";
import { smBst, lgBst} from "../common/bst.test";

let sm: BSTNum, lg: BSTNum;

beforeEach(function () {
  sm = smBst()
  lg = lgBst()
});

describe("insertRecursively", function () {
  it("adds at root to empty", function () {
    const bst = new BSTNum();
    insertRecur(bst, 15);
    expect(bst.validate()).toEqual([15]);
    expect(bst.serialize()).toEqual("15 - -");
  });

  it("inserts larger than curr largest at far right", function () {
    insertRecur(sm, 21);
    expect(sm.validate()).toEqual([10, 20, 21]);
    expect(sm.serialize()).toEqual("10 - 20 - 21 - -");

    insertRecur(lg, 101);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 50, 75, 100, 101]);
    expect(lg.serialize()).toEqual("50 25 75 10 40 - 100 - 15 - - - 101 - - - -");

    insertRecur(lg, 9);
    expect(lg.validate()).toEqual([9, 10, 15, 25, 40, 50, 75, 100, 101]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 9 15 - - - 101 - - - - - -");
  });

  it("inserts penultimate largest as L of far R", function () {
    insertRecur(sm, 19);
    expect(sm.validate()).toEqual([10, 19, 20]);
    expect(sm.serialize()).toEqual("10 - 20 19 - - -");

    insertRecur(lg, 99);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 50, 75, 99, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 - 15 - - 99 - - - - -");
  });

  it("inserts penultimate smallest to right place", function () {
    insertRecur(sm, 11);
    expect(sm.validate()).toEqual([10, 11, 20]);
    expect(sm.serialize()).toEqual("10 - 20 11 - - -");

    insertRecur(lg, 11);
    expect(lg.validate()).toEqual([10, 11, 15, 25, 40, 50, 75, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 - 15 - - - - 11 - - -");
  });

  it("inserts BNodeNum one bigger than root", function () {
    insertRecur(lg, 51);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 50, 51, 75, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 51 100 - 15 - - - - - - - -");
  });

  it("inserts BNodeNum one smaller than root (small)", function () {
    insertRecur(sm, 9);
    expect(sm.validate()).toEqual([9, 10, 20]);
    expect(sm.serialize()).toEqual("10 9 20 - - - -");

    insertRecur(lg, 49);
    expect(lg.validate()).toEqual([10, 15, 25, 40, 49, 50, 75, 100]);
    expect(lg.serialize()).toEqual(
        "50 25 75 10 40 - 100 - 15 - 49 - - - - - -");
  });
});
