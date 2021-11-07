<template>
  <div class="post-page">
    <div class="post">
      <div class="header">
        <h1 class="title">投稿ページ</h1>
        <button class="btn -blue" @click="post">投稿</button>
      </div>
      <input v-model="date" type="date" />
      <input
        v-model="title"
        placeholder="Title"
        class="title"
        type="text"
        name="title"
      />
      <input
        v-model="place"
        placeholder="Place"
        class="place"
        type="text"
        name="place"
      />
      <p class="content">経度{{ lat }} 緯度{{ lng }}</p>
      <textarea
        v-model="content"
        placeholder="Content"
        class="content"
        type="text"
        name="content"
      />
      <div v-if="success">
        <p>成功しました</p>
        {{ success }}
      </div>
    </div>
    <GoogleMap
      class="map"
      @getSearchedPlace="saveSearchedPlace"
      @getClickLatLng="saveLatLng"
    />
  </div>
</template>

<script lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import { defineComponent, ref } from '@vue/composition-api';
import { AxiosError } from 'axios';
import GoogleMap from '@/components/Organisms/GoogleMap.vue';
import { Travel } from '@/types/travel';

export default defineComponent({
  components: {
    GoogleMap,
  },
  setup() {
    const { $axios } = useContext();
    // FIXME: オブジェクトでええやん
    const title = ref('');
    const content = ref('');
    const place = ref('');
    const date = ref('');
    const lat = ref(0);
    const lng = ref(0);
    const success = ref();

    const post = () => {
      $axios
        .post<Travel>('/travels', {
          title,
          place,
          date,
        })
        .then((res) => {
          success.value = res;
        })
        .catch((e: AxiosError) => {
          console.error(e);
          alert('エラーだお');
        });
    };

    // NOTE: クリックした場所の座標を取得する処理
    // TODO: 場所名も抜き取りたい
    // メソッド名変えたい
    const saveLatLng = (x: number, y: number): void => {
      lat.value = x;
      lng.value = y;
    };

    const saveSearchedPlace = (selectedPlace: string, coodinate: any): void => {
      place.value = selectedPlace;
      lat.value = coodinate.lat();
      lng.value = coodinate.lng();
    };
    return {
      title,
      content,
      place,
      date,
      post,
      success,
      saveLatLng,
      saveSearchedPlace,
      lat,
      lng,
    };
  },
});
</script>
