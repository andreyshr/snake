import { mount } from "@vue/test-utils";
import Scores from "@/components/Scores.vue";

describe("Scores", () => {
  it("should properly render scores when initialized", () => {
    const wrapper = mount(Scores);

    expect(wrapper.get(".scores__quantity").text()).toBe("0");
  });

  it("should properly render scores when scores were updated", async () => {
    const wrapper = mount(Scores);

    await wrapper.setProps({ scores: 10 });

    expect(wrapper.get(".scores__quantity").text()).toBe("10");
  });
});
