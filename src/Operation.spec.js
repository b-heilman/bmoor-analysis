describe('bmoor-analysis.Operation', function(){
	var eq,
		cb,
		feed,
		called,
		Equation = require('./Equation.js').Equation,
		Operation = require('./Operation.js');

	class Test extends Operation {
		compute( v1, v2 ){
			called = true;
			return cb( v1, v2 );
		}
	}

	beforeEach(function(){
		feed = [
			{ x: 1, y: 2 },
			{ x: 3, y: 4 }
		];
	});

	describe( 'single variable operations', function(){
		beforeEach(function(){
			eq = new Equation(
				{ 'feed': feed },
				{ 
					test: {
						singular: true,
						init: function( val1 ){
							return new Test( val1 ); 
						}
					}
				}
			);
		});

		it('should fire on creation', function(){
			cb = function( v1, v2 ){
				expect( v1 ).toBe( 3 );
				expect( v2 ).toBeUndefined();

				return '--hello--';
			};

			var t = eq.equals('feed::x').op('test');
			expect( called ).toBe( true );

			expect( t.value ).toBe( '--hello--' );
		});

		it('should only fire if the value changes', function( done ){
			cb = function( v1, v2 ){
				expect( v1 ).toBe( 3 );
				expect( v2 ).toBeUndefined();

				return '--hello--';
			};

			var t = eq.equals('feed::x').op('test');
			expect( called ).toBe( true );

			expect( t.value ).toBe( '--hello--' );

			called = false;

			feed.push({ x:3, y:6 });

			setTimeout(function(){
				expect( called ).toBe( false );

				cb = function( v1, v2 ){
					expect( v1 ).toBe( 5 );
					expect( v2 ).toBeUndefined()

					done();
				};

				feed.push( {x:5, y:6} );
			}, 100);
		});
	});

	describe( 'double variable operations', function(){
		beforeEach(function(){
			eq = new Equation(
				{ 'feed': feed },
				{ 
					test: {
						init: function( val1, val2 ){
							return new Test( val1, val2 ); 
						}
					}
				}
			);
		});

		it('should fire on creation', function(){
			cb = function( v1, v2 ){
				expect( v1 ).toBe( 3 );
				expect( v2 ).toBe( 4 );

				return '--hello:2--';
			};

			var t = eq.equals('feed::x').op('test','feed::y');
			expect( called ).toBe( true );

			expect( t.value ).toBe( '--hello:2--' );
		});

		it('should fire if either changes', function( done ){
			cb = function( v1, v2 ){
				expect( v1 ).toBe( 3 );
				expect( v2 ).toBe( 4 );

				return '--hello--';
			};

			var t = eq.equals('feed::x').op('test','feed::y');
			expect( called ).toBe( true );

			expect( t.value ).toBe( '--hello--' );

			called = false;

			feed.push({ x:3, y:4 });

			setTimeout(function(){
				expect( called ).toBe( false );

				cb = function( v1, v2 ){
					expect( v1 ).toBe( 5 );
					expect( v2 ).toBe( 4 );

					cb = function( v1, v2 ){
						expect( v1 ).toBe( 5 );
						expect( v2 ).toBe( 6 );

						done();
					};

					feed.push( {x:5, y:6} );
				};

				feed.push( {x:5, y:4} );
			}, 100);
		});
	});
});
