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
      default: 0,
    },
    lng: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  setup(props, { emit }) {
    // Google Map 取得の処理
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAP_API_KEY || '',
      version: 'weekly',
      libraries: ['places'],
    });

    const init = () => {
      let map: google.maps.Map;
      let placeLatLng: google.maps.LatLng;
      const success = (pos: any) => {
        placeLatLng = new google.maps.LatLng(
          props.lat || pos.coords.latitude,
          props.lng || pos.coords.longitude,
        );
        loader.load().then(() => {
          map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
              center: placeLatLng,
              zoom: 13,
            },
          );
          map.addListener('click', (e: any) => {
            getClickLatLng(e.latLng, map);
          });
          // FIXME: 検索できるっぽいけどリロードしたらエラーになる
          const request = {
            query: '東宇治高校',
            fields: ['name', 'geometry'],
          };
          const service = new google.maps.places.PlacesService(map);
          console.log(service);

          service.findPlaceFromQuery(request, function (results, status) {
            console.log(results);
            console.log(status);
            // if (status === google.maps.places.PlacesServiceStatus.OK) {
            //   for (let i = 0; i < results.length; i++) {
            //     createMarker(results[i]);
            //   }
            //   map.setCenter(results[0].geometry.location);
            // }
          });
        });
      };
      // TODO: 失敗した時の処理書く
      const fail = () => {
        alert('現在地を有効にしてください');
      };
      navigator.geolocation.getCurrentPosition(success, fail);
    };

    const getClickLatLng = (latlng: any, map: any) => {
      emit('getClickLatLng', latlng.lat(), latlng.lng());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new google.maps.Marker({
        position: latlng,
        map,
      });
    };

    // FIXME: 描画までに時間がかかる
    // TODO: loading してる画像みたいなやつ入れたい
    onBeforeMount(async (): Promise<void> => {
      try {
        await loader.load();
        init();
      } catch (e: any) {
        alert(e.message);
      }
    });

    // FIXME:なぜか２個の変更を一気に検知できない (>_<)
    // FIXME:描画がおせえ
    watch(
      () => props.lat,
      (first, second) => {
        console.log('変更', first, second);
        init();
      },
    );
    watch(
      () => props.lng,
      (first, second) => {
        console.log('変更', first, second);
        init();
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
