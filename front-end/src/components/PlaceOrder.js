import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMovieById, addOrder } from "../actions/movieActions";
import {
  editUser,
  storeAnonymousUser,
  clearFeedback
} from "../actions/authActions";
import Loading from "../components/Templates/loading";
import M from "materialize-css";
import isEmpty from "../isEmpty";

class PlaceOrder extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 1,
      totalPrice: 0,
      shippingFee: 7,
      user: {},
      errors: {},
      flagged: false,
      isAuthenticated: false
    };
  }

  // user can access without an account

  componentWillMount() {
    // Checks if url contains id then passes the id to getMovieById
    if (this.props.match.params.id) {
      this.props.getMovieById(this.props.match.params.id);
    }
  }

  componentDidMount() {
    M.AutoInit();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movies.movie) {
      const { quantity, shippingFee } = this.state;
      const { movie } = nextProps.movies;
      let totalPrice = movie.price * quantity + shippingFee;

      this.setState({ totalPrice });
    }

    if (nextProps.errors) {
      let errors = {};

      Object.keys(nextProps.errors).forEach(function eachKey(key) {
        errors[key] = nextProps.errors[key][0];
      });

      this.setState({ errors });
    }

    if (
      nextProps.auth.isAuthenticated ||
      nextProps.auth.anonymousUserAuthenticated
    ) {
      this.setState({ isAuthenticated: true, user: nextProps.auth.user });
    }
  }

  componentWillUnmount() {
    this.props.clearFeedback();
  }

  addQuantity = e => {
    this.setState({
      quantity: this.state.quantity + 1,
      totalPrice:
        (this.state.quantity + 1) * this.props.movies.movie.price +
        this.state.shippingFee
    });
  };

  reduceQuantity = e => {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        totalPrice:
          (this.state.quantity - 1) * this.props.movies.movie.price +
          this.state.shippingFee
      });
    }
  };

  saveDetails = event => {
    event.preventDefault();

    this.setState({ errors: {} });
    let { user, isAuthenticated } = this.state;

    if (isAuthenticated) {
      this.props.editUser(user);
    } else {
      user["last_name"] = "none";
      user["mobile_number"] = "000";
      user["date_of_birth"] = "2020-01-01";
      user["password"] = "000";
      user["is_admin"] = "false";

      this.props.storeAnonymousUser(user);
    }
  };

  makeOrder = () => {
    let order = {
      quantity: this.state.quantity,
      discount_modifier: 0,
      total_cost: this.state.totalPrice,
      user: this.props.auth.user.id,
      movie: this.props.movies.movie.id
    };
    console.log(order.user, order.movie);
    this.props.addOrder(order);
  };

  render() {
    const {
      shippingFee,
      totalPrice,
      user,
      errors,
      isAuthenticated
    } = this.state;
    const { movie, loading } = this.props.movies; // we grab the movie object and loading from movies state
    const { feedback } = this.props;
    let content; // display different content depedning when the page is loading

    if (movie == null || loading) {
      // display loading while its fetching
      content = <Loading />;
    } else {
      content = (
        <div className="row">
          <div className="col s5">
            <img className="movieDetailsImg" src={movie.thumbnail} />
          </div>
          <div className="col s7">
            <h2 className="movieTitleDetail">
              {movie.title}
              <span className="year"> ({movie.year})</span>
            </h2>

            <div className="row" style={{ marginTop: 50 }}>
              <span className="helper-text success">
                {" "}
                {!isEmpty(feedback) ? feedback : null}
              </span>

              {isAuthenticated ? (
                this.props.auth.user.shipping_address ? (
                  <div className="address">
                    <div className="prices">
                      <h6>
                        Shipping Address:{" "}
                        {this.props.auth.user.shipping_address}
                      </h6>
                      <h6>
                        Movie price: <b>${movie.price}</b>
                      </h6>
                      <h6>
                        Shipping fee: <b>${shippingFee}</b>
                      </h6>
                    </div>

                    <div className="row">
                      <div className="col s5 quantityPicker">
                        <button
                          type="button"
                          className="col s4 waves-effect btn red darken-3"
                          onClick={this.reduceQuantity}
                        >
                          -
                        </button>
                        <input
                          id="quantity"
                          className="col s4 white center-align"
                          type="text"
                          name="quantity"
                          value={this.state.quantity}
                          readOnly
                        />
                        <button
                          className="col s4 waves-effect btn red darken-3"
                          onClick={this.addQuantity}
                        >
                          +
                        </button>
                      </div>

                      <div>
                        <h5 className="right-align">
                          <font size="+5">Total: ${totalPrice}</font>
                        </h5>
                      </div>
                    </div>

                    <div className="col s4">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="waves-effect waves-light red darken-3 btn tooltipped"
                        data-position="buttom"
                        data-tooltip="Back to home page"
                      >
                        Back{" "}
                      </Link>
                    </div>
                    <div className="col s4" />
                    <div className="col s4">
                      <Link to="/order_success">
                        <button
                          onClick={this.makeOrder}
                          className="waves-effect waves-light red darken-3 btn tooltipped"
                          data-position="buttom"
                          data-tooltip="Place this Order"
                        >
                          Place
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form className="add-order" onSubmit={this.saveDetails}>
                    <h6 style={{ marginLeft: "10px" }}>
                      {" "}
                      Please enter your address below{" "}
                    </h6>
                    <div className="input-field col s12">
                      <input
                        type="text"
                        id="shipping_address"
                        name="shipping_address"
                        className="validate"
                        value={user.shipping_address}
                        onChange={event =>
                          this.setState({
                            user: {
                              ...this.state.user,
                              shipping_address: event.target.value
                            }
                          })
                        }
                        required
                        aria-required=""
                      />
                      <label id="addressLabel" htmlFor="shipping_address">
                        Shipping address
                      </label>
                      {errors.shipping_address ? (
                        <span className="helper-text error">
                          {" "}
                          {errors.shipping_address}{" "}
                        </span>
                      ) : null}
                    </div>

                    <div className="input-field col s12">
                      <button
                        className="waves-effect waves-light red darken-3 btn"
                        type="submit"
                        id="register-btn-submit"
                      >
                        <span> Save</span>
                      </button>
                    </div>
                  </form>
                )
              ) : (
                <form className="add-order" onSubmit={this.saveDetails}>
                  <h6 style={{ marginLeft: "10px" }}>
                    {" "}
                    Please fill in your details below{" "}
                  </h6>
                  <div className="input-field col s12">
                    <input
                      type="text"
                      id="shipping_address"
                      name="shipping_address"
                      className="validate"
                      value={user.first_name}
                      onChange={event =>
                        this.setState({
                          user: {
                            ...this.state.user,
                            first_name: event.target.value
                          }
                        })
                      }
                      required
                      aria-required=""
                    />
                    <label id="addressLabel" htmlFor="shipping_address">
                      Name
                    </label>
                    {errors.first_name ? (
                      <span className="helper-text error">
                        {" "}
                        {errors.first_name}{" "}
                      </span>
                    ) : null}
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="validate"
                      value={user.email}
                      onChange={event =>
                        this.setState({
                          user: {
                            ...this.state.user,
                            email: event.target.value
                          }
                        })
                      }
                      required
                      aria-required=""
                    />
                    <label id="emailLabel" htmlFor="email">
                      Email
                    </label>
                    {errors.email ? (
                      <span className="helper-text error">
                        {" "}
                        {errors.email}{" "}
                      </span>
                    ) : null}
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="text"
                      id="shipping_address"
                      name="shipping_address"
                      className="validate"
                      value={user.shipping_address}
                      onChange={event =>
                        this.setState({
                          user: {
                            ...this.state.user,
                            shipping_address: event.target.value
                          }
                        })
                      }
                      required
                      aria-required=""
                    />
                    <label id="addressLabel" htmlFor="shipping_address">
                      Shipping address
                    </label>
                    {errors.shipping_address ? (
                      <span className="helper-text error">
                        {" "}
                        {errors.shipping_address}{" "}
                      </span>
                    ) : null}
                  </div>

                  <div className="input-field col s12">
                    <button
                      className="waves-light red btn all-btn-d"
                      type="submit"
                      id="register-btn-submit"
                    >
                      <span> Save</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="top-padding">
        <div className="container">
          <h2 align="center">ORDER PLACEMENT</h2>
          {content}
        </div>
      </div>
    );
  }
}

// we map redux movies state to props so we can access it via this.props.movies
const mapStateToProps = state => ({
  movies: state.movies,
  auth: state.auth,
  feedback: state.feedback,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getMovieById, addOrder, editUser, storeAnonymousUser, clearFeedback }
)(PlaceOrder);
