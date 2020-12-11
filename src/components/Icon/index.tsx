import React, {memo} from 'react';
import {SvgProps} from 'react-native-svg';

// @ts-ignore
import Eye from './eye.svg';
// @ts-ignore
import PaperAirplaneSolid from './paper-airplane-solid.svg';
// @ts-ignore
import ChatAlt2Solid from './chat-alt-2-solid.svg';

const icons = {
  Eye,
  PaperAirplaneSolid,
  ChatAlt2Solid,
};

interface IconProps extends SvgProps {
  name: keyof typeof icons;
}

export const Icon = memo(({name, ...props}: IconProps) => {
  const Ico = icons[name];
  return <Ico {...props} />;
});
