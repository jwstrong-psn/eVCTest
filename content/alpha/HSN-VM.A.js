// N-VM.A
// Represent and model with vector quantities

/*---------------------------------------------------------------------------*\
| Vectors have many uses. For some uses it is easier to look at a vector
|  using its x and y components, while for others it is easier to use its
|  magnitude and direction.
|
| When defining a vector variable, it may be tempting to give the vector
|  properties for all of these values, but because they are interdependent,
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
    // For simplicity, assume a zero vector's direction is 0°, so
    //  assigning a magnitude to a zero vector will create a horizontal
    //  vector with x-value equal to the new magnitude
    if(this.magnitude === 0) {
        this.x = new_value;
        this.y = 0;
    }
    // Setting the magnitude of a non-zero vector requires scaling its
    // x and y components to match
    else {
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
    // N.B. with atan2, described below, this is unnecessary,
    //  but it's good practice to consider and account for special
    //  cases, usually involving zero.
    if(this.magnitude === 0) {
        return 0;
    }
    // For non-zero vectors, the direction can be computed using the
    //  inverse tangent function.
    else {
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
    // Since we assume all zero vectors' directions are 0°, no change
    //  can be made when changing the angle of a zero vector.
    if(this.magnitude === 0) {
        return;
    }
    // Setting the angle of a non-zero vector requires preserving the
    //  magnitude, and setting the x and y components based on the cosine
    //  and sine of the direction's angle from the positive x-axis.
    else {
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

Object.defineProperty(polar_vector, 'magnitude', {enumerable: false});
Object.defineProperty(polar_vector, 'direction', {enumerable: false});

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