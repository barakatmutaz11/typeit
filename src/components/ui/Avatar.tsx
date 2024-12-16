import React from 'react';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  if (!src) {
    src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  }

  return (
    <img
      src={src}
      alt={name}
      className={`${sizes[size]} rounded-full object-cover`}
    />
  );
}