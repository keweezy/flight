import React from 'react';
import Textbox from '../../components/Textbox';

export const DisplayDeparture = ({departing, classes}) => {
  return departing.map((info, i) => {
    return (
      <div className={classes} key={i}>
        <Textbox
          value={info.firstSeen || ''}
          disabled={true}
          label="First Seen"
        />
        <Textbox
          value={info.lastSeen || ''}
          disabled={true}
          label="Last Seen"
        />
        <Textbox value={info.icao24 || ''} disabled={true} label="icao24" />
        <Textbox
          value={info.estArrivalAirport || ''}
          disabled={true}
          label="Departure airport"
        />
        <Textbox
          value={info.callsign || ''}
          disabled={true}
          label="Call Sign"
        />
      </div>
    );
  });
};

export const DisplayArrival = ({departing, classes}) => {
  return departing.map((info, i) => {
    return (
      <div className={classes} key={i}>
        <Textbox
          value={info.firstSeen || ''}
          disabled={true}
          label="First Seen"
        />
        <Textbox
          value={info.lastSeen || ''}
          disabled={true}
          label="Last Seen"
        />
        <Textbox value={info.icao24 || ''} disabled={true} label="icao24" />
        <Textbox
          value={info.estArrivalAirport || ''}
          disabled={true}
          label="Arrival airport"
        />
        <Textbox
          value={info.callsign || ''}
          disabled={true}
          label="Call Sign"
        />
      </div>
    );
  });
};
