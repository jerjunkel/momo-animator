import { TestScheduler } from "jest";
import Momo from "../src/js/Momo";

describe("Momo global options", () => {
  test("setting default options", () => {
    const defaultOptions = { duration: 1000, delay: 0, curve: "linear" };
    Momo.init();
    expect(Momo.options).toEqual(expect.objectContaining(defaultOptions));
  });

  test("setting user options", () => {
    const userSettings = {
      duration: 2000,
      delay: 200,
      curve: "cubic-bezier(0.83, 0, 0.17, 1)",
    };
    Momo.init(userSettings);
    expect(Momo.options).toEqual(expect.objectContaining(userSettings));
  });

  test("removes staggerBy options if add by user", () => {
    const userSettings = {
      duration: 2000,
      delay: 200,
      curve: "cubic-bezier(0.83, 0, 0.17, 1)",
      staggerBy: 200,
    };
    Momo.init(userSettings);
    expect(Momo.options).toEqual(
      expect.not.objectContaining({ staggerBy: 200 })
    );
  });
});
