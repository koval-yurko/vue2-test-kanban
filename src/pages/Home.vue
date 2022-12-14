<template>
  <div class="my-layout">
    <my-header />

    <div class="my-layout_content">
      <my-sidebar />

      <div class="my-content">
        <div>
          <button @click="toggleSidebar">toggle</button>
        </div>
        <div class="columns">
          <div class="column">
            <div class="row">Column 1 Row 1</div>
            <div class="row">Column 1 Row 2</div>
            <div class="row">Column 1 Row 3</div>
          </div>

          <div class="column">
            <div class="row">Column 2 Row 1</div>
            <div class="row">Column 2 Row 2</div>
            <div class="row">Column 2 Row 3</div>
            <div class="row">Column 2 Row 1</div>
          </div>

          <div class="column">
            <div class="row">Column 3 Row 1</div>
            <div class="row">Column 3 Row 2</div>
            <div class="row">Column 3 Row 3</div>
          </div>

          <div class="column">
            <div class="row">Column 3 Row 1</div>
            <div class="row">Column 3 Row 2</div>
            <div class="row">Column 3 Row 3</div>
          </div>

          <div class="column">
            <div class="row">Column 3 Row 1</div>
            <div class="row">Column 3 Row 2</div>
            <div class="row">Column 3 Row 3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { MyHeader } from "@/layout/MyHeader";
import { MySidebar } from "@/layout/MySidebar";

export default defineComponent({
  name: "HomePage",
  components: { MyHeader, MySidebar },
  computed: {
    ...mapGetters({
      sidebarVisible: "sidebar/isVisible",
    }),
  },
  methods: {
    ...mapActions({
      toggleSidebar: "sidebar/toggleSidebar",
    }),
  },
});
</script>

<style>
.my-layout {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
}
.my-layout_content {
  flex-grow: 1;
  flex-direction: row;
  display: flex;
}

.my-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}

.columns {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.column {
  width: 300px;
  flex-shrink: 0;
  border: solid 1px green;
}
.row {
  height: 200px;
  border: solid 1px blue;
}
</style>
