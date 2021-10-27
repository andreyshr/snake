import { mount } from "@vue/test-utils";
import BaseSelect from "@/components/BaseSelect.vue";

describe("BaseSelect", () => {
  it("should properly render options", async () => {
    const wrapper = mount(BaseSelect);

    expect(wrapper.findAll("option")).toHaveLength(0);

    await wrapper.setProps({
      options: [
        { value: 1, title: "option_1" },
        { value: 2, title: "option_2" },
      ],
    });

    expect(wrapper.findAll("option")).toHaveLength(2);
  });

  it("should emit an event when option is changed", async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: [
          { value: 1, title: "option_1" },
          { value: 2, title: "option_2" },
        ],
      },
    });

    // @ts-ignore
    await wrapper.findAll("option")[1].setSelected();

    const update = wrapper.emitted("update:modelValue");

    expect(update).toHaveLength(1);
    expect((update as [][])[0]).toEqual(["2"]);
  });
});
