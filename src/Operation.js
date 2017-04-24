var bmoor = require('bmoor');

class Op extends bmoor.Eventing {

	constructor( val1, val2 ){
		var go,
			stack2,
			lastV1,
			lastV2,
			stack1 = [],
			express = ( v1, v2 ) => {
				if ( v1 !== lastV1 || v2 !== lastV2 ){
					lastV1 = v1;
					lastV2 = v2;

					this.value = this.compute( v1, v2 );
				}

				this.trigger( 'update', this.value );
			};

		super();

		val1.result( ( v ) => {
			stack1.push( v );
			go();
		});

		if ( val2 ){
			stack2 = [];

			val2.result( ( v ) => {
				stack2.push( v );
				go();
			});

			go = () => {
				if ( stack1.length && stack2.length ){
					express( stack1.shift(), stack2.shift() );
				}
			};

			express( val1.value, val2.value );
		}else{
			go = () => {
				express( stack1.shift() );
			};

			express( val1.value );
		}
	}

	compute(){
		throw 'compute needs to be overriden';
	}

	result( fn ){
		return this.on( 'update', fn );
	}
}

module.exports = Op;