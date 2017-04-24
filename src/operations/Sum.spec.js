describe('bmoor-analysis.operations.Sum', function(){
	var eq,
		feed,
		Equation = require('../Equation.js').Equation;

	beforeEach(function(){
		feed = [
			{ x: 5, y: 6 },
			{ x: 7, y: 3 }
		];

		eq = new Equation(
			{ 'feed': feed },
			{ test: require('./Sum.js') }
		);
	});

	it('should load values correctly', function( done ){
		var v = eq.equals('feed::x').op( 'test' );

		expect( v.value ).toBe( 7 );

		v.result(function( val ){
			expect( val ).toBe( 10 );
			done();
		});
		
		feed.push({ x:3 });
	});

	// TODO : I need to look into this
	it('should not sum without changes', function( done ){
		var called = false,
			v = eq.equals('feed::x').op( 'test' );

		expect( v.value ).toBe( 7 );

		v.result(function( val ){
			called = true;

			expect( val ).toBe( 7 );
			done();
		});
		
		feed.push({ x:7 });

		setTimeout(function(){
			expect( called ).toBe( false );
			done();
		}, 300); // plenty of time
	});
});
