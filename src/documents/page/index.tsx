import { memo, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { LayoutDoc } from '@src/components/layouts/layout-doc';
import { LayoutContent } from '@src/components/layouts/layout-content';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/vs2015.min.css';
import './markdown/style.css';
import './style.css';
import hljs from 'highlight.js';
import { useSolution, useInit, useExternalState, Head } from 'react-solution';
import { DOCUMENTS_STORE } from '@src/documents/store/token.ts';
// @ts-ignore
import taskLists from 'markdown-it-task-lists';
import { Link } from 'react-router-dom';

export const DocPage = memo(() => {
  const docs = useSolution(DOCUMENTS_STORE);
  const params = useParams();
  const navigate = useNavigate();

  let path = params['*'] || 'main.md';
  if (!path.match(/\.md$/)) {
    path += '/index.md';
  }

  useInit(
    async () => {
      await docs.load(path);
    },
    [path],
    { ssr: 'doc-page' },
  );

  const docState = useExternalState(docs.state);

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

  const meta = useMemo(() => {
    return {
      title: docState.meta.title ? `${docState.meta.title} | React Solution!` : 'React Solution!',
      description: docState.meta.description || 'manual',
      keywords: Array.isArray(docState.meta.keywords) ? docState.meta.keywords.join(', ') : '',
      author: docState.meta.author || '',
    };
  }, [docState.meta]);

  return (
    <LayoutDoc scrollDepends={path}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta name="author" content={meta.author} />
      </Head>
      <LayoutContent>
        <div className="Head">
          <Link to={'/'}>React Solution</Link>
        </div>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: md.render(docState.content) }}
          onClick={callbacks.onClick}
        />
      </LayoutContent>
    </LayoutDoc>
  );
});
