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
      <MyTextarea
        v-model="inputValue"
        placeholder="Placeholder text"
        label="Some label"
        rows="3"
      />
      <MyTextarea
        v-model="inputValue2"
        placeholder="Placeholder text"
        label="Some label"
        :error="inputValue2"
      />
      <MyTextarea v-model="inputValue3" label="Some label" />

      <br />
      <br />
      <MyInputsList
        class="list-example"
        label="Some label"
        v-model="inputList"
        add-text="+ Add New Subtask"
      />
      {{ inputList }}

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

      <br />
      <br />
      <MyModal :show="modal" @close="modal = !modal">
        <MyModalBox>some text</MyModalBox>
      </MyModal>
      <button @click="modal = !modal">modal</button>

      <br />
      <br />
      <div class="modal-bg">
        <my-modal-box>
          <my-modal-header title="Add New Board" />

          <div class="my-modal-field">
            <my-input
              name="name"
              label="Name"
              placeholder="e.g. Web Design"
              full-width
            />
          </div>

          <div class="my-modal-field">
            <my-inputs-list
              name="columns"
              label="Columns"
              add-text="+ Add New Subtask"
            />
          </div>

          <my-button type="submit" full-width>Create New Board</my-button>
        </my-modal-box>

        <br />

        <my-modal-box>
          <my-modal-header title="Delete this board?" color="destructive" />

          <div class="my-modal-text">
            <p>
              Are you sure you want to delete the ‘Platform Launch’ board? This
              action will remove all columns and tasks and cannot be reversed.
            </p>
          </div>

          <div class="my-modal-controls">
            <my-button color="destructive" type="button" full-width>
              Delete
            </my-button>
            <my-button color="secondary" type="submit" full-width>
              Cancel
            </my-button>
          </div>
        </my-modal-box>

        <br />

        <my-modal-box>
          <my-modal-header
            title="Research pricing points of various competitors and trial different business models"
          />

          <div class="my-modal-text">
            <p>
              We know what we're planning to build for version one. Now we need
              to finalise the first pricing model we'll use. Keep iterating the
              subtasks until we have a coherent proposition.
            </p>
          </div>

          <div class="my-modal-field">
            <MyCheckboxGroup
              name="checkgroup2"
              v-model="checkboxValue"
              label="Subtasks (2 of 3)"
              full-width
            >
              <MyCheckbox
                v-for="option of checkboxOptions"
                :key="option.id"
                :value="option.id"
                >{{ option.label }}</MyCheckbox
              >
            </MyCheckboxGroup>
          </div>

          <div class="my-modal-field">
            <MySelect
              :options="selectOptions"
              v-model="selectValue"
              label="Some label"
              full-width
            />
          </div>
        </my-modal-box>
      </div>

      <br />
      <br />
      <div class="menu-example">
        <MyMenu>
          <template v-slot:activator="{ onClick }">
            <button @click.prevent="onClick">Menu</button>
          </template>

          <MyMenuList>
            <MyMenuItem>Edit Task</MyMenuItem>
            <MyMenuItem color="destructive">Delete Task</MyMenuItem>
          </MyMenuList>
        </MyMenu>

        <MyMenu>
          <template v-slot:activator="{ onClick }">
            <button @click.prevent="onClick">Menu</button>
          </template>

          <MyMenuList>
            <MyMenuItem>Edit Task</MyMenuItem>
            <MyMenuItem color="destructive">Delete Task</MyMenuItem>
          </MyMenuList>
        </MyMenu>
      </div>
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
      <MyInputsList
        class="list-example"
        label="Some label"
        v-model="inputList"
        add-text="+ Add New Subtask"
      />
      {{ inputList }}

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
      <MyCheckboxGroup name="checkgroup3" v-model="checkboxValue">
        <MyCheckbox
          v-for="option of checkboxOptions"
          :key="option.id"
          :value="option.id"
          >{{ option.label }}</MyCheckbox
        >
      </MyCheckboxGroup>
      {{ checkboxValue }}

      <br />
      <br />
      <div class="modal-bg">
        <my-modal-box>
          <my-modal-header title="Add New Board" />

          <div class="my-modal-field">
            <my-input
              name="name"
              label="Name"
              placeholder="e.g. Web Design"
              full-width
            />
          </div>

          <div class="my-modal-field">
            <my-inputs-list
              name="columns"
              label="Columns"
              add-text="+ Add New Subtask"
            />
          </div>

          <my-button type="submit" full-width>Create New Board</my-button>
        </my-modal-box>

        <br />

        <my-modal-box>
          <my-modal-header title="Delete this board?" color="destructive" />

          <div class="my-modal-text">
            <p>
              Are you sure you want to delete the ‘Platform Launch’ board? This
              action will remove all columns and tasks and cannot be reversed.
            </p>
          </div>

          <div class="my-modal-controls">
            <my-button color="destructive" type="button" full-width>
              Delete
            </my-button>
            <my-button color="secondary" type="button" full-width>
              Cancel
            </my-button>
          </div>
        </my-modal-box>

        <br />

        <my-modal-box>
          <my-modal-header
            title="Research pricing points of various competitors and trial different business models"
          >
            <my-menu ref="menu">
              <template v-slot:activator="{ onClick }">
                <my-menu-button @click.prevent="onClick" />
              </template>

              <my-menu-list>
                <my-menu-item>Edit Board</my-menu-item>
                <my-menu-item color="destructive"> Delete Board </my-menu-item>
              </my-menu-list>
            </my-menu>
          </my-modal-header>

          <div class="my-modal-text">
            <p>
              We know what we're planning to build for version one. Now we need
              to finalise the first pricing model we'll use. Keep iterating the
              subtasks until we have a coherent proposition.
            </p>
          </div>

          <div class="my-modal-field">
            <MyCheckboxGroup
              name="checkgroup4"
              v-model="checkboxValue"
              label="Subtasks (2 of 3)"
              full-width
            >
              <MyCheckbox
                v-for="option of checkboxOptions"
                :key="option.id"
                :value="option.id"
                >{{ option.label }}</MyCheckbox
              >
            </MyCheckboxGroup>
          </div>

          <div class="my-modal-field">
            <MySelect
              :options="selectOptions"
              v-model="selectValue"
              label="Some label"
              full-width
            />
          </div>
        </my-modal-box>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MyButton } from "@/components/form/MyButton";
import { MyInput } from "@/components/form/MyInput";
import { MyTextarea } from "@/components/form/MyTextarea";
import { MySelect } from "@/components/form/MySelect";
import { MyCheckboxGroup, MyCheckbox } from "@/components/form/MyCheckboxGroup";
import { MyInputsList } from "@/components/form/MyInputsList";
import { MyModal, MyModalBox, MyModalHeader } from "@/components/MyModal";
import { MyMenu, MyMenuList, MyMenuItem } from "@/components/MyMenu";
import { MyMenuButton } from "@/components/MyMenuButton";

export default defineComponent({
  name: "DemoPage",
  components: {
    MyButton,
    MyInput,
    MyTextarea,
    MySelect,
    MyCheckboxGroup,
    MyCheckbox,
    MyInputsList,
    MyModal,
    MyModalBox,
    MyModalHeader,
    MyMenu,
    MyMenuList,
    MyMenuItem,
    MyMenuButton,
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
      inputList: [
        { id: "aaa", label: "Aaa" },
        { id: "bbb", label: "Bbb" },
      ],
      modal: false,
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
.modal-bg {
  padding: 30px;
}
.list-example {
  width: 100%;
  max-width: 500px;
}
.menu-example {
  display: flex;
  justify-content: space-between;
}

.section[data-theme="white"] {
  color: var(--text-color);
  background: var(--bg-2-color);
}

.section[data-theme="white"] .modal-bg {
  background: var(--color-gray-4);
}

.section[data-theme="black"] {
  color: var(--text-color);
  background: var(--bg-2-color);
}

.section[data-theme="black"] .modal-bg {
  background: var(--color-gray-8);
}
</style>
