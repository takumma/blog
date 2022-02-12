<template>
  <v-chip small outlined color="#263238" text-color="#263238" class="px-2">
    {{ tag }}
  </v-chip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TagTip extends Vue {
  @Prop({ type: String, required: true })
  tag: string | undefined
}
</script>
