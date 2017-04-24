var Op = require('../Operation.js');

class Add extends Op {
	compute( v1, v2 ){
		return v1 + v2;
	}
}

module.exports = {
	Add: Add,
	init: function( val1, val2 ){
		return new Add( val1, val2 );
	}
};