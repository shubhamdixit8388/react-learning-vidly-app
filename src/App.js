import React, { Component } from 'react';
import './App.css';
import { getMovies } from './services/fakeMovieService'


class App extends Component {
  state = {
    movies: getMovies()
  };
  
  render() { 
    console.log(this.state.movies);
    return <main className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            
            this.state.movies.map(movie => {
              return <tr key={movie.title}>
                      <th scope="row">1</th>
                      <td>movie.title</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td><button className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
            })
          }
        </tbody>
      </table>
    </main>
  }
}
 
export default App;
