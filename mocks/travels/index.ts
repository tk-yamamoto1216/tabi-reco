import { MockMethods } from 'axios-mock-server';

const travels = [
  {
    id: 0,
    title: 'カナダ最高！',
    place: 'カナダ',
    good: 120,
    date: '2021/10/10',
    image:
      'https://pix10.agoda.net/geo/country/100/3_100_canada_02.jpg?s=1920x',
  },
  {
    id: 1,
    title: 'アメリカ最高！',
    place: 'アメリカ',
    date: '2021/10/10',
    good: 120,
    image: 'https://www.isa.co.jp/wp-content/uploads/2016/12/us_info.jpg',
  },
  {
    id: 2,
    title: 'インド最高！',
    place: 'インド',
    date: '2021/10/10',
    good: 120,
    image:
      'https://www.travelwith.jp/area/wp-content/uploads/sites/3/2020/11/033.jpg',
  },
  {
    id: 3,
    title: 'カナダ最高！',
    place: 'カナダ',
    date: '2021/10/10',
    good: 120,
    image: 'https://www.jcbtravel.co.jp/abroad/img/img_main_sp.jpg',
  },
  {
    id: 4,
    title: 'カナダ最高！',
    place: 'カナダ',
    date: '2021/10/10',
    good: 120,
    image:
      'http://img-cdn.guide.travel.co.jp/article/1082/34619/4583C19717A9452CB128870A833D8FEA_LL.jpg',
  },
  {
    id: 5,
    title: 'カナダ最高！',
    place: 'カナダ',
    date: '2021/10/10',
    good: 120,
    image:
      'https://static.retrip.jp/spot/85cfbec1-e193-4f09-8530-ca4258798480/images/6d20532c-0d91-4b86-a069-8fc0cb233344_m.jpg',
  },
  {
    id: 6,
    title: 'カナダ最高！',
    place: 'カナダ',
    date: '2021/10/10',
    good: 120,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnXuRX7vJ4sbcf4YXss8FJxGBugCfiU7ojpe5bxpIYKpT9vvuu9kelgjAAPs2u760Knw&usqp=CAU',
  },
  {
    id: 7,
    title: 'カナダ最高！',
    place: 'カナダ',
    date: '2021/10/10',
    good: 120,
    image:
      'https://travel0727.com/wp-content/uploads/2016/06/40afb29e4ae7212d5a0124b449738129.jpg',
  },
];

const methods: MockMethods = {
  // 全件取得
  get: () => {
    return [200, travels];
  },
  // 新規作成
  post: ({ data }: { data: any }) => {
    travels.push({
      id: 12345,
      title: data.title.value,
      place: data.place.place,
      good: 0,
      date: data.date.value,
      image: '',
    });
    console.log(travels);
    return [201];
  },
};

export default methods;
