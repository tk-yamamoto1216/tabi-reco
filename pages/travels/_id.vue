<template>
  <div class="travel-detail">
    <NuxtChild />
    <template v-if="!$route.path.match(/edit/)">
      <p class="title">{{ travel.title }}</p>
      <div class="header">
        <p class="rate">星 4.4</p>
        <p class="comment">コメント112件</p>
        <p class="place">{{ travel.place }}</p>
        <p class="date">{{ travel.date }}</p>
        <p class="rate">⭐️ {{ travel.good }}</p>
        <nuxt-link :to="'/travels/' + travel.id + '/edit'" class="btn -white"
          >編集</nuxt-link
        >
      </div>
      <div class="images">
        <img
          class="image1"
          src="@/assets/images/test/500004814.jpeg"
          alt="画像1"
        />
        <img
          class="image2"
          src="@/assets/images/test/65244278-city-11592-162cfe6a30b.jpeg"
          alt="画像2"
        />
        <img
          class="image3"
          src="@/assets/images/test/canada_img09.jpeg"
          alt="画像3"
        />
        <img
          class="image4"
          src="@/assets/images/test//Photos Library.jpeg"
          alt="画像4"
        />
        <img
          class="image5"
          src="@/assets/images/test/ダウンロード.jpeg"
          alt="画像5"
        />
      </div>
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
