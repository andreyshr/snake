import { mount } from "@vue/test-utils";
import TouchControl from "@/components/TouchControl.vue";

describe("TouchControl", () => {
  it("should properly render button up", () => {
    const wrapper = mount(TouchControl);

    const buttonUp = wrapper.find("button#ArrowUp");

    expect(buttonUp.exists()).toBe(true);
  });

  it("should properly render button down", () => {
    const wrapper = mount(TouchControl);

    const buttonDown = wrapper.find("button#ArrowDown");

    expect(buttonDown.exists()).toBe(true);
  });

  it("should properly render button left", () => {
    const wrapper = mount(TouchControl);

    const buttonLeft = wrapper.find("button#ArrowLeft");

    expect(buttonLeft.exists()).toBe(true);
  });

  it("should properly render button right", () => {
    const wrapper = mount(TouchControl);

    const buttonRight = wrapper.find("button#ArrowRight");

    expect(buttonRight.exists()).toBe(true);
  });
});
