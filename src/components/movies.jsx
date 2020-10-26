import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./common/pagination";
import Search from "./common/search";
import Header from "./common/header";
import Filter from "./common/filtering";
import paginate from "../utils/pagination";
import TableMovies from "./tableMovies";
import NewMovieBtn from "./newMovieBtn";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: null,
    currentSort: { path: "title", order: "asc" },
    search: "",
  };

  async componentDidMount() {
    this.setState({
      movies: await getMovies(),
      genres: await getGenres(),
    });
  }

  handlePageChanging = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = async (movie_id) => {
    const previousMoviesState = this.state.movies;

    const movies = this.state.movies.filter((movie) => movie._id !== movie_id);
    this.setState({ movies });

    try {
      await deleteMovie(movie_id);
    } catch (ex) {
      if (ex.response) toast.error(ex.response.data);

      this.setState({ movies: previousMoviesState });
    }
  };

  handleLike = (movieId) => {
    const movies = this.state.movies.map((movie) => {
      if (movie._id === movieId) movie.isLiked = !movie.isLiked;
      return movie;
    });

    this.setState({ movies });
  };

  handleGenreSelection = (genreId) => {
    this.setState({ currentGenre: genreId, currentPage: 1, search: "" });
  };

  handleSort = (currentSort) => {
    this.setState({ currentSort });
  };

  handleChangeSearch = ({ currentTarget: target }) => {
    this.setState({ search: target.value, currentGenre: null, currentPage: 1 });
  };

  moviesPreparing = () => {
    const {
      movies,
      currentPage,
      pageSize,
      currentGenre,
      currentSort,
    } = this.state;

    const moviesFiltered =
      currentGenre === null
        ? movies
        : movies.filter((movie) => movie.genre._id === currentGenre);

    const searchedMovies = moviesFiltered.filter((movie) =>
      movie.title.toUpperCase().includes(this.state.search.toUpperCase())
    );

    const moviesSorted = _.orderBy(
      searchedMovies,
      [currentSort.path],
      [currentSort.order]
    );

    return {
      pagenated: paginate(moviesSorted, currentPage, pageSize),
      filtered: searchedMovies,
    };
  };

  render() {
    const {
      genres,
      currentPage,
      pageSize,
      currentGenre,
      currentSort,
    } = this.state;

    return (
      <div className="App">
        <div className="row m-2">
          <div className="col-2 mt-4">
            <Filter
              onItemSelected={this.handleGenreSelection}
              items={genres}
              selectedItem={currentGenre}
            />
          </div>

          <div className="col-10">
            {this.props.user && <NewMovieBtn history={this.props.history} />}

            <Search
              onChange={this.handleChangeSearch}
              value={this.state.search}
            />

            <Header count={this.moviesPreparing().filtered.length} />

            <TableMovies
              movies={this.moviesPreparing().pagenated}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              currentSort={currentSort}
            />

            <Pagination
              numberOfItems={this.moviesPreparing().filtered.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChanging}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
