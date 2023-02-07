export default interface IData {
  data: {
    count: number;
    items: Array<IDataItem>;
  };
}

export interface IDataItem {
  instantBookable: boolean;
  location: string;
  name: string;
  passengersCapacity: number;
  pictures: Array<string>;
  price: number;
  shower: boolean;
  sleepCapacity: number;
  toilet: boolean;
  vehicleType: string;
}
