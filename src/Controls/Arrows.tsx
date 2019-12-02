import { IconButton } from '@material-ui/core';
import {
  HighlightOff,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
  RadioButtonChecked
} from '@material-ui/icons';
import React, { FC } from 'react';

const Arrows: FC<Props> = ({ left, up, down, right, into, out }) => (
  <div style={{ alignItems: 'center', display: 'flex' }}>
    <div>
      <IconButton size="small" onClick={left}>
        <KeyboardArrowLeft />
      </IconButton>
    </div>
    <div>
      <IconButton size="small" style={{ display: 'block' }} onClick={up}>
        <KeyboardArrowUp />
      </IconButton>
      <IconButton
        size="small"
        style={{ display: 'block', padding: 0 }}
        onClick={into}
      >
        <HighlightOff style={{ height: '0.5em', width: '0.5em' }} />
      </IconButton>
      <IconButton
        size="small"
        style={{ display: 'block', marginLeft: 18, padding: 0 }}
        onClick={out}
      >
        <RadioButtonChecked style={{ height: '0.5em', width: '0.5em' }} />
      </IconButton>
      <IconButton size="small" style={{ display: 'block' }} onClick={down}>
        <KeyboardArrowDown />
      </IconButton>
    </div>
    <div>
      <IconButton size="small" onClick={right}>
        <KeyboardArrowRight />
      </IconButton>
    </div>
  </div>
);

interface Props {
  left: () => void;
  up: () => void;
  down: () => void;
  right: () => void;
  into: () => void;
  out: () => void;
}

export default Arrows;
