import { HTTP_CLIENT } from 'react-solution';
import { injectClass } from 'react-solution';
import { optionalToken } from 'react-solution';
import { DocumentsApi } from './index.ts';
import { DOCUMENTS_API, DOCUMENTS_API_CFG } from './token.ts';

export const documentsApi = injectClass({
  token: DOCUMENTS_API,
  constructor: DocumentsApi,
  depends: {
    httpClient: HTTP_CLIENT,
    config: optionalToken(DOCUMENTS_API_CFG),
  },
});
