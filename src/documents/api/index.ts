import type { DocumentsApiConfig } from './types.ts';
import { ApiBaseEndpoint } from 'react-solution';

export class DocumentsApi extends ApiBaseEndpoint<DocumentsApiConfig> {
  protected override config: DocumentsApiConfig = {
    baseURL: '/VladimirShestakov/react-solution-pages/master/',
  };
}
