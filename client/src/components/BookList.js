import React, {Component} from 'react';
import {getBooksQuery, deleteBookMutation} from '../queries/queries';
import {graphql, compose} from 'react-apollo';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.handleSelectBook = this.handleSelectBook.bind(this);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);

    this.state = {
      selectedBookId: null
    };
  }

  handleSelectBook(selectedBookId) {
    this.setState({selectedBookId});
  }

  handleDeleteBook(e, id) {
    e.stopPropagation();
    this.props.deleteBookMutation({
      variables: {id},
      refetchQueries: [{query: getBooksQuery}]
    });
  }

  displayBooks() {
    const {getBooksQuery: {loading, books}} = this.props;
    if (loading) {
      return <div>Loading books...</div>
    } else {
      return (
        <ul>
          {books.map(({id, name, author}) => (
            <li
              key={id}
              onClick={() => this.handleSelectBook(id)}
            >
              {name}
              <button onClick={e => this.handleDeleteBook(e, id)}>Delete</button>
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return (
      <div className="book-list">
        {this.displayBooks()}
        <BookDetails id={this.state.selectedBookId}/>
      </div>
    );
  }
}

export default compose(
  graphql(getBooksQuery, {name: "getBooksQuery"}),
  graphql(deleteBookMutation, {name: "deleteBookMutation"})
)(BookList);
