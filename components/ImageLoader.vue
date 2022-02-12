<template>
  <img
    :src="require(`~/assets/images/${this.file}`)"
    :alt="this.alt"
    :style="`width: ${this.width}%`"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ImageLoader extends Vue {
  @Prop({ required: true })
  public file!: string

  @Prop({ default: 100 })
  public width!: number

  @Prop()
  public alt!: string
}
</script>
