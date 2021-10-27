<template>
  <label class="base-input">
    {{ label }}
    <input
      :value="modelValue"
      type="text"
      v-bind="$attrs"
      @input="updateInput"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(_, context) {
    const updateInput = (evt: Event) => {
      context.emit("update:modelValue", (evt.target as HTMLInputElement).value);
    };

    return {
      updateInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-input {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.base-input input {
  margin-bottom: 0;
  margin-left: 8px;
}
</style>
