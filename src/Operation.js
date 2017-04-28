var bmoor = require('bmoor');

class Op extends bmoor.Eventing {

	constructor( val1, val2 ){
		var go,
			stack2,
			lastV1,
			lastV2,
			stack1 = [],
			express = ( datum1, datum2 ) => {
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

			express = ( datum1, datum2 ) => {
				var stale = true;

				if ( !(datum1.stale && datum2.stale) ){
					stale = false;
					this.value = this.compute( 
						datum1.value,
						datum2.value
					);
				}

				// always call trigger on express
				this.trigger( 'update', {
					stale: stale,
					value: this.value
				});
			};

			go = () => {
				if ( stack1.length && stack2.length ){
					express( stack1.shift(), stack2.shift() );
				}
			};

			express( val1, val2 );
		}else{
			express = ( datum1 ) => {
				var stale = true;

				if ( !datum1.stale ){
					stale = false;
					this.value = this.compute( 
						datum1.value
					);
				}

				this.trigger( 'update', {
					stale: stale,
					value: this.value
				});
			};

			go = () => {
				express( stack1.shift() );
			};

			express( val1 );
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