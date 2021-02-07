import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {DisplayArrival, DisplayDeparture} from '../../Pages/Home/display';
import CircularIndeterminate from '../Spinner';

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiBox-root': {
      padding: '24px 0',
    },
  },
}));

export const SimpleTabs = ({
  departing,
  dClass,
  arriving,
  loading,
  loadingD,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Departure" {...a11yProps(0)} />
            <Tab label="Arrival" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {!loadingD ? (
            <DisplayDeparture classes={dClass} departing={departing} />
          ) : (
            <CircularIndeterminate />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!loading ? (
            <DisplayArrival classes={dClass} departing={arriving} />
          ) : (
            <CircularIndeterminate />
          )}
        </TabPanel>
    </div>
  );
};
