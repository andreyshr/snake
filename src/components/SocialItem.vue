<template>
  <a class="social-item" :href="item.link" target="_blank">
    {{ item.title }}
    <base-icon :icon="item.icon" />
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";

export type TSocialItem = {
  title: string;
  link: string;
  icon: string;
};

export default defineComponent({
  name: "SocialItem",
  components: { BaseIcon },
  props: {
    item: {
      type: Object as PropType<TSocialItem>,
      required: true,
    },
  },
});
</script>

<style scoped>
.social-item {
  display: flex;
  align-items: center;
  color: var(--color-secondary);
  font-size: 20px;
}
</style>
