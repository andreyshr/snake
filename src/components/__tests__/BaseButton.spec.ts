import { shallowMount } from "@vue/test-utils";
import BaseButton from "@/components/BaseButton.vue";

describe("BaseButton", () => {
  it("should properly render default button", () => {
    const wrapper = shallowMount(BaseButton);

    expect(wrapper.get("button").text()).toBe("");
  });

  it("should properly render default button with slot", () => {
    const wrapper = shallowMount(BaseButton, {
      slots: {
        default: "my button",
      },
    });

    expect(wrapper.get("button").text()).toBe("my button");
  });

  it("should properly render button with custom tag", () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        tag: "a",
        href: "https://test.test",
      },
      slots: {
        default: "my button",
      },
    });

    expect(wrapper.find("a[href='https://test.test']").exists()).toBe(true);
  });
});
