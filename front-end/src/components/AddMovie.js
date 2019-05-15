import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMovieById } from '../actions/movieActions';

import Loading from '../components/Templates/loading';
import M from "materialize-css";
import Info from "./UIElements/Info";

class AddMovie extends Component{


    constructor(props){
        super(props)
        this.state={
            title: "",
            year: "",
            description: "",
            thumbnail: "",
            trailerLink: "",
            price: 0,
            stock: 0,
            maturityRating: 0,





        };
        
    }
    onChange=(e)=> {
            this.setState({ [e.target.id]: e.target.value });
    }







    render(){
        return(
           
            <div id="movieDetails">
                 <div className="container">
                 <h2 className="center-align">Add Movie</h2>
                 <div className="row">
                 <form className="col s12">
                 <div className="row">
                 <div className="input-field col s6">
                 <label for="title"><font size="+1">movie title</font></label>
                 <input type="text" placeholder="Enter title of movie" id="title" className="validate white" onChange={this.onChange}/>
                 
                 </div>
                 <div class="input-field col s3 offset-s3">
                 <label for="year"><font size="+1">movie year</font></label>
                 <input id="year" type="text" placeholder="Enter year of movie" class="validate white" onChange={this.onChange}/>
                 
                 </div>
                 <div className="row">
                 <div class="input-field col s12">
                 <label for="description"><font size="+1">description</font></label>
                 <textarea className="validate white"  rows= "10" placeholder="Enter movie description" id="description" type="text" onChange={this.onChange}/>
                 
                 </div>
                 </div>
                 <div className="row">
                 <div className="col s5">
                 <label for="thumbail"><font size="+1">thumbail URL</font></label>
                 <input placeholder="place a URL of Thumbail" id="thumbail" type="text" class="validate white" onChange={this.onChange}/>
                 
                 </div>
                 <div className="col s5 offset-s2">
                 <label for="trailer"><font size="+1">trailer URL</font></label>
                 <input placeholder="place a URL of Trailer" id="trailer" type="text" class="validate white" onChange={this.onChange}/>
                 
                 </div>
                 </div>
                 <div className="row">
                 <div className="col s3">
                 <label for="price"><font size="+1">movie price</font></label>
                 <input placeholder="price" id="price" type="text" class="validate white" onChange={this.onChange}/>
                 
                 </div>
                 <div className="col s3 offset-s1">
                 <label for="stock"><font size="+1">movie stock</font></label>
                 <input placeholder="avaliable stock" id="stock" type="text" class="validate white" onChange={this.onChange}/>
                 
                 </div>
                 <div className="col s4 offset-s1">
                 <label for="maturity"><font size="+1">maturity rating</font></label>
                 <input placeholder="maturity rating" id="maturity" type="text" class="validate white" onChange={this.onChange}/>
                 
                 </div>
                 </div>
                 <div className="row">
                 <div className="col s3 offset-s2">
                 <button className="waves-effect waves-light red darken-3 btn">Cancel</button>
                 </div>
                 <div className="col s3 offset-s2">
                 <button className="waves-effect waves-light red darken-3 btn">Submit</button>
                 </div>
                 <div className="col s2"></div>
                 </div>
                 </div>
                 </form>
                 </div>

                 </div>

            </div>
           

        )
    }
}
export default AddMovie;