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
    refContent.current?.scrollTo({top: 0, behavior: 'smooth'});
  }, [refContent, props.scrollDepends]);

  return (
    <div className="LayoutDoc">
      {props.side ? (
        <aside className="LayoutDoc__side">
          <div className="LayoutDoc__wrap">{props.side}</div>
        </aside>
      ): null}
      <div className="LayoutDoc__content">
        <div className="LayoutDoc__wrap" ref={refContent}>
          {props.children || props.content}
        </div>
      </div>
    </div>
  );
});
