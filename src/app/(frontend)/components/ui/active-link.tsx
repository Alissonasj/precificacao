'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type ActiveLinkProps = {
  className?: string;
  children: React.ReactNode;
} & LinkProps;

export default function ActiveLink({
  href,
  className,
  children,
  ...props
}: ActiveLinkProps) {
  const pathName = usePathname();
  const isActive =
    href === '/' ? pathName === href : pathName.startsWith(href.toString());

  return (
    <Link
      {...props}
      href={href}
      className={twMerge(
        className,
        'rounded-md',
        `${isActive ? 'bg-black text-white' : ''}`
      )}
    >
      {children}
    </Link>
  );
}
