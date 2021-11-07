<template>
  <div class="index-page">
    <div class="list">
      <AppTravelPost
        v-for="travel of travels"
        :key="travel.id"
        :travel="travel"
        @click.native="moveToDetail(travel.id)"
        @deleteItem="deleteTravel"
        @mouseover.native="getCoordinate(travel.lat, travel.lng)"
      />
    </div>
    <GoogleMap :lat="selectedLat" :lng="selectedLng" class="map" />
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
import { Travel } from '@/types/travel';

export default defineComponent({
  components: {
    AppTravelPost,
    GoogleMap,
  },

  setup() {
    const { $axios } = useContext();
    const travels = ref<Travel[]>([]);
    const router = useRouter();
    const selectedLat = ref(0);
    const selectedLng = ref(0);

    // TODO: VueX or composition ファイルを作成して処理をまとめる
    const fetchTravels = async () => {
      await $axios
        .get<Travel[]>('/travels')
        .then((res) => {
          travels.value = res.data;
        })
        .catch(() => {
          alert('だめです');
        });
    };

    const moveToDetail = (id: number): void => {
      router.push(`travels/${id}`);
    };

    const deleteTravel = (id: number): void => {
      console.log('削除される' + id);
      $axios.delete('/travels').then((res) => {
        console.log(res);
      });
    };

    const getCoordinate = (lat: number, lng: number): void => {
      selectedLat.value = lat;
      selectedLng.value = lng;
    };

    onMounted(() => {
      fetchTravels();
    });

    return {
      travels,
      fetchTravels,
      moveToDetail,
      deleteTravel,
      getCoordinate,
      selectedLat,
      selectedLng,
    };
  },
});
</script>
