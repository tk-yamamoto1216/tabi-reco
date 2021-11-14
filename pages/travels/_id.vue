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
      <div class="information">
        <div class="left">
          <!-- TODO：後でコンポーネント分割する -->
          <!-- icon には一時的に絵文字を入れてる -->
          <div class="app-information-item">
            <p class="title"><span class="icon">⭕️</span>治安</p>
            <p class="comment">非常にいい</p>
          </div>
          <div class="app-information-item">
            <p class="title"><span class="icon">⭕️</span>物価</p>
            <p class="comment">高い</p>
          </div>
          <div class="app-information-item">
            <p class="title"><span class="icon">⭕️</span>形態</p>
            <p class="comment">バックパッカー</p>
          </div>
        </div>
        <img
          class="calender"
          src="https://illustimage.com/photo/1441.png?20211031"
          alt=""
        />
      </div>
      <p class="title">コメント</p>
      <div v-for="n in 6" :key="n" class="comment">
        <p class="user">takashi</p>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          dolore consectetur amet ex, assumenda placeat modi sunt rerum vero
          aliquid distinctio, saepe, asperiores accusantium. Dolor quaerat
          repellendus quam. Amet, rerum.
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, useAsync, useContext, useRouter } from '@nuxtjs/composition-api';
import { defineComponent } from '@vue/composition-api';
// import axios, { AxiosError } from 'axios';
// import { Travel } from '@/types/travel';

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const router = useRouter();
    const travel = ref({});
    useAsync(async () => {
      const result = await $axios.get(
        `/travels/${Number(router.currentRoute.params?.id)}`,
      );
      travel.value = result.data;
    });
    return {
      travel,
    };
  },
});
</script>
