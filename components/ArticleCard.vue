<template>
  <v-card class="article-card">
    <v-card-title>
      <nuxt-link :to="article.slug" class="title">
        {{ article.title }}
      </nuxt-link>
    </v-card-title>
    <v-card-text>{{ article.description }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { IContentDocument } from "@nuxt/content/types/content";

@Component
export default class ArticleCard extends Vue {
  @Prop({ required: true })
  article: IContentDocument | undefined;
}
</script>

<style>
.v-application a {
  color: #263238;
  text-decoration: none;
}
</style>
