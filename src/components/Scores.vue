<template>
  <div class="scores">
    <span class="scores__title">scores: </span>
    <span class="scores__quantity">{{ scores }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Scores",
  props: {
    scores: {
      type: Number,
      default: 0,
    },
  },
});
</script>
