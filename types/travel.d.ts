// export enum DateFormat {
//   date = 'YYYY/MM/DD',
// }
export interface Travel {
  id: Number;
  userId: String;
  title: String;
  place: String;
  good: Number;
  date: String;
  lat: Number;
  lng: Number;
  security: '悪い' | '普通' | '良い';
  prices: '低' | '普通' | '高';
  type: '1人旅' | '友達と' | 'その他';
  images?: String[];
}

export interface Comment {
  commentId: Number;
  travelId: String;
  userId: String;
  date: String;
  title: String;
}
