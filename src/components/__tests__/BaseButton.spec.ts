import { shallowMount } from "@vue/test-utils";
import BaseButton from "@/components/BaseButton.vue";

describe("BaseButton", () => {
  it("should properly render default button", () => {
    const wrapper = shallowMount(BaseButton);

    const button = wrapper.get("button");

    expect(button.text()).toBe("");
  });

  it("should properly render default button with slot", () => {
    const wrapper = shallowMount(BaseButton, {
      slots: {
        default: "my button",
      },
    });

    const button = wrapper.get("button");

    expect(button.text()).toBe("my button");
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

    const button = wrapper.find("a[href='https://test.test']");

    expect(button.exists()).toBe(true);
  });
});
