import mock from '~/mocks/$mock';

export default ({ $axios }: { $axios: any }) => {
  mock($axios);
};
