<template>
  <v-row justify="center" align="center" class="background">
    <v-col
      cols="12" xs="11" sm="8" md="7" lg="6"
      v-for="article in articles"
      :key="article.slug"
    >
      <article-card :article="article"></article-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Vue, Component } from "nuxt-property-decorator";
import ArticleCard from "@/components/ArticleCard.vue";
import { IContentDocument } from "@nuxt/content/types/content";

@Component({
  components: {
    ArticleCard,
  }
})
export default class IndexPage extends Vue {
  async asyncData({ $content }: Context): Promise<{ articles: IContentDocument | IContentDocument[] }> {
    const articles = await $content('articles')
      .only(['title', 'description', 'slug', 'tags'])
      .sortBy('createdAt', 'asc')
      .fetch();
    return { articles };
  }
}
</script>

<style scoped>
.background {
  width: 100%;
}

main {
  margin-top: 0px;
}

.col-center {
  padding: 0px;
}
</style>