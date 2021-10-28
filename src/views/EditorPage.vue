<template>
  <div class="editor-page">
    <div class="editor-page__wrapper">
      <canvas ref="canvas" width="600" height="600"></canvas>
    </div>

    <div class="editor-page__control">
      <base-button
        @click.prevent="saveLevelAndRedirect"
        @keypress.enter.prevent="saveLevelAndRedirect"
        tag="a"
        href="/game"
        >save and play</base-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { Editor } from "@/game";
import { useUserLevel } from "@/hooks/use-user-level";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EditorPage",
  components: { BaseButton },
  setup() {
    let editor: Editor | null = null;
    const canvas: Ref<HTMLCanvasElement | null> = ref(null);
    const router = useRouter();
    const { userLevel, setUserLevel } = useUserLevel();

    const saveLevelAndRedirect = (): void => {
      if (editor) {
        setUserLevel(editor.getLevel());
      }
      router.push("/game");
    };

    onMounted(() => {
      editor = new Editor(canvas.value as HTMLCanvasElement, {
        userLevel: userLevel.value,
      });
    });

    return {
      canvas,
      saveLevelAndRedirect,
    };
  },
});
</script>

<style lang="scss" scoped>
.editor-page {
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

.editor-page__wrapper {
  position: relative;
  border: 4px dashed var(--color-secondary);
}

.editor-page__control {
  display: flex;
  margin-top: 24px;
}

canvas {
  width: 100%;
  height: 100%;
  background: var(--color-main);
}
</style>
