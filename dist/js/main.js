import React from 'react';
import $ from 'jquery';

class Main extends React.Component {
    async render() {
        let response = await $.get('http://park-a-lot.herokuapp.com/api/v1/garages');
        console.log(response);

        return (<div>
            <h1>hello!</h1>
        </div>);
    }
}

export default Main;