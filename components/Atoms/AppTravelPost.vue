<template>
  <div class="app-travel-post">
    <img :src="travel.images.first" class="thumbnail" />
    <div class="texts">
      <p class="title">{{ travel.title }}</p>
      <p class="place">{{ travel.place }}</p>
      <p class="date">{{ travel.date }}</p>
      <p class="rate">⭐️ {{ travel.good }}</p>
      <button class="btn -red" @click="deletePost(travel.id)">削除</button>
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
  emits: ['deleteItem'],
  setup(_, { emit }) {
    const deletePost = (e: number): void => {
      emit('deleteItem', e);
    };
    return {
      deletePost,
    };
  },
});
</script>
