<template>
  <div class="travel-detail">
    <h1 class="title">詳細ページです</h1>
    <div class="content">
      <p class="title">{{ travel.title }}</p>
      <p class="place">{{ travel.place }}</p>
      <p class="date">{{ travel.date }}</p>
      <p class="rate">⭐️ {{ travel.good }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useContext, useRouter } from '@nuxtjs/composition-api';
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const router = useRouter();
    const travel = ref({});
    const fetchDetail = (id: number) => {
      $axios
        .get(`/travels/${id}`)
        .then((res) => {
          travel.value = res.data;
          if (res.data === undefined) {
            router.push(`/`);
          }
        })
        .catch((e) => {
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
