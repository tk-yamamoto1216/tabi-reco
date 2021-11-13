interface User {
  user: {
    name: String;
    id: String;
    email: String;
    password: String;
  };
}

export const state = (): User => ({
  // NOTE: ベタ書きでログイン中のユーザーを書いています
  user: {
    name: '山本',
    id: '4ktgprPO4',
    email: 'ymmt@hoge.com',
    password: 'hoge',
  },
});

export const getters = {
  getUser: (state: User) => {
    return state.user;
  },
};

export const mutations = {
  // ログアウト
  logout(state: User): void {
    state.user.name = '';
    state.user.email = '';
    state.user.password = '';
  },
};
