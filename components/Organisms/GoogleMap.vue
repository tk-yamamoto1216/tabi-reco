<template>
  <!-- TODO: Google Map APIの処理はプラグインにまとめる -->
  <div class="google-map">
    <div class="search">
      <div id="header"><b>Google Maps - 場所検索</b></div>
      <input id="keyword" type="text" /><button id="search">検索実行</button>
      <button id="clear">結果クリア</button>
      <div id="target"></div>
    </div>
    <div id="map">ろーでぃんぐちゅう…</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watch } from '@nuxtjs/composition-api';
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
    // Google Map 取得の処理
    let map: google.maps.Map;
    let placeLatLng: google.maps.LatLng;

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
        // 検索処理
        const request = {
          query: '東宇治高校',
          fields: ['name', 'geometry'],
        };
        const service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(request, function (results, status) {
          console.log(results);
          console.log(status);
        });
      });
    };

    const getClickLatLng = (latlng: any, map: any) => {
      emit('getClickLatLng', latlng.lat(), latlng.lng());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new google.maps.Marker({
        position: latlng,
        map,
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
