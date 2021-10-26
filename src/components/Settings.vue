<template>
  <div class="settings">
    <div class="settings__wrapper">
      <base-button
        v-if="isPaused && isPlaying"
        @click="$emit('resumed')"
        class="settings__button"
        >resume</base-button
      >
      <base-button
        @click="$emit('started', speed, level)"
        class="settings__button"
        >start</base-button
      >
      <router-link to="/editor" custom v-slot="{ navigate, href }">
        <base-button
          @click="navigate"
          @keypress.enter="navigate"
          tag="a"
          class="settings__button"
          :href="href"
          >editor</base-button
        >
      </router-link>
      <label>
        game speed
        <input v-model="speed" type="range" min="8" max="28" step="2" />
      </label>
      <label>
        select level
        <select v-model="level" class="settings__level-select">
          <option value="-1">free play</option>
          <option v-for="(level, i) in levels" :key="i" :value="i">
            {{ level }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  name: "Settings",
  components: { BaseButton },
  props: {
    isPlaying: Boolean,
    isPaused: Boolean,
    levels: {
      type: Number,
      required: true,
    },
  },
  emits: ["started", "resumed"],
  setup() {
    let speed = ref(20);
    let level = ref(-1);

    return {
      speed,
      level,
    };
  },
});
</script>

<style lang="scss" scoped>
.settings {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(1, 7, 41, 0.9);
}

.settings label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 20px;
}

.settings input {
  margin-bottom: 0;
  margin-left: 8px;
}

.settings__button {
  margin-bottom: 12px;
}

.settings__level-select {
  height: 30px;
  margin-left: 12px;
  font-size: 16px;
}
</style>
