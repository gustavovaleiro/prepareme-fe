import { Suspense, lazy, ComponentProps, useMemo } from 'react';
import type { IconName } from './registry';
import { loadIcon } from './registry';

const IconSkeleton = () => (
  <div className="animate-pulse w-[1em] h-[1em] rounded-full bg-gray-200" />
);

interface IconProps extends Omit<ComponentProps<'svg'>, 'ref'> {
  name: IconName;
  size: number;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = useMemo(
    () => lazy(() => loadIcon(name).then(Component => ({ default: Component }))),
    [name]
  );

  return (
    <Suspense fallback={<IconSkeleton />}>
      <IconComponent {...props} />
    </Suspense>
  );
}