import { TestScheduler } from "jest";
import Momo from "../src/js/Momo";

describe("Testing Momo global options", () => {
  test("default options are set", () => {
    const defaultOptions = { duration: 1000, delay: 0, curve: "linear" };
    expect(Momo.getGlobalOptions()).toEqual(defaultOptions);
  });

  test("sets user options", () => {
    const userOptions = {
      duration: 2000,
      delay: 200,
      curve: "cubic-bezier(0.83, 0, 0.17, 1)",
    };
    Momo.setGlobalOptions(userOptions);
    expect(Momo.getGlobalOptions()).toEqual(userOptions);
  });

  test("removes staggerBy options if added by user", () => {
    const userSettings = {
      duration: 2000,
      delay: 200,
      curve: "cubic-bezier(0.83, 0, 0.17, 1)",
      staggerBy: 200,
    };
    Momo.setGlobalOptions(userSettings);
    expect(Momo.getGlobalOptions()).toEqual(
      expect.not.objectContaining({ staggerBy: 200 })
    );
  });

  test("throws error if changed without setter method", () => {
    expect(() => {
      Momo._options = { duration: 3000, delay: 1, curve: "linear" };
    }).toThrow();
  });
});
