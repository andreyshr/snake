import { mount } from "@vue/test-utils";
import TouchControl from "@/components/TouchControl.vue";

describe("TouchControl", () => {
  it("should properly render button up", () => {
    const wrapper = mount(TouchControl);

    expect(wrapper.find("button#ArrowUp").exists()).toBe(true);
  });

  it("should properly render button down", () => {
    const wrapper = mount(TouchControl);

    expect(wrapper.find("button#ArrowDown").exists()).toBe(true);
  });

  it("should properly render button left", () => {
    const wrapper = mount(TouchControl);

    expect(wrapper.find("button#ArrowLeft").exists()).toBe(true);
  });

  it("should properly render button right", () => {
    const wrapper = mount(TouchControl);

    expect(wrapper.find("button#ArrowRight").exists()).toBe(true);
  });
});
