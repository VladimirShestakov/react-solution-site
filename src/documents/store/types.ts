export type DocumentsStoreConfig = {
  baseUrl: string
};

export interface DocumentsStoreData extends DataContent {
  wait: boolean;
  errors: any;
}

export interface DataContent {
  meta: Record<string, any>;
  content: string;
}
