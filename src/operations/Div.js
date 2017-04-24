var Op = require('../Operation.js');

class Div extends Op {
	compute( v1, v2 ){
		return v1 / v2;
	}
}

module.exports = {
	Div: Div,
	init: function( val1, val2 ){
		return new Div( val1, val2 );
	}
};