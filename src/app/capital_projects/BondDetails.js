import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import BondDetailsTable from './BondDetailsTable';
import BarChartContainer from '../../shared/visualization/BarChartContainer';

const getIconPath = (type) => {
  switch (type) {
    case 'Transportation':
      return require('./transportationBondIcon.png'); // eslint-disable-line
    case 'Parks':
      return require('./parksBondIcon.png'); // eslint-disable-line
    default:
      return require('./housingBondIcon.png'); // eslint-disable-line
  }
};

const getBondText = (type) => {
  switch (type) {
    case 'Transportation':
      return 'The $32 million for transportation projects supports the completion of road resurfacing and sidewalk improvements; new sidewalk and greenway projects; and pedestrian safety projects such as bus shelters, accessible crossings, signals, and traffic calming.';
    case 'Parks':
      return 'The $17 million for parks projects supports the completion of major improvements to five parks and recreation facilities; acquiring land for parks; and improving outdoor courts, playgrounds and ball field lighting throughout the city.';
    default:
      return 'The $25 million for housing affordability provides additional support for the Housing Trust Fund and other programs that assist in creating diverse and affordable housing choices. It also enables the City to re-purpose city-owned land for development that supports housing affordability.';
  }
};

const getDollars = (value) => {
  if (Math.abs(value) > 1000000) {
    return [value < 0 ? '-$' : '$', (Math.abs(value) / 1000000).toFixed(0).toLocaleString(), ' M'].join('');
  } else if (Math.abs(value) > 1000) {
    return [value < 0 ? '-$' : '$', (Math.abs(value) / 1000).toFixed(0).toLocaleString(), ' k'].join('');
  }
  return [value < 0 ? '-$' : '$', Math.abs(value).toFixed(0).toLocaleString()].join('');
};

const getDollarsLong = value => (
  [value < 0 ? '-$' : '$', Math.abs(value).toLocaleString()].join('')
);

const testData = {
  Transportation: [
    { phase: 'Design', 'Number of projects': 5 },
    { phase: 'Planning', 'Number of projects': 26 },
    { phase: 'Construction', 'Number of projects': 0 },
    { phase: 'Completed', 'Number of projects': 0 },
  ],
  Parks: [
    { phase: 'Design', 'Number of projects': 2 },
    { phase: 'Planning', 'Number of projects': 7 },
    { phase: 'Construction', 'Number of projects': 0 },
    { phase: 'Completed', 'Number of projects': 0 },
  ],
  Housing: [
    { phase: 'Project formation', 'Number of projects': 100 },
    { phase: 'Design', 'Number of projects': 0 },
    { phase: 'Planning', 'Number of projects': 0 },
    { phase: 'Construction', 'Number of projects': 0 },
    { phase: 'Completed', 'Number of projects': 0 },
  ],
};

const testParksData = [
  {
    name: 'Bill Field Improvements & Lighting',
    zip: 'Citywide',
    phase: 'Planning',
    construction_start: 'Summer 18',
    total: '$1,200,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 12000000,
  },
  {
    name: 'Jake Rusher Park',
    zip: '28704',
    phase: 'Planning',
    construction_start: 'Fall 18',
    total: '$825,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 825000,
  },
  {
    name: 'Memorial Stadium',
    zip: '28801',
    phase: 'Planning',
    construction_start: 'Summer 20',
    total: '$4,075,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 4075000,
  },
  {
    name: 'Montford Complex Improvements',
    zip: '28801',
    phase: 'Design',
    construction_start: 'Spring 18',
    total: '$1,700,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 1700000,
  },
  {
    name: 'Outdoor Court Improvements',
    zip: 'Citywide',
    phase: 'Planning',
    construction_start: 'Spring 18',
    total: '$1,015,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 1015000,
  },
  {
    name: 'Playground Improvements',
    zip: 'Citywide',
    phase: 'Design',
    construction_start: 'Spring 18',
    total: '$1,015,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 1015000,
  },
  {
    name: 'Richmond Hill Park Improvments',
    zip: '28806',
    phase: 'Planning',
    construction_start: 'Spring 19',
    total: '$520,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 520000,
  },
  {
    name: 'Wesley Grant Center',
    zip: '28801',
    phase: 'Planning',
    construction_start: 'Summer 20',
    total: '$4,650,000',
    description: 'Add a description of this project here...',
    'Expended funds': 0,
    'Remaining funds': 4650000,
  },
];

const testTransportationData = {
  'Road Resurfacing and Sidewalk Improvements': [
    {
      name: 'Sidewalk Improvements - Vermont Ave',
      zip: '28806',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$748,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 748000,
    },
    {
      name: 'Sidewalk Improvements - Haywood St.',
      zip: '28801',
      phase: 'Planning',
      construction_start: 'Spring 19',
      total: '$815,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 815000,
    },
    {
      name: 'Sidewalk Improvements - Fulton St',
      zip: '28801',
      phase: 'Planning',
      construction_start: 'Spring 19',
      total: '$252,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 252000,
    },
    {
      name: 'Road Resurfacing and Sidewalk Improvements 2019',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$5,610,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 5610000,
    },
    {
      name: 'Road Resurfacing and Sidewalk Improvements 2018',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Summer 18',
      total: '$4,929,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 4929000,
    },
    {
      name: 'Road Resurfacing and Sidewalk Improvements 2017',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Summer 17',
      total: '$4,273,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 4273000,
    },
  ],
  'New Sidewalks and Greenways': [
    {
      name: 'Greenway Neighborhood Connectors',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Spring 19',
      total: '$1,000,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 1000000,
    },
    {
      name: 'New Sidewalk - Airport Rd',
      zip: '28704',
      phase: 'Planning',
      construction_start: 'Spring 18',
      total: '$572,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 572500,
    },
    {
      name: 'New Sidewalk - Gerber Rd',
      zip: '28803',
      phase: 'Planning',
      construction_start: 'Summer 20',
      total: '$357,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 357000,
    },
    {
      name: 'New Sidewalk - Hill St',
      zip: '28801',
      phase: 'Planning',
      construction_start: 'Spring 18',
      total: '$468,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 468000,
    },
    {
      name: 'New Sidewalk - Johnston Blvd',
      zip: '28806',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$1,372,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 1372000,
    },
    {
      name: 'New Sidewalk - Mills Gap',
      zip: '28803',
      phase: 'Planning',
      construction_start: 'Summer 20',
      total: '$128,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 128000,
    },
    {
      name: 'New Sidewalk - New Haw Creek Rd',
      zip: '28805',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$1,120,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 1120000,
    },
    {
      name: 'New Sidewalk - Onteora Rd',
      zip: '28803',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$588,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 588000,
    },
    {
      name: 'New Sidewalk - Overlook Rd',
      zip: '28803',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$213,000.00',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 213000,
    },
    {
      name: 'New Sidewalk - Patton Ave Gaps',
      zip: '28806',
      phase: 'Planning',
      construction_start: 'Summer 21',
      total: '$616,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 616000,
    },
    {
      name: 'New Sidewalk - Swannanoa River Rd',
      zip: '28805',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$756,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 765000,
    },
    {
      name: 'New Sidewalk, Sidewalk Rehab, and Resurfacing - Brooklyn Rd',
      zip: '28803',
      phase: 'Planning',
      construction_start: 'Summer 19',
      total: '$940,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 940000,
    },
    {
      name: 'Swannanoa River Greenway',
      zip: '28803',
      phase: 'Planning',
      construction_start: 'Spring 19',
      total: '$3,600,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 3600000,
    },
  ],
  'Pedestrian Safety': [
    {
      name: 'Bus Shelters 2017',
      zip: 'Citywide',
      phase: 'Design',
      construction_start: 'Summer 17',
      total: '$180,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 180000,
    },
    {
      name: 'Bus Shelters 2017/18',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Winter 17',
      total: '$185,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 185000,
    },
    {
      name: 'Bus Shelters 2018',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Summer 18',
      total: '$135,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 135000,
    },
    {
      name: 'Ped Accessible Crossing - Patton Ave at Haywood Rd',
      zip: '28806',
      phase: 'Planning',
      construction_start: 'TBD',
      total: '$62,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 62500,
    },
    {
      name: 'Ped Accessible Crossing - Patton and Florida',
      zip: '28806',
      phase: 'Planning',
      construction_start: 'TBD',
      total: '$62,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 62500,
    },
    {
      name: 'Ped accessible Crossing - Sweeten Cr Rd',
      zip: '28803',
      phase: 'Planning',
      construction_start: 'TBD',
      total: '$62,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 62500,
    },
    {
      name: 'Signal - Patton and Asheland',
      zip: '28801',
      phase: 'Design',
      construction_start: 'Summer 17',
      total: '$187,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 187500,
    },
    {
      name: 'Signal - Patton at Lexington',
      zip: '28801',
      phase: 'Design',
      construction_start: 'Summer 17',
      total: '$187,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 187500,
    },
    {
      name: 'Signal - Patton at N/S French Broad',
      zip: '28801',
      phase: 'Design',
      construction_start: 'Summer 17',
      total: '$187,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 187500,
    },
    {
      name: 'Signal - Patton at Otis',
      zip: '28801',
      phase: 'Design',
      construction_start: 'Summer 17',
      total: '$187,500',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 187500,
    },
    {
      name: 'Traffic Calming 2017',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Fall 17',
      total: '$200,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 200000,
    },
    {
      name: 'Traffic Calming 2018',
      zip: 'Citywide',
      phase: 'Planning',
      construction_start: 'Spring 18',
      total: '$200,000',
      description: 'Add a description of this project here...',
      'Expended funds': 0,
      'Remaining funds': 200000,
    },
  ],
};

const renderSubTypeButtons = subType => (
  <div className="btn-group pull-right" style={{ marginBottom: '3px' }}>
    <Link to={{ pathname: '/capital_projects/details', query: { type: 'Transportation', subType: 'Road Resurfacing and Sidewalk Improvements' } }}>
      <button className={subType === 'Road Resurfacing and Sidewalk Improvements' ? 'btn btn-primary btn-xs active' : 'btn btn-primary btn-xs'} style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>Road & Sidewalk Improvements</button>
    </Link>
    <Link to={{ pathname: '/capital_projects/details', query: { type: 'Transportation', subType: 'New Sidewalks and Greenways' } }}>
      <button className={subType === 'New Sidewalks and Greenways' ? 'btn btn-primary btn-xs active' : 'btn btn-primary btn-xs'} style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>New Sidewalks & Greenways</button>
    </Link>
    <Link to={{ pathname: '/capital_projects/details', query: { type: 'Transportation', subType: 'Pedestrian Safety' } }}>
      <button className={subType === 'Pedestrian Safety' ? 'btn btn-primary btn-xs active' : 'btn btn-primary btn-xs'} style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}>Pedestrian safety</button>
    </Link>
  </div>
);

const renderTables = (type, subType) => {
  switch (type) {
    case 'Transportation':
      return (
        <div>
          {renderSubTypeButtons(subType)}
          <BondDetailsTable data={testTransportationData[subType]} title={subType} />
        </div>
      );
    case 'Parks':
      return <BondDetailsTable title={type} data={testParksData} />;
    default:
      return '';
  }
};

const testExpenditureData = {
  Transportation: [{ name: 'Transportation bonds funding', allocated: 32000000, 'Expended funds': 0, 'Remaining funds': 32000000 }],
  Parks: [{ name: 'Parks bonds funding', allocated: 17000000, 'Expended funds': 5000000, 'Remaining funds': 17000000 }],
  Housing: [{ name: 'Housing bonds funding', allocated: 25000000, 'Expended funds': 0, 'Remaining funds': 25000000 }],
};

const BondDetails = props => (
  <div>
    <div className="row">
      <div className="col-sm-12">
        <img alt={[props.location.query.type, 'bonds', 'icon'].join(' ')} src={getIconPath(props.location.query.type)} style={{ width: '100px', float: 'left', marginRight: '10px' }}></img>
        <h1>{props.location.query.type} bonds</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <h3>How will these funds be used?</h3>
        <p>{getBondText(props.location.query.type)}</p>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <h3>How much has been spent so far? What progress has been made?</h3>
        <p>TODO: Some general comments here on when all money is projected to be spent and when all projects are expected to be completed. Click the arrows at the left of each row to see more details about a project.</p>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-6">
        <BarChartContainer data={testExpenditureData[props.location.query.type]} layout="vertical" secondaryTickFormatter={getDollars} toolTipFormatter={getDollarsLong} mainAxisDataKey="name" dataKeys={['Remaining funds', 'Expended funds']} chartTitle={[props.location.query.type, 'bond funds expended'].join(' ')} chartText={['The below chart shows the amount of funds expended and the amount remaining for', props.location.query.type, 'bond projects'].join(' ')} colorScheme="bright_colors_2" altText={[props.location.query.type, 'bond project funds expended'].join(' ')} hidePrimaryAxis domain={['dataMin', 32000000]} stacked />
      </div>
      <div className="col-sm-6">
        <BarChartContainer data={testData[props.location.query.type]} mainAxisDataKey="phase" dataKeys={['Number of projects']} chartTitle={[props.location.query.type, 'bond project phases'].join(' ')} chartText={['The below chart shows the total number of', props.location.query.type, 'projects and their current phase of development'].join(' ')} colorScheme="bright_colors" altText={[props.location.query.type, 'bond project phases bar chart'].join(' ')} />
      </div>
    </div>
    <hr />
    <div className="row">
      <div className="col-sm-12">
        <h3>What are the projects?</h3>
        <p>TODO: Brief paragraph about the projects? Some are citywide, some by specific location, and how they were decided upon?</p>
        <p>TODO: the project names are too long...can we a) abbreviate the project type somehow? b) switch street to come first? c) use an icon to symbolize type of project, and then provide a key for those? e.g.: <i className="fa fa-road"></i><i className="fa fa-wheelchair-alt"></i> &mdash;&gt; Road resurfacing and sidewalk improvements <i className="fa fa-wheelchair-alt"></i><i className="fa fa-plus"> &mdash;&gt; New sidewalk</i><i className="fa fa-pagelines"></i> &mdash;&gt; greenway</p>
        {renderTables(props.location.query.type, props.location.query.subType || 'Road Resurfacing and Sidewalk Improvements')}
      </div>
    </div>
    <hr />
    <div className="row">
      <div className="col-sm-12">
        <h3>How much has been spent on each project so far?</h3>
        <p>Brief paragraph about spending/timeline, etc?</p>
          {props.location.query.type === 'Transportation' && renderSubTypeButtons(props.location.query.subType || 'Road Resurfacing and Sidewalk Improvements')}
        <div style={{ clear: 'both' }}>
          <BarChartContainer data={props.location.query.type === 'Parks' ? testParksData : testTransportationData[props.location.query.subType || 'Road Resurfacing and Sidewalk Improvements']} layout="vertical" secondaryTickFormatter={getDollars} toolTipFormatter={getDollarsLong} mainAxisDataKey="name" dataKeys={['Remaining funds', 'Expended funds']} chartTitle={[props.location.query.type, 'funds expended by project'].join(' ')} chartText={['The below chart shows the', props.location.query.type, 'funds expended and remaining by project'].join(' ')} colorScheme="bright_colors_2" altText={[props.location.query.type, 'bond project funds expended by project'].join(' ')} stacked yAxisWidth={200} />
        </div>
      </div>
    </div>
  </div>
);

BondDetails.propTypes = {
  type: PropTypes.string,
  location: PropTypes.object, // eslint-disable-line
};

export default BondDetails;


