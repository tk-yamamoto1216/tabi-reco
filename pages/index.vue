<template>
  <div class="index-page">
    <div class="list">
      {{ test }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const test = ref('旅がしたいか、、');
    return {
      test,
    };
  },
});
</script>
