<template>
  <Tweet :id="id" class="tweet" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Tweet } from 'vue-tweet-embed'

@Component({
  components: {
    Tweet,
  },
})
export default class TweetCard extends Vue {
  @Prop({ type: String, required: true })
  id!: string
}
</script>

<style scoped>
.tweet {
  margin: 2rem 0px;
}
</style>
