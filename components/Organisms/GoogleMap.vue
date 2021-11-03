<template>
  <!-- TODO: Google Map APIの処理はプラグインにまとめる -->
  <div class="google-map">
    <div id="map"></div>
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
              center: placeLatLng,
              zoom: 15,
            },
          );
          console.log(map);
        });
        console.warn('現在地の取得に成功');
        console.dir(pos.coords.latitude);
      };
      // TODO: 失敗した時の処理書く
      // const fail = (e: any) => {
      //   console.warn(e);
      //   return new google.maps.LatLng(34.887616, 135.799059);
      // };
      navigator.geolocation.getCurrentPosition(success);
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
