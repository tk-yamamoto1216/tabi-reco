import { MockMethods } from 'axios-mock-server';

const newTravel: MockMethods = {
  post({ data }: { data: values }) {
    return [201, newTravel];
  },
};

export default newTravel;
