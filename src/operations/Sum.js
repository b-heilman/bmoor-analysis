var Op = require('../Operation.js');

// I need a way to reset the sum back to 0
class Sum extends Op {
	compute( v1 ){
		if ( v1 ){
			if ( this.sum === undefined ){
				this.sum = v1 || 0;
			}else{
				this.sum += v1;
			}
		}
		 
		return this.sum;
	}
}

module.exports = {
	Sum: Sum,
	singular: true,
	init: function( val1 ){
		return new Sum( val1 );
	}
};