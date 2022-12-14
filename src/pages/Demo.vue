<template>
  <div class="demo">
    <span class="text">
      Theme: {{ theme }} <button @click="toggleTheme()">toggle</button>
    </span>

    <div class="section" data-theme="white">
      <MyButton size="large">Button Primary (L)</MyButton>
      <MyButton>Button Primary (S)</MyButton>
      <MyButton color="secondary">Button Secondary</MyButton>
      <MyButton color="destructive">Button Destructive</MyButton>

      <br />
      <br />
      <MyInput
        v-model="inputValue"
        placeholder="Placeholder text"
        label="Some label"
      />
      <MyInput
        v-model="inputValue2"
        placeholder="Placeholder text"
        label="Some label"
        :error="inputValue2"
      />
      <MyInput v-model="inputValue3" label="Some label" />

      <br />
      <br />
      <MySelect
        :options="selectOptions"
        v-model="selectValue"
        label="Some label"
      />
      {{ selectValue }}

      <br />
      <br />
      <MyCheckboxGroup name="checkgroup" v-model="checkboxValue">
        <MyCheckbox
          v-for="option of checkboxOptions"
          :key="option.id"
          :value="option.id"
          >{{ option.label }}</MyCheckbox
        >
      </MyCheckboxGroup>
      {{ checkboxValue }}
    </div>

    <div class="section" data-theme="black">
      <MyButton size="large">Button Primary (L)</MyButton>
      <MyButton>Button Primary (S)</MyButton>
      <MyButton color="secondary">Button Secondary</MyButton>
      <MyButton color="destructive">Button Destructive</MyButton>

      <br />
      <br />
      <MyInput
        v-model="inputValue"
        placeholder="Placeholder text"
        label="Some label"
      />
      <MyInput
        v-model="inputValue2"
        placeholder="Placeholder text"
        label="Some label"
        :error="inputValue2"
      />
      <MyInput v-model="inputValue3" label="Some label" />

      <br />
      <br />
      <MySelect
        :options="selectOptions"
        v-model="selectValue"
        label="Some label"
      />
      {{ selectValue }}

      <br />
      <br />
      <MyCheckboxGroup name="checkgroup" v-model="checkboxValue">
        <MyCheckbox
          v-for="option of checkboxOptions"
          :key="option.id"
          :value="option.id"
          >{{ option.label }}</MyCheckbox
        >
      </MyCheckboxGroup>
      {{ checkboxValue }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MyButton } from "@/components/form/MyButton";
import { MyInput } from "@/components/form/MyInput";
import { MySelect } from "@/components/form/MySelect";
import { MyCheckboxGroup, MyCheckbox } from "@/components/form/MyCheckboxGroup";

export default defineComponent({
  name: "DemoPage",
  components: {
    MyButton,
    MyInput,
    MySelect,
    MyCheckboxGroup,
    MyCheckbox,
  },
  data() {
    return {
      inputValue: "",
      inputValue2: "Error empty",
      inputValue3: "Input text",
      selectValue: "option 2",
      selectOptions: [
        { id: "option 1", label: "Option 1" },
        { id: "option 2", label: "Option 2 Option 2 Option 2" },
        { id: "option 3", label: "Option 3" },
      ],
      checkboxValue: ["option 1", "option 3"],
      checkboxOptions: [
        { id: "option 1", label: "Idle" },
        { id: "option 2", label: "Option 2 Option 2 Option 2" },
        { id: "option 3", label: "Option 3" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      theme: "theme/activeTheme",
    }),
  },
  methods: {
    ...mapActions({
      toggleTheme: "theme/toggleTheme",
    }),
  },
});
</script>

<style scoped>
.demo {
  width: 100%;
}
.section {
  padding: 10px;
}
.section[data-theme="white"] {
  color: var(--text-color);
  background: var(--bg-color);
}

.section[data-theme="black"] {
  color: var(--text-color);
  background: var(--bg-color);
}
</style>
