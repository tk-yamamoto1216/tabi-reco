<template>
  <!-- TODO: Google Map APIの処理はプラグインにまとめる -->
  <div class="google-map">
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
  setup(props) {
    // Google Map 取得の処理
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAP_API_KEY || '',
      version: 'weekly',
    });

    const init = () => {
      let map: google.maps.Map;
      let placeLatLng: google.maps.LatLng;
      const success = (pos: any) => {
        console.log(pos);
        placeLatLng = new google.maps.LatLng(props.lat, props.lng);
        loader.load().then(() => {
          map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
              center: placeLatLng,
              zoom: 13,
            },
          );
          console.log(map);
        });
      };
      // TODO: 失敗した時の処理書く
      const fail = () => {
        alert('現在地を有効にしてください');
      };
      navigator.geolocation.getCurrentPosition(success, fail);
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
