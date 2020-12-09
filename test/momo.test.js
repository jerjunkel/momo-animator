import { TestScheduler } from "jest";
import Momo from "../src/js/Momo";

describe("Momo global options", () => {
  test("setting default options", () => {
    Momo.init();
    expect(Momo.options.duration).toBe(1000);
    expect(Momo.options.curve).toBe("linear");
    expect(Momo.options.delay).toBe(0);
  });
  test("setting user options", () => {
    Momo.init({
      duration: 2000,
      delay: 200,
      curve: "cubic-bezier(0.83, 0, 0.17, 1)",
    });
    expect(Momo.options.duration).toBe(2000);
    expect(Momo.options.curve).toBe("cubic-bezier(0.83, 0, 0.17, 1)");
    expect(Momo.options.delay).toBe(200);
  });
});
