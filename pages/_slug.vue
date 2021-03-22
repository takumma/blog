<template>
  <v-row justify="center" align="center" class="background">
    <v-col cols="12" sm="11" md="7">
      <h1>{{ article.title }}</h1>
      <article>
        <nuxt-content :document="article"/>
      </article>
    </v-col>
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
}
</script>

<style lang="scss">

:root {
  --font-size-h1: 1.6rem;
  --font-size-h2: 1.6rem;
  --font-size-h3: 1.4rem;
  --font-size-h4: 1.2rem;
}

@media screen and (min-width:768px) {
  :root {
  --font-size-h1: 1.8rem;
  --font-size-h2: 1.55rem;
  --font-size-h3: 1.4rem;
  --font-size-h4: 1.25rem;
  --font-size-h5: 1.1rem;
  }
}

.background {
  background-color: darkseagreen;
}

.container {
  padding: 0px;
}

article {
  background-color: white;
  padding: 2.0rem;
}

h1 {
  font-weight: bold;
  font-size: var(--font-size-h1);
}

.nuxt-content {

  font-size: 1.05rem;

  h1 {
    font-size: var(--font-size-h1);
    border-bottom: solid 1.5px;
    border-bottom-color: lightgray;
    padding-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: var(--font-size-h2);
    border-bottom: solid 1.5px;
    border-bottom-color: lightgray;
    padding-top: 1.0rem;
    margin-bottom: 1.0rem;
  }

  h3 {
    font-size: var(--font-size-h3);
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: var(--font-size-h4);
    padding-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  h5 {
    font-size: var(--font-size-h5);
  }

  p {
    font-size: 1.0rem;
  }

  code {
    font-size: 0.95rem;
    font-weight: 500;
  }

  ol {
    counter-reset: counter-name;

    li {
      margin: 0; 
      list-style: none;
    }

    li:before {
      counter-increment: counter-name;
      content: counter(counter-name) ".";
      position: absolute;
      left: 0;
      font-weight: bold;
    }
  }

  hr {
    border-top: 1.5px solid lightgray;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

.nuxt-content-highlight {
  position: relative;
}

.nuxt-content-highlight .filename {
  position: absolute;
  right: 0;
  color: darkgray;
  font-weight: 300;
  z-index: 2;
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  font-size: 1.0rem;
}

</style>