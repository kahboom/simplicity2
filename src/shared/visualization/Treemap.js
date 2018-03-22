import React from 'react';
import PropTypes from 'prop-types';
import { NetworkFrame } from 'semiotic';
import Tooltip from './Tooltip';
import { scaleSequential } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';


const getDollars = (value) => {
  if (value > 1000000) {
    return ['$', (value / 1000000).toLocaleString(), ' M'].join('');
  } else if (value > 1000) {
    return ['$', (value / 1000).toLocaleString(), ' k'].join('');
  }
  return ['$', value.toLocaleString()].join('');
};

const getDollarsForTooltips = value => (
  [value < 0 ? '-$' : '$', Math.abs(value).toLocaleString()].join('')
);

const positiveColor = scaleSequential(interpolateLab('#ffffff', '#0099ff')).domain([0, 100]);
const negativeColor = scaleSequential(interpolateLab('#ffffff', '#ff9933')).domain([0, -100]);

const getTopLevelOnly = (data) => (
  // Needed because otherwise treemap is slow af
  data.map(item => {
    const num = parseFloat(item.deltaPercent.replace('%', ''))
    const numIsNum = typeof num === 'number' && !isNaN(num)
    return Object.assign(
      {},
      item,
      {
        children: null,
        deltaPercent: numIsNum ? num : 0,
      }
    )
  })
);

const nameText = (name, x, y, delta, maxLength) => {
  const numChars = name.length;
  const words = name.split(' ');
  const lines = [''];
  let thisLineLength = 0;
  const fill =  delta < 0.5 ? "black" : "white";
  for (let i = 0; i < words.length; i += 1) {
    if (thisLineLength + words[i].length + 1 <= maxLength) {
      lines[lines.length-1] = lines[lines.length-1] + ' ' + words[i];
      thisLineLength += words[i].length + 1;
    } else {
      lines.push(words[i]);
      thisLineLength = words[i].length;
    }
  }
  return (
    <text x={x + 4} y={y + 17} fill={fill} stroke="none" style={{ fontWeight: 'bold' }}>
      {lines.map((word, index) => (<tspan key={[name, 'line', index].join('_')} dy={16} x={x + 4}>{word}</tspan>))}
    </text>
  );
};

class Treemap extends React.Component {
  constructor(props) {
    super(props);
    this.altText = props.altText;
    this.state = { hover: null, data: this.props.data }
  }

  render() {
    const filteredData = getTopLevelOnly(this.props.data);
    const deltaDomain = filteredData.map(d => d.deltaPercent);
    const positiveMax = deltaDomain.filter(d => d > 0).sort((a, b) => b - a);
    const negativeMin = deltaDomain.filter(d => d <= 0).sort((a, b) => a - b);
    positiveMax.length > 0 && positiveColor.domain([0, positiveMax[0]])
    negativeMin.length > 0 && negativeColor.domain([0, negativeMin[0]])

    return (
      <div
        style={{
          height: this.props.height,
          width: "100%",
          margin: 50,
        }}
        alt={this.altText}
      >
        <NetworkFrame
          size={[1000, this.props.height]}
          edges={{children: filteredData, name: 'root'}}
          nodeStyle={(d, i) => {
            if (!d.deltaPercent) {
              return {
                cursor: 'pointer',
                fill: 'white',
                stroke: 'gray',
                strokeWidth: '2px',
              }
            }

            return {
              cursor: 'pointer',
              fill: d.deltaPercent > 0 ? positiveColor(d.deltaPercent) : negativeColor(d.deltaPercent),
              stroke: d.deltaPercent ? (d.deltaPercent > 0 ? '#0099ff' : '#ff9933') : 'gray',
              strokeWidth: '2px',
            }
          }}
          edgeStyle={(d, i) => ({
            cursor: 'pointer',
            stroke: 'white',
            fill: 'white',
          })}
          customHoverBehavior={d => (d && d.name ?
            this.setState({ hover: d.name }) : this.setState({ hover: null }))
          }
          nodeIDAccessor={d => {return d.name.split(' ').join('-')}}
          hoverAnnotation
          networkType={{
            type: "treemap",
            projection: "horizontal",
            nodePadding: 2,
            forceManyBody: -15,
            edgeStrength: 1.5,
            padding: 3,
            hierarchySum: d => d.size,
          }}
          tooltipContent={d => {
            if (d.name === 'root') { return; }
            return (<Tooltip
              title={d.name}
              textLines={[{text: d.deltaPercent, color: 'black'}]}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
              }}
            />)
          }}
          nodeLabels={d => d.name !== 'root' ? d.name : ''}
          customClickBehavior={ d => {
            if (!d.path) { return; }

            const deeperProps = Object.assign(
              d,
              this.props
            )
            this.props.diveDeeper(deeperProps)
          }}
        />
      </div>
    );
  }
}

Treemap.propTypes = {
  height: PropTypes.number,
  data: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  diveDeeper: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  altText: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

Treemap.defaultProps = {
  height: 450,
  data: [],
  diveDeeper: null,
  altText: 'Treemap',
};

export default Treemap;
