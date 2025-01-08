import { memo, useEffect, useRef } from 'react';
import './style.less';

type Props = {
  side?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
  scrollDepends?: string;
};

export const LayoutDoc = memo((props: Props) => {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refContent.current?.scrollTo(0, 0);
  }, [refContent, props.scrollDepends]);

  return (
    <div className="LayoutDoc">
      <aside className="LayoutDoc__side">
        <div className="LayoutDoc__wrap">{props.side}</div>
      </aside>
      <div className="LayoutDoc__content">
        <div className="LayoutDoc__wrap" ref={refContent}>
          {props.children || props.content}
        </div>
      </div>
    </div>
  );
});
