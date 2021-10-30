<template>
  <div class="index-page">
    <div class="list">
      <AppTravelPost v-for="n of 8" :key="n" />
    </div>
    <div class="map">Map is coming soon...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import AppTravelPost from '@/components/Atoms/AppTravelPost.vue';

export default defineComponent({
  components: {
    AppTravelPost,
  },
  setup() {
    const test = ref('旅がしたいか、、');
    return {
      test,
    };
  },
});
</script>
