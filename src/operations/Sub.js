var Op = require('../Operation.js');

class Sub extends Op {
	compute( v1, v2 ){
		return v1 - v2;
	}
}

module.exports = {
	Sub: Sub,
	init: function( val1, val2 ){
		return new Sub( val1, val2 );
	}
};