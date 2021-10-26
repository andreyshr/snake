<template>
  <router-view />
  <social-list />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SocialList from "@/components/SocialList.vue";

export default defineComponent({
  name: "App",
  components: { SocialList },
});
</script>

<style lang="scss">
:root {
  --color-main: #010729;
  --color-secondary: #ffff01;
}

@font-face {
  font-family: "Pixel";
  src: url(assets/fonts/Pixel.woff2);
  font-display: swap;
}

body {
  margin: 0;
  padding: 0;
}

* {
  font-family: Pixel, Arial, sans-serif;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-secondary);
  background: var(--color-main);
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}

.social-link {
  display: flex;
  align-items: center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  color: var(--color-secondary);
  font-size: 20px;
}
</style>
