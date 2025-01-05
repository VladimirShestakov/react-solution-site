import React from 'react';
import {
  dumpService,
  envClient,
  httpClient, i18nService, logService, modalsService,
  Patch,
  renderService,
  routerService,
} from 'react-solution';
import {
  Container,
  commonSolutions,
  RouterProvider,
  RENDER_COMPONENT,
  RENDER_SERVICE,
  ROUTER_SERVICE,
} from 'react-solution';

import { configs } from './configs.ts';

/**
 * Создание DI контейнера для клиентского приложения (с настройками, сервисами, фичами...).
 * @param envPatch Патч на переменные окружения для возможности подставить параметры запроса при SSR
 */
async function getSolutions(envPatch: Patch<Env> = {}): Promise<Container> {
  return (
    new Container()
      .set(configs)
      .set(envClient(envPatch))
      .set(routerService)
      .set(dumpService)
      .set(renderService)
      .set(httpClient)
      .set(modalsService)
      .set(i18nService)
      .set(logService)
      .set({
        token: RENDER_COMPONENT,
        depends: { router: ROUTER_SERVICE },
        factory: ({ router }) => {
          return (
            <RouterProvider router={router}>
              <div>Привет!</div>
            </RouterProvider>
          );
        },
      })
  );
}

/**
 * Запуск рендера в браузере.
 */
if (!process.env.SSR) {
  (async () => {
    const solutions = await getSolutions();
    const render = await solutions.get(RENDER_SERVICE);
    render.start();
  })();
}
/**
 * Экспорт функции для SSR.
 */
export default getSolutions;
