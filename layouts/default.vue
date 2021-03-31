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
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
        <v-row justify="center" align="center" class="py-12">
          <v-col cols="11" sm="10" md="8" lg="7" class="white--text">
            <v-row  justify="center" align="center">
              <v-col cols="12" md="5" class="logo" justify="center" align="center">
                <v-avatar size="64">
                  <img src="~/static/icon.png"/>
                </v-avatar>
              </v-col>
              <v-divider :vertical="$vuetify.breakpoint.mdAndUp"/>
              <v-col cols="12" md="5" :align="$vuetify.breakpoint.mdAndUp ? 'start' : 'center'">
                <p>takumma</p>
                <p>NIT SC</p>
                <a href="https://github.com/takumma">GitHub</a>
                <a href="https://twitter.com/tak_kum_ma">Twitter</a>
                <a href="https://www.takumma.net/">Portfolio</a>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
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

.v-divider {
    border-color: white;
}

a {
  color: white;
  border-bottom: solid 1px;
}
</style>