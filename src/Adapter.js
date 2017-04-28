var bmoor = require('bmoor');

class Adapter extends bmoor.Eventing {

	constructor( pipeline, src ){
		super();
		
		this.src = src;
		this.value = src.value;
		this.stack = [];

		src.result( ( datum ) => {
			this.stack.push( datum );

			pipeline.flush( this );
		});
	}

	go(){
		var datum;

		if ( this.stack.length ){
			datum = this.stack.shift();

			this.value = datum.value;

			// pass the datum through
			this.trigger( 'update', datum );
		}else{
			this.trigger( 'update', {
				stale: true,
				value: this.value
			});
		}
	}

	result( fn ){
		return this.on( 'update', fn );
	}
}

module.exports = Adapter;
