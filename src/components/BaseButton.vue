<script lang="ts">
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "BaseButton",
  props: {
    tag: {
      type: String,
      default: "button",
    },
    href: String,
  },
  setup(props, context) {
    return () =>
      h(
        props.tag,
        { class: "button", href: props.href },
        typeof context.slots.default === "function"
          ? context.slots.default()
          : undefined
      );
  },
});
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-secondary);
  border: 2px solid var(--color-secondary);
  text-decoration: none;
  border-radius: 8px;
  background: transparent;
  width: 100%;
  padding: 6px;
  font-size: 24px;
  cursor: pointer;
}

.button[disabled] {
  opacity: 0.3;
  cursor: default;
}
</style>
