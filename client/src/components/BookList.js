import React, {Component} from 'react';
import {getBooksQuery} from '../queries/queries';
import {graphql} from 'react-apollo';
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.handleChangeCurrentBookView = this.handleChangeCurrentBookView.bind(this);

    this.state = {
      bookId: null
    };
  }

  handleChangeCurrentBookView(bookId) {
    this.setState({bookId});
  }

  displayBooks() {
    const {data} = this.props;
    if (data.loading) {
      return <div>Loading books...</div>
    } else {
      return (
        <ul>
          {data.books.map(({id, name, author}) => (
            <li
              key={id}
              onClick={() => this.handleChangeCurrentBookView(id)}
            >
              {name}
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
        <BookDetails id={this.state.bookId}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
