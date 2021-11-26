import React, { useEffect } from 'react';
import { Card, Button, Form, Row, Col, OverlayTrigger, Popover } from 'react-bootstrap';
import { connect } from 'react-redux';



const TodayStats = (props) => {
  const { stats } = props;

  useEffect(() => {

  });

  return <div>
    {stats.sort((a, b) => b.id - a.id).map(({ id, name, distance, time, load, calories }) => {
            // console.log('training', training);
            // console.log(training.name)

// calories: "14"
// distance: "12"
// id: 1637941110195
// load: "13"
// name: "bow"
// time: "11"
      
      return (
        <p className="p-0 m-0" key={id}>
          <strong>{name}</strong>
          <br />
          <span>{`Time: ${time} `}</span>
          <span>{`Dist: ${distance} `}</span>
          <span>{`Load: ${load} `}</span>
          <span>{`Cal: ${calories} `}</span>
        </p>)

          })}



  </div>
  
}

const mapStateToProps = state => ({
  stats: state.second

})


export default connect(mapStateToProps)(TodayStats)