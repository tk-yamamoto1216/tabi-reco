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
        <!--
          FIXME:
          画像に関して、一旦表示はできているが、
          コンソールエラーと警告が出てる
          恐らくデプロイした時に
          こけると思うので修正必須…
          参考: https://www.notion.so/The-client-side-rendered-virtual-DOM-tree-is-not-matching-server-rendered-content-aa7f814a12794aa4a482c6402e57e745
         -->
        <img
          v-for="(image, index) of travel.images"
          :key="image"
          :class="`image${index + 1}`"
          :src="image"
        />
      </div>
      <div class="information">
        <div class="left">
          <!-- TODO：後でコンポーネント分割する -->
          <!-- icon には一時的に絵文字を入れてる -->
          <div class="app-information-item">
            <p class="title"><span class="icon">⭕️</span>治安</p>
            <p class="comment">{{ travel.security }}</p>
          </div>
          <div class="app-information-item">
            <p class="title"><span class="icon">⭕️</span>物価</p>
            <p class="comment">{{ travel.prices }}</p>
          </div>
          <div class="app-information-item">
            <p class="title"><span class="icon">⭕️</span>形態</p>
            <p class="comment">{{ travel.type }}</p>
          </div>
        </div>
        <!-- TODO: v-calender 入れる -->
        <img
          class="calender"
          src="https://illustimage.com/photo/1441.png?20211031"
          alt=""
        />
        {{ travel.date }}
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
// import { Travel } from '@/types/travel';

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const router = useRouter();
    const travel = ref({});
    const images = ref();

    // FIXME: 叩く時も型定義したい
    useAsync(async () => {
      await $axios
        .get(`/travels/${Number(router.currentRoute.params?.id)}`)
        .then((res) => {
          // FIXME: エラーハンドリングちゃんとしたい
          if (res.data) {
            images.value = res.data.images;
            travel.value = res.data;
          } else if (process.browser) window.location.href = '/';
        });
    });

    return {
      travel,
      images,
    };
  },
});
</script>
