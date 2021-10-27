import { mount, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance } from "vue";
import router from "@/router";
import Settings from "@/components/Settings.vue";

describe("Settings", () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeEach(async () => {
    await router.push("/");
    wrapper = mount(Settings, {
      props: {
        isPlaying: false,
        isPaused: false,
        levels: 0,
      },
      global: {
        plugins: [router],
      },
    });
  });

  it("shouldn't render resume button when game is not paused", () => {
    expect(wrapper.find(".resume").exists()).toBe(false);
  });

  it("should render resume button when game is paused", async () => {
    await wrapper.setProps({ isPaused: true });

    expect(wrapper.find(".resume").exists()).toBe(true);
  });

  it("should properly render start button title", async () => {
    expect(wrapper.find(".start").text()).toBe("start");

    await wrapper.setProps({ isPaused: true });

    expect(wrapper.find(".start").text()).toBe("restart");
  });

  it("should properly render levels", async () => {
    expect(wrapper.findAll("select option")).toHaveLength(1);

    await wrapper.setProps({ levels: 3 });

    expect(wrapper.findAll("select option")).toHaveLength(4);
  });

  it("should emit an event when resume button clicked", async () => {
    await wrapper.setProps({ isPaused: true });
    await wrapper.find(".resume").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("resumed");
  });

  it("should emit an event when start button clicked", async () => {
    await wrapper.find(".start").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("started");
  });
});
