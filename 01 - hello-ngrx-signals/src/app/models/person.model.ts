import { Address } from './address.model';

type _Person = {
  id: number;
  name: string;
  address: Address;
};

export type Person = Readonly<_Person>;
