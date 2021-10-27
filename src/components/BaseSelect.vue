<template>
  <label class="base-select">
    {{ label }}
    <select :value="modelValue" v-bind="$attrs" @input="updateSelect">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.title }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseSelect",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(_, context) {
    const updateSelect = (evt: Event) => {
      context.emit(
        "update:modelValue",
        (evt.target as HTMLSelectElement).value
      );
    };

    return {
      updateSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-select {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.base-select select {
  height: 30px;
  margin-left: 12px;
  font-size: 16px;
}
</style>
