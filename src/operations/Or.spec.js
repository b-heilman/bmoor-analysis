describe('bmoor-analysis.operations.Or', function(){
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
			{ test: require('./Or.js') }
		);
	});

	it('should load values correctly - true:false', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( true );

		v.result(function( datum ){
			expect( datum.value ).toBe( true );
			done();
		});
		
		feed.push({ x:false, y:true });
	});

	it('should load values correctly - false:true', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( true );

		v.result(function( datum ){
			expect( datum.value ).toBe( true );
			done();
		});
		
		feed.push({ x:false, y:true });
	});

	it('should load values correctly - false:false', function( done ){
		var v = eq.equals('feed::x')
			.op( 'test', 'feed::y' );

		expect( v.value ).toBe( true );

		v.result(function( datum ){
			expect( datum.value ).toBe( false );
			done();
		});
		
		feed.push({ x:false, y:false });
	});
});
