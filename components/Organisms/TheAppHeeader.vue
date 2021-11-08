<template>
  <header class="the-app-header">
    <NuxtLink to="/" class="logo">✈️ TABI RECO ✈️</NuxtLink>
    <NuxtLink to="/" class="item">Top</NuxtLink>
    <NuxtLink to="/travels/post" class="item">Post</NuxtLink>
    <p class="item">ようこそ {{ user.name }} さん</p>
  </header>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const store = useStore();
    const user = store.getters['user/getUser'];
    return {
      user,
    };
  },
});
</script>
