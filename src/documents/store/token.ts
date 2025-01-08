import { newToken } from 'react-solution';
import type { Patch } from 'react-solution';
import type { DocumentsStore } from './index.ts';
import type { DocumentsStoreConfig } from './types.ts';

export const DOCUMENTS_STORE = newToken<DocumentsStore>('@project/documents/store');

export const DOCUMENTS_STORE_CFG = newToken<Patch<DocumentsStoreConfig>>(
  '@project/documents/store/config',
);
