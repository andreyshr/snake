<template>
  <div class="home">
    <div class="home__main">
      <h1 class="home__title">snake</h1>
      <router-link to="/game" custom v-slot="{ navigate, href }"
        ><base-button
          @click="navigate"
          @keypress.enter="navigate"
          tag="a"
          :href="href"
          class="home__button"
          >play</base-button
        ></router-link
      >
    </div>
    <canvas ref="canvas" width="600" height="600" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onUnmounted } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { Game } from "@/game";

export default defineComponent({
  name: "Home",
  components: { BaseButton },
  setup() {
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    let game: Game | null = null;

    onMounted(() => {
      game = new Game(canvas.value as HTMLCanvasElement, {
        speed: 20,
        level: -1,
      });
      game.autoplay();
    });

    onUnmounted(() => {
      if (game) game.stop();
    });

    return {
      canvas,
      game,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.home__main {
  position: relative;
  z-index: 1;
  margin: auto;
}

.home__title {
  font-size: 100px;
  margin: 0 0 24px 0;

  @media (min-width: 768px) {
    font-size: 220px;
  }
}

.home__button {
  margin: auto;
  padding: 12px 42px;
  font-size: 40px;
  border: 4px solid var(--color-secondary);

  @media (min-width: 768px) {
    font-size: 60px;
  }
}

canvas {
  width: 300px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  bottom: 0;
  opacity: 0.5;
  border: none;

  @media (min-width: 768px) {
    width: 600px;
    height: 600px;
  }
}
</style>
