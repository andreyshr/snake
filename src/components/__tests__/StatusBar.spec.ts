import { mount } from "@vue/test-utils";
import StatusBar from "@/components/StatusBar.vue";

describe("StatusBar", () => {
  it("should properly render scores when initialized", () => {
    const wrapper = mount(StatusBar);

    const scores = wrapper.get(".status-bar__scores span:last-of-type");

    expect(scores.text()).toBe("0");
  });

  it("should properly render scores when scores were updated", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ scores: 10 });
    const scores = wrapper.get(".status-bar__scores span:last-of-type");

    expect(scores.text()).toBe("10");
  });

  it("should properly render pause button when initialized", () => {
    const wrapper = mount(StatusBar);

    const button = wrapper.find("button.status-bar__pause_button");

    expect(button.attributes("disabled")).toBe("");
  });

  it("should properly render pause button when the game is running", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ isPlaying: true });
    const button = wrapper.find("button.status-bar__pause_button");

    expect(button.attributes("disabled")).toBe(undefined);
  });

  it("should properly render pause button when the game is paused", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ isPaused: true });
    const button = wrapper.find("button.status-bar__pause_button");

    expect(button.attributes("disabled")).toBe("");
  });

  it("should emit an event when pause button clicked", async () => {
    const wrapper = mount(StatusBar, {
      props: {
        isPlaying: true,
      },
    });
    const button = wrapper.find("button.status-bar__pause_button");

    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("paused");
  });
});
