import { injectClass, LOG_SERVICE } from 'react-solution';
import { optionalToken } from 'react-solution';
import { DocumentsStore } from './index.ts';
import { DOCUMENTS_STORE, DOCUMENTS_STORE_CFG } from './token.ts';
import { DOCUMENTS_API } from '@src/documents/api/token.ts';

export const documentsStore = injectClass({
  token: DOCUMENTS_STORE,
  constructor: DocumentsStore,
  depends: {
    documentsApi: DOCUMENTS_API,
    config: optionalToken(DOCUMENTS_STORE_CFG),
    logger: LOG_SERVICE,
  },
});
