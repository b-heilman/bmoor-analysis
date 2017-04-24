var Op = require('../Operation.js');

class Mul extends Op {
	compute( v1, v2 ){
		return v1 * v2;
	}
}

module.exports = {
	Mul: Mul,
	init: function( val1, val2 ){
		return new Mul( val1, val2 );
	}
};