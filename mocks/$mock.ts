import { AxiosInstance } from 'axios';
import mockServer from 'axios-mock-server';
import mock0 from './travels/travels';
import mock1 from './travels/_id';

export default (client?: AxiosInstance) =>
  mockServer(
    [
      {
        path: '/travels',
        methods: mock0,
      },
      {
        path: '/travels/_id',
        methods: mock1,
      },
    ],
    client,
    '',
  );
