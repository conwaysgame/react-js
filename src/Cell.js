import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  render() {
    return (
      <div className="Cell">
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
