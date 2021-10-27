import { mount } from "@vue/test-utils";
import StatusBar from "@/components/StatusBar.vue";

describe("StatusBar", () => {
  it("should properly render scores when initialized", () => {
    const wrapper = mount(StatusBar);

    expect(wrapper.get(".status-bar__scores span:last-of-type").text()).toBe(
      "0"
    );
  });

  it("should properly render scores when scores were updated", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ scores: 10 });

    expect(wrapper.get(".status-bar__scores span:last-of-type").text()).toBe(
      "10"
    );
  });

  it("should properly render pause button when initialized", () => {
    const wrapper = mount(StatusBar);

    expect(
      wrapper.find("button.status-bar__pause_button").attributes("disabled")
    ).toBe("");
  });

  it("should properly render pause button when the game is running", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ isPlaying: true });

    expect(
      wrapper.find("button.status-bar__pause_button").attributes("disabled")
    ).toBe(undefined);
  });

  it("should properly render pause button when the game is paused", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ isPaused: true });

    expect(
      wrapper.find("button.status-bar__pause_button").attributes("disabled")
    ).toBe("");
  });

  it("should emit an event when pause button clicked", async () => {
    const wrapper = mount(StatusBar, {
      props: {
        isPlaying: true,
      },
    });

    await wrapper.find("button.status-bar__pause_button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("paused");
  });
});
