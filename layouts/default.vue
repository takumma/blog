<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      hide-on-scroll
      color="white"
      class="toolbar"
    >
      <v-toolbar-title>
        <nuxt-link to="/" class="toolbar-title">
          takumma's blog
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class IndexPage extends Vue {

}
</script>

<style scoped>
.v-toolbar__content {
  padding: 0;
}

header {
  color: #263238;
  width: 100%;
}

.toolbar-title {
  color: #263238;
  text-decoration: none;
  font-weight: bold;
  font-family: Menlo,Consolas, "Courier New", monospace;
}

.v-main {
  background-color: #263238;
}
</style>