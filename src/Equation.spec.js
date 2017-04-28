describe('bmoor-analysis.Equation', function(){
	var Feed = require('bmoor-data').Feed,
		Equation = require('./Equation.js').Equation;

	it('should be defined', function(){
		expect( Equation ).toBeDefined();
	});

	it('should load values correctly', function( done ){
		var feed = new Feed([
				{ x: 1, y: 0 },
				{ x: 2, y: 2 }
			]),
			eq = new Equation({
				'feed': feed 
			}),
			v = eq.equals('feed::x');

		expect( v.value ).toBe( 2 );

		v.result(function( datum ){
			expect( datum.value ).toBe( 3 );
			expect( datum.stale ).toBe( false );
			done();
		});
		
		feed.add({ x:3, y:4 });
	});

	describe('operations', function(){
		it('should work for add', function( done ){
			var feed = new Feed([
					{ x: 1, y: 5 },
					{ x: 2, y: 6 }
				]),
				eq = new Equation({
					'feed': feed 
				}),
				v = eq.equals('feed::x').op('add','feed::y');

			expect( v.value ).toBe( 8 );

			v.result(function( datum ){
				expect( datum.value ).toBe( 10 );
				expect( datum.stale ).toBe( false );
				done();
			});
			
			feed.add({ x:3, y:7 });
		});

		it('should work with chaining ops', function( done ){
			var feed = new Feed([
					{ x: 1, y: 5, z:10 },
					{ x: 2, y: 6, z:20 }
				]),
				eq = new Equation({
					'feed': feed 
				}),
				v = eq.equals('feed::x')
					.op('add','feed::y')
					.op('sub','feed::z');

			expect( v.value ).toBe( -12 );

			v.result(function( datum ){
				expect( datum.value ).toBe( 9 );
				expect( datum.stale ).toBe( false );
				
				done();
			});
			
			feed.add({ x:2, y:8, z: 1 });
		});

		it('should take an equation as a child', function( done ){
			var feed = new Feed([
					{ x: 1, y: 5, z:10 },
					{ x: 2, y: 6, z:20 }
				]),
				eq = new Equation({
					'feed': feed 
				}),
				v = eq.equals(
						eq.equals('feed::x')
							.op('add','feed::y')
					)
					.op('sub','feed::z');
			
			expect( v.value ).toBe( -12 );

			v.result(function( datum ){
				expect( datum.value ).toBe( 9 );
				expect( datum.stale ).toBe( false );
				
				done();
			});
			
			feed.add({ x:2, y:8, z: 1 });
		});

		it('should take an equation as a child - sanity', function( done ){
			var feed = new Feed([
					{ x: 1, y: 5, z:10 },
					{ x: 2, y: 6, z:20 }
				]),
				eq = new Equation({
					'feed': feed 
				}),
				v = eq.equals(
						eq.equals('feed::x')
							.op('add','feed::y')
					)
					.op('sub','feed::z');
			
			expect( v.value ).toBe( -12 );

			v.result(function( datum ){
				expect( datum.value ).toBe( 9 );
				expect( datum.stale ).toBe( false );
				
				done();
			});
			
			feed.add({ x:3, y:7, z: 1 });
		});
	});
});
