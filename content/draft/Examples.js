// N-RN.A
// Extend the properties of exponents to rational exponents.
// N-RN.B
// Use properties of rational and irrational numbers

/*---------------------------------------------------------------------------*\
| Rational numbers are fairly easy to represent, as they can always be written
|  as a ratio of two integers. Similarly, you can represent many real numbers
|  using rational exponents. The difference between these two types of real
|  numbers is the function that is used to determine their value.
|
| An integer exponent x^n uses the function x^n = x * x * ... * x, where
|  there are n instances of x. A rational exponent x^(1/n) uses the inverse
|  function, that is, x^(1/n) = the number y such that y * y * ... * y = x,
|  where there are n instances of y.
|
| It is not always easy to find an exact evaluation of an inverse function
|  such as a rational power. However, if it is easy to evaluate the function
|  that is inverted, you can use that function to find a good approximation.
|
| One way of approximating is to look at a number that is definitely bigger
|  than the result, and one number that is definitely smaller, and narrow down
|  the range of possibility by checking values in-between. (This method works
|  best when the function is either increasing or decreasing in the interval,
|  and does not change direction.)
|
| This process of narrowing an interval of possibility by testing values one
|  at a time against an inverse function is a type of "iterative method",
|  sometimes called "guess and check", and is something that can be done
|  easily using a program.
\----------------------------------------------------------------------------*/

// First, identify the function you want to approximate, and how to evaluate
//  its inverse. Here, we'll use x^(1/2), or the square-root of x. Its inverse
//  is x^2, or x * x.

function square(x) {
    return x * x;
}

// Now, write functions to choose a lower-bound and upper-bound.
// All square-roots are greater than or equal to 0, so you can confidently
//  say that 0 is smaller than the square root of any number (except 0).
function square_root_lower_bound(x) {
    return 0;
}

// There are many different ways to choose an upper-bound for a square root.
// Here is a simple example, which depends whether the number being
//  square-rooted is less than or greater than 1.
function square_root_upper_bound(x) {
    if(x > 1) {
        // A number greater than one is always larger than its square root.
        // (for example, 4 = 2 * 2, and 4 > 2)
        return x;
    } else if (x < 1) {
        // A number less than one always has a square root less than 1.
        // (for example, 1/4 = 1/2 * 1/2, and 1/2 is less than 1.)
        return 1;
    } else {
        // If the number is neither less than or greater than 1, then it is 1
        //  and its square root is 1.
        return 1;
    }
}

// Choose variables to remember the left and right endpoints of the interval.
var left;
var right;

// Now the main function that will approximate the square root. It should:
//  1. Make sure the right endpoint is greater than the square root, and
//      that the left endpoint is less than the square root. If not, then
//      choose endpoints using the functions you defined above.
//  2. Pick a value inside the interval.
//  3. Evaluate the square and move the endpoints of the interval.
//  3a. If the square of the value is less than the number being square-
//       -rooted, move the left endpoint up to that value.
//  3b. If the square of the value is greater than the number being square-
//       -rooted, move the right endpoint down to that value.
//  4. State the interval of possibility.
function approximate_square_root(x) {
  // 1. Make sure the endpoints are on either side of the square root.
  if (left === undefined || square(left) > x) {
    left = square_root_lower_bound(x);
  }
  if (right === undefined || square(right) < x) {
    right = square_root_upper_bound(x);
  }

  // 2. Pick a value inside the interval. You can do this any way you like,
  //     but the midpoint (average) is nice and easy.
  var test_value = (left + right) / 2;

  // 3. Evaluate the square of that value and move the endpoints.
  if(square(test_value) === x) {
    // If you managed to find the exact square root, you are done.
    left = test_value;
    right = test_value;
    console.log("The square root of " + x + " is " + test_value + ".");
    return;
  } else if(square(test_value) < x) {
    // 3a. Move the left endpoint up if the test value is still too low
    left = test_value;
  } else if(square(test_value) > x) {
    // 3b. Move the right endpoint down if the test value is still too high
    right = test_value;
  }

  // 4. State the interval of possibility.
  console.log("The square root of " + x + " is between " + left + " and " + right);
}

// TRY IT!
// Write a function to approximate the cube root of x.
// HINT: The cube root of x is defined for both positive and negative numbers!

function cube(x) {
    return x * x * x;
}

// SAMPLE ANSWER
function cube_root_lower_bound(x) {
    return Math.min(x,-1);
}

function cube_root_upper_bound(x) {
    return Math.max(x,1);
}

var left;
var right;
var rooting;

function approximate_cube_root(x) {
    if (rooting !== x) {
        rooting = x;
        left = cube_root_lower_bound(x);
        right = cube_root_upper_bound(x);
    }

    if(cube(left) === x) {
        right = left;
    } else if(cube(right) === x) {
        left = right;
    }

    var test_value = (left + right) / 2;

    if(cube(test_value) <= x) {
        left = test_value;
    }

    if(cube(test_value) >= x) {
        right = test_value;
    }

    if(left === right) {
        console.log("The cube root of " + x + " is " + test_value + ".");
    } else {
        console.log("The cube root of " + x + " is between " + left + " and " + right);
    }
}

// Each time you run the function, the interval of possibility will get smaller
//  until you find the exact square root. Note that most square-roots are
//  irrational, so you may never get an exact decimal value.


// N-VM.A
// Represent and model with vector quantities
// N-VM.B
// Perform operations on vectors

/*---------------------------------------------------------------------------*\
| Vectors have many uses. For some uses it is easier to look at a vector
|  using its x and y components, while for others it is easier to use its
|  magnitude and direction.
|
| When defining a vector variable, it may be tempting to give the vector
|  properties for each of these values, but because they are interdependent,
|  if you want to change one property, you have to make sure the others match.
|
| For example, multiplying a vector by a scalar can most easily be thought of
|  as scaling its magnitude. However, when the magnitude of a vector changes,
|  so must its x and y components. When adding two vectors, you may find it
|  easier to add the x and y components, however doing so also changes the
|  vector's magnitude and direction in ways that aren't quite as simple.
|
| You can simplify these processes in programming by only defining a vector
|  using one pair of values (x and y OR magnitude and direction), and use
|  functions to represent or modify the vector using the other pair of values,
|  when it makes more sense to use those instead.
|
| In programming, a function to find a property in a different way than simply
|  reading a variable's value is called an "accessor" method, or a "getter".
|  A function that changes a property in a different way than simply assigning
|  a value to a variable is called a "mutator" method, or "setter".
|
| You can use getters and setters to work with vectors using all of its
|  properties, without having to manually change its representation.
\----------------------------------------------------------------------------*/


// First, decide which representation you want to use as the base.
// Define the vector using simple variables for the pair of properties
//  for that representation.

// Here, we use a cartesian representation (x and y components)
var cartesian_vector = {
    x:0,
    y:0
};

// Now define a property to access the magnitude of the vector.
// The property itself will not include a variable, because it will be
//  accessed using a getter and a setter.
var magnitude_property = {};

// Give the property an accessor (getter) function, that calculates the
//  magnitude of the vector using its x and y components
magnitude_property.get = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

// Give the property a mutator (setter) function, that changes x and y
//  to match the new magnitude.
magnitude_property.set = function(new_value) {
    // For simplicity, assume a zero vector's direction is 0°
    if(this.magnitude === 0) {
        this.x = new_value;
        this.y = 0;
    // Setting the magnitude of a non-zero vector requires scaling its
    // x and y components to match
    } else {
        var scale_factor = new_value / this.magnitude;
        this.x = this.x * scale_factor;
        this.y = this.y * scale_factor;
    }
};

// Now assign the property to the vector using the name "magnitude"
Object.defineProperty(cartesian_vector, 'magnitude', magnitude_property);

// Now define a property to access the direction (angle) of the vector.
var direction_property = {};

// Give the property an accessor (getter) function that calculates the
//  direction of the vector using its x and y components.
direction_property.get = function() {
    // For simplicity, assume a zero vector's direction is 0°
    if(this.magnitude === 0) {
        return 0;
    // For non-zero vectors, the direction can be computed using the
    //  inverse tangent function.
    } else {
        // Math.atan2 is a special version of the arctangent function
        //  that accounts for vertical vectors with x = 0, where
        //  tan(theta) = y/x would be undefined (dividing by zero).
        // It also automatically finds the angle in the correct quadrant
        //  (normally arctangent only covers quadrants I and IV)
        return Math.atan2(this.y, this.x);
    }
};

// Give the property a mutator (setter) function that changes x and y
//  to match the new direction.
direction_property.set = function(angle) {
    // Since we assume all zero vetcors' directions are 0°, no change
    //  can be made when changing the angle of a zero vector.
    if(this.magnitude === 0) {
        return;
    // Setting the angle of a non-zero vector requires preserving the
    //  magnitude, and setting the x and y components based on the cosine
    //  and sine of the direction's angle from the positive x-axis.
    } else {
        // Store the magnitude in a temporary variable, so it is not
        //  computed differently in-between setting the new x-value and
        //  setting the new y-value.
        var magnitude = this.magnitude;
        this.x = magnitude * Math.cos(angle);
        this.y = magnitude * Math.sin(angle);
    }
};

// Now assign the property to the vector using the name "direction"
Object.defineProperty(cartesian_vector, 'direction', direction_property);

// TRY IT!
// Write getter and setter properties for x and y components of a vector
//  defined in polar (magnitude & direction) form.

var polar_vector = {
    magnitude:0,
    direction:0
}

// SAMPLE ANSWER

Object.defineProperty(polar_vector, 'x', {
    get: function() {
        return this.magnitude * Math.cos(this.direction);
    },
    set: function(x) {
        var y = this.y;
        this.magnitude = Math.sqrt(x*x + y*y);
        this.direction = Math.atan2(y, x);
    },
    enumerable: true
});

Object.defineProperty(polar_vector, 'y', {
    get: function() {
        return this.magnitude * Math.sin(this.direction);
    },
    set: function(y) {
        var x = this.x;
        this.magnitude = Math.sqrt(x*x + y*y);
        this.direction = Math.atan2(y, x);
    },
    enumerable: true
});