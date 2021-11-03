<template>
  <div class="index-page">
    <div class="list">
      <AppTravelPost
        v-for="travel of travels"
        :key="travel.id"
        :travel="travel"
        @click.native="moveToDetail(travel.id)"
        @deleteItem="deleteTravel"
      />
    </div>
    <GoogleMap class="map" />
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
import GoogleMap from '@/components/Organisms/GoogleMap.vue';

export default defineComponent({
  components: {
    AppTravelPost,
    GoogleMap,
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
          travels.value = res.data;
        })
        .catch(() => {
          alert('だめです');
        });
    };

    const moveToDetail = (id: number) => {
      console.log(id);
      router.push(`travels/${id}`);
    };

    const deleteTravel = (id: number) => {
      console.log('削除される' + id);
      $axios.delete('/travels').then((res) => {
        console.log(res);
      });
    };

    onMounted(() => {
      fetchTravels();
    });

    return {
      travels,
      fetchTravels,
      moveToDetail,
      deleteTravel,
    };
  },
});
</script>
