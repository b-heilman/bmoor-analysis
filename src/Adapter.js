var bmoor = require('bmoor');

class Adapter extends bmoor.Eventing {

	constructor( pipeline, src ){
		super();
		
		this.src = src;
		this.value = src.value;
		this.stack = [];

		src.result( ( v ) => {
			this.stack.push( v );

			pipeline.flush( this );
		});
	}

	go(){
		var v;

		if ( this.stack.length ){
			v = this.stack.shift();

			if ( this.value !== v ){
				this.value = v;
				this.trigger( 'update', this.value );
			}
		}else{
			this.trigger( 'update', this.value );
		}
	}

	result( fn ){
		return this.on( 'update', fn );
	}
}

module.exports = Adapter;
