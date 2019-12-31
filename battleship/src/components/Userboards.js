import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addDevice, addFireEvent } from '../actions/Action';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class UserBoards extends Component {
    constructor() {
        super();
         this.state = {
                isComplete1: false,
                isComplete2: false,
                horizontal:true,
                // battleship1:false,
                // cruisers1:false,
                // destroyers1:false,
                // submarines1:false,
                // board1Active : true,
                // battleship2:false,
                // cruisers2:false,
                // destroyers2:false,
                // submarines2:false,
                // board2Active : false,
                user2Added:0,
                user1Added:0,
                startGame: false,
                hirormiss : '',
                selectedNodeId :'',
                pushItemuserOne :[],
                pushItemusertwo:[]

        };
        this.handleClickFor = this.handleClickFor.bind(this);
        this.onHover = this.onHover.bind(this);
        this.staetGame = this.staetGame.bind(this);
        this.fireEvent = this.fireEvent.bind(this); 
    }
    handleClickFor(event) {
        event.preventDefault();
        var element = document.getElementById(event.target.id);
        console.log("Selection",element.id)
        this.setState({selectedNodeId: element.id})
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
    
    addDevice(brd, device, type, index){
      console.log("yyyyyyyyyyyyyyyyyy", index)
      var obj = {
        direction:this.state.horizontal ? 'horizontal' : 'Vertical',
        type:type,
        name:device,
        user_id:brd._id
      }
      let valueone = document.getElementById(index+"valueone").value;  
      let valuetwo = document.getElementById(index+"valuetwo").value;
      var boardsArr = this.props && this.props.userboards && this.props.userboards.userBoards
      valueone = valueone.toUpperCase();
      valuetwo = valuetwo.toUpperCase();
      if(valueone && valuetwo){
          console.log("AAAAAAAAAA", valueone, valuetwo) 
          let shipArr = [];
          if(this.state.horizontal){
              let startone = valueone.split("")[0]
              let endone = valueone.split("")[1]
              let startwo = valuetwo.split("")[0]
              let endtwo = valuetwo.split("")[1]
              if(startone == startwo){
                      let arrayItemuser1 = brd.user_name == boardsArr[0].user_name ? this.state.pushItemuserOne : this.state.pushItemusertwo
                      arrayItemuser1 = [...new Set(arrayItemuser1)];
                      let isDuplicate = false
                        for (var i = endone; i <= endtwo; i++) {
                            var clsName = startone + endone++;
                            if (arrayItemuser1.indexOf(clsName) === -1) {
                                shipArr.push(clsName)
                            }
                            else {
                              isDuplicate = true
                            }
                            if(isDuplicate && i == endtwo){
                              toast.error("Position is already added");
                              shipArr = []
                            }
                        }
                        obj.position = shipArr
              }else{
                toast.error("Please Slect horizontally only")
              }
            }else{
                  let startone = valueone.split("")[0]
                  let endone = valueone.split("")[1]
                  let startwo = valuetwo.split("")[0]
                  let endtwo = valuetwo.split("")[1]
                  if(endone == endtwo){
                     let arrayItemuser2 = brd.user_name == boardsArr[0].user_name ? this.state.pushItemuserOne : this.state.pushItemusertwo
                      arrayItemuser2 = [...new Set(arrayItemuser2)];
                      let isDuplicate = false
                      var alphabet = "ABCDEFGHIJKL";
                      var startindex = alphabet.indexOf(startone);
                      var endindex = alphabet.indexOf(startwo);
                      for (var i = startindex; i <= endindex; i++) {
                          var clsName =  alphabet.charAt(i) + endone
                            if (arrayItemuser2.indexOf(clsName) === -1) {
                                shipArr.push(clsName)
                            }
                            else {
                              isDuplicate = true
                            }
                            if(isDuplicate && i == endindex){
                              toast.error("Position is already added");
                              shipArr = []
                            }
                      }
                      obj.position = shipArr
                  }else{
                    toast.error("Please Slect Vertically only")
                  }
            }
              if(brd.user_name == boardsArr[0].user_name){
                this.setState((prevState,) => ({ user1Added: prevState.user1Added + 1}));
                if(device == 'battleship' && shipArr.length > 0){
                  document.getElementById("0battleship").style.display = "none";
                }
                if(device == 'cruisers' && shipArr.length > 0){
                   document.getElementById("0cruisers").style.display = "none";

                }
                if(device == 'destroyers' && shipArr.length > 0){
                   document.getElementById("0destroyers").style.display = "none";
                }
                if(device == 'submarines' && shipArr.length > 0){
                   document.getElementById("0submarines").style.display = "none";
                }
                this.setState({ pushItemuserOne: [...this.state.pushItemuserOne, ...shipArr] }, function(){
                    let arrayItem = this.state.pushItemuserOne;
                    arrayItem = [...new Set(arrayItem)];
                    if(arrayItem && arrayItem.length> 0 ){
                         arrayItem.forEach((item)=>{
                          let clasName = item+brd._id
                          let d = document.getElementsByClassName(clasName)[0];
                          var classExist =  d.className.split(" ");
                          if(!classExist.includes("filled")){
                            d.className += " filled";
                          }
                        }) 
                    }
                })
              }
              if(brd.user_name == boardsArr[1].user_name){
                this.setState((prevState,) => ({ user2Added: prevState.user2Added + 1}));
                if(device == 'battleship' && shipArr.length > 0){
                  document.getElementById("1battleship").style.display = "none";
                }
                if(device == 'cruisers' && shipArr.length > 0){
                   document.getElementById("1cruisers").style.display = "none";
                }
                if(device == 'destroyers' && shipArr.length > 0){
                   document.getElementById("1destroyers").style.display = "none";
                }
                if(device == 'submarines' && shipArr.length > 0){
                   document.getElementById("1submarines").style.display = "none";
                }
                this.setState({ pushItemusertwo: [...this.state.pushItemusertwo, ...shipArr] }, function(){
                    let arrayItem = this.state.pushItemusertwo;
                    arrayItem = [...new Set(arrayItem)];
                    if(arrayItem && arrayItem.length> 0 ){
                         arrayItem.forEach((item)=>{
                          let clasName = item+brd._id
                          let d = document.getElementsByClassName(clasName)[0];
                          var classExist =  d.className.split(" ");
                          if(!classExist.includes("filled")){
                            d.className += " filled";
                          }
                        }) 
                    }
                })
              }
              if(shipArr.length > 0){
                this.props.addDevice(obj);
              }
      }else{
        toast.error("Please enter required values")
      }
    }
    onHover(event) {
      //console.log("uuuuuuuuuuuuuuuuuu", this.state)
      //console.log("test onHover", event.target.id)
      // var eventId = event.target.id
      // eventId = eventId.split("");
      // if(this.state.horizontal){
      //     var eventType =  eventId[0]
      //     var eventstart =  eventId[1]
      //     var shipArr = [], loopcount = 0;
      //     var deviceName = 'submarine'
      //     if(deviceName == "submarine"){
      //         loopcount = 5
      //     }
      //     for (var i = 0; i < loopcount; i++) {
      //       var clsName = eventType + eventstart++;
      //       if(eventstart <= 10){
      //         shipArr.push(clsName)
      //       }else{
      //         shipArr =[]
      //       }
      //       if(i==loopcount-1){
      //           console.log("addd",shipArr )
      //       }else{
      //           console.log("Not valie")
      //          toast.error("Not valid")
      //       }
      //     }
      // }
      // if(!this.state.horizontal){
      //     var eventType =  eventId[0]
      //     var eventstart =  eventId[1]
      //     console.log(eventType)
      //     var alphabet = "ABCDEFGHIJKL";
      //     var startindex = alphabet.indexOf(eventType);
      //     var shipArr = [], loopcount = 0;
      //     var deviceName = 'submarine'
      //     if(deviceName == "submarine"){
      //         loopcount = 5
      //     }
      //     for (var i = 0; i < loopcount; i++) {
      //       var clsName = alphabet.charAt(startindex++)
      //       clsName = clsName+eventstart
      //       if(startindex <= 10){
      //          shipArr.push(clsName)
      //       }else{
      //         shipArr =[]
      //       }
      //       if(i==loopcount-1){
      //         console.log("addd",shipArr )
      //       }else{
      //         toast.error("Not valid")
      //       }
      //     }
      // }
    }
    staetGame(){
        var selecteForUserOne = this.state.pushItemuserOne
        var selecteForUsertwo = this.state.pushItemusertwo;
        selecteForUserOne = [...new Set(selecteForUserOne)];
        selecteForUsertwo = [...new Set(selecteForUsertwo)];
        var boardsArr = this.props && this.props.userboards && this.props.userboards.userBoards
        selecteForUserOne.forEach((item)=>{
          var className = item+boardsArr[0]._id
          let d = document.getElementsByClassName(className)[0];
          var classExist =  d.className.split(" ");
          if(classExist.includes("filled")){
            d.className = classExist[0];
          }
        })
        selecteForUsertwo.forEach((item)=>{
          var className = item+boardsArr[1]._id
          let d = document.getElementsByClassName(className)[0];
          var classExist =  d.className.split(" ");
          if(classExist.includes("filled")){
            d.className = classExist[0];
          }
        })
        this.setState({startGame:true, user1Added:0, user2Added:0})
        var secBoard = boardsArr[1]._id
        document.getElementById(secBoard).classList.add("filled");
    }
    fireEvent(brd){
      var boardsArr = this.props && this.props.userboards && this.props.userboards.userBoards
      var secBoard = boardsArr[1]._id
      var firBoard = boardsArr[0]._id
      var inputVal = this.state.selectedNodeId

      console.log("@@@@@@@@@@@ fireeeeeeee", this.state.selectedNodeId)
      if(inputVal){
          var obj ={}
          
          if(brd._id == boardsArr[0]._id){
            obj.user_id= boardsArr[1]._id
            obj.eventforid = boardsArr[0]._id
            obj.current_user= boardsArr[0].user_name
            document.getElementById(firBoard).classList.add("filled");
            document.getElementById(secBoard).classList.remove("filled");
          }else{
            obj.user_id= boardsArr[0]._id
            obj.eventforid = boardsArr[1]._id
            obj.current_user= boardsArr[1].user_name
            document.getElementById(firBoard).classList.remove("filled");
            document.getElementById(secBoard).classList.add("filled");
          }
          obj.fire=inputVal;
          console.log("Fireing????", obj)
          //user_id:brd._id, eventforid : brd._id
          this.props.addFireEvent(obj);
      }
    }

    componentDidMount() {
        //var fireEvent = this.props && this.props.userboards;
        //this.setState( { hirormiss: fireEvent.fireboard})
    }
    rotation = () =>{
      this.setState( { horizontal : !this.state.horizontal})
    }

    notify = () => toast.error("Wow so easy !");


    createTable = (userId) => {
      let table = []
      var boards = this.props && this.props.userboards && this.props.userboards.userBoards && this.props.userboards.userBoards[0].square_grid;
      var alphabet = "ABCDEFGHIJKL".split("");
      for (let i = 0; i < boards; i++) {
        let children = []
        for (let j = 0; j < boards; j++) {
          if(j == 0){
            children.push(<td>{`${alphabet[i]}`}</td>)
          }else{
            children.push(<td onMouseOver={this.onHover}   onClick={this.handleClickFor} id={`${alphabet[i]}${j}`} className={`${alphabet[i]}${j}${userId}`}  userId > {`${alphabet[i]}${j}`} </td>)
          }
        }
        //Create the parent and add the children
        table.push(<tr>{children}</tr>)
      }
      return table
    }


    render() {
        var boards = this.props && this.props.userboards && this.props.userboards.userBoards;
        console.log("boardsboardsboards", boards)

         var fireaction = this.props && this.props.userboards && this.props.userboards.fireboard;
         console.log("fireEventfireEvent", fireaction)

        return (
           <div className="borard-container">
            <ToastContainer />
            <div className="row">
             <div className="hirormiss">
                      <h1> {fireaction && fireaction.fire} </h1>
                </div>
              </div>

            <div className="row">

             {boards.map((brd, index)=>(
              <div className="col-sm-6" id={`${brd._id}`}>
                    <h3> {brd.user_name}'s Board </h3>

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

                          {this.createTable(brd._id)}
                      </table>

              

                    {this.state.startGame == false &&
                      <div className="row addDevices">
                     <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">Start position</span>
                      </div>
                      <input type="text" class="form-control"  defaultValue="A1" id={`${index}valueone`}  />
                      <div class="input-group-append">
                        <span class="input-group-text">End Position</span>
                      </div>
                      <input type="text" class="form-control" defaultValue="A6" id={`${index}valuetwo`}  />
                    </div> 
                      <button  onClick={this.rotation}  className="btn btn-success m-t-md"> Add device {this.state.horizontal ? "horizontal" : "Vertiacal"}  </button>
                    </div>
                    }

                      <button type="button" id={`${index}battleship`}  onClick={()=>{this.addDevice(brd, 'battleship', "1",  index)}} className="btn btn-success m-l-md">Add Battleship</button>
                      <button type="button" id={`${index}cruisers`}  onClick={()=>{this.addDevice(brd, 'cruisers', "2" ,index)}} className="btn btn-success m-l-md">Add Cruisers</button>
                      <button type="button" id={`${index}destroyers`}  onClick={()=>{this.addDevice(brd, 'destroyers', "3", index)}} className="btn btn-success m-l-md">Add Destroyers</button>
                      <button type="button" id={`${index}submarines`}  onClick={()=>{this.addDevice(brd, 'submarines', "4", index)}} className="btn btn-success m-l-md">Add Submarines</button>
              

                  {this.state.startGame &&
                    <div className="row">
                          <div className="col-auto">
                              <label className="sr-only" for="inlineFormInputGroup">Username</label>
                              <div className="input-group mb-2">
                                <div className="input-group-prepend">
                                  <div className="input-group-text poinnter"  onClick={() => this.fireEvent(brd)}  >Fire</div>
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
    addDevice: (data) => dispatch(addDevice(data)),
    addFireEvent: (data) => dispatch(addFireEvent(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBoards);