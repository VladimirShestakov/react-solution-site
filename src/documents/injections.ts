import { documentsApi } from '@src/documents/api/inject.ts';
import { documentsStore } from '@src/documents/store/inject.ts';

export const documentsFeature = [documentsApi, documentsStore];
