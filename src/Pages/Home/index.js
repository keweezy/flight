import React, {useEffect, useState} from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import './styles.scss';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import {SimpleTabs} from '../../components/Tab';
import {images} from './data';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginRight: '2.5rem',
    marginBottom: '2.5rem',
  },
  media: {
    height: 140,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '30rem',
    overflowY: 'scroll',
    // display: 'flex',
    // flexFlow: 'row wrap',
    // justifyContent: 'center',
    [theme.breakpoints.only("xs")]: {
      width: 270,
    },
  },
  formControl: {
    marginLeft: 10,
  },
  container: {
    alignItems: 'center',
  },
  each: {
    border: 'solid 1px green',
    marginBottom: '1rem',
    borderRadius: '10px',
    display: 'flex',
    flexFlow: 'row wrap',
    columnGap: 22,
    justifyContent: 'space-between',
    padding: '1rem',
    // width:"40%"
  },
}));

const Home = () => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(3);
  const [backDate, setBackDate] = useState(1517050800);
  const [airport, setAirport] = useState('KJFK');
  const [departing, setDeparting] = useState([]);
  const [arriving, setArriving] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    getArrivingFlights();
    getDepartingFlights();
  }, []);

  const closeModal = () => {
    setOpen(false);
  };

  const selectedDate = 1517230800;

  const params = () => {
    let setBack = new Date(selectedDate - time * 60000);
    setBackDate(setBack.getTime());
  };

  const getDepartingFlights = async (e) => {
    setLoadingD(true);
    const response = await axios.get(
      `https://opensky-network.org/api/flights/departure`,
      {
        params: {
          airport: e ? e : airport,
          begin: backDate,
          end: selectedDate,
        },
      }
    );
    setLoadingD(false);
    setDeparting(response.data);
  };
  const getArrivingFlights = async (e) => {
    setLoading(true);
    const response = await axios.get(
      `https://opensky-network.org/api/flights/arrival`,
      {
        params: {
          airport: e ? e : airport,
          begin: backDate,
          end: selectedDate,
        },
      }
    );
    setLoading(false);
    setArriving(response.data);
  };

  const handleChange = (event) => {
    setTime(event.target.value);
    params();
    getDepartingFlights();
    getArrivingFlights();
  };

  const openModal = (e) => {
    setOpen(true);
    setAirport(e);
    getArrivingFlights(e);
    getDepartingFlights(e);
  };

  //   Get modal Style
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  //   Render airports
  const renderedAirports = images.map((airport, i) => (
    <Card
      className={classes.root}
      onClick={() => {
        openModal(airport.code);
      }}
      key={i}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={airport.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {airport.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {airport.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  ));

  //   Modal content
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" t style={{textAlign: 'center'}}>
        Check Arriving and Departing flight info
      </h2>
      <Grid container justify="center" className={classes.container}>
        <h3>select minutes:</h3>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            onChange={handleChange}
          >
            <MenuItem value={3}>Three minutes</MenuItem>
            <MenuItem value={5}>Five minutes</MenuItem>
            <MenuItem value={10}>Ten minutes</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <h2 style={{textAlign: 'center'}}>Flights Info</h2>
      <Grid>
        <Grid>
          <SimpleTabs
            departing={departing}
            dClass={classes.each}
            arriving={arriving}
            loading={loading}
            loadingD={loadingD}
          />
        </Grid>
      </Grid>
    </div>
  );

  return (
    <>
      <Navbar />
      <Grid container id="home-page">
        <h1>View airport traffic</h1>
        <Grid className="card-container">{renderedAirports}</Grid>
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div>
            {/* <h1>Test MOdal</h1> */}
            {body}
          </div>
        </Modal>
      </Grid>
    </>
  );
};

export default Home;
