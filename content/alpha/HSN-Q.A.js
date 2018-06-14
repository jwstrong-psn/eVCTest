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
|  a computer programmer can use what are called "data structures" to get
|  around the limitations of simple binary representations.
|
| Modern computers have many such data structures programmed in to the
|  operating system, and some are even built-in to the hardware itself. But
|  which type of data structure to use is still often a choice that must be
|  made by the programmer.
|
| Even if you don't know what data structure is used to represent a number,
|  you can gain some insight into the limitations of that data structure by
|  writing what is known as a "test suite". A test suite is a list of inputs
|  and outputs for a function that you can use to check for errors in your
|  program, or limitations of the data structure.
\----------------------------------------------------------------------------*/

// Here we will use a test suite to identify arithmetic errors that can
//  result from the default data structure used to represent numbers.
//  Most data structures for numbers handle integers very well, but can
//  have some problems with very small numbers, or numbers using many
//  digits of precision, similar to the errors you encounter when you round
//  an intermediate calculation instead of the final result.

// Here, we'll test for errors in addition by adding 0.001 to a variety of
//  decimal values, and noting where the calculated result is incorrect.

// This function will create the correct decimal to test, for x/1000.
//  To avoid introducing decimal error by computing the decimal amount,
//  it creates the number by literally spelling it out, starting with the
//  integer numerator, and inserting a decimal point three digits from the
//  right.
// Don't worry about understanding the details of this function just yet.
//  If you're curious how it works, you can look it up later; for now, just
//  focus on how the test suite below uses the function.
function thousandths(x) {
  // Fill out enough zeroes to make a 3-digit thousandths value.
  x = String(x).padStart(3,"0");
  var integer_part = x.slice(0,-3);
  var decimal_part = x.slice(-3);
  return +(integer_part+"."+decimal_part);
}

// Now test adding 1/1000 to each fraction from 0/1000 to 999/1000
// Start by setting a counter for keeping track of which number is being
//  tested, and how many tests have passed or failed.
var counter = 0;
var successes = 0;
var failures = 0;
while (counter < 1000) {

    // Get the correct number to add 1/1000 to
    var start = thousandths(counter);

    // Get the correct number to test the sum against
    var correct_sum = thousandths(counter + 1);

    // Add 1/1000 to the start to get the test result
    var test_sum = start + thousandths(1);

    // Compare to the correct answer
    if(test_sum === correct_sum) {
        successes = successes + 1;
    }
    // If the sum is incorrect, keep track of which test failed.
    else {
        console.log(start+" + 0.001 = "+test_sum+" ≠ "+correct_sum);
        failures = failures + 1;
    }

    // Use the next number for the next test
    counter = counter + 1;
}

// After all numbers are tested, confirm that the test is complete, and report
//  a total of how many tests passed & how many tests failed.
console.log(counter+" tests complete: "+successes+" tests passed; "+failures+" tests failed.");

// TRY IT! a

// Computers are a lot better at dealing with binary numbers than decimal
//  numbers. Prove it by adding "binary thousandths", where a binary thousandth
//  is 1/2^10, or 1/1024.

// We can probably safely calculate the test values by
//  division without spelling it out, but just to be safe, let's spell out the
//  decimal value in ten-billionths (9,765,625/10,000,000,000 to be exact) and
//  use the safer integer arithmetic to get the exact value.
function binary_thousandths(x) {
  // Multiply x by 9,765,625, and fill out enough zeroes to make a 10-digit
  //  ten-billionths value.
  var ten_billionths = String(9765625*x).padStart(10,"0");
  var integer_part = ten_billionths.slice(0,-10);
  var decimal_part = ten_billionths.slice(-10);
  return +(integer_part+"."+decimal_part);
}

// Sample answer

var counter = 0;
var successes = 0;
var failures = 0;
while (counter < 1024) {

    var start = binary_thousandths(counter);
    var correct_sum = binary_thousandths(counter + 1);

    var test_sum = start + binary_thousandths(1);
    if(test_sum === correct_sum) {
        successes += 1;
    }
    else {
        console.log(counter+"/1024 + 1/1024 = "+test_sum+" ≠ "+correct_sum);
        failures += 1;
    }

    counter += 1;
}
console.log(counter+" tests complete: "+successes+" tests passed; "+failures+" tests failed.");

// TRY IT! b

// Write test suites for multiplication, division, and subtraction, for both
//  decimal thousandths and binary thousandths. Remember to reset the counter
//  before each suite of tests, and to add 1 to the counter after each time
//  you test a number.

var counter = 0;
var product_successes = 0;
var product_failures = 0;
var quotient_successes = 0;
var quotient_failures = 0;
var difference_successes = 0;
var difference_failures = 0;
while(counter < 1000) {
  var correct_answer = thousandths(counter);

  var test_product = counter * thousandths(1);
  var test_quotient = counter / 1000;
  var test_difference = thousandths(counter + 1) - thousandths(1);

  if(test_product === correct_answer) {
    product_successes += 1;
  }
  else {
    console.log(counter+" * 0.001 = "+test_product+" ≠ "+correct_answer);
    product_failures += 1;
  }

  if(test_quotient === correct_answer) {
    quotient_successes += 1;
  }
  else {
    console.log(counter+" / 1000 = "+test_quotient+" ≠ "+correct_answer);
    quotient_failures += 1;
  }

  if(test_difference === correct_answer) {
    difference_successes += 1;
  }
  else {
    console.log(thousandths(counter + 1)+" - 0.001 = "+test_difference+" ≠ "+correct_answer);
    difference_failures += 1;
  }

  counter += 1;
}
console.log(counter+" decimal tests complete:");
console.log("Multiplication: "+product_successes+" passed; "+product_failures+" failed.");
console.log("Division: "+quotient_successes+" passed; "+quotient_failures+" failed.");
console.log("Subtraction: "+difference_successes+" passed; "+difference_failures+" failed.");

var counter = 0;
var product_successes = 0;
var product_failures = 0;
var quotient_successes = 0;
var quotient_failures = 0;
var difference_successes = 0;
var difference_failures = 0;
while(counter < 1024) {
  var correct_answer = binary_thousandths(counter);

  var test_product = counter * binary_thousandths(1);
  var test_quotient = counter / 1024;
  var test_difference = binary_thousandths(counter + 1) - binary_thousandths(1);

  if(test_product === correct_answer) {
    product_successes += 1;
  }
  else {
    console.log(counter+" * 1/1024 = "+test_product+" ≠ "+correct_answer);
    product_failures += 1;
  }

  if(test_quotient === correct_answer) {
    quotient_successes += 1;
  }
  else {
    console.log(counter+" / 1024 = "+test_quotient+" ≠ "+correct_answer);
    quotient_failures += 1;
  }

  if(test_difference === correct_answer) {
    difference_successes += 1;
  }
  else {
    console.log((counter + 1)+"/1024 - 1/1024 = "+test_difference+" ≠ "+correct_answer);
    difference_failures += 1;
  }

  counter += 1;
}
console.log(counter+" binary tests complete:");
console.log("Multiplication: "+product_successes+" passed; "+product_failures+" failed.");
console.log("Division: "+quotient_successes+" passed; "+quotient_failures+" failed.");
console.log("Subtraction: "+difference_successes+" passed; "+difference_failures+" failed.");