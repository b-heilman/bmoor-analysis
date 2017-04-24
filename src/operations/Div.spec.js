describe('bmoor-analysis.operations.Mul', function(){
	var eq,
		feed,
		Equation = require('../Equation.js').Equation;

	beforeEach(function(){
		feed = [
			{ x: 10, y: 1 },
			{ x: 20, y: 10 }
		];

		eq = new Equation(
			{ 'feed': feed },
			{ test: require('./Div.js') }
		);
	});

	it('should load values correctly', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( 2 );

		v.result(function( val ){
			expect( val ).toBe( 6 );
			done();
		});
		
		feed.push({ x:30, y:5 });
	});
});
