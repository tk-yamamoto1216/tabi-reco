<template>
  <div class="edit-travel">
    <h1>編集ページ</h1>
  </div>
</template>

<script lang="ts">
// import { useContext, useRouter } from '@nuxtjs/composition-api';
// import { defineComponent, onBeforeMount, ref } from '@vue/composition-api';

// export default defineComponent({
//   setup() {
//     const { $axios } = useContext();
//     const router = useRouter();
//     const travel = ref({});
//     const fetchDetail = (id: number) => {
//       $axios
//         .get(`/travels/${id}`)
//         .then((res) => {
//           travel.value = res.data;
//           if (res.data === undefined) {
//             router.push(`/`);
//           }
//         })
//         .catch((e) => {
//           console.error(e);
//           alert('存在しないページです');
//         });
//     };

//     onBeforeMount(() => {
//       return fetchDetail(Number(router.currentRoute.params?.id));
//     });

//     return {
//       travel,
//     };
//   },
// });
</script>
