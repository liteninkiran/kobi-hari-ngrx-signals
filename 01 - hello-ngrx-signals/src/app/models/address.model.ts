type _Address = {
  street: string;
  city: string;
  state: string;
};

export type Address = Readonly<_Address>;
