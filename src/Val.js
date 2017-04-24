var bmoor = require('bmoor');

class Val extends bmoor.Eventing {
	constructor( feed, path ){
		super();

		this.get = bmoor.makeGetter( path );
		this.path = path;

		feed.on('insert', ( values ) => {
			this.go( values[values.length-1] );
		});

		if ( feed.data.length ){
			this.go( feed.data[feed.data.length-1] );
		}
	}

	go( obj ){
		var v = this.get( obj );

		if ( !('value' in this) || v !== this.value ){
			this.value = v;
			this.trigger( 'update', v );
		}
	}

	result( fn ){
		return this.on( 'update', fn );
	}
}

module.exports = Val;