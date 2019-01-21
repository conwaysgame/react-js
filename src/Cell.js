import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Cell extends Component {
  render() {
    const cellClass = classNames({
      'Cell': true,
      'populated': this.props.populated
    });
    return (
      <div className={cellClass}>
      </div>
    );
  }
}

Cell.propTypes = {
  populated: PropTypes.bool,
};

Cell.defaultProps = {
  populated: false
};

export default Cell;
