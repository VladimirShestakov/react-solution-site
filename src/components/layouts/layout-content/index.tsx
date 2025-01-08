import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.less';

type Props = {
  children?: React.ReactNode;
  theme?: string;
};

export const LayoutContent = memo((props: Props) => {
  const { theme = 'default', children } = props;
  const cn = bem('LayoutContent');

  return <div className={cn({ theme })}>{children}</div>;
});
