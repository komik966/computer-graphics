import { makeStyles, Tab, Tabs } from '@material-ui/core';
import React, { FC, useState } from 'react';
import Camera from './Camera';
import { Objects } from '../types';

const Controls: FC<Props> = ({ objects }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const navigate = (tabNo: number) => () => setTab(tabNo);

  return (
    <>
      <Tabs value={tab} variant="scrollable">
        <Tab label="Camera" onClick={navigate(0)} />
        <Tab label="Lights" onClick={navigate(1)} />
        <Tab label="Car" onClick={navigate(2)} />
        <Tab label="Buildings" onClick={navigate(3)} />
      </Tabs>
      <div className={classes.panel}>
        {tab === 0 && <Camera objects={objects} />}
      </div>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  panel: {
    padding: theme.spacing()
  }
}));

interface Props {
  objects: Objects;
}

export default Controls;
