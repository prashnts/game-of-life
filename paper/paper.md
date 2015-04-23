Implementation of List Life algorithm for the Game of Life
====

#Abstract
Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. 

#Game Rules
The universe of the Game of Life is an infinite two-dimensional grid of binary-state cells. Each cells can have either a `alive`, or `dead` state. Every one of the cells can interact within its Moore Neighborhood. The Moore Neighborhood are the eight surrounding cells to the cell. See Figure.

The interaction function that defines the transition is defined as a function of the number of neighbor cells that are alive. It is given as:

- Live cell with fewer than two live neighbors dies. (under-population)
- Live cell with two or three live neighbors lives on to the next generation.
- Live cell with more than three live neighbors dies. (overcrowding)
- Dead cell with exactly three live neighbors becomes a live cell. (reproduction)

#Game Patterns
Various different types of patterns occur in the Game of Life.
These include:

- Still lifes: These do not change between iterations.
- Oscillators: These oscillate between different repeating patterns with a given period.
- Spaceships: These patterns translate themselves across the universe of the Game.

