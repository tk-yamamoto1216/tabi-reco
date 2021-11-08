interface User {
  user: {
    name: String;
    email: String;
    password: String;
  };
}

export const state = (): User => ({
  // NOTE: ベタ書きでログイン中のユーザーを書いています
  user: {
    name: '山本',
    email: 'ymmt@hoge.com',
    password: 'hoge',
  },
});

export const getters = {
  getUser: (state: any) => {
    return state.user;
  },
};

export const mutations = {
  // ログアウト
  logout(state: any): void {
    state.user.name = '';
    state.user.email = '';
    state.user.password = '';
  },
};
