describe('bmoor-analysis.operations.Add', function(){
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
			{ test: require('./Add.js') }
		);
	});

	it('should load values correctly', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( 22 );

		v.result(function( datum ){
			expect( datum.value ).toBe( 33 );
			done();
		});
		
		feed.push({ x:3, y:30 });
	});
});
