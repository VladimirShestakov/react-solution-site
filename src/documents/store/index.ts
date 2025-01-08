import mc from 'merge-change';
import { type LogInterface, State } from 'react-solution';
import type { Patch } from 'react-solution';
import type { DocumentsStoreConfig, DocumentsStoreData } from './types.ts';
import { DocumentsApi } from '@src/documents/api';

export class DocumentsStore {
  readonly state: State<DocumentsStoreData>;
  protected config: DocumentsStoreConfig = {};

  constructor(
    protected depends: {
      documentsApi: DocumentsApi;
      config?: Patch<DocumentsStoreConfig>;
      logger: LogInterface;
    },
  ) {
    this.config = mc.merge(this.config, depends.config);
    this.depends.logger = this.depends.logger.named(this.constructor.name);
    this.state = new State(this.defaultState(), this.depends.logger);
  }

  defaultState(): DocumentsStoreData {
    return {
      content: '',
      wait: false,
      errors: null,
    };
  }

  async load(path: string) {
    this.state.update({ wait: true, errors: null }, 'Статус ожидания');
    try {
      const response = await this.depends.documentsApi.request({ url: path });
      this.state.update(
        {
          content: response.data,
          wait: false,
          errors: null,
        },
        'Категории загружены',
      );
    } catch (e: any) {
      this.state.update({ wait: false, errors: e.toString() }, 'Ошибка загрузки');
    }
  }

  getDump() {
    return this.state.get();
  }

  setDump(dump: DocumentsStoreData) {
    this.state.set(dump);
  }
}
