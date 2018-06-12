// !!!! DRAFT !!!!

// N-Q.A
// Reason quantitatively and use units to solve problems.
// (3) Choose a level of accuracy appropriate to limitations on measurement
//      when reporting quantities.

/*---------------------------------------------------------------------------*\
| Humans in general are very good at algebra. We can use symbols and notations
|  to perfectly define numbers that are literally impossible to write as
|  decimals, such as Pi, e, the square root of 2, or even the very simple
|  quantity 1/3, which in decimal form has an infinite number of digits.
|
| Computers are also very good at math, but only the most advanced computers
|  are very good at algebra. In general, computers work with numbers in a
|  similar way to how humans work with decimals and fractions—they are limited
|  by the number of digits (or bits, for computers) they can write.
|
| Humans usually represent numbers in base 10, using the digits 0 through 9.
|  With decimal digits, you can write any fraction that has a denominator whose
|  only prime factors are 2 and/or 5. But if the denominator of the fraction
|  (after reducing) has any other prime factor (such as 3, 7, or 11), the
|  number of digits in its decimal representation is infinite.
|
| Computers are even more limited. Using base 2 (binary), the only digits are
|  0 and 1, and any fraction written in binary will have an infinite number of
|  bits (binary digits) if the denominator has any factor other than 2. For
|  example, although 1/5 in decimal is 0.2, in binary it is 0.001100110011…
|
| Just like how humans use algebraic representations such as √2, 1/3, Pi, or
|  "0.1 repeating" to represent numbers that cannot be expressed as decimals,
|  a programmer can use what are called "data structures" to get around the
|  limitations of simple binary representations.
|
| Modern computers have many such data structures either programmed in to the
|  operating system, and even sometimes built-in to the hardware itself. But
|  which type of data structure to use is still often a choice that must be
|  made by the programmer.
|
| Even if you don't know what data structure is used to represent a number,
|  you can gain some insight into the limitations of that data structure by
|  writing what is known as a "test suite". A test suite is a list of inputs
|  and outputs for a function that you can use to check for errors in your
|  program, or limitations of the data structure.
\----------------------------------------------------------------------------*/

// This function will round a number to the thousandth, to test
function round(x) {
  return +(x.toFixed(3));
}

// We will be adding this number a lot; store it now so we don't have to
//  re-calculate and re-round it every time.
var thousandth = round(1/1000);

// Test adding 1/1000 to all fractions of 1000, from 0/1000 to 999/1000.
var counter = 0;
while (counter < 1000) {

    // Get that many thousandths.
    start = round(counter / 1000);

    // Get the next number of thousandths.
    next = round((counter + 1) / 1000);

    // Test whether that the start + 0.001 matches the next.
    sum = start + thousandth;
    if(sum !== next) {
        console.log(start+" + 0.001 = "+sum+" ≠ "+next);
    }

    // Get ready to test the next one
    counter = counter + 1;
}

// TRY IT!

function round_binary(x) {
  return (Math.round(x*1024)) / 1024;
}

// Sample answer

var thousand_twenty_fourth = round_binary(1/1024);
var counter = 0;
while (counter < 1024) {

    start = round_binary(counter / 1024);
    next = round_binary((counter + 1) / 1024);

    sum = start + thousand_twenty_fourth;
    if(sum !== next) {
        console.log(counter+"/1024 + 1/1024 = "+sum+" ≠ "+next);
    }

    // Get ready to test the next one
    counter = counter + 1;
}

console.log("Test complete on "+counter+"/1024 sums.");