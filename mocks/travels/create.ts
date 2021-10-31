import { MockMethods } from 'axios-mock-server';

const newTravel: MockMethods = {
  post({ data }: { data: any }) {
    return [
      201,
      {
        id: 12345,
        title: data.title.value,
        place: data.place.place,
        good: 0,
        date: data.date.value,
        image: '',
      },
    ];
  },
};

export default newTravel;
