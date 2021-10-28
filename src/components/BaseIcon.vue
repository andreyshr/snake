<template>
  <component :is="Icon" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from "vue";

export default defineComponent({
  name: "BaseIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const Icon = computed(() =>
      defineAsyncComponent(() => import(`@/assets/icons/${props.icon}.svg`))
    );

    return {
      Icon,
    };
  },
});
</script>
