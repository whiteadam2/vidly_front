import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { toast } from "react-toastify";

class NewMovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: { initialState: "" },
  };

  schema = Joi.object({
    _id: Joi.string().allow(""),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().integer().min(0).max(100),
    dailyRentalRate: Joi.number().min(0).max(10),
  });

  prepFormView = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  async populateGenres() {
    const genres = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    const { match, history } = this.props;

    try {
      if (match.params.id === "new")
        return this.setState({
          data: { ...this.state.data, genreId: this.state.genres[0]._id },
        });

      const movie = await getMovie(match.params.id);

      this.setState({
        data: this.prepFormView(movie),
        errors: {},
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Movie dosnt exist!");
        history.replace("/not-found");
      }

      if (ex.response && ex.response.status === 400) {
        toast.error("Bad request!");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push("/movies");
    } catch (ex) {
      if (ex.response) toast.error(ex.response.data);
    }
  };

  render() {
    return (
      <div className="login-form">
        <h1>
          {this.props.match.params.id === "new"
            ? "Add new movie"
            : "Edit the movie"}
        </h1>

        <form>
          {this.renderInput("title", "Title", true)}
          {this.renderDropDownList("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
