import { MockMethods, MockResponse } from 'axios-mock-server';
import { Travel } from '~/types/travel';

const travels: Travel[] = [
  {
    id: 0,
    userId: 'ymmt@hoge.com',
    title: 'カナダ最高！',
    place: 'カナダ',
    good: 120,
    date: '2021/10/10',
    images: {
      first:
        'https://d1d37e9z843vy6.cloudfront.net/jp/images/4565901/3354fe2e12a46c77611ecb7ff8fb3d7a01e368cb.jpeg',
      second:
        'https://pix10.agoda.net/geo/country/100/3_100_canada_02.jpg?s=1920x',
      third: 'https://www.lieugaksquare.com/ca/info/img/officialname.jpg',
      fourth:
        'https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/migration_article_images/amazing/canada-no1-1.jpg',
      fifth:
        'https://d21hrr2lgpdozs.cloudfront.net/image/column/org/34f41bc003aeef321eeeef4063d98239.jpg',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 49.282729,
    lng: -123.120738,
  },
  {
    id: 1,
    userId: 'ymmt@hoge.com',
    title: 'アメリカ最高！',
    place: 'アメリカ',
    date: '2021/10/10',
    good: 120,
    images: {
      first:
        'https://www.smbc-card.com/nyukai/magazine/recommend/responsive/img/thumb_usa.jpg',
      second: 'https://www.isa.co.jp/wp-content/uploads/2016/12/us_info.jpg',
      third:
        'https://news.mynavi.jp/creditcard/wp/wp-content/uploads/2019/03/america-1-480x318.jpg',
      fourth:
        'https://hips.hearstapps.com/jp.h-cdn.co/esqjp/esquire-mig/images/lifestyle/news/esq16_1014am/935527-1-jpn-JP/ESQUIRE-US.jpg?crop=0.966xw:0.772xh;0.0353xw,0.228xh&resize=640:*',
      fifth: '',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 37.2581278,
    lng: -104.6558831,
  },
  {
    id: 2,
    userId: 'tnk@hoge.com',
    title: 'インド最高！',
    place: 'インド',
    date: '2021/10/10',
    good: 120,
    images: {
      first:
        'https://x.hankyu-travel.com/photo_db/image_search_kikan5.php?p_photo_mno=00000-SP19_-25599.jpg',
      second:
        'https://x.hankyu-travel.com/photo_db/image_search_kikan5.php?p_photo_mno=00000-SP19_-25599.jpg',
      third:
        'https://x.hankyu-travel.com/photo_db/image_search_kikan5.php?p_photo_mno=00000-SP19_-25599.jpg',
      fourth:
        'https://x.hankyu-travel.com/photo_db/image_search_kikan5.php?p_photo_mno=00000-SP19_-25599.jpg',
      fifth:
        'https://x.hankyu-travel.com/photo_db/image_search_kikan5.php?p_photo_mno=00000-SP19_-25599.jpg',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 19.075984,
    lng: 72.877656,
  },
  {
    id: 3,
    userId: 'stostee@hoge.com',
    title: 'カウチサーフィンしたよ',
    place: 'スペイン',
    date: '2021/10/10',
    good: 120,
    images: {
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 33.581126,
    lng: 130.398742,
  },
  {
    id: 4,
    userId: 'itoito@hoge.com',
    title: '気球が綺麗！',
    place: 'バガン',
    date: '2021/10/10',
    good: 120,
    images: {
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 21.171727,
    lng: 94.858546,
  },
  {
    id: 5,
    userId: '',
    title: '象使いになりました',
    place: 'ラオス',
    date: '2021/10/10',
    good: 120,
    images: {
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 19.883285,
    lng: 102.138717,
  },
  {
    id: 6,
    userId: 'itoito@hoge.com',
    title: '屋台の飯は食わん方がええ',
    place: 'シェムリアップ',
    date: '2021/10/10',
    good: 120,
    images: {
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 13.363253,
    lng: 103.856403,
  },
  {
    id: 7,
    userId: 'tkhstkhs@hoge.com',
    title: 'ベルギー',
    place: '二度目のカウチ',
    date: '2021/10/10',
    good: 120,
    images: {
      first: '',
      second: '',
      third: '',
      fourth: '',
      fifth: '',
    },
    security: '良い',
    prices: '低',
    type: '1人旅',
    lat: 50.85034,
    lng: 4.35171,
  },
];

const travel: MockMethods = {
  get: ({ values }): MockResponse => {
    return [200, travels.find((travel) => travel.id === values.id)];
  },
  put: ({ data }): MockResponse => {
    return [200, data.travel.value];
  },
};

export default travel;
