import { AxiosInstance } from 'axios';
import mockServer from 'axios-mock-server';
import mock0 from './travels/travels';

export default (client?: AxiosInstance) =>
  mockServer(
    [
      {
        path: '/travels',
        methods: mock0,
      },
    ],
    client,
    '',
  );
