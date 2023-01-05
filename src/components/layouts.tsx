import clsx from 'clsx';
import { ReactNode } from 'react';

export const CenteredLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  // TODO is there a better way to fill available remaining height?
  // scroll height seems bugged :\
  <div
    className={clsx(
      'flex flex-col items-center justify-center md:h-[calc(100vh-48px)] max-md:h-[calc(100vh-53px)] pb-32 text-slate-700',
      className,
    )}
  >
    {children}
  </div>
);

export const DefaultLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => <div className={clsx('flex flex-col md:h-[calc(100vh-48px)] p-[25px] pt-0 max-md:h-[calc(100vh-53px)]', className)}>{children}</div>;
