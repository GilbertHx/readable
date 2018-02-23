import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from './../actions/action_posts';
import { _uuid } from '../utils/helpers';
import { Container, Button, Form } from 'semantic-ui-react';

class PostsNew extends Component {
  renderField(field){
    const { meta: { touched, error } } = field;
    const className=`form-group ${touched && error ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="text-help">
          {touched ?  <div>{error}</div> : ''}
        </div>
      </div>
    );
  }

  renderBodyField(field){
    const { meta: { touched, error } } = field;
    const className=`form-group ${touched && error ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <textarea
          className="form-control"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  renderSelField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''} `;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <select className="form-control" {...field.input}>
          <option value="">Select a category...</option>
          {this.props.categories.map(category => (
            <option value={category.name} key={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  onSubmit(values) {
    values['id'] = _uuid();
    values['timestamp'] = Date.now();
    const { back } = this.props.match.params;

    this.props.createPost(values, () => {
      if (back === 'index') {
        this.props.history.push('/');
      } else {
        this.props.history.push(`/${back}`);
      }
    });
  }

  render() {
    const { handleSubmit } = this.props;
    const { back } = this.props.match.params;
    let backURL = '';
    if (back === 'index') backURL = '/';
    else backURL = `/${back}`;

    return (
      <Container>
        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title For Post"
            name="title"
            placeholder="Title"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="body"
            placeholder="Body"
            component={this.renderBodyField}
          />
          <Field
            label="Author"
            name="author"
            placeholder="Author"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="category"
            placeholder="Category"
            component={this.renderSelField.bind(this)}
          />
          <Button type="submit" className="primary">
            Submit
          </Button>
          <Link to={backURL}> <Button className="basic" color='red'>Cancel</Button></Link>
        </Form>
      </Container>

    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title ) {
    errors.title = 'Enter a Title!';
  }
  if (!values.body) {
    errors.body = 'Enter some content please!';
  }
  if (!values.author) {
    errors.author = 'Enter the author please!';
  }
  if (!values.category) {
    errors.category = 'Select the category!';
  }
  return errors;
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(mapStateToProps, { createPost })(PostsNew)
);
