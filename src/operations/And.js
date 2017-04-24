var Op = require('../Operation.js');

class And extends Op {
	compute( v1, v2 ){
		return v1 && v2;
	}
}

module.exports = {
	And: And,
	init: function( val1, val2 ){
		return new And( val1, val2 );
	}
};