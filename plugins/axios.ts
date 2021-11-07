import { Context } from '@nuxt/types';

export default function ({ $axios }: Context) {
  $axios.onRequest((config) => {
    console.log('axiosdes');
    // ログ確認
    console.log(`API url:${config.url}, method:${config.method}`);
  });

  $axios.onError((error) => {
    if (!error.response) return;

    const code = error.response.status;
    if (code === 401) console.log('401エラー');
    if (code === 404) console.log('404エラー');
  });
}
