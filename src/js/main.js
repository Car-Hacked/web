import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import { Buffer } from 'buffer';
import Spinner from 'react-bootstrap/Spinner';

import github from '../assets/github.png';

const Main = () => {
  const [garage, setGarage] = useState({ garageName: "Johnson", capacity: 500, carsInLot: 0 });
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    var socket = io("https://cartracker.fly.dev");
    socket.on('frame', (frame) => {
      if(!loaded) {
        setLoaded(true);
      }
      setImageSrc(Buffer.from(frame).toString('base64'));
    });
    var socket2 = io('https://carhackedapi-timothyagass.b4a.run');
    socket2.on('updated', (data) => {
      if (data.garageName === 'Johnson') {
        setGarage({
          garageName: data.garageName,
          capacity: data.capacity,
          carsInLot: data.carsInLot,
        });
      }
    });
    $.get('https://carhackedapi-timothyagass.b4a.run/api/v1/garages/63f95e3d12e22127cda94f78', response => {
        if (response instanceof Error) {
          return;
        }
        setGarage({
          garageName: response.garageName,
          capacity: response.capacity,
          carsInLot: response.carsInLot,
        });
    });
    window.addEventListener("beforeunload", () => {
      socket.disconnect();
      socket2.disconnect();
    });
    return () => {
      socket.disconnect();
      socket2.disconnect();
    };
  },[]);

  const Video = () => {
    if(!loaded) {
      return (<div><h3 style={{ color: 'white', marginBottom: 20 }}>Initializing server...</h3><Spinner className='videoFeed' animation="border" role="status" variant="light" /></div>);
    }
    return (<div style={{ background: "linear-gradient(0deg,rgba(103, 33, 255, 1) 0%,rgba(160, 69, 255, 1) 100%)", padding: "3px", placeItems: "center", borderRadius: "12px" }}><img className='videoFeed' id="my-img" width={500} height={281} src={'data:image/jpeg;base64,' + imageSrc} style={{ borderRadius: 12 }} /></div>);
  };  

  return (
    <div className="app-background">
      <div className="app">
        <header className="app-header">
          <Video />
          <div className="parking-wrapper">
            <div className="parking-container">
              <div className="parking-app">
                <h1 className="garage h1-unstyled">{garage.garageName}</h1>
                <h1 className="pill h1-unstyled">
                  <span className='unstyled-span'>
                    {garage.carsInLot.toString()}/
                    {garage.capacity.toString()}
                  </span>
                </h1>
                <div className="available-container">
                  <h1 className="available h1-unstyled">
                    {(garage.capacity - garage.carsInLot).toString()}{' '}
                    Available
                  </h1>
                </div>
              </div>
              <div className="gh-container">
                <div className="ico-div">
                  <img className="gh-logo" src={github} />
                </div>
                <a href="https://github.com/Car-Hacked" target="_blank">
                  <h1 className="gh-link">Visit the GitHub repository</h1>
                </a>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Main;