<template>
  <div class="travel-detail">
    <NuxtChild />
    <template v-if="!$route.path.match(/edit/)">
      <h1 class="title">詳細ページです</h1>
      <div class="content">
        <p class="title">{{ travel.title }}</p>
        <p class="place">{{ travel.place }}</p>
        <p class="date">{{ travel.date }}</p>
        <p class="rate">⭐️ {{ travel.good }}</p>
      </div>
      <nuxt-link :to="'/travels/' + travel.id + '/edit'" class="btn -white"
        >編集</nuxt-link
      >
    </template>
  </div>
</template>

<script lang="ts">
import { useContext, useRouter } from '@nuxtjs/composition-api';
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api';
import { AxiosError } from 'axios';
import { Travel } from '@/types/travel';

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const router = useRouter();
    const travel = ref({});
    const fetchDetail = (id: number): void => {
      $axios
        .get<Travel[]>(`/travels/${id}`)
        .then((res) => {
          travel.value = res.data;
          alert('詳細を取得しました');
          if (res.data === undefined) {
            router.push(`/`);
          }
        })
        .catch((e: AxiosError) => {
          console.error(e);
          alert('存在しないページです');
        });
    };

    onBeforeMount(() => {
      return fetchDetail(Number(router.currentRoute.params?.id));
    });

    return {
      travel,
    };
  },
});
</script>
