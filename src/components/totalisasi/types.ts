export type Row = {
  product: string;
  variation: string;
  qty: number;
};

export type TotalRow = Row & {
  hpp: number;
};

export type StoreFile = {
  file: File;
  store: string;
  status: "Menunggu" | "Siap" | "Error";
  error?: string;
};