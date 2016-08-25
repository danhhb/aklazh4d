
function createTicket() {
	var start = new Date().getTime();
	var ticket = [
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null],
		[null,null,null,null,null,null,null,null,null]
	];

	//Select 5 random cells for each row and ensures 
	//each column have at least one number
	function selectValidCells() {
		var bins = [];
		for (var i = 0; i < 2; i++) {
		 	bins.push(_.slice(_.shuffle(_.range(0, 9)), 0, 5));  	
		}
		if (isValid(bins)) {
			bins.push(_.slice(_.shuffle(_.range(0, 9)), 0, 5));
			return bins;
		}else{
			while(!isValid(bins)){
				bins[2] = _.slice(_.shuffle(_.range(0, 9)), 0, 5);
			}
		}
		return bins;
	}

	//Verify is array have non repeated numbers from 1-9.
	function isValid(arr) {
		if (arr.length == 2)
			return _.uniq(arr[0].concat(arr[1])).length  == 9;
		return _.uniq(arr[0].concat(arr[1]).concat(arr[2])).length == 9;
	}

	//Generate 15 random numbers
	function genCellNumbers() {
		var bin = [];
		bin.push(_.slice(_.shuffle(_.range(1, 10)), 0, 3));
		for (var index = 1; index < 8; index++) {
			bin.push(_.slice(_.shuffle(_.range(index * 10, index * 10 + 10)), 0, 3));
		}
		bin.push(_.slice(_.shuffle(_.range(80, 91)), 0, 3));
		for (var i = 0; i < bin.length; i++) {
			bin[i] = _.sortBy(bin[i]);
		}

		return bin;
	}

	function populateTicket() {
		var validCells = selectValidCells();
		var cellNumbers = genCellNumbers();
		for (var i = 0; i < 3; i++) {
			for(var j = 0; j < 5; j++) 
				ticket[i][validCells[i][j]] = cellNumbers[validCells[i][j]].shift();
		}
	}
	populateTicket();
	return ticket;
}

// Output functions
// ------------------

// Write the ticket's data to HTML format
function ticketToHtml(ticket) {
	var str = "<div class=\"ticket\">";
	for (var i = 0; i < ticket.length; i++) {
    	for (var j = 0; j < ticket[0].length; j++) {
      		var value = ticket[i][j] != null ? ticket[i][j] : "";
      		str += "<div class=\"square\">" + value + "</div>";
    	}
  	}
  	str += "</div>";
	return str;
}

//Output data to page
function generateTickets() {
	$(".row").empty();
	str = "";
	for (var i = 0; i < 12; i++) {
		str += "<div class=\"col-xs-12 col-sm-6 col-md-6\">" + ticketToHtml(createTicket());
		str += "</div>";
	}
	$(".row").append(str);
}

$(document).ready( function(){
	generateTickets();
});


	



