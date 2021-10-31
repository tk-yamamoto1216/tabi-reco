<template>
  <div class="index-page">
    <div class="list">
      <AppTravelPost
        v-for="travel of travels"
        :key="travel.id"
        :travel="travel"
        @click.native="moveToDetail(travel.id)"
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
  useRouter,
} from '@nuxtjs/composition-api';
import AppTravelPost from '@/components/Atoms/AppTravelPost.vue';

export default defineComponent({
  components: {
    AppTravelPost,
  },
  setup() {
    const { $axios } = useContext();
    const travels = ref([]);
    const router = useRouter();

    // TODO: VueX or composition ファイルを作成して処理をまとめる
    const fetchTravels = async () => {
      await $axios
        .get('/travels')
        .then((res: any) => {
          travels.value = res.data.travels;
        })
        .catch(() => {
          alert('だめです');
        });
    };

    const moveToDetail = (id: number) => {
      console.log(id);
      router.push(`travels/${id}`);
    };

    onMounted(() => {
      fetchTravels();
    });

    return {
      travels,
      fetchTravels,
      moveToDetail,
    };
  },
});
</script>
