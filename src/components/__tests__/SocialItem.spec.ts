import { shallowMount } from "@vue/test-utils";
import SocialItem from "@/components/SocialItem.vue";

const item = {
  title: "social",
  link: "https://test.test",
  icon: "icon_svg",
};

describe("SocialItem", () => {
  it("should render a link with properly attribute href", () => {
    const wrapper = shallowMount(SocialItem, {
      props: {
        item,
      },
    });

    const link = wrapper.find("a[href='https://test.test']");

    expect(link.exists()).toBe(true);
  });

  it("should render a title", () => {
    const wrapper = shallowMount(SocialItem, {
      props: {
        item,
      },
    });

    const link = wrapper.find("a[href='https://test.test']");

    expect(link.text()).toBe("social");
  });
});
