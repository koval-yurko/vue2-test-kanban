<template>
  <div class="my-input-list">
    <div class="my-input-list_label-wrapper">
      <label :for="forId" v-if="label" class="my-input_label">{{
        label
      }}</label>
    </div>

    <div class="my-input-list_list">
      <div class="my-input-list_item" v-for="num of count" :key="num">
        <my-input
          :data-index="num - 1"
          :value="values[num - 1]"
          @input="onChange"
          ref="input"
          full-width
          class="my-input-list_input"
        />
        <button
          class="my-input-list_item-close"
          type="button"
          @click="onRemove(num - 1)"
        >
          <my-close-icon />
        </button>
      </div>
    </div>

    <my-button
      class="my-input-list_item-add"
      type="button"
      @click="onAdd"
      color="secondary"
      full-width
      >{{ addText }}</my-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MyInput } from "@/components/form/MyInput";
import { MyButton } from "@/components/form/MyButton";
import MyCloseIcon from "@/components/icons/MyCloseIcon.vue";
import type { PropType } from "vue";

type MyInputsListProps = {
  id?: boolean;
  label?: string;
  error?: string[];
  addText?: string;

  count: number;
  values: string[];

  onAdd(): void;
  onRemove(index: number): void;
  onChange(events: Event): void;
  emitChanges(): void;
  forId: string;
};

export default defineComponent<MyInputsListProps, MyInputsListProps>({
  name: "MyInputsList",
  components: { MyInput, MyButton, MyCloseIcon },
  props: {
    id: {
      type: String as PropType<string>,
      required: false,
    },
    label: {
      type: String as PropType<string>,
      required: false,
    },
    error: {
      type: String as PropType<string>,
      required: false,
    },
    addText: {
      type: String as PropType<string>,
      required: false,
      default: "Add",
    },
  },
  data() {
    const data = (this.$attrs.value || []) as unknown as string[];
    const count = data.length;
    const values = count ? data.map((value) => value) : [""];

    return {
      count: count || 1,
      values,
    };
  },
  methods: {
    onAdd() {
      this.count += 1;
      this.values.push("");
      this.emitChanges();
    },
    onRemove(index: number) {
      this.values.splice(index, 1);
      this.count -= 1;
      this.emitChanges();
    },
    onChange(event: Event) {
      const el = event.target as HTMLInputElement;
      if (el) {
        const value = el.value;
        const index = parseInt(el.dataset.index as string, 10);
        this.values[index] = value;
        this.emitChanges();
      }
    },
    emitChanges() {
      const res = this.values.map((el) => el);
      this.$emit("input", res);
    },
  },
  computed: {
    forId() {
      return this.id || this.label;
    },
  },
  watch: {
    "$attrs.value"() {
      const data = (this.$attrs.value || []) as unknown as string[];
      const count = data.length;
      const values = count ? data.map((value) => value) : [""];

      this.count = count || 1;
      this.values = values;
    },
  },
});
</script>

<style>
.my-input-list {
  padding-bottom: 3px;
}

.my-input-list_list {
  margin-bottom: 12px;
}
.my-input-list_item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.my-input-list_item-close {
  margin: 3px -4px 0 13px;
  padding: 3px 3px 0 3px;
  background: none;
  border: none;
  color: var(--btn-close-color);

  transition: color 0.3s ease;
  cursor: pointer;
}
.my-input-list_item-close:hover {
  color: var(--btn-close-color-hover);
}
</style>
