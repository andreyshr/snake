import { mount } from "@vue/test-utils";
import SocialList from "@/components/SocialList.vue";

describe("SocialList", () => {
  it("should properly render items", () => {
    const wrapper = mount(SocialList);

    expect(wrapper.findAll("a")).toHaveLength(1);
  });
});
