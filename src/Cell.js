import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { timingSafeEqual } from 'crypto';

class Cell extends Component {
  render() {
    const cellClass = classNames({
      'Cell': true,
      'populated': this.props.populated
    });
    const cellStyle = {
      width: this.props.width,
      height: this.props.height || this.props.width,
    }
    return (
      <div className={cellClass} onClick={this.props.onClick} style={cellStyle}>
      </div>
    );
  }
}

Cell.propTypes = {
  populated: PropTypes.bool,
  width: PropTypes.number.isRequired,
  height: PropTypes.number,
};

Cell.defaultProps = {
  populated: false,
};

export default Cell;
