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
  font-size: 2.2rem;
}

.nuxt-content {

  h1 {
    font-weight: bold;
    font-size: 2.2rem;
    border-bottom: solid 1.5px;
    border-bottom-color: #718096;
  }

  h2 {
    font-weight: bold;
    font-size: 2.0rem;
    border-bottom: solid 1.5px;
    border-bottom-color: #718096;
  }

  h3 {
    font-weight: bold;
    font-size: 1.8rem;
  }

  h4 {
    font-size: 1.6rem;
  }

  h5 {
    font-size: 1.4rem;
  }

  p {
    font-size: 1.1rem;
  }

  em {
    font-size: 1.1rem;
  }

  code {
    font-weight: 500;
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