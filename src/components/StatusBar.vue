<template>
  <div class="status-bar">
    <div class="status-bar__scores">
      <span>scores: </span>
      <span>{{ scores }}</span>
    </div>
    <base-button
      @click="$emit('paused')"
      :disabled="!isPlaying || isPaused"
      class="status-bar__pause_button"
    >
      <base-icon icon="pause"></base-icon>
    </base-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseButton from "@/components/BaseButton";
import BaseIcon from "@/components/BaseIcon";

export default defineComponent({
  name: "StatusBar",
  components: { BaseIcon, BaseButton },
  props: {
    isPlaying: {
      type: Boolean,
      default: false,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },
    scores: {
      type: Number,
      default: 0,
    },
  },
  emits: ["paused"],
});
</script>

<style scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  font-size: 24px;
  align-self: flex-start;
}

.status-bar__pause_button {
  width: auto;
  padding: 0;
}
</style>
