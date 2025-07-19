import mc from 'merge-change';
import { type LogInterface, State } from 'react-solution';
import type { Patch } from 'react-solution';
import { DataContent, DocumentsStoreConfig, DocumentsStoreData } from './types.ts';
import { DocumentsApi } from '@src/documents/api';
import * as yaml from 'js-yaml';

export class DocumentsStore {
  readonly state: State<DocumentsStoreData>;
  protected config: DocumentsStoreConfig = {
    baseUrl: '',
  };

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
      meta: {
        title: '',
        description: '',
        keywords: [],
      },
      wait: false,
      errors: null,
    };
  }

  private extractMetaAndContent(data: string): DataContent {
    let meta: Record<string, any> = {};
    let content = data;

    if (data.startsWith('---')) {
      const endIndex = data.indexOf('---', 3);
      if (endIndex !== -1) {
        const metaRaw = data.slice(3, endIndex).trim();
        content = data.slice(endIndex + 3).trim();
        try {
          meta = yaml.load(metaRaw) as Record<string, any>;
        } catch (error) {
          console.error('Error parsing YAML:', error);
        }
      }
    }

    // Apply asset URL transformation to content
    content = content.replace(/\(assets\/([^)]+)\)/g, `(${this.config.baseUrl}assets/$1)`);

    return { meta, content };
  }

  async load(path: string) {
    this.state.update({ wait: true, errors: null }, 'Статус ожидания');
    try {
      const response = await this.depends.documentsApi.request({ url: path });

      const { content, meta } = this.extractMetaAndContent(response.data);

      this.state.update(
        {
          content,
          meta,
          wait: false,
          errors: null,
        },
        'Документ загружен',
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
