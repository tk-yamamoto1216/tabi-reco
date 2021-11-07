<template>
  <!-- TODO: Google Map APIの処理はプラグインにまとめる -->
  <div class="google-map">
    <div class="search">
      <input v-model="keyword" placeholder="検索" type="text" /><button
        class="btn -white"
        @click="searchLocation"
      >
        検索実行
      </button>
    </div>
    <div id="map">ろーでぃんぐちゅう…</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  watch,
} from '@nuxtjs/composition-api';
import { Loader } from '@googlemaps/js-api-loader';
export default defineComponent({
  props: {
    lat: {
      type: Number,
      required: false,
      default: 35.6598003,
    },
    lng: {
      type: Number,
      required: false,
      default: 139.7023894,
    },
  },
  setup(props, { emit }) {
    let map: google.maps.Map;
    let placeLatLng: google.maps.LatLng;

    // NOTE: 現在地取得の処理
    // FIXME: 初期描画までラグがあるので修正
    const getCurrentLocation = () => {
      const success = (pos: any) => {
        map.setCenter(
          new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        );
      };
      const fail = (e: any) => {
        console.error(e);
        map.setCenter(new google.maps.LatLng(34.887616, 135.799059));
      };
      navigator.geolocation.getCurrentPosition(success, fail);
    };

    // NOTE: 初期化
    const init = () => {
      const loader = new Loader({
        apiKey: process.env.GOOGLE_MAP_API_KEY || '',
        version: 'weekly',
        libraries: ['places'],
      });

      loader.load().then(() => {
        map = new google.maps.Map(
          document.getElementById('map') as HTMLElement,
          {
            center: placeLatLng,
            zoom: 13,
          },
        );
        // クリックした場所の経度と緯度を取得する
        map.addListener('click', (e: any) => {
          getClickLatLng(e.latLng, map);
        });
      });
    };

    // NOTE: クリックした場所の座標を取得
    const getClickLatLng = (latlng: any, map: any) => {
      emit('getClickLatLng', latlng.lat(), latlng.lng());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new google.maps.Marker({
        position: latlng,
        map,
      });
    };

    // NOTE: 検索処理
    const keyword = ref('');
    const searchLocation = () => {
      const request = {
        query: keyword.value,
        fields: ['name', 'geometry'],
      };
      const service = new google.maps.places.PlacesService(map);

      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // console.log(results?.[0]?.geometry?.location)
          map.setCenter(results[0].geometry!.location!);
        } else {
          alert('見つかりませんでした (>_<)');
          keyword.value = '';
        }
      });
    };

    // TODO: loading してる画像みたいなやつ入れたい
    onBeforeMount(() => {
      getCurrentLocation();
      init();
    });

    // NOTE: 一覧画面にて hoverされた投稿の位置情報を表示
    watch(
      () => [props.lat, props.lng],
      (latLng) => {
        map.setCenter(new google.maps.LatLng(latLng[0], latLng[1]));
      },
    );

    return {
      searchLocation,
      keyword,
    };
  },
});
</script>

<style>
#map {
  position: fixed;
  height: 100vh;
}
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
