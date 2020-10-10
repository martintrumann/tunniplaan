const fetch = require("node-fetch");
const moment = require("moment");

const express = require("express");
const app = express()

app.get('/:type/:id', (req, res) => {
	from = new moment();
	thru = new moment().add(2, "w");

	time = new Date();

	url = "https://tahvel.edu.ee/hois_back/timetableevents/"
	if(req.params.type == "group"){
		url += "timetableByGroup/38/calendar" +
			"?studentGroups=" + (req.params.id == "me" ? "3149" : req.params.id)

	}else if(req.params.type == "teacher"){
		url += "timetableByTeacher/38/calendar" + "?teachers=" + req.params.id

	}else if(req.params.type == "person"){
		url += "timetableByPerson/" +
			(req.params.id == "me" ? "UbwL6b6uOvBDCg4Z665RTA" : req.params.id) +
			"/calendar?a=1"

	}else{
		res.send("invalid type")
	}

	url += "&from=" + from.format("YYYY-MM-DDT00:00:00") + "Z" +
		"&thru=" + thru.format("YYYY-MM-DDT00:00:00") + "Z" +
		"&lang=ET"

	fetch(url)
		.then(raw => raw.json())
		.then(data => {
			res.append( 'Content-Type', 'text/calendar')
			res.send(data.content)
		})
		.catch(err => {
			res.send("Invalid id")
			console.error(err);
		})
})

app.listen(8000, () => {
  console.log(`Example app listening`)
})
