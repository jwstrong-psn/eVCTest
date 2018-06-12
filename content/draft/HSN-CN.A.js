// N-CN.A
// Perform arithmetic operations with complex numbers

/*---------------------------------------------------------------------------*\
| On paper, arithmetic on complex numbers takes a few more steps than on real
|  numbers, but with programming, you can 
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

//