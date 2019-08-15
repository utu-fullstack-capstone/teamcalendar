import React, { Component, Fragment } from 'react';
import Events from './Events';
import Feed from './Feed';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
export default class Landing extends Component {
  render() {
    return (
      <Fragment>
        <h1 style={{ color: 'white' }} className='mt-5'>
          TPS-Salibandy
        </h1>
        <h5 className='mb-4'>
          Kalenteri harjoitusten ja pelaajavierailujen varaamiseen.
        </h5>
        <Row>
          <Col xs={6}>
            <h4 className='mb-4'>
              <i class='far fa-calendar-alt mr-2' style={{ color: 'white' }} />{' '}
              kalenteri
            </h4>
          </Col>
          <Col xs={6}>
            <Dropdown className='float-right mb-4'>
              <Dropdown.Toggle variant='primary' id='dropdown-basic'>
                Joukkue
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Events />
        <h4 className='mb-4'>
          <i class='fas fa-hashtag mt-2 mr-2' style={{ color: 'white' }} />{' '}
          salibandy
        </h4>
        <Feed />
      </Fragment>
    );
  }
}
