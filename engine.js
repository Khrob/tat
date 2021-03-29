
var Input
var Main
var Score
var Command_String = ""
var Command_History = []
var Command_History_Index = 0

var Backlog = []

function startup ()
{
	console.log("Text Adventure")	

	Input = document.getElementById("ta_input")
	Main  = document.getElementById("ta_body")
	Score = document.getElementById("ta_score")
	Backlog.push(start_text())

	document.addEventListener("keypress", press)
	document.addEventListener("keydown", down)

	update()
}

function down (event)
{
	if (event.key == "Backspace") {
		Command_String = Command_String.substring(0, Command_String.length - 1);
		update()
	}

	if (event.key == "ArrowUp") { 
		Command_History_Index = Math.max(0, Command_History_Index-1)
		console.log("up   History_Index:", Command_History_Index)
		Command_String = Command_History[Command_History_Index] ?? Command_String
		update()
	}

	if (event.key == "ArrowDown") { 
		Command_History_Index = Math.min(Command_History.length-1, Command_History_Index+1)
		console.log("down History_Index:", Command_History_Index)
		Command_String = Command_History[Command_History_Index] ?? Command_String
		update()
	}
	if (event.key == "Enter") {
		Command_History.push(Command_String)
		Command_History_Index = Command_History.length
		Backlog.push("<b>"+Command_String+"</b>")
		Backlog.push(respond(Command_String))
		Command_String = ""
		update()
	}
}

function press (event)
{
	if (event.key.isAlphaNumeric() && event.key.length == 1) {
		Command_String += event.key
		update()
	}
	if (event.key == " ") {
		Command_String += event.key
		update()
	}
}

function update ()
{
	Input.innerHTML = Command_String + "<span class=\"blink\">_</span>"
	Main.innerHTML = Backlog.join("<br/>") + "<br/><br/><br/>"
	Main.scrollTop = Main.scrollHeight
	Score.innerHTML = "Score: " + Current_Score + " of " + Max_Score
}

String.prototype.isAlphaNumeric = function() { return (this.match(/^[A-Za-z0-9]+$/)) }