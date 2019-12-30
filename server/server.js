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
});

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
			return res.send(err);
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
					return res.send(err);
				}else{
					return res.send(result);
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
    board.updateOne( {  _id: obj.user_id },{  $addToSet: {  ships: savingObj  } }, function(err, result){
		if(err){
			console.log("Errr", err)
			return res.send(err);
		}else{
			console.log("Success", result)
			return res.send(result);
		}
	})
})


app.post("/api/addfire/", function(req, res,next){
	console.log("fireing........", req.body)
	var itemName = req.body.fire;
	board.findOne( {_id: req.body.user_id }, function(err,result){
		if(err){
			console.log("Err", err)
			return res.send(result);
		}else{

			//console.log("Success", result.ships)
			//var isAlldestroyed = true;
			var shiopsArr = result.ships;
			if(shiopsArr && shiopsArr.length > 0){
				var returnObj = {}
			    shiopsArr.forEach((ship, idx)=>{
				var  positions = ship.position
				console.log("positions", ship.position)
				// if(!ship.destroyed){
				// 	isAlldestroyed = false;
				// }
				var missing = true;

				if(positions && positions.length > 0){
					positions.forEach((pos, index)=>{
						
						if(pos.toString() ==  itemName.toString()){
							missing = false
							console.log("item metch??????????")
							var index = positions.indexOf(pos);
							if (index !== -1) positions.splice(index, 1);
							var destroyed = false
							if (positions.length == 0) {destroyed = true}
							board.updateOne( {  _id: req.body.user_id , ships: { $elemMatch: { _id: ship._id } }  },{  $set: {   'ships.$.position': positions , 'ships.$.destroyed': destroyed } }, {new:true}, function(error, resultData){
								if(error){
									console.log("Errr is", error)
									return res.send(error);
								}else{
									if(destroyed){
										console.log(`${ship.name} Destroyed`)
										return res.send(`${ship.name} Destroyed`);
										//console.log(`${ship.name} Destroyed`)
										//res.end(`${ship.name} Destroyed`);
									}else{
										console.log(`${result.user_name} Hit`)
										return res.send(`${result.user_name} Hit`);
										//console.log(`${result.user_name} Hit`)
										//res.end(`${result.user_name} Hit`);
									}
								}
							})
						}else{
							if(shiopsArr.length-1 == idx && positions.length-1 == index){
								console.log("lasrrrrrrrrrr")
								//if(missing){
									console.log("ddddddddddddddddddddddddddddmmmm", missing)
								//	return res.send(`${result.user_name} Miss`);
								//}
								console.log("ship lenght", shiopsArr.length-1, "current0" , idx, "location", positions.length-1, "curr", index);
							}
							//console.log("?????????????Ship??????", shiopsArr.length-1 , idx)
							//console.log("??????????????locccccc????", positions.length-1 , index)

							//console.log(`${result.user_name} Miss`);
							//res.end(`${result.user_name} Miss`);
							//return res.send(`${result.user_name} miss`);
						}
					})
				}else{
					console.log("Position not Found")
				}
			})
			}else{
				console.log("Ship Not Found");
			}
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