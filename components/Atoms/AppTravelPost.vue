<template>
  <div class="app-travel-post">
    <img :src="travel.image" class="thumbnail" />
    <div class="texts">
      <p class="title">{{ travel.title }}</p>
      <p class="place">{{ travel.place }}</p>
      <p class="date">{{ travel.date }}</p>
      <p class="rate">⭐️ {{ travel.good }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    travel: {
      type: Object,
      required: true,
    },
  },
});
</script>
