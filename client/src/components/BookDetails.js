import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';

class BookDetails extends Component {

  displayBook() {
    const {data: {book, loading}, id} = this.props;
    if(!id) {
      return <span>No book selected</span>
    }
    if (loading) {
      return <span>Loading...</span>;
    } else {
      return (
        <div>
          <p>Id: {book.id}</p>
          <p>Name: {book.name}</p>
          <p>Genre: {book.genre}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map(({id, name}) => (<li key={id}>{name}</li>))}
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="book-details">
        {this.displayBook()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => ({variables: {id: props.id}})
})(BookDetails);
