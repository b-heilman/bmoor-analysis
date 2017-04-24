var getUid = require('bmoor').data.getUid,
	Feed = require('bmoor-data').Feed,
	Pipeline = require('./Pipeline.js'),
	operations = require('./operations.js');

class Equation {
	constructor( feeds, ops ){
		Object.keys( feeds ).forEach(function( name ){
			if ( !(feeds[name] instanceof Feed) ){
				feeds[name] = new Feed( feeds[name] );
			}
		});

		this.memory = {};
		this.setOperations( ops || operations );
		this.pipeline = new Pipeline( feeds, getUid(this) );
	}

	setOperations( ops ){
		this.ops = ops;
	}

	val( src ){
		return this.pipeline.add( src );
	}

	wrap( val ){
		val.$equation = getUid( this );
		val.op = ( action, v2 ) => {
			// I don't love this, but it seems the best path
			var rtn,
				op = this.ops[action],
				args = Array.prototype.slice.call( 0, arguments );

			args[0] = val;

			if ( !op.singular ){
				args[1] = this.val( v2 );
			}

			rtn = op.init.apply(this.memory,args);

			return this.wrap( rtn );
		};

		return val;
	}

	equals( src ){
		return this.wrap( this.val(src) );
	}
}

module.exports = {
	Equation: Equation
};
