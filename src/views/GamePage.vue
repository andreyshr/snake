<template>
  <div class="game-page">
    <status-bar
      :scores="scores"
      :is-playing="isPlaying"
      :is-paused="isPaused"
      @paused="pause"
    />

    <div class="game-page__wrapper">
      <canvas ref="canvas" width="600" height="600"></canvas>

      <settings
        v-if="!isPlaying || isPaused"
        :levels="levelsQty"
        :is-playing="isPlaying"
        :is-paused="isPaused"
        @started="start"
        @resumed="resume"
      />
    </div>

    <touch-control />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onUnmounted } from "vue";
import TouchControl from "@/components/TouchControl.vue";
import StatusBar from "@/components/StatusBar.vue";
import Settings from "@/components/Settings.vue";
import { Game } from "@/game";
import { LocalStorageKey } from "@/consts/local-storage-key";

export default defineComponent({
  name: "GamePage",
  components: { Settings, StatusBar, TouchControl },
  setup() {
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    let game: Game | null = null;
    let scores = ref(0);
    let levelsQty = ref(0);
    let isPlaying = ref(false);
    let isPaused = ref(false);

    const start = (speed: number, level: number) => {
      if (game)
        game.restart({
          speed,
          level,
        });
    };

    const pause = () => {
      if (game) {
        game.pause();
        isPaused.value = true;
      }
    };

    const resume = () => {
      if (game) {
        game.resume();
        isPaused.value = false;
      }
    };

    const getUserLevel = () => {
      try {
        return JSON.parse(
          localStorage.getItem(LocalStorageKey.UserLevel) || "[]"
        );
      } catch {
        return [];
      }
    };

    onMounted(() => {
      game = new Game(canvas.value as HTMLCanvasElement, {
        userLevel: getUserLevel(),
      });

      levelsQty.value = game.levelsQty;

      game.onChangeScores = (_scores) => {
        scores.value = _scores;
      };

      game.onRestart = () => {
        isPaused.value = false;
        isPlaying.value = true;
      };

      game.onStop = () => {
        isPlaying.value = false;
      };
    });

    onUnmounted(() => {
      if (game) game.stop();
    });

    return {
      canvas,
      game,
      scores,
      levelsQty,
      isPlaying,
      isPaused,
      start,
      pause,
      resume,
    };
  },
});
</script>

<style lang="scss" scoped>
.game-page {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  margin: auto;
  justify-content: center;

  @media (min-width: 768px) {
    width: 600px;
  }
}

.game-page__wrapper {
  position: relative;
  border: 4px dashed var(--color-secondary);
}

canvas {
  width: 100%;
  height: 100%;
  background: var(--color-main);
}
</style>
