import React from 'react';
import PropTypes from 'prop-types';
import TopicCard from '../shared/TopicCard';

const Topics = props => (
  <div>
    <div className="row">
      <div className="col-sm-12">
        <h2>View citywide topic <strong>dashboards</strong> about your community.</h2>
      </div>
    </div>
    <div className="row">
      {props.topics.map((topic, i) => (
        <div className="col-xs-4" key={['topic', i].join('_')}>
          <TopicCard topic={topic} entity="city" label="City of Asheville" />
        </div>
      ))}
    </div>
  </div>
);

Topics.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string),
};

Topics.defaultProps = {
  topics: [
    'BUDGET',
    'CAPITAL_PROJECTS',
    //'CRIME',
    //'DEVELOPMENT',
    'HOMELESSNESS',
  ],
};

export default Topics;
