Verbs = ["look", "get", "pick up", "eat", "throw"]
Current_Score = 0
Max_Score = 100


// This is an array of Game_Object instances.
var Active_Objects = []

var b_seen_field = false

function start_text ()
{
	return "You are standing in a field."
}

function respond (command)
{
	let parts = command.split(" ")
	let verb = parts[0]
	let object = parts[1]

	console.log("respond:", verb, object)

	var r = ""
	for (let i=0; i<Active_Objects.length; i++) {
		ao = Active_Objects[i]
		if (ao.name == object) {
			if (ao.verbs.includes(verb)) { return ao.respond(verb) + "<br/>" }
		}
	}

	if (command == "active" || command == "look") {
		// TODO: Just return the names.
		var response = "Nearby, you see:<br/>"
		Active_Objects.forEach(function (ao) { response += "&nbsp;&nbsp;" + ao.name + "<br/>"  })
		return response
	}

	return "You can't do that here, at least not now.<br/>"
}

function Game_Object (name, verbs) 
{
	this.name = name
	this.verbs = verbs

	this.respond = function (verb) {
		console.log(this.name, verb)
		if (!this.verbs.includes(verb)) { console.log("Try asking in a different way")}
	}
}

function remove_game_object (game_object)
{
	console.log("remove_game_object pre:", Active_Objects)

	let index = -1
	Active_Objects.forEach(function (ao, i) {
		if (ao.name == game_object.name) { index = i }
	})
	console.log("index of", game_object.name, "is", index)
	if (index == -1) { 
		console.error("Trying to remove object " + game_object.name + " when it is not in the active list" )
		return
	}

	Active_Objects.splice(index, 1)
	console.log("remove_game_object post:", Active_Objects)
		
}

function add_game_object (game_object) 
{
	Active_Objects.push(game_object)
}

// TODO: Turn the switch statement into a dictionary?

var Field = new Game_Object("field", ["look", "eat"])
Field.respond = function (verb) {
	console.log("field responding to", verb)
	switch (verb) {
		case "look" :
			Current_Score += 5
			add_game_object(Stage)
			return "It's a very pretty field. At one end, there's a stage set up."

		case "eat":
			Current_Score += 1
			return "You already ate."

		default : "The field just looks at you. Or as close to looking as grass can."
	}
}

var Stage = new Game_Object("stage", ["look", "mosh", "go", "rock"])
Stage.respond = function (verb) {
	console.log("Stage responding to", verb)
	switch (verb) {
		case "look": 
			return "Sturdy. Not made of rock, but you could surely rock out on it."
		case "most" : 
			return "Silly monkey, moshing is for pits, not on the stage!"
		case "go":
			remove_game_object(Field)
			this.on_stage = true
			return "You are standing on the stage. Good for you."
		case "rock":
			console.log("aaa")
			if (!this.on_stage) { 
				console.log("bbb")
				return "You can't rock if you're not on the stage..." 
			}
			else { 
				console.log("ccc")
				return "You rock so hard, you think you'll need a kip"  
			}
	}
}

add_game_object(Field)

