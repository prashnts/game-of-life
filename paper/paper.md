Implementation of List Life algorithm for the Game of Life
====

#Abstract
Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. Presented here is a JavaScript implementation of List Life algorithm for the Game projected on an isometric grid.

#Introduction
A cellular automaton consists of a grid of cells that are finite state automatons, that is, the grid can be in any finite number of dimensions. For each cell, a set of cells called its neighborhood is defined relative to the specified cell. An initial state (time t = 0) is selected by assigning a state for each cell. A new generation is created (advancing t by 1), according to set of fixed rules that determines the new state of each cell in terms of the current state of the cell and the states of the cells in its neighborhood.
Game of Life is a type of cellular automaton of binary state finite automaton grids.

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

## Implementation Details
###List Life
The List Life algorithm is an array mapped Game board. The optimizations are mainly to allow skipping the dead cells in the list.

- The universe is represented as an list of the co-ordinates of the live cells in scan-line order.
- This is scanned by three pointers, for the current row and the rows above and below.
- One co-ordinate per cell. Instead of storing the Y co-ordinate for every cell in a row, store it once at the start of the row and only store the X co-ordinate of each cell in the row.
- In order to distinguish between X and Y co-ordinates, give them opposite signs, e.g. all X co-ordinates are positive and all Y co-ordinates are negative.

The implementation in JavaScript follows closely to the original implementation in C. The dead neighbors are estimated by checking the states of following neighbors:

    [x - 1, y - 1, 1]
    [x,     y - 1, 1]
    [x + 1, y - 1, 1]
    [x - 1, y,     1]
    [x + 1, y,     1]
    [x - 1, y + 1, 1]
    [x,     y + 1, 1]
    [x + 1, y + 1, 1]

###HTML5 Canvas
There are two implemented HTML5 Canvas elements. Former one shows the 2D overview of the Game. The later one is used to projects isometric pixels of the Game.
The height and width of the canvas is determined dynamically after the page load using JavaScript directive {`window.innerHeight`, `window.innerWidth`} which sizes the canvas equal to the viewport.
The simulation is controlled via runtime semaphore interrupts.

##Author's notes
The implementation and the source are hosted on GitHub at https://prshnts.in/game-of-life/.

#References
