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
      <textarea
        v-model="place"
        placeholder="Place"
        class="content"
        type="text"
        name="place"
      />
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
    <GoogleMap class="map" @getClickLatLng="saveLatLng" />
  </div>
</template>

<script lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import { defineComponent, ref } from '@vue/composition-api';
import GoogleMap from '@/components/Organisms/GoogleMap.vue';

export default defineComponent({
  components: {
    GoogleMap,
  },
  setup() {
    const { $axios } = useContext();
    const title = ref('');
    const content = ref('');
    const place = ref('');
    const date = ref('');
    const lat = ref(0);
    const lng = ref(0);
    const success = ref();

    const post = () => {
      console.log(post);
      $axios
        .post('/travels', {
          title,
          place,
          date,
        })
        .then((res) => {
          success.value = res;
        })
        .catch((e) => {
          console.error(e);
          alert('エラーだお');
        });
    };

    const saveLatLng = (x: number, y: number) => {
      console.log(x);
      lat.value = x;
      lng.value = y;
    };

    return {
      title,
      content,
      place,
      date,
      post,
      success,
      saveLatLng,
      lat,
      lng,
    };
  },
});
</script>
