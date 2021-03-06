import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';

import github from '../assets/github.png';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      garageName: '',
      capacity: 0,
      carsInLot: 0,
    };
  }
  componentDidMount() {
    var socket = io('https://park-a-lot.herokuapp.com/');
    socket.on('updated', (data, other) => {
      if (data === '5e2cec15c969e7185ab7d04d') {
        $.get(
          'https://park-a-lot.herokuapp.com/api/v1/garages/5e2cec15c969e7185ab7d04d',
          response => {
            this.setState({
              garageName: response.garageName,
              capacity: response.capacity,
              carsInLot: response.carsInLot,
            });
          }
        );
      }
    });
    $.get(
      'https://park-a-lot.herokuapp.com/api/v1/garages/5e2cec15c969e7185ab7d04d',
      response => {
        if (response instanceof Error) {
          return;
        }
        this.setState({
          garageName: response.garageName,
          capacity: response.capacity,
          carsInLot: response.carsInLot,
        });
      }
    );
  }
  render() {
    return (
      <div className="app-background">
        <div className="app">
          <header className="app-header">
            <div className="parking-container">
              <div className="parking-app">
                <h1 className="garage">{this.state.garageName}</h1>
                <h1 className="pill">
                  <span>
                    {this.state.carsInLot.toString()}/
                    {this.state.capacity.toString()}
                  </span>
                </h1>
                <div className="available-container">
                  <h1 className="available">
                    {(this.state.capacity - this.state.carsInLot).toString()}{' '}
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
          </header>
        </div>
      </div>
    );
  }
}

export default Main;
