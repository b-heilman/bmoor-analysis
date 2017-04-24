var Op = require('../Operation.js');

class Or extends Op {
	compute( v1, v2 ){
		return v1 || v2;
	}
}

module.exports = {
	Or: Or,
	init: function( val1, val2 ){
		return new Or( val1, val2 );
	}
};