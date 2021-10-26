<template>
  <div class="touch-control">
    <base-button id="ArrowLeft">&larr;</base-button>
    <div>
      <base-button id="ArrowUp">&uarr;</base-button>
      <base-button id="ArrowDown">&darr;</base-button>
    </div>
    <base-button id="ArrowRight">&rarr;</base-button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  name: "TouchControl",
  components: { BaseButton },
});
</script>

<style scoped>
.touch-control {
  display: none;
}

@media (hover: none) and (pointer: coarse) {
  .touch-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
  }

  .touch-control button {
    width: 80px;
    height: 80px;
    font-size: 32px;
    color: var(--color-secondary);
    border: none;
  }
}
</style>
