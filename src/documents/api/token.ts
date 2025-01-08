import { newToken } from 'react-solution';
import type { Patch } from 'react-solution';
import type { DocumentsApi } from './index.ts';
import type { DocumentsApiConfig } from './types.ts';

export const DOCUMENTS_API = newToken<DocumentsApi>('@project/documents/api');

export const DOCUMENTS_API_CFG = newToken<Patch<DocumentsApiConfig>>(
  '@project/documents/api/config',
);
