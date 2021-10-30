<template>
  <div class="index-page">
    <div class="list">
      <AppTravelPost
        v-for="travel of travels"
        :key="travel.id"
        :travel="travel"
      />
    </div>
    <div class="map">Map is coming soon...</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api';
import AppTravelPost from '@/components/Atoms/AppTravelPost.vue';

export default defineComponent({
  components: {
    AppTravelPost,
  },
  setup() {
    const { $axios } = useContext();
    const travels = ref([]);

    // TODO: VueX or composition ファイルを作成して処理をまとめる
    const fetchTravels = async () => {
      await $axios
        .get('/travels')
        .then((res: any) => {
          console.log(res.data.travels);
          travels.value = res.data.travels;
        })
        .catch(() => {
          alert('だめです');
        });
    };

    onMounted(() => {
      fetchTravels();
    });

    return {
      travels,
      fetchTravels,
    };
  },
});
</script>
