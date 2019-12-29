import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserBoard } from '../actions/Action';

class CreateBoard extends Component {

    constructor() {
        super();
        this.state = {
                playerOne: "Vishnu",
                playerTwo: "Smith",
        };
        this.handleChangeFor = this.handleChangeFor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeFor = (propertyName) => (event) => {
        this.setState({ [propertyName]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log("test 222", this.state)
        this.props.addUserBoard(this.state);
    }
    render() {
        var boards = this.props && this.props.userboards;
        console.log("RRRRRRRRRRRRRRRR", boards)
        return (
            <div className="container">
           
            	<form onSubmit={this.handleSubmit}>
            	<div className="row">
            		<div className="col-sm-6">
		            <div className="form-group">
		              <label htmlFor="playerOne">Player 1 name</label>
		              <input
		                type="text"
		                className="form-control"
		                id="playerOne"
		                autoComplete="off"
		                onChange={this.handleChangeFor('playerOne')} defaultValue={this.state.playerOne}
		                />
		            </div>
		            </div>

		            <div className="col-sm-6">
		            <div className="form-group">
		              <label htmlFor="playerTwo">Player 2 name</label>
		              <input
		                type="text"
		                className="form-control"
		                id="playerTwo"
		                autoComplete="off"
		                onChange={this.handleChangeFor('playerTwo')} defaultValue={this.state.playerTwo}
		                />
		            </div>
		            </div>

		            <div className="col-sm-12">
          	  			<button type="submit" className="btn btn-success btn-lg"> Start Game  </button>
          	  		</div>
          	 </div>
          	</form>
          	
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
   userboards: state.board
})

const mapDispatchToProps = (dispatch) => ({
	  addUserBoard: (data) => dispatch(addUserBoard(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);