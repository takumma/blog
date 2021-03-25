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
      <v-container  justify="center" align="center" class="container">
        <div>
          <div v-if="error.statusCode === 404" >
            <p class="error-code">{{ error.statusCode }}</p>
            <p class="error-message">{{ error.message }}</p>
          </div>
          <div v-else>
            <p class="error-message">An error occurred</p>
          </div>
          <v-btn
            outlined
            color="white"
            to="/"
            nuxt
          >
            home
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>

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

.container {
  text-align: center;
  color: #fff;
}

.error-code {
  font-size: 4rem;
}
</style>
