<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <article>
        <h1>{{ article.title }}</h1>
        <nuxt-content :document="article"/>
      </article>
      {{ article.toc }}
      {{ navToc(article.toc) }}
    </v-col>
    <dev v-if="$vuetify.breakpoint.mdAndUp">
      <v-list>
        <v-list-item v-for="item in article.toc" :key="item.id">
          {{ item.text }}
        </v-list-item>
      </v-list>
    </dev>
  </v-row>
</template>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Vue, Component } from "nuxt-property-decorator";

interface Toc {
  depth: number;
  id: String;
  text: String;
}

@Component
export default class ArticlePage extends Vue {

  async asyncData({ $content, params }: Context): Promise<object> {
    const article = await $content('articles', params.slug).fetch();
    return { article };
  }

  navToc(toc: Array<Toc>) {
    return toc.filter(item => item.depth == 1);
  }
}
</script>

<style lang="scss">

h1 {
  font-weight: bold;
  font-size: 2.4rem;
}

.nuxt-content {
  h1 {
    font-weight: bold;
    font-size: 2.4rem;
  }

  h2 {
    font-weight: bold;
    font-size: 2.0rem;
  }

  h3 {
    font-weight: bold;
    font-size: 1.6rem;
  }

  p {
    margin-bottom: 20px;
  }

  code {
    font-weight: 700; /* WiP: need to pick font */
  }
}

.nuxt-content-highlight {
  position: relative;
}

.nuxt-content-highlight .filename {
  position: absolute;
  right: 0;
  color: #718096;
  font-weight: 300;
  z-index: 10;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

</style>