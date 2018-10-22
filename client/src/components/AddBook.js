import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';

class AddBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  displayAuthors() {
    const {getAuthorsQuery: {loading, authors}} = this.props;
    if (loading) {
      return ( <option disabled>Loading authors</option> );
    } else {
      return authors.map(({id, name}) => (
        <option key={ id } value={id}>{ name }</option>));
    }
  }

  handleChange({target: {value, name}}) {
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        ...this.state
      },
      refetchQueries: [{query: getBooksQuery}]
    });
  }

  render() {
    return (
      <form className="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" name="name" onChange={this.handleChange}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" onChange={this.handleChange}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={this.handleChange} name="authorId">
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
