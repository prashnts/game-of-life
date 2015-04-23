Implementation of List Life algorithm for the Game of Life
====

#Abstract
Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. 

#Game Rules
The universe of the Game of Life is an infinite two-dimensional grid of binary-state cells. Each cells can have either a `alive`, or `dead` state. Every one of the cells can interact with its eight neighbors. The interaction function may be defined as:


Due to each interaction, the 
each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overcrowding.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
