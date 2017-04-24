describe('bmoor-analysis.operations.Mul', function(){
	var eq,
		feed,
		Equation = require('../Equation.js').Equation;

	beforeEach(function(){
		feed = [
			{ x: 1, y: 10 },
			{ x: 2, y: 20 }
		];

		eq = new Equation(
			{ 'feed': feed },
			{ test: require('./Mul.js') }
		);
	});

	it('should load values correctly', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( 40 );

		v.result(function( val ){
			expect( val ).toBe( 90 );
			done();
		});
		
		feed.push({ x:3, y:30 });
	});
});
