import { mount } from "@vue/test-utils";
import StatusBar from "@/components/StatusBar.vue";

describe("StatusBar", () => {
  it("should properly render pause button when initialized", () => {
    const wrapper = mount(StatusBar);

    expect(
      wrapper.find("button.status-bar__pause_button").attributes()
    ).toHaveProperty("disabled");
  });

  it("should properly render pause button when the game is running", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ isPlaying: true });

    expect(
      wrapper.find("button.status-bar__pause_button").attributes()
    ).not.toHaveProperty("disabled");
  });

  it("should properly render pause button when the game is paused", async () => {
    const wrapper = mount(StatusBar);

    await wrapper.setProps({ isPaused: true });

    expect(
      wrapper.find("button.status-bar__pause_button").attributes()
    ).toHaveProperty("disabled");
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
