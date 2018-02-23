import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Categories extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  renderCategories() {
    const { categories } = this.props;

    if (categories !== 'undefined') {
      return categories.map(cate => (
        <div key={cate.path}>
          <Link to={`/${cate.name}`} value={cate.name} className="item">{cate.name}</Link>
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="ui fluid vertical right tabular menu">
        <Link to={`/`} value='All' className="item">All</Link>
        {this.renderCategories()}
      </div>
    );
  }
}

export default Categories;
