import {gql} from 'apollo-boost';

const getBooksQuery = gql`
  {
    books {
      id
      author {
        id
        name
      }
      name
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      age
      name
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: String!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};
