import React, { useEffect } from 'react';
import { Card, Button, Form, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import axios from 'axios';
import _ from 'lodash';

import { add, remove, addToday } from './store/actions';
import TodayStats from './TodayStats';



// 


  
const trainingIdToDate = (trainingID) => {
  // console.log(trainingID)
  const year = trainingID.substr(0, 4);

  
  const month = trainingID.substr(4, 2);
  const date = trainingID.substr(6);
  // console.log(year, month, date);

  const trainingDate = new Date(Date.UTC(year, month - 1, date));
  
  // console.log('date', trainingDate)

  return trainingDate

  
}

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getYear() === today.getYear();
}

const App = (props) => {
  // console.log('props in app', props)
  // console.log('state in props', props.state)

  const addHandler = (data) => props.add(data)
  // const removeHandler = () => props.remove('removing text')

  // const excerciseIds = Object.keys(props.state.first).sort((a, b) => (b - a));

  const fetchData = async () => {

    try {
      const response = await axios.get('https://poludnev.com/api/fitness/log');

      const { data } = response;
      console.log('data respond', data);

      const n = _.pickBy(data.trainings.byID, (a) => {
        console.log(a)
        console.log(a.trainingId)
        return isToday(trainingIdToDate(a.trainingId));
      });
      console.log('n', n);


      props.addToday(n);




    } catch (e) {

      console.error('data request error', e);
    

    };

  }


  useEffect(() => {
    fetchData();
  }, []);

  // console.log(firstStateToArray);



  // props.testFunction();

  return (<div className="container p-2">
    <Formik
      initialValues={
        {
          name: '',
          time: '',
          distance: '',
          load: '',
          calories: '',

        }}
      validate={(values) => {
        // console.log(values, 'validate')
        const errors = {};
        const { name, time, distance, load } = values;
        if (!name || !time || !distance || !load ) {
          // console.log('no valid')

          errors.name = 'Required';
          errors.time = 'Required';
          errors.distance = 'Required';
          errors.load = 'Required'
          
        }
        // console.log(errors);
        return errors;
      }}
      onSubmit={
        ((values, { setSubmitting }) => {
          // const { name, time, distance, load, calories } = values;
          // console.log(values)

          addHandler(values);
          fetchData();

        setSubmitting(false)
        })
      }
    >
      {(props) => {
        // console.log('formik props', props);
        const { values, handleChange, handleSubmit, isSubmitting, isValid, errors } = props;
        return (<Form onSubmit={handleSubmit}>
      <Row className="my-2">
        <Col>
              <Form.Control
                size="lg"
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={errors.name}
              />
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
              <Form.Control
                size="lg"
                placeholder="Time"
                name="time"
                value={values.time}
                onChange={handleChange}
                isInvalid={errors.time}
              />
        </Col>
        <Col>
          <Form.Select size="lg" aria-label="select power">
            <option value="1">Minutes</option>
            <option value="2">H:M:S</option>
          </Form.Select>     
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
              <Form.Control
                size="lg"
                placeholder="Distance"
                name="distance"
                value={values.distance}
                onChange={handleChange}
                isInvalid={errors.distance}
              />
        </Col>
        <Col>
          <Form.Select size="lg" aria-label="select power">
            <option value="1">Meters</option>
            <option value="2">KiloMeters</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
              <Form.Control
                size="lg"
                placeholder="Load"
                name="load"
                value={values.load}
                onChange={handleChange}
                isInvalid={errors.load}
              />
        </Col>
        <Col>
          <Form.Select size="lg" aria-label="select power">
            <option value="1">Level</option>
            <option value="2">Kg</option>
          </Form.Select>        
        </Col>
      </Row>
      <Row className="my-2">
        <Col>
              <Form.Control
                size="lg"
                placeholder="Calories"
                name="calories"
                value={values.calories}
                onChange={handleChange}
              />
        </Col>
      </Row>
          <Button
            size="lg"
            variant={(!isValid ? "danger" : "primary")}
            type="submit"
            className="w-100 my-2"
            disabled={isSubmitting || !isValid}
          >Submit</Button>
    </Form>)
      }}
    </Formik>
    
    <div className="d-flex flex-column">
      {/* {JSON.stringify(props.state)} */}
      {/* {props.state.second.map((training) => {
            console.log('training', training);
            console.log(training.name)

            return <p key={training.id}>{training.name}</p>

          })} */}
      <TodayStats stats={props.state.second} />
      {/* {excerciseIds.map((id) => !props.state.first[id] ? null : <TaskCard key={id} data={props.state.first[id]}/>)} */}
      {/* <TaskCard id={1} /> */}
      {/* <TaskCard id={2} /> */}
    </div>

  </div>)
};

const mapStateToProps = state => ({
  state

})

const mapDispatchToProps = {
  add,
  remove,
  addToday
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
