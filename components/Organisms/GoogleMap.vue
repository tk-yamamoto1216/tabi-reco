<template>
  <!-- TODO: Google Map APIの処理はプラグインにまとめる -->
  <div class="google-map">
    <div id="map">ろーでぃんぐちゅう…</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from '@nuxtjs/composition-api';
import { Loader } from '@googlemaps/js-api-loader';
export default defineComponent({
  setup() {
    // Google Map 取得の処理
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAP_API_KEY || '',
      version: 'weekly',
    });

    const init = () => {
      let map: google.maps.Map;
      let placeLatLng: google.maps.LatLng;
      const success = (pos: any) => {
        placeLatLng = new google.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        loader.load().then(() => {
          map = new google.maps.Map(
            document.getElementById('map') as HTMLElement,
            {
              center:
                placeLatLng || new google.maps.LatLng(34.887616, 135.799059),
              zoom: 15,
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

    return {};
  },
});
</script>

<style>
#map {
  height: 100%;
}
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>
