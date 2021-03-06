// N-CN.A
// Perform arithmetic operations with complex numbers

/*---------------------------------------------------------------------------*\
| On paper, arithmetic on complex numbers takes a few more steps than on real
|  numbers, but you can use programming to make those arithmetic operations
|  just as simple, by redefining those operations in a way that accounts for
|  the different properties of complex numbers.
|
| Normally, a real number value is stored in a variable as a single number,
|  but just like complex numbers have two parts, the real part and the
|  imaginary part, a variable representing a complex number should also store
|  that number in two parts. A variable with multiple parts is an example of
|  a "data structure".
|
| A data structure is simply a way of organizing data, using categories to
|  ensure that data of different types each get treated in the way appropriate
|  to that data. In this case, arithmetic on complex numbers will be treated
|  slightly differently than arithmetic on real numbers.
\----------------------------------------------------------------------------*/

// Here is a basic data structure for the complex number (2 + 3i). Notice that
//  the imaginary part is written only using its coefficient, 3, rather than
//  the whole imaginary value, 3i.
var z = {
  real_part: 2,
  imaginary_part: 3
}

// This function will add two complex numbers a and b. Each complex number
//  will have a real part and an imaginary part, and their sum will also be a
//  complex number with a real part and an imaginary part.
function add_complex(a,b) {
  // The real part of the sum will be the sum of the real parts of a and b
  var real = a.real_part + b.real_part;

  // The imaginary part of the sum will be the sum of the imaginary parts of
  //  a and b. The coefficient of that imaginary part will be the sum of the
  //  coefficients of the imaginary parts of a and b.
  var imaginary = a.imaginary_part + b.imaginary_part;

  // The real and imaginary parts need to be combined into the complex
  //  number's data structure.
  return {
    real_part: real,
    imaginary_part: imaginary
  };
}

// Notice that the function add_complex will only work if both a and b have
//  a real part and an imaginary part to add. This means that add_complex
//  will not be able to add real numbers which only have one value. But,
//  since all real numbers are complex numbers, you can always represent a
//  real number as a complex number, using a process known as "casting".
//
// Casting a variable as a different data structure in order to perform an
//  operation on it is a little like casting an actor as a character to
//  perform a play or movie, in that you must put the variable into a new
//  costume, that is appropriate for the operation you want to perform.
//
// Here is a function that will cast a real number as a complex number:
function complex(a) {
  return {
    real_part: a,
    imaginary_part: 0
  };
}

// Now to make sure that complex numbers get added properly to real numbers,
//  we need to extend the addition function to check whether the number
//  being added is a real number (a simple variable with one value) or a
//  complex number (a variable with a real part and an imaginary part).
function add(a,b) {
  // Cast a as a complex number if necessary
  if(a.imaginary_part === undefined) {
    a = complex(a);
  }

  // Cast b as a complex number if necessary
  if(b.imaginary_part === undefined) {
    b = complex(b);
  }

  // Now that both a and b are complex numbers, you can add them together
  //  using the add_complex function.
  var sum = add_complex(a,b);

  // Return the sum
  return sum;
}

// TRY IT! a

// Note that the add function above will always return a complex number, even
//  if both a and b are real numbers, or if their imaginary parts cancel out.
//  This means you will only be able to use operations that are defined for
//  the complex number data structure with the output. If you want to be able
//  to continue to use real number operations on outputs that are real numbers,
//  you can use another casting function on the output (the variable "sum")
//  before you return it. Insert the following instruction between the last two
//  instructions in the add function:
//
//  if(sum.imaginary_part == 0) {
//      sum = real(sum);
//  }
//
//  Now define the function real(a) to cast a complex number a as a real
//  number.
//
// Challenge: what should happen if you try to cast a complex number with
//  a nonzero imaginary part as a real number?

// Sample answer

function real(a) {
  if(a.imaginary_part === 0) {
    return a.real_part;
  }
  else {
    console.log("Nonzero real part! Cannot cast as a real number.");
    return a;
  }
}

// TRY IT! b

// Write a function multiply_complex(a,b) to multiply two complex numbers, and
//  then write a function multiply(a,b) to multiply any two numbers, using casting
//  to change the inputs to complex numbers if they are not already.

// Sample answer

function multiply_complex(a,b) {
  return {
    real_part: a.real_part*b.real_part - a.imaginary_part*b.imaginary_part,
    imaginary_part: a.real_part*b.imaginary_part + a.imaginary_part*b.real_part
  };
}

// Includes checking input type, and allows casting in either direction
function careful_cast(a,complex) {
  if(complex === true) { // return a complex number
    if(a.imaginary_part === undefined) { // a needs to be cast
      return {
        real_part: a,
        imaginary_part: 0
      };
    }
    else { // a is already a complex number
      return a;
    }
  }
  else { // return a real number
    if(a.imaginary_part === undefined) { // a is already a real number
      return a;
    }
    else { // a needs to be cast
      if(a.imaginary_part === 0) {
        return a.real_part;
      }
      else {
        throw new Error("Complex number with nonzero imaginary part is not \
          a real number.");
      }
    }
  }
}

function multiply(a,b) {
  // cast both as complex numbers
  a = careful_cast(a, true);
  b = careful_cast(b, true);

  var out = multiply_complex(a,b);

  // cast numbers with no imaginary parts back as real numbers
  try { // it won't always work
    return careful_cast(out,false);
  }
  catch (error) { // unable to cast as a real number
    return out;
  }
}