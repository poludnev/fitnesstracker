import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { add, remove } from './store/actions';


const TaskCard = ({ id, data }) => {
  console.log(data);
  
  return (<Card key={id}>
        <Card.Header>{data.name}</Card.Header>
    <Card.Body>
      <p>Time: {data.time}</p>
      <p>Duration: {data.time}</p>
      <p>Load: {data.time}</p>
      <p>Calories: {data.time}</p>
    </Card.Body>

      </Card>)
}




const App = (props) => {
  console.log('props in app', props)
  console.log('state in props', props.state)

  const addHandler = (data) => props.add(data)
  const removeHandler = () => props.remove('removing text')

  const excerciseIds = Object.keys(props.state.first).sort((a, b) => (b - a));

  // console.log(firstStateToArray);



  // props.testFunction();

  return (<div className="container p-2">

    <Formik
      initialValues={
        {
          name: '1',
          time: '2',
          distance: '3',
          load: '4',
          callories: '5',

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
        console.log(errors);
        return errors;
      }}
      onSubmit={
        ((values, { setSubmitting }) => {
          const { name, time, distance, load, callories } = values;
          

          addHandler(values);

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
                placeholder="Callories"
                name="callories"
                value={values.callories}
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
      {excerciseIds.map((id) => !props.state.first[id] ? null : <TaskCard key={id} data={props.state.first[id]}/>)}
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
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
