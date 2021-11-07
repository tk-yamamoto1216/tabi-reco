<template>
  <div class="post-page">
    <div class="header">
      <h1 class="title">編集ページ</h1>
      <button class="btn -blue" @click="edit(travel.id)">編集完了</button>
    </div>
    <input v-model="travel.date" type="date" />
    <input
      v-model="travel.title"
      placeholder="Title"
      class="title"
      type="text"
      name="title"
    />
    <textarea
      v-model="travel.place"
      placeholder="Place"
      class="content"
      type="text"
      name="place"
    />
    <textarea
      v-model="travel.content"
      placeholder="Content"
      class="content"
      type="text"
      name="content"
    />
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
          alert('詳細を取得しました');
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
    const edit = (id: number) => {
      $axios
        .put(`/travels/${id}`, {
          travel,
        })
        .then((res) => {
          alert('変更されました');
          console.log(res.data);
        });
    };

    onBeforeMount(() => {
      return fetchDetail(Number(router.currentRoute.params?.id));
    });

    return {
      travel,
      edit,
    };
  },
});
</script>
