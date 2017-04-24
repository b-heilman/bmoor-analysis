describe('bmoor-analysis.operations.And', function(){
	var eq,
		feed,
		Equation = require('../Equation.js').Equation;

	beforeEach(function(){
		feed = [
			{ x: true, y: false },
			{ x: true, y: true }
		];

		eq = new Equation(
			{ 'feed': feed },
			{ test: require('./And.js') }
		);
	});

	it('should load values correctly', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( true );

		v.result(function( val ){
			expect( val ).toBe( false );
			done();
		});
		
		feed.push({ x:false, y:true });
	});

	it('should load values correctly - sanity', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( true );

		v.result(function( val ){
			expect( val ).toBe( false );
			done();
		});
		
		feed.push({ x:true, y:false });
	});
});
