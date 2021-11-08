import { MockMethods } from 'axios-mock-server';
import { User } from '~/types/users';

export const users: User[] = [
  {
    name: '山本',
    email: 'ymmt@hoge.com',
    password: 'hoge',
  },
  {
    name: '田中',
    email: 'tnk@hoge.com',
    password: 'hoge',
  },
  {
    name: '佐藤',
    email: 'stostee@hoge.com',
    password: 'hoge',
  },
  {
    name: '伊藤',
    email: 'itoito@hoge.com',
    password: 'hoge',
  },
  {
    name: '高橋',
    email: 'tkhstkhs@hoge.com',
    password: 'hoge',
  },
];

export const methods: MockMethods = {
  // ユーザーの一覧取得
  get: () => {
    return [200, users];
  },
  // TODO: 会員登録時のPOSTの処理書く
};
