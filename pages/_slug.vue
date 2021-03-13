<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <article>
        <nuxt-content :document="article"/>
      </article>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Context } from "@nuxt/types"
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  async asyncData({ $content, params }: Context): Promise<object> {
    const article = await $content('articles', params.slug).fetch();
    return { article };
  }
})
export default class ArticlePage extends Vue {
  
}
</script>
