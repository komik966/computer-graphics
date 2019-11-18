import { Divider, makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { ControlsState } from './controlsState';

const Controls: FC<Props> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>Camera</Typography>
      <Divider />
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing()
  }
}));

interface Props {
  state: ControlsState;
  setState: (s: ControlsState) => void;
}

export default Controls;
