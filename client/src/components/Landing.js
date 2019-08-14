import React, { Component, Fragment } from 'react';
import Events from './Events';
import Feed from './Feed';

export default class Landing extends Component {
  render() {
    return (
      <Fragment>
        <br />
        <br />
        <h1 style={{ color: 'white' }}>TPS-Salibandy</h1>
        <h5>Kalenteri harjoitusten ja pelaajavierailujen varaamiseen.</h5>
        <br />
        <h4>
          <i class='far fa-calendar-alt' /> kalenteri
        </h4>
        <Events />
        <br />
        <h4>
          <i class='fas fa-hashtag' /> salibandy
        </h4>
        <Feed />
      </Fragment>
    );
  }
}
