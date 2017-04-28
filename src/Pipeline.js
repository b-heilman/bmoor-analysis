var Val = require('./Val.js'),
	bmoor = require('bmoor'),
	Adapter = require('./Adapter.js');

class Pipeline {

	constructor( feeds, parentId ){
		this.vars = {};
		this.feeds = feeds;
		this.adapters = {};
		this.$equation = parentId;
	}

	parseVariable( src ){
		var s = src.split('::');

		return new Val( this.feeds[s[0]], s[1] );
	}

	setVariable( variable, src ){
		var t = this.parseVariable( src );

		this.vars[ variable ] = t;
	
		return t;
	}

	add( src ){
		var t;

		if( bmoor.isString(src) ){
			t = this.vars[ src ] || this.setVariable( src, src );
		}else if ( src.on ){
			t = src;
		}else{
			throw 'All val must have interface .on';
		}

		return this.adapt( t );
	}

	adapt( src ){
		var id = bmoor.data.getUid( src ),
			t = this.adapters[ id ];

		if ( !t ){
			if ( this.$equation === src.$equation ){
				// this is an operation result, maybe type check?
				t = src;
			}else{
				t = new Adapter( this, src );
				this.adapters[ id ] = t;
			}
		}

		return t;
	}

	flush(){
		if ( this._flushing ){
			clearTimeout( this._flushing );
		}

		// allow all the changes to bubble up
		this._flushing = setTimeout( () => {
			Object.keys( this.adapters ).forEach( ( key ) => {
				this.adapters[ key ].go();
			});
		}, 5 );
	}
}

module.exports = Pipeline;
