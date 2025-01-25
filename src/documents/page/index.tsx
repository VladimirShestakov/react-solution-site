import { memo, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { LayoutDoc } from '@src/components/layouts/layout-doc';
import { LayoutContent } from '@src/components/layouts/layout-content';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/vs2015.min.css';
import './markdown/style.css';
import hljs from 'highlight.js';
import { useSolution, useInit, useExternalState } from 'react-solution';
import { DOCUMENTS_STORE } from '@src/documents/store/token.ts';
// @ts-ignore
import taskLists from 'markdown-it-task-lists';

export const DocPage = memo(() => {
  const docs = useSolution(DOCUMENTS_STORE)
  const params = useParams();
  const navigate = useNavigate()

  let path = params['*'] || 'main.md';
  if (!path.match(/\.md$/)) {
    path += '/index.md';
  }

  useInit(async () => {
    await docs.load(path)
  }, [path], {ssr: 'doc-page'})

  const docState = useExternalState(docs.state)

  const md = useMemo(
    () =>
      new MarkdownIt({
        highlight: (str: string, lang: string): string => {
          if (lang && hljs && hljs.getLanguage(lang)) {
            try {
              return `<pre class="hljs"><code>${
                hljs.highlight(str, {
                  language: lang,
                  ignoreIllegals: true,
                }).value
              }</code></pre>`;
            } catch {
              return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
            }
          }
          return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
        },
        html: true,
      }).use(taskLists),
    [hljs],
  );

  const callbacks = {
    onClick: useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!(e.target instanceof HTMLElement)) return;
      const link = e.target.closest('a');
      if (!link) return;
      const url = link.attributes.getNamedItem('href')?.value || '';
      if (!url.match(/^http/)) {
        e.preventDefault();
        e.stopPropagation();
        navigate(url);
      } else {
        link?.setAttribute('target', '_blank');
      }
    }, []),
  };

  const x = `

1. [x] Заменить алиас @packages на относительные пути, так как ts на node.js не понимает их.
    1. [x] Если реализовать монорепу, то пути заменить на импорт пакета react-skeleton
2. [x] Обновить пакеты
- [x] Отрефакторить /root.tsx и /index.tsx - упростить и вынести "мусор"
    - [x] Попробовать перенести ssr/render в сервис render
- [x] Монорепа: react-skeleton, пример фронта и сервера как отдельные npm пакеты
- [x] Опубликовать NPM пакет react-skeleton.
    - [x] Переименован в react-solution
    - [x] Билд typescript в js
        - [x] Нужно учитывать правила чистого EcmaScriptModules (полные пути на js файлы)
            - [x] Применить vite, так как tsc не умеют полностью всё как надо собирать
        - [x] Различать сборки для ноды и браузер. Возможно сделать две точки входы (экспорта) - общие пакеты и для ноды.
  `

  console.log(md.parse(x, {}))

  return (
    <LayoutDoc scrollDepends={path}>
      <LayoutContent>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: md.render(docState.content) }}
          onClick={callbacks.onClick}
        />
      </LayoutContent>
    </LayoutDoc>
  );
});
