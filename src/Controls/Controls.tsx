import { makeStyles, Tab, Tabs } from '@material-ui/core';
import React, { FC, useState } from 'react';
import Camera from './Camera';
import { State } from './state';

const Controls: FC<Props> = ({ state, setState }) => {
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
        {tab === 0 && <Camera state={state} setState={setState} />}
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
  state: State;
  setState: (s: State) => void;
}

export default Controls;
