import { Head, ModalsContainer } from 'react-solution';
import { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { DocPage } from '@src/documents/page';

export const App = memo(() => {
  return (
    <>
      <Head>
        <html lang="ru" />
        <title>React Solution!</title>
        <meta name="description" content="React solution" />
      </Head>
      <Suspense fallback={<div>Подождите...</div>}>
        <Routes>
          <Route path="/*" index element={<DocPage />} />
          <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
        <ModalsContainer />
      </Suspense>
    </>
  );
});
