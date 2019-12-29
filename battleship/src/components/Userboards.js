import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDevice } from '../actions/Action';

class UserBoards extends Component {
    constructor() {
        super();
         this.state = {
                isComplete1: false,
                isComplete2: false,
                horizontal:true,

                battleship1:false,
                cruisers1:false,
                destroyers1:false,
                submarines1:false,
                user1Added:0,
                board1Active : true,

                battleship2:false,
                cruisers2:false,
                destroyers2:false,
                submarines2:false,
                user2Added:0,
                startGame: false,
                board2Active : false,

        };
        this.handleClickFor = this.handleClickFor.bind(this);
        this.onHover = this.onHover.bind(this);
        this.staetGame = this.staetGame.bind(this);
        this.fireEvent = this.fireEvent.bind(this);        
    }
    handleClickFor(event) {
        event.preventDefault();
        var element = document.getElementById(event.target.id);
        console.log("Selection",element)
        //element.classList.add("filled");
        //console.log("Selection",rowno,colno)
        /*if(this.state.horizontal && this.state.user1Completed == false){
            if(this.state.user1Submarines == false){
               for (var i = 0; i < 4; i++) {
                 var next = rowno + colno++
                 document.getElementById(next).classList.add("filled");
               }
               this.setState({user1Submarines:true})
            } else if(this.state.user1Destroyers == false){
             for (var i = 0; i < 3; i++) {
                 var next = rowno + colno++
                 document.getElementById(next).classList.add("filled");
               }
               this.setState({user1Destroyers:true})
            } else if(this.state.user1Cruisers == false){
               for (var i = 0; i < 2; i++) {
                 var next = rowno + colno++
                 document.getElementById(next).classList.add("filled");
               }
               this.setState({user1Cruisers:true, user1Completed:true })
            }
        }  */     

    }
    addDevice(brd, device, type, pos){
      var obj = {
        direction:this.state.horizontal ? 'horizontal' : 'Vertical',
        type:type,
        position:pos,
        name:device,
        user_id:brd._id
      }
      console.log("uuuuuuuuuuuuuu", device, type, pos, obj)
      var boardsArr = this.props && this.props.userboards && this.props.userboards.userBoards
      if(brd.user_name == boardsArr[0].user_name){
        this.setState((prevState,) => ({ user1Added: prevState.user1Added + 1}));
        if(device == 'battleship'){
          document.getElementById("0battleship").style.display = "none";
        }
        if(device == 'cruisers'){
           document.getElementById("0cruisers").style.display = "none";

        }
        if(device == 'destroyers'){
           document.getElementById("0destroyers").style.display = "none";
        }
        if(device == 'submarines'){
           document.getElementById("0submarines").style.display = "none";
        }
      }
      if(brd.user_name == boardsArr[1].user_name){
        this.setState((prevState,) => ({ user2Added: prevState.user2Added + 1}));

        if(device == 'battleship'){
          document.getElementById("1battleship").style.display = "none";
        }
        if(device == 'cruisers'){
           document.getElementById("1cruisers").style.display = "none";
        }
        if(device == 'destroyers'){
           document.getElementById("1destroyers").style.display = "none";
        }
        if(device == 'submarines'){
           document.getElementById("1submarines").style.display = "none";
        }
      }
      //console.log("addDevice....",boardsArr, obj)
      this.props.addDevice(obj);
    }
    onHover(event) {
      //console.log("uuuuuuuuuuuuuuuuuu", this.state)
        //console.log("test onHover", event.target)
    }
    staetGame(){
        console.log("uuuuuuuuuuuuuuuuuu", this.state)
        this.setState({startGame:true, user1Added:0, user2Added:0})
    }
    fireEvent(){
      console.log("RRRRRR")
    }
    createTable = () => {
      let table = []
      var boards = this.props && this.props.userboards && this.props.userboards.userBoards && this.props.userboards.userBoards[0].square_grid;
      var alphabet = "ABCDEFGHIJKL".split("");
      for (let i = 0; i < boards; i++) {
        let children = []
        for (let j = 0; j < boards; j++) {
          if(j == 0){
            children.push(<td>{`${alphabet[i]}`}</td>)
          }else{
            children.push(<td onMouseOver={this.onHover}  onClick={this.handleClickFor} id={`${alphabet[i]}${j}`}> {`${alphabet[i]}${j}`} </td>)
          }
        }
        //Create the parent and add the children
        table.push(<tr>{children}</tr>)
      }
      return table
    }


    render() {
        var boards = this.props && this.props.userboards && this.props.userboards.userBoards;
        console.log("RRRRRRRRRRRRRRRR", boards)
        return (
           <div className="borard-container">
            <div className="row">
             {boards.map((brd, index)=>(
              <div className="col-sm-6">
                    <h3> {brd.user_name} </h3>

                      <table class="table table-bordered">
                         <thead>
                              <tr>
                                <th>  </th>
                                <th> 1 </th>
                                <th> 2 </th>
                                <th> 3 </th>
                                <th> 4 </th>
                                <th> 5 </th>
                                <th> 6 </th> 
                                <th> 7 </th>
                                <th> 8 </th>
                                <th> 9 </th>
                              </tr>
                         </thead>

                          {this.createTable()}
                      </table>
            
                      <button type="button" id={`${index}battleship`}  onClick={()=>{this.addDevice(brd, 'battleship', "1", ['A1','A2'])}} className="btn btn-success m-l-md">Add Battleship</button>
                      <button type="button" id={`${index}cruisers`}  onClick={()=>{this.addDevice(brd, 'cruisers', "2", ['B3','B4','B5'])}} className="btn btn-success m-l-md">Add Cruisers</button>
                      <button type="button" id={`${index}destroyers`}  onClick={()=>{this.addDevice(brd, 'destroyers', "3", ['C2', 'C3', 'C4', 'C5'])}} className="btn btn-success m-l-md">Add Destroyers</button>
                      <button type="button" id={`${index}submarines`}  onClick={()=>{this.addDevice(brd, 'submarines', "4", ['F1', 'F2','F3', 'F4', 'F5'])}} className="btn btn-success m-l-md">Add Submarines</button>
              
                  {this.state.startGame &&
                    <div className="row">
                          <div className="col-auto">
                              <label className="sr-only" for="inlineFormInputGroup">Username</label>
                              <div className="input-group mb-2">
                                <input type="text" className="form-control text-uppercase"  placeholder="A0" />
                                <div className="input-group-prepend">
                                  <div className="input-group-text poinnter" onClick={()=>{this.fireEvent(brd)}} >Fire</div>
                                </div>
                              </div>
                          </div>
                    </div>
                    }
              </div>
              ))}
          </div>

          {boards &&  boards.length > 0 && this.state.user2Added == 4 && this.state.user1Added == 4 && 
              <div className="row">
               <button type="button" onClick={this.staetGame} className="btn btn-success btn-lg m-t-md m-l-md"> Start  </button>
              </div>
          }
          </div>

        );
    }
}

const mapStateToProps = (state) => ({
     userboards: state.board
})

const mapDispatchToProps = (dispatch) => ({
    addDevice: (data) => dispatch(addDevice(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBoards);