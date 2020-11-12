import React from 'react';

import Eye from './eye.svg';

const icons = {
  Eye,
};

interface IconProps {
  name: keyof typeof icons;
  width?: number;
  height?: number;
  color?: string;
}

export function Icon({
  name,
  width = 24,
  height = 24,
  color = '#fff',
}: IconProps) {
  const Ico = icons[name];
  return <Ico width={width} height={height} stroke={color} />;
}
