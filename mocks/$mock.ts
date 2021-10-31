import { AxiosInstance } from 'axios';
import mockServer from 'axios-mock-server';
import mock0 from './travels/index';
import mock1 from './travels/detail';
import mock2 from './travels/create';

export default (client?: AxiosInstance) =>
  mockServer(
    [
      {
        path: '/travels/index',
        methods: mock0,
      },
      {
        path: '/travels/_id',
        methods: mock1,
      },
      {
        path: '/travels/create',
        methods: mock2,
      },
      // {
      //   path: '/travels/_id/edit',
      //   methods: mock3,
      // },
      // {
      //   path: '/travels/_id/delete',
      //   methods: mock4,
      // },
    ],
    client,
    '',
  );
