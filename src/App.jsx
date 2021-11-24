import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { add, remove } from './store/actions';


const TaskCard = ({id}) => {
  return (<Card key={id}>
        <Card.Header>Card title</Card.Header>
        <Card.Body>Card body</Card.Body>
        <Card.Footer>Card footer</Card.Footer>
      </Card>)
}




const App = (props) => {
  console.log('props in app', props)
  console.log('state in props', props.state)

  const addHandler = (e) => props.add('adding text')
  const removeHandler = () => props.remove('removing text')
  // props.testFunction();

  return (<div className="container p-2">
    <Form>
      <Row>
        <Col>
        <Form.Control size="lg" placeholder="Name" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control size="lg" placeholder="Time" />
        </Col>
        <Col>
          <Form.Select size="lg" aria-label="select power">
            <option value="1">Minutes</option>
            <option value="2">H:M:S</option>
          </Form.Select>     
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control size="lg" placeholder="Distance" />
        </Col>
        <Col>
          <Form.Select size="lg" aria-label="select power">
            <option value="1">Meters</option>
            <option value="2">KiloMeters</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control size="lg" placeholder="Load" />
        </Col>
        <Col>
          <Form.Select size="lg" aria-label="select power">
            <option value="1">Level</option>
            <option value="2">Kg</option>
          </Form.Select>        
        </Col>
      </Row>

    </Form>
    
      <Button onClick={addHandler}>{'Add Button'}</Button>
      {/* <Button onClick={removeHandler}>{'Remove Button'}</Button> */}
      {/* <Button onClick={testHandler} variant='danger'>{'test Button'}</Button> */}
    <div className="d-flex flex-column">
      {JSON.stringify(props.state)}
      <TaskCard id={1} />
      <TaskCard id={2} />
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
