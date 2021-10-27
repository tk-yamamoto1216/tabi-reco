<template>
  <div class="index-page">
    <h1 class="title">TABI RECO</h1>
    <div class="list">
      {{ test }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const test = ref('ref')
    return {
      test,
    }
  },
})
</script>
