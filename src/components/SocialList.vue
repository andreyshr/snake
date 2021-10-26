<template>
  <div class="social-list">
    <social-item v-for="(item, i) in items" :key="i" :item="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SocialItem, { TSocialItem } from "@/components/SocialItem.vue";

export default defineComponent({
  name: "SocialList",
  components: { SocialItem },
  setup() {
    const items: TSocialItem[] = [
      {
        title: "github",
        link: "https://github.com/andreyshr/snake",
        icon: "github",
      },
    ];

    return {
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.social-list {
  display: flex;
  align-items: center;
  position: fixed;
  right: 10px;
  top: 10px;

  @media (min-width: 768px) {
    right: 20px;
    bottom: 20px;
    top: auto;
  }
}
</style>
