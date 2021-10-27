<template>
  <div class="settings">
    <ul class="settings__list">
      <li v-if="isPaused" class="settings__item">
        <base-button @click="$emit('resumed')" class="resume"
          >resume</base-button
        >
      </li>
      <li class="settings__item">
        <base-button @click="$emit('started', speed, level)" class="start">{{
          startButtonTitle
        }}</base-button>
      </li>
      <li class="settings__item">
        <router-link to="/editor" custom v-slot="{ navigate, href }">
          <base-button
            @click="navigate"
            @keypress.enter="navigate"
            tag="a"
            :href="href"
            >editor</base-button
          >
        </router-link>
      </li>
      <li class="settings__item">
        <base-input
          v-model="speed"
          label="game speed"
          type="range"
          min="8"
          max="28"
          step="2"
        />
      </li>
      <li class="settings__item">
        <base-select v-model="level" label="select level" :options="levels" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";

export type TLevel = {
  value: number;
  title: string | number;
};

export default defineComponent({
  name: "Settings",
  components: { BaseSelect, BaseInput, BaseButton },
  props: {
    isPlaying: {
      type: Boolean,
      default: false,
    },
    isPaused: {
      type: Boolean,
      default: false,
    },
    levels: {
      type: Array as PropType<TLevel[]>,
      required: true,
    },
  },
  emits: ["started", "resumed"],
  setup(props) {
    let speed = ref(20);
    let level = ref(-1);

    const startButtonTitle = computed(() =>
      props.isPaused ? "restart" : "start"
    );

    return {
      speed,
      level,
      startButtonTitle,
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

.settings__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.settings__item {
  margin-bottom: 12px;
}
</style>
