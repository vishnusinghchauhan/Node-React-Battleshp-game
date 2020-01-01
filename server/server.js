import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
const Schema = mongoose.Schema;

const unitObj = new Schema({
	direction: { type: String, optional: true, },
	type: { type: String, optional: true, },
	position: { type: Array, optional: true, },
	name: { type: String, optional: true, },
	destroyed: { type: Boolean, default: false, },
},{_id:false});

const BoardSchema = new Schema({
	user_name : {  type:String, optional:true},
    square_grid : {  type:Number, default:10 },
    ships: {  type: [unitObj], optional: true },
    fired: { type: [], optional: true },
    ship_destroyed : {  type:Boolean,  default: false },
});
var board = mongoose.model("board", BoardSchema);


// define our app using express
const app = express();
app.use(cors())
// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the port
const port = process.env.PORT || 3001;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/battleship');
//SourceMapSupport.install();
app.get('/', (req, res) => {
    return res.end('Api working');
})

app.post("/api/adduserboard/", function(req, res){
	console.log("inserting........", req.body)
	board.remove({},function(error,response){
		if(error){
			console.log("Errr", error)
			return res.status(500).json({message:"Error in remove old boards",data: error , statusCode:500 });
			//return res.send(err);
		}else{
			var obj = req.body;
			var insertArr = [];
			Object.values(obj).forEach((item)=>{
				var insertObj ={}
				insertObj.user_name = item
				insertArr.push(insertObj)
			})
			board.insertMany( insertArr, function(err, result){
				if(err){
					console.log("Err", err)
					//return res.send(err);
					return res.status(500).json({message:"Error in insert users board",data: err , statusCode:500 });
				}else{
					console.log("succees", result)
            		return res.status(200).json({message:"User Board Created Successfully",data: result , statusCode:200 });
					//return res.send(result);
				}
			})
		}
	})

})

app.post("/api/adddevice/", function(req, res){
	console.log("pushing........", req.body)
	var obj = req.body;
	var savingObj = {
        direction:obj.direction,
        type:obj.type,
        position:obj.position,
        name:obj.name
    }
    board.updateOne( {  _id: obj.user_id },{  $addToSet: {  ships: savingObj  } },{new:true}, function(err, result){
		if(err){
			console.log("Errr", err)
			return res.status(500).json({message:"Error in insert device",data: err , statusCode:500 });
			//return res.send(err);
		}else{
			console.log("Success", result)
			return res.status(200).json({message:"Device added Successfully",data: savingObj , statusCode:200 });
			//return res.send(savingObj);
		}
	})
})



app.post("/api/addfire/", function(req, res,next){
	console.log("fireing........", req.body)
	var itemName = req.body.fire;

board.updateOne( {  _id: req.body.eventforid },{  $push: { fired: itemName }}, {new:true}, function(fireErr, fireData){
	if(fireErr){
		console.log("Errer in push fireevent")
		return res.status(500).json({message:"Unable to push fire",data: fireErr , statusCode:500 });
	}
	else{
		board.findOne( {_id: req.body.user_id }, function(err,result){
			if(err){
				console.log("Err", err)
				return res.status(500).json({message:"User not found",data: err , statusCode:500 });
				//return res.send(result);
			}else{
				var shiopsArr = result.ships;
				if(shiopsArr && shiopsArr.length > 0){
					var returnObj = {}
					var allElements = []
				    shiopsArr.forEach((ship, idx)=>{
						var  positions = ship.position
						allElements = [...allElements, ...positions];
						console.log("positionserrr>>>>>>>>>", ship)
						if(positions && positions.length > 0){
							positions.forEach((pos, index)=>{
								if(pos.toString() ==  itemName.toString()){
									console.log("item metch??????????")
									var index = positions.indexOf(pos);
									if (index !== -1) positions.splice(index, 1);
									var destroyed = false
									if (positions.length == 0) {destroyed = true}
									board.updateOne( {  _id: req.body.user_id , ships: { $elemMatch: { name: ship.name } }  },{  $set: {   'ships.$.position': positions , 'ships.$.destroyed': destroyed } }, {new:true}, function(error, resultData){
										if(error){
											console.log("Errr is", error)
											return res.status(500).json({message:"Unable to update device position",data: error , statusCode:500 });
											//return res.send(error);
										}else{
											if(destroyed){
												var winner = true;
												board.findOne( {  _id: req.body.user_id}, function(destroyederr, destroyedData){
													var shiopsArray = destroyedData.ships;
													shiopsArray.forEach((item, desindex)=>{
														if(item && item.position && item.position.length > 0){
															winner = false
														}
														if(shiopsArray.length-1 == desindex){
															if(winner){
																board.findOne( { _id: req.body.eventforid }, function(countErr, countresult){
																	if(countErr){
																		console.log("Errr", countErr)
																		return res.status(500).json({message:"Unable to count user moves",data: countErr , statusCode:500 });
																	}else{
																		console.log(` winner`)
																		return res.status(200).json({message:`Win! You have completed the game in ${countresult.fired && countresult.fired.length} Moves`,data: ` winner` , statusCode:200 });
																		//return res.send(` winner`);
																	}
																})
															}else{
																console.log(`${ship.name} Destroyed`)
																return res.status(200).json({message:`You just sank a ${ship.name}`, data: `${ship.name} sank` , statusCode:200 });
																//return res.send(`${ship.name} Destroyed`);
															}
														}
													})
												})
											}else{
												console.log(`${result.user_name} Hit`)
												return res.status(200).json({message:"Successfully hit",data: " Hit" , statusCode:200 });
												//return res.send(` Hit`);
											}
										}
									})
								}
							})
						}
						if(shiopsArr.length-1 == idx){
							var isExist = allElements.includes(itemName);
							if(!isExist){
								console.log("missing")
								return res.status(200).json({message:"Unsuccessful you miss",data: " Miss" , statusCode:200 });
								//return res.send(` Miss`);
							} 
						}
					})
					
				}
			}
		})
	}
})
 
})

//console.log("tttttttttttttttttt", routes)
//app.use("/api/users", users);
//app.use('/api', routes);


// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
app.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});