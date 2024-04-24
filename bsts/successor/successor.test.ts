import { beforeEach, describe, expect, it } from "vitest";
import { BNodeNum, BSTNum } from "../common/bst";
import { findSuccessor} from "./successor";
import { find} from "../find/find";
import { smBst, lgBst } from "../common/bst.test";

let sm: BSTNum, lg: BSTNum;

beforeEach(function () {
  sm = smBst();
  lg = lgBst();
});

describe("findSuccessor", function () {
  it("finds successor (small)", function () {
    const node = find(sm.root, 10)!;
    expect(findSuccessor(node)!.val).toEqual(20);

    lg.insert(60);
    lg.insert(55);
    const node2 = find(lg.root, 50)!;
    expect(findSuccessor(node2)!.val).toEqual(55);
  });

  it("returns null if no successor", function () {
    const node = find(sm.root, 20)!;
    expect(findSuccessor(node)).toEqual(null);
  });
});
