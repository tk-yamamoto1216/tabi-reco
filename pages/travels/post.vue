<template>
  <div class="post-page">
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
</template>

<script lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const { $axios } = useContext();
    const title = ref('');
    const content = ref('');
    const place = ref('');
    const date = ref('');
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
          success.value = res.data;
        })
        .catch((e) => {
          console.error(e);
          alert('エラーだお');
        });
    };
    return {
      title,
      content,
      place,
      date,
      post,
      success,
    };
  },
});
</script>
