import { I18N_CFG, LOG_CFG } from 'react-solution';
import { config } from 'react-solution';
import { HTTP_CLIENT_CFG } from 'react-solution';
import { DOCUMENTS_STORE_CFG } from '@src/documents/store/token.ts';

export const configs = [
  config(HTTP_CLIENT_CFG, ({ env }) => ({
    // Обычно хост на апи относительный и используется прокси для устранения CORS
    // Но в режиме рендера на сервере необходимо указать полный адрес к АПИ
    baseURL: (env.SSR ? env.API_URL : '') + '/VladimirShestakov/react-solution-pages/master/',
    //headers: {},
    //auth:{} base auth
  })),

  config(DOCUMENTS_STORE_CFG, {
    baseUrl: '/VladimirShestakov/react-solution-pages/master/'
  }),

  config(I18N_CFG, {
    locale: 'ru-RU', // локаль по умолчанию если не будет определена автоматически
    auto: true,
    remember: true,
  }),

  config(LOG_CFG, {
    // По умолчанию для всех
    enabled: false,
    // Включение именованных логгеров
    'example-name': true,
    // Принудительное отключение для всех (так как в именованных disable не переопределен)
    disable: false,
  }),
];
