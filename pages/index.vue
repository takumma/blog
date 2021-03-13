<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row>
        <v-col
          v-for="article in articles"
          :key="article.slug"
          cols="12" sm="6" md="4"
        >
          <v-card>
            <v-card-title>{{ article.title }}</v-card-title>
            <v-card-text>{{ article.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      {{ articles }}
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class IndexPage extends Vue {
  async asyncData({ $content }: Context): Promise<object> {
    const articles = await $content('articles')
      .only(['title', 'description', 'slug', 'tags'])
      .sortBy('createdAt', 'asc')
      .fetch();
    return { articles };
  }
}
</script>
