var nextPos = [];
var strikePos = [];
$(document).ready(function() {
	/*
	$('#run').click(function() {
		eval(document.getElementById('testcode').value);
	});
	Global.color = 'b';
	Global.turn = true;
	*/
	renderBoard($('#board'));
	$('#board div').click(function() {
		if(Global.turn) {
			var rel = $(this).attr('rel');
			var pos = this.id;
			if(Global.isSelected) {
				if(Board.isEmpty(pos)) {
					moveSelectedPiece(pos);
				}
				else if(Board.isOpponent(pos)) {
					strikeOpponent(pos);
				}
				else {
					showPossibleMoves(this);
				}
			}
			else {
				showPossibleMoves(this);
			}
		}
	});
	init();
});
var Global = {
	king	: null,
	userPieceMap : [],
	opponentPieceMap : [],
	selected : null,
	color	:  "",
	opponentColor	:  "",
	opponentStep : [],
	userStep : [],
	check	: false,
	checkMate : false,
	turn	: false,
	isSelected:false,

	pieces	: ['b1', 'h1', 'c1', 'q', 'k', 'c2', 'h2', 'b2', 's1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'],
	piecesNum: ['1', '2',  '3',  '4', '5', '6',  '7',  '8',  '9',  '10', '11', '12', '13', '14', '15', '16'],
	WhiteUser: ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
	BlackOpponent: ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],

	BlackUser: ['A1', 'B1', 'C1', 'E1', 'D1', 'F1', 'G1', 'H1', 'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2'],
	WhiteOpponent: ['A8', 'B8', 'C8', 'E8', 'D8', 'F8', 'G8', 'H8', 'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7'],

	getType : function(num) {
		var type = "";
		switch(num) {
			case '1':
			case '8':
				type = 'b';
				break;
			case '2':
			case '7':
				type = 'h';
				break;
			case '3':
			case '6':
				type = 'c';
				break;
			case '4':
				type = 'q';
				break;
			case '5':
				type = 'k';
				break;
			case '9':
			case '10':
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
				type = 's';
				break;
		}

		return type;
	}
};

function search(array, data) {
	var result = false;
	for(var index=0; index<array.length; index++) {
		if(data == array[index]) {
			result = true;
			break;
		}
	}

	return result;
}

function strikeOpponent(dest) {
	if(search(strikePos, dest)) {
		clearCurrentPaths();
		Global.isSelected = false;

		var selected = Global.selected;
		$('#'+selected.currpos).removeClass(Global.color+selected.type);
		$('#'+selected.currpos).removeAttr("rel");


		var destRel = $('#'+dest).attr("rel");
		var destP = Global.opponentPieceMap[destRel];
		destP.currpos = "";
		destP.alive = false;

		$('#'+dest).removeClass(Global.opponentColor+destP.type);
		$('#'+dest).removeAttr("rel");

		$('#'+dest).addClass(Global.color+selected.type);
		$('#'+dest).attr("rel", selected.number);
		selected.currpos = dest;
		Global.selected = null;
	}
}

function moveSelectedPiece(dest) {
	if(search(nextPos, dest)) {
		clearCurrentPaths();
		Global.isSelected = false;

		var selected = Global.selected;
		$('#'+selected.currpos).removeClass(Global.color+selected.type);
		$('#'+selected.currpos).removeAttr("rel");
		$('#'+dest).addClass(Global.color+selected.type);
		$('#'+dest).attr("rel", selected.number);
		selected.currpos = dest;
		Global.selected = null;
	}
}

function showPossibleMoves(cell) {
	var rel = $(cell).attr('rel');
	var pos = cell.id;
	if(!Board.isEmpty(pos) && !Board.isOpponent(pos)) {
		var paths = Global.userPieceMap[rel].availablePath();
		if(paths.next.length > 0 || paths.strike.length > 0) {
			clearCurrentPaths();
			Global.isSelected = true;
			Global.selected = Global.userPieceMap[rel];
		}
		else {
			Global.isSelected = false;
		}

		for(var p=0; p<paths.next.length; p++) {
			$('#'+paths.next[p]).addClass('path');
		}
		for(var s=0; s<paths.strike.length; s++) {
			$('#'+paths.strike[s]).addClass('strike');
		}
	}
}

function clearCurrentPaths() {
	$('.path').removeClass('path');
	$('.strike').removeClass('strike');
}

function init() {
	if(Global.color == 'w') {
		Global.opponentColor = 'b';
	}
	else {
		Global.opponentColor = 'w';
	}
		
	loadUserPieces();
	loadOpponentPieces();
}

function loadUserPieces() {
	loadPieces(Global.color, Global.color=='w'?Global.WhiteUser:Global.BlackUser, true);
}

function loadOpponentPieces() {
	loadPieces(Global.opponentColor, Global.opponentColor=='w'?Global.WhiteOpponent:Global.BlackOpponent, false);
}

function loadPieces(color, cells, user) {
	var userClass = color;
	var index = 0;
	var value;
	var className;
	for(;index < Global.piecesNum.length; index++) {
		value = Global.piecesNum[index];
		switch(value) {
			case '1':
			case '8':
				className = color+'b';
				break;
			case '2':
			case '7':
				className = color+'h';
				break;
			case '3':
			case '6':
				className = color+'c';
				break;
			case '4':
				className = color+'q';
				break;
			case '5':
				className = color+'k';
				break;
			case '9':
			case '10':
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
				className = color+'s';
				break;
		}
		$('#'+cells[index]).addClass(className);
		$('#'+cells[index]).attr('rel', value);

		var piece = new Piece(color, Global.getType(value), value, cells[index]);

		if(user) {
			Global.userPieceMap[value] = piece;
		}
		else {
			Global.opponentPieceMap[value] = piece;
		}
	}
}

function Piece(color, type, number, currpos) {
	this.color = color;
	this.type  = type;
	this.number = number;
	this.currpos = currpos;
	this.alive = true;
	
	this.availablePath = function() {
		var paths;
		switch(this.type) {
			case 's':
				paths = Soilder.getAvailPos(this.currpos);
				break;
			case 'b':
				paths = Bishop.getAvailPos(this.currpos);
				break;
			case 'c':
				paths = Camel.getAvailPos(this.currpos);
				break;
			case 'h':
				paths = Horse.getAvailPos(this.currpos);
				break;
			case 'q':
				paths = Queen.getAvailPos(this.currpos);
				break;
			case 'k':
				paths = King.getAvailPos(this.currpos);
				break;
		}
		return paths;
	};

	this.movePiece = function(dest) {
	};

	this.testCheck = function() {
	};

	this.updatePosition = function() {
	};
};

function tester(xd, yd) {
	var nxtCell = Board.getCell(yd)+xd;
	if(Board.isEmpty(nxtCell)) {
		nextPos.push(nxtCell);
	}
	else if(Board.isOpponent(nxtCell)) {
		strikePos.push(nxtCell);
		return -1;
	}
	else {
		return -1;
	}
	return 0;
}

var King = {
	getAvailPos : function(currPos) {
		var cellId = currPos.charAt(0);
		var x = new Number(currPos.charAt(1));
  		var y = Board.getCord(cellId);

		nextPos = []; 
		strikePos = [];

		var xd, yd;

		xd = x+1
		tester(xd, y);
		xd = x-1
		tester(xd, y);

		yd = y+1
		tester(x, yd);
		yd = y-1
		tester(x, yd);

		xd = x+1
		yd = y+1
		tester(xd, yd);
		yd = y-1
		tester(xd, yd);

		xd = x-1
		yd = y+1
		tester(xd, yd);
		yd = y-1
		tester(xd, yd);

		yd = y+1
		xd = x+1
		tester(xd, yd);
		xd = x-1
		tester(xd, yd);

		yd = y-1
		xd = x+1
		tester(xd, yd);
		xd = x-1
		tester(xd, yd);

		return {"next": nextPos, "strike": strikePos};
	}
};
var Queen = {
	getAvailPos : function(currPos) {
		var cellId = currPos.charAt(0);
		var x = new Number(currPos.charAt(1));
  		var y = Board.getCord(cellId);

		Bishop.getAvailPos(currPos);

		var tempNextPos = nextPos; 
		var tempStrikePos = strikePos;

		Camel.getAvailPos(currPos);
		
		nextPos = nextPos.concat(tempNextPos); 
		strikePos = strikePos.concat(tempStrikePos);

		return {"next": nextPos, "strike": strikePos};
	}
};
var Horse = {
	getAvailPos : function(currPos) {
		var cellId = currPos.charAt(0);
		var x = new Number(currPos.charAt(1));
  		var y = Board.getCord(cellId);

		nextPos = []; 
		strikePos = [];

		var xd, yd;

		xd = x+2;
		yd = y+1;
		tester(xd, yd);
		yd = y-1;
		tester(xd, yd);

		xd = x-2;
		yd = y+1;
		tester(xd, yd);
		yd = y-1;
		tester(xd, yd);

		yd = y+2;
		xd=x+1;
		tester(xd, yd);
		xd=x-1;
		tester(xd, yd);

		yd = y-2;
		xd=x+1;
		tester(xd, yd);
		xd=x-1;
		tester(xd, yd);

		yd = y+1;
		xd = x+2;
		tester(xd, yd);
		xd = x-2;
		tester(xd, yd);

		yd = y-1;
		xd = x+2;
		tester(xd, yd);
		xd = x-2;
		tester(xd, yd);

		xd=x+1;
		yd = y+2;
		tester(xd, yd);
		yd = y-2;
		tester(xd, yd);

		xd=x-1;
		yd = y+2;
		tester(xd, yd);
		yd = y-2;
		tester(xd, yd);

		return {"next": nextPos, "strike": strikePos};
      }
};
var Camel = {
	getAvailPos : function(currPos) {
		var cellId = currPos.charAt(0);
		var x = new Number(currPos.charAt(1));
  		var y = Board.getCord(cellId);

		nextPos = []; 
		strikePos = [];

		var xd, yd;
		for(xd=x+1, yd=y+1; xd < 9 && yd < 9; xd++, yd++) {
			if(tester(xd, yd) == -1) {
				break;
			}
		}
		for(xd=x-1, yd=y+1; xd > 0 && yd < 9; xd--, yd++) {
			if(tester(xd, yd) == -1) {
				break;
			}
		}
		for(xd=x-1, yd=y-1; xd > 0 && yd > 0; xd--, yd--) {
			if(tester(xd, yd) == -1) {
				break;
			}
		}
		for(xd=x+1, yd=y-1; xd < 9 && yd > 0; xd++, yd--) {
			if(tester(xd, yd) == -1) {
				break;
			}
		}

		return {"next": nextPos, "strike": strikePos};
      }
}

var Bishop = {
	getAvailPos : function(currPos) {
		var cellId = currPos.charAt(0);
		var x = new Number(currPos.charAt(1));
  		var y = Board.getCord(cellId);

		nextPos = []; 
		strikePos = [];
		var nxtCell;

		for(var xd=x+1; xd<9;xd++) {
			if(tester(xd, y) == -1) {
				break;
			}
		}
		for(var xd=x-1; xd>0;xd--) {
			if(tester(xd, y) == -1) {
				break;
			}
		}
		for(var yd=y+1; yd<9;yd++) {
			if(tester(x, yd) == -1) {
				break;
			}
		}
		for(var yd=y-1; yd>0;yd--) {
			if(tester(x, yd) == -1) {
				break;
			}
		}
		return {"next": nextPos, "strike": strikePos};
	}
};
var Soilder = {
	getAvailPos : function(currPos) {
		var cellId = currPos.charAt(0);
		var x = new Number(currPos.charAt(1));
  		var y = Board.getCord(cellId);

		nextPos = []; 
		if(x == 2) {
			if(Board.isEmpty(cellId + (x+1))) {
				nextPos.push(cellId + (x+1));
			}
			if(nextPos.length > 0 && Board.isEmpty(cellId + (x+2))) {
				nextPos.push(cellId + (x+2));
			}
		}
		else {
			if(Board.isEmpty(cellId + (x+1))) {
				nextPos.push(cellId + (x+1));
			}
		}

		strikePos = [];
		var cell;
		if((y-1) > 0 && (x+1) < 9) {
			cell = Board.getCell(y-1) + (x+1);

			if(!Board.isEmpty(cell) && Board.isOpponent(cell)) {
				strikePos.push(cell);
			}
		}	
		if((y+1) < 9 && (x+1) < 9) {
			cell = Board.getCell(y+1) + (x+1);

			if(!Board.isEmpty(cell) && Board.isOpponent(cell)) {
				strikePos.push(cell);
			}
		}	

		return {"next": nextPos, "strike": strikePos};
	}
};

var Board = {
	isCheck	: function() {
	},
	isKing	: function(pos) {
		var rel = $('#'+pos).attr('rel');
		if(typeof(rel) != "undefined" && rel != "") {
			if(Global.opponentPieceMap[rel].currpos == pos && Global.opponentPieceMap[rel].type == 'k') {
				return true;
			}
		}
		return false;
	},
	isEmpty : function(pos) {
		var rel = $('#'+pos).attr('rel');
		if(typeof(rel) == "undefined" || rel == "") {
			return true;
		}
		return false;
	},
	isOpponent : function(pos) {
		var rel = $('#'+pos).attr('rel');
		if(typeof(rel) != "undefined" && rel != "") {
			if(Global.userPieceMap[rel].currpos == pos) {
				return false;
			}
			else if(Global.opponentPieceMap[rel].currpos == pos) {
				return true;
			}
		}
		return false;
	},
	getCord : function(cellId) {
		var cord = 0;
		switch (cellId) {
			case 'A':
				cord = 1;
				break;
			case 'B':
				cord = 2;
				break;
			case 'C':
				cord = 3;
				break;
			case 'D':
				cord = 4;
				break;
			case 'E':
				cord = 5;
				break;
			case 'F':
				cord = 6;
				break;
			case 'G':
				cord = 7;
				break;
			case 'H':
				cord = 8;
				break;
		}
		return cord;
	},
	getCell : function(cord) {
		var cell = 0;
		switch (cord) {
			case 1:
				cell = 'A';
				break;
			case 2:
				cell = 'B';
				break;
			case 3:
				cell = 'C';
				break;
			case 4:
				cell = 'D';
				break;
			case 5:
				cell = 'E';
				break;
			case 6:
				cell = 'F';
				break;
			case 7:
				cell = 'G';
				break;
			case 8:
				cell = 'H';
				break;
		}
		return cell;
	}
};
function renderBoard(obj) {
	obj.html('<div class="white" id="A8"></div><div class="black" id="B8"></div><div class="white" id="C8"></div><div class="black" id="D8"></div><div class="white" id="E8"></div><div class="black" id="F8"></div><div class="white" id="G8"></div><div class="black" id="H8"></div><div class="black" id="A7"></div><div class="white" id="B7"></div><div class="black" id="C7"></div><div class="white" id="D7"></div><div class="black" id="E7"></div><div class="white" id="F7"></div><div class="black" id="G7"></div><div class="white" id="H7"></div><div class="white" id="A6"></div><div class="black" id="B6"></div><div class="white" id="C6"></div><div class="black" id="D6"></div><div class="white" id="E6"></div><div class="black" id="F6"></div><div class="white" id="G6"></div><div class="black" id="H6"></div><div class="black" id="A5"></div><div class="white" id="B5"></div><div class="black" id="C5"></div><div class="white" id="D5"></div><div class="black" id="E5"></div><div class="white" id="F5"></div><div class="black" id="G5"></div><div class="white" id="H5"></div><div class="white" id="A4"></div><div class="black" id="B4"></div><div class="white" id="C4"></div><div class="black" id="D4"></div><div class="white" id="E4"></div><div class="black" id="F4"></div><div class="white" id="G4"></div><div class="black" id="H4"></div><div class="black" id="A3"></div><div class="white" id="B3"></div><div class="black" id="C3"></div><div class="white" id="D3"></div><div class="black" id="E3"></div><div class="white" id="F3"></div><div class="black" id="G3"></div><div class="white" id="H3"></div><div class="white" id="A2"></div><div class="black" id="B2"></div><div class="white" id="C2"></div><div class="black" id="D2"></div><div class="white" id="E2"></div><div class="black" id="F2"></div><div class="white" id="G2"></div><div class="black" id="H2"></div><div class="black" id="A1"></div><div class="white" id="B1"></div><div class="black" id="C1"></div><div class="white" id="D1"></div><div class="black" id="E1"></div><div class="white" id="F1"></div><div class="black" id="G1"></div><div class="white" id="H1"></div>');
}
