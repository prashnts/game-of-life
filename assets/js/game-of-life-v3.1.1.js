/*global alert: false, clearInterval: false, console: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, jsonParse: false, location: false, name: false, navigator: false, obelisk: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

/**
 * Game of Life - JS & CSS
 * http://pmav.eu
 * 04/Sep/2010
 */

var GOL = {

    columns: 100,
    rows: 80,

    waitTime: 0,
    generation: 0,

    running: false,
    autoplay: true,

    clear: {
        schedule: false
    },

    times: {
        algorithm: 0,
        gui: 0
    },

    element: {
        generation: null,
        steptime: null,
        livecells: null,
        hint: null,
        messages: {
            layout: null
        }
    },

    // Trail state
    trail: {
        current: true,
        schedule: false
    },


    // Grid style
    grid: {
        current: 0,

        schemes: [
            {
                color: '#000'
            },
        ]
    },

    // Cell colors
    colors: {
        current: 0,
        schedule: false,

        schemes: [
            {
                dead: '#FFFFFF',
                trail: [
                    '#B5ECA2'
                ],
                alive: [
                    '#9898FF',
                    '#8585FF',
                    '#7272FF',
                    '#5F5FFF',
                    '#4C4CFF',
                    '#3939FF',
                    '#2626FF',
                    '#1313FF',
                    '#0000FF',
                    '#1313FF',
                    '#2626FF',
                    '#3939FF',
                    '#4C4CFF',
                    '#5F5FFF',
                    '#7272FF',
                    '#8585FF'
                ]
            }
        ]
    },

    states: {
        still_life: [
            {
                "8": [
                    60,
                    61,
                    98,
                    103,
                    109,
                    115
                ]
            },
            {
                "9": [
                    60,
                    61,
                    77,
                    78,
                    97,
                    99,
                    102,
                    104,
                    108,
                    110,
                    114,
                    116
                ]
            },
            {
                "10": [
                    76,
                    79,
                    98,
                    103,
                    105,
                    109,
                    111,
                    115,
                    117
                ]
            },
            {
                "11": [
                    76,
                    79,
                    104,
                    110,
                    112,
                    116,
                    118
                ]
            },
            {
                "12": [
                    60,
                    61,
                    63,
                    64,
                    77,
                    78,
                    111,
                    117
                ]
            },
            {
                "13": [
                    60,
                    61,
                    63,
                    64
                ]
            },
            {
                "19": [
                    76,
                    77,
                    79,
                    97,
                    98,
                    102,
                    103,
                    108,
                    109,
                    114,
                    115
                ]
            },
            {
                "20": [
                    76,
                    78,
                    79,
                    97,
                    99,
                    102,
                    104,
                    108,
                    110,
                    114,
                    116
                ]
            },
            {
                "21": [
                    98,
                    103,
                    105,
                    109,
                    111,
                    115,
                    117
                ]
            },
            {
                "22": [
                    104,
                    110,
                    112,
                    116,
                    118
                ]
            },
            {
                "23": [
                    61,
                    111,
                    117
                ]
            },
            {
                "24": [
                    60,
                    62,
                    76,
                    77
                ]
            },
            {
                "25": [
                    60,
                    62,
                    75,
                    78
                ]
            },
            {
                "26": [
                    61,
                    76,
                    79
                ]
            },
            {
                "27": [
                    77,
                    78,
                    96,
                    97,
                    102,
                    103,
                    109,
                    110,
                    115,
                    116
                ]
            },
            {
                "28": [
                    96,
                    98,
                    102,
                    104,
                    109,
                    111,
                    115,
                    117
                ]
            },
            {
                "29": [
                    61,
                    65,
                    97,
                    98,
                    103,
                    105,
                    110,
                    112,
                    116,
                    118
                ]
            },
            {
                "30": [
                    60,
                    62,
                    64,
                    66,
                    104,
                    105,
                    111,
                    113,
                    117,
                    119
                ]
            },
            {
                "31": [
                    60,
                    62,
                    64,
                    66,
                    75,
                    76,
                    112,
                    113,
                    118,
                    120
                ]
            },
            {
                "32": [
                    61,
                    65,
                    75,
                    78,
                    119,
                    120
                ]
            },
            {
                "33": [
                    77,
                    78
                ]
            },
            {
                "37": [
                    78,
                    79
                ]
            },
            {
                "38": [
                    77,
                    79
                ]
            },
            {
                "39": [
                    77
                ]
            },
            {
                "40": [
                    60,
                    61,
                    63,
                    64,
                    75,
                    77
                ]
            },
            {
                "41": [
                    61,
                    63,
                    75,
                    76
                ]
            },
            {
                "42": [
                    61,
                    63
                ]
            },
            {
                "43": [
                    60,
                    61,
                    63,
                    64,
                    114
                ]
            },
            {
                "44": [
                    78,
                    79,
                    84,
                    85,
                    92,
                    93,
                    95,
                    113,
                    115
                ]
            },
            {
                "45": [
                    79,
                    84,
                    86,
                    92,
                    93,
                    95,
                    96,
                    97,
                    104,
                    112,
                    115
                ]
            },
            {
                "46": [
                    78,
                    86,
                    98,
                    103,
                    105,
                    111,
                    113,
                    114
                ]
            },
            {
                "47": [
                    75,
                    77,
                    86,
                    87,
                    92,
                    93,
                    95,
                    96,
                    97,
                    102,
                    105,
                    110,
                    112
                ]
            },
            {
                "48": [
                    75,
                    76,
                    93,
                    95,
                    103,
                    104,
                    109,
                    112
                ]
            },
            {
                "49": [
                    93,
                    95,
                    110,
                    111
                ]
            },
            {
                "50": [
                    94
                ]
            }
        ],
        glider_gun: [
            {
                "9": [
                    44
                ]
            },
            {
                "10": [
                    42,
                    44
                ]
            },
            {
                "11": [
                    32,
                    33,
                    40,
                    41,
                    54,
                    55
                ]
            },
            {
                "12": [
                    31,
                    35,
                    40,
                    41,
                    54,
                    55
                ]
            },
            {
                "13": [
                    20,
                    21,
                    30,
                    36,
                    40,
                    41
                ]
            },
            {
                "14": [
                    20,
                    21,
                    30,
                    34,
                    36,
                    37,
                    42,
                    44
                ]
            },
            {
                "15": [
                    30,
                    36,
                    44
                ]
            },
            {
                "16": [
                    31,
                    35
                ]
            },
            {
                "17": [
                    32,
                    33
                ]
            }
        ],
        acorn: [
            {
                "39": [
                    110
                ]
            },
            {
                "40": [
                    112
                ]
            },
            {
                "41": [
                    109,
                    110,
                    113,
                    114,
                    115
                ]
            }
        ],
        initial: [
            {
                39: [110]
            },
            {
                40: [112]
            },
            {
                41: [109, 110, 113, 114, 115]
            }
        ]
    },

    /**
     * On Load Event
     */
    init: function () {
        "use strict";
        this.listLife.init();   // Reset/init algorithm
        this.helpers.readStateIntoListLife(this.states.acorn);
        this.initDOM(); // Keep DOM References (getElementsById)
        this.canvas.init();     // Init canvas GUI
        this.iso_canvas.init();

        this.prepare();
    },

    randomState: function () {
        "use strict";
        var i, liveCells = (this.rows * this.columns) * 0.12;

        for (i = 0; i < liveCells; i += 1) {
            this.listLife.addCell(this.helpers.random(0, this.columns - 1), this.helpers.random(0, this.rows - 1), this.listLife.actualState);
        }

        this.listLife.nextGeneration();
    },

    cleanUp: function () {
        "use strict";
        this.listLife.init(); // Reset/init algorithm
        this.prepare();
    },

    prepare: function () {
        "use strict";
        this.generation = this.times.algorithm = this.times.gui = 0;
        this.mouseDown = this.clear.schedule = false;

        this.element.generation.innerHTML = '0';
        this.element.livecells.innerHTML = '0';

        this.canvas.clearWorld(); // Reset GUI
        this.canvas.drawWorld(); // Draw State

        if (this.autoplay) { // Next Flow
            this.autoplay = false;
            this.handlers.buttons.run();
        }
    },

    initDOM: function () {
        "use strict";
        this.element.generation = document.getElementById('generation');
        this.element.livecells = document.getElementById('livecells');
    },

    registerEvents: function () {
        "use strict";

        // Keyboard Events
        this.helpers.registerEvent(document.body, 'keyup', this.handlers.keyboard, false);

        // Controls
        this.helpers.registerEvent(document.getElementById('buttonRun'), 'click', this.handlers.buttons.run, false);
        this.helpers.registerEvent(document.getElementById('buttonStep'), 'click', this.handlers.buttons.step, false);
        this.helpers.registerEvent(document.getElementById('buttonClear'), 'click', this.handlers.buttons.clear, false);
    },

    nextStep: function () {
        "use strict";
        var i, x, y, liveCellNumber, algorithmTime;

        algorithmTime = (new Date());
        liveCellNumber = this.listLife.nextGeneration();
        algorithmTime = (new Date()) - algorithmTime;

        for (i = 0; i < this.listLife.redrawList.length; i += 1) {
            x = this.listLife.redrawList[i][0];
            y = this.listLife.redrawList[i][1];

            if (this.listLife.redrawList[i][2] === 1) {
                this.canvas.changeCelltoAlive(x, y);
            } else if (this.listLife.redrawList[i][2] === 2) {
                this.canvas.keepCellAlive(x, y);
            } else {
                this.canvas.changeCelltoDead(x, y);
            }
        }

        // Pos-run updates

        // Clear Trail
        if (this.trail.schedule) {
            this.trail.schedule = false;
            this.canvas.drawWorld();
        }

        // Change Grid
        if (this.grid.schedule) {
            this.grid.schedule = false;
            this.canvas.drawWorld();
        }

        // Change Colors
        if (this.colors.schedule) {
            this.colors.schedule = false;
            this.canvas.drawWorld();
        }

        // Running Information
        this.generation += 1;
        this.element.generation.innerHTML = this.generation;
        this.element.livecells.innerHTML = liveCellNumber;

        // Flow Control
        if (this.running) {
            setTimeout(function () {
                GOL.nextStep();
            }, this.waitTime);
        } else {
            if (this.clear.schedule) {
                this.cleanUp();
            }
        }
    },

    handlers: {

        mouseDown: false,
        lastX: 0,
        lastY: 0,


        /**
         *
         */
        canvasMouseDown: function (event) {
            "use strict";
            var position = GOL.helpers.mousePosition(event);
            GOL.canvas.switchCell(position[0], position[1]);
            GOL.handlers.lastX = position[0];
            GOL.handlers.lastY = position[1];
            GOL.handlers.mouseDown = true;
        },


        /**
         *
         */
        canvasMouseUp: function () {
            "use strict";
            GOL.handlers.mouseDown = false;
        },


        /**
         *
         */
        canvasMouseMove: function (event) {
            "use strict";
            if (GOL.handlers.mouseDown) {
                var position = GOL.helpers.mousePosition(event);
                if ((position[0] !== GOL.handlers.lastX) || (position[1] !== GOL.handlers.lastY)) {
                    GOL.canvas.switchCell(position[0], position[1]);
                    GOL.handlers.lastX = position[0];
                    GOL.handlers.lastY = position[1];
                }
            }
        },


        /**
         *
         */
        keyboard: function (e) {
            "use strict";
            var event = e;
            if (!event) {
                event = window.event;
            }

            if (event.keyCode === 67) { // Key: C
                GOL.handlers.buttons.clear();
            } else if (event.keyCode === 82) { // Key: R
                GOL.handlers.buttons.run();
            } else if (event.keyCode === 83) { // Key: S
                GOL.handlers.buttons.step();
            }
        },


        buttons: {
            /**
             * Button Handler - Run
             */
            run: function () {
                "use strict";
                //GOL.element.hint.style.display = 'none';

                GOL.running = !GOL.running;
                if (GOL.running) {
                    GOL.nextStep();
                    document.getElementById('buttonRun').value = 'Stop';
                } else {
                    document.getElementById('buttonRun').value = 'Run';
                }
            },


            /**
             * Button Handler - Next Step - One Step only
             */
            step: function () {
                "use strict";
                if (!GOL.running) {
                    GOL.nextStep();
                }
            },


            /**
             * Button Handler - Clear World
             */
            clear: function () {
                "use strict";
                if (GOL.running) {
                    GOL.clear.schedule = true;
                    GOL.running = false;
                    document.getElementById('buttonRun').value = 'Run';
                } else {
                    GOL.cleanUp();
                }
            },


            /**
             * Button Handler - Remove/Add Trail
             */
            trail: function () {
                "use strict";
                GOL.element.messages.layout.innerHTML = GOL.trail.current ? 'Trail is Off' : 'Trail is On';
                GOL.trail.current = !GOL.trail.current;
                if (GOL.running) {
                    GOL.trail.schedule = true;
                } else {
                    GOL.canvas.drawWorld();
                }
            },


            /**
             *
             */
            colors: function () {
                "use strict";
                GOL.colors.current = (GOL.colors.current + 1) % GOL.colors.schemes.length;
                GOL.element.messages.layout.innerHTML = 'Color Scheme #' + (GOL.colors.current + 1);
                if (GOL.running) {
                    GOL.colors.schedule = true; // Delay redraw
                } else {
                    GOL.canvas.drawWorld(); // Force complete redraw
                }
            },


            /**
             *
             */
            grid: function () {
                "use strict";
                GOL.grid.current = (GOL.grid.current + 1) % GOL.grid.schemes.length;
                GOL.element.messages.layout.innerHTML = 'Grid Scheme #' + (GOL.grid.current + 1);
                if (GOL.running) {
                    GOL.grid.schedule = true; // Delay redraw
                } else {
                    GOL.canvas.drawWorld(); // Force complete redraw
                }
            }
        }
    },

    canvas: {
        context: null,
        width: null,
        height: null,
        age: null,
        cellSize: 1,
        cellSpace: 1,

        init: function () {
            "use strict";

            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.setCanvasSize();
            this.clearWorld();
        },

        clearWorld: function () {
            "use strict";
            var i, j;

            // Init ages (Canvas reference)
            this.age = [];
            for (i = 0; i < GOL.columns; i += 1) {
                this.age[i] = [];
                for (j = 0; j < GOL.rows; j += 1) {
                    this.age[i][j] = 0; // Dead
                }
            }
        },

        drawWorld: function () {
            "use strict";
            var i, j;

            for (i = GOL.rows - 1; i > 0; i -= 1) {
                for (j = GOL.columns - 1; j > 0; j -= 1) {
                    if (GOL.listLife.isAlive(j, i)) {
                        this.drawCell(j, i, true);
                    } else {
                        this.drawCell(j, i, false);
                    }
                }
            }
        },

        drawCell: function (i, j, alive) {
            "use strict";

            if (alive) {

                if (this.age[i][j] > -1) {
                    this.context.fillStyle = GOL.colors.schemes[0].alive[4];
                }
            } else {
                if (GOL.trail.current && this.age[i][j] < 0) {
                    this.context.fillStyle = GOL.colors.schemes[GOL.colors.current].trail[(this.age[i][j] * -1) % GOL.colors.schemes[GOL.colors.current].trail.length];
                } else {
                    this.context.fillStyle = GOL.colors.schemes[GOL.colors.current].dead;
                }
            }

            GOL.iso_canvas.drawCell(i, j, alive, this.age[i][j]);

            this.context.fillRect(
                (this.cellSize * i),
                (this.cellSize * j),
                this.cellSize,
                this.cellSize
            );
        },

        switchCell: function (i, j) {
            "use strict";
            if (GOL.listLife.isAlive(i, j)) {
                this.changeCelltoDead(i, j);
                GOL.listLife.removeCell(i, j, GOL.listLife.actualState);
            } else {
                this.changeCelltoAlive(i, j);
                GOL.listLife.addCell(i, j, GOL.listLife.actualState);
            }
        },

        keepCellAlive: function (i, j) {
            "use strict";
            if (i >= 0 && i < GOL.columns && j >= 0 && j < GOL.rows) {
                this.age[i][j] += 1;
                this.drawCell(i, j, true);
            }
        },

        changeCelltoAlive: function (i, j) {
            "use strict";
            if (i >= 0 && i < GOL.columns && j >= 0 && j < GOL.rows) {
                this.age[i][j] = 1;
                this.drawCell(i, j, true);
            }
        },

        changeCelltoDead: function (i, j) {
            "use strict";
            if (i >= 0 && i < GOL.columns && j >= 0 && j < GOL.rows) {
                this.age[i][j] = -this.age[i][j]; // Keep trail
                this.drawCell(i, j, false);
            }
        },

        setCanvasSize: function () {
            "use strict";
            this.width = 1 + (this.cellSpace * GOL.columns) + (this.cellSize * GOL.columns);
            this.canvas.setAttribute('width', this.width);

            this.height = 1 + (this.cellSpace * GOL.rows) + (this.cellSize * GOL.rows);
            this.canvas.getAttribute('height', this.height);
        }
    },

    iso_canvas: {
        context: null,
        cube_len: 12,
        colors: {
            alive: 0x42A5F5,
            dead: 0xFFFFFF,
            trail: 0xBEE6A1,
        },
        obelisk_color: {},
        cubes: {},

        init: function () {
            "use strict";
            this.context = document.getElementById('canvas-demo');
            this.obelisk_color.alive = new obelisk.CubeColor().getByHorizontalColor(this.colors.alive);
            this.obelisk_color.dead = new obelisk.CubeColor().getByHorizontalColor(this.colors.dead);
            this.obelisk_color.trail = new obelisk.CubeColor().getByHorizontalColor(this.colors.trail);

            var dimension = new obelisk.CubeDimension(this.cube_len, this.cube_len, this.cube_len);
            this.cubes.cube_alive = new obelisk.Cube(dimension, this.obelisk_color.alive);
            this.cubes.cube_trail = new obelisk.Cube(dimension, this.obelisk_color.trail);
            this.cubes.cube_dead  = new obelisk.Cube(dimension, this.obelisk_color.dead);
        },

        drawCell: function (i, j, alive) {
            "use strict";
            var i_pos = i * this.cube_len,
                j_pos = j * this.cube_len;

            if (alive) {
                if (GOL.canvas.age[i][j] > -1) {
                    new obelisk.PixelView(this.context, new obelisk.Point(i_pos, j_pos)).renderObject(this.cubes.cube_alive);
                }
            } else {
                if (GOL.canvas.age[i][j] < 0) {
                    new obelisk.PixelView(this.context, new obelisk.Point(i_pos, j_pos)).renderObject(this.cubes.cube_trail);
                } else {
                    new obelisk.PixelView(this.context, new obelisk.Point(i_pos, j_pos)).renderObject(this.cubes.cube_dead);
                }
            }
        }
    },

    /**
     * Implementation of the List Life Algorithm for Conway's Game of Life.
     * @type {Object}
     */
    listLife: {
        actualState: [],
        redrawList: [],

        init: function () {
            "use strict";
            this.actualState = [];
        },

        nextGeneration: function () {
            "use strict";
            var x, y, i, j, m, key, t1, t2, alive = 0, neighbours, deadNeighbours, allDeadNeighbours = {}, newState = [];
            this.redrawList = [];

            for (i = 0; i < this.actualState.length; i += 1) {
                this.topPointer = 1;
                this.bottomPointer = 1;

                for (j = 1; j < this.actualState[i].length; j += 1) {
                    x = this.actualState[i][j];
                    y = this.actualState[i][0];

                    // Possible dead neighbours
                    deadNeighbours = [
                        [x - 1, y - 1, 1],
                        [x,     y - 1, 1],
                        [x + 1, y - 1, 1],
                        [x - 1, y,     1],
                        [x + 1, y,     1],
                        [x - 1, y + 1, 1],
                        [x,     y + 1, 1],
                        [x + 1, y + 1, 1]
                    ];

                    // Get number of live neighbours and remove alive neighbours from deadNeighbours
                    neighbours = this.getNeighboursFromAlive(x, y, i, deadNeighbours);

                    // Join dead neighbours to check list
                    for (m = 0; m < 8; m += 1) {
                        if (deadNeighbours[m] !== undefined) {
                            key = deadNeighbours[m][0] + ',' + deadNeighbours[m][1]; // Create hashtable key

                            if (allDeadNeighbours[key] === undefined) {
                                allDeadNeighbours[key] = 1;
                            } else {
                                allDeadNeighbours[key] += 1;
                            }
                        }
                    }

                    if (!(neighbours === 0 || neighbours === 1 || neighbours > 3)) {
                        this.addCell(x, y, newState);
                        alive += 1;
                        this.redrawList.push([x, y, 2]); // Keep alive
                    } else {
                        this.redrawList.push([x, y, 0]); // Kill cell
                    }
                }
            }

            // Process dead neighbours
            for (key in allDeadNeighbours) {
                if (allDeadNeighbours[key] === 3) { // Add new Cell
                    key = key.split(',');
                    t1 = parseInt(key[0], 10);
                    t2 = parseInt(key[1], 10);

                    this.addCell(t1, t2, newState);
                    alive += 1;
                    this.redrawList.push([t1, t2, 1]);
                }
            }

            this.actualState = newState;
            return alive;
        },

        topPointer: 1,
        middlePointer: 1,
        bottomPointer: 1,

        getNeighboursFromAlive: function (x, y, i, possibleNeighboursList) {
            "use strict";
            var neighbours = 0, k;

            // Top
            if (this.actualState[i - 1] !== undefined) {
                if (this.actualState[i - 1][0] === (y - 1)) {
                    for (k = this.topPointer; k < this.actualState[i - 1].length; k += 1) {
                        if (this.actualState[i - 1][k] >= (x - 1)) {
                            if (this.actualState[i - 1][k] === (x - 1)) {
                                possibleNeighboursList[0] = undefined;
                                this.topPointer = k + 1;
                                neighbours += 1;
                            }
                            if (this.actualState[i - 1][k] === x) {
                                possibleNeighboursList[1] = undefined;
                                this.topPointer = k;
                                neighbours += 1;
                            }
                            if (this.actualState[i - 1][k] === (x + 1)) {
                                possibleNeighboursList[2] = undefined;
                                if (k === 1) {
                                    this.topPointer = 1;
                                } else {
                                    this.topPointer = k - 1;
                                }
                                neighbours += 1;
                            }
                            if (this.actualState[i - 1][k] > (x + 1)) {
                                break;
                            }
                        }
                    }
                }
            }

            // Middle
            for (k = 1; k < this.actualState[i].length; k += 1) {
                if (this.actualState[i][k] >= (x - 1)) {
                    if (this.actualState[i][k] === (x - 1)) {
                        possibleNeighboursList[3] = undefined;
                        neighbours += 1;
                    }
                    if (this.actualState[i][k] === (x + 1)) {
                        possibleNeighboursList[4] = undefined;
                        neighbours += 1;
                    }
                    if (this.actualState[i][k] > (x + 1)) {
                        break;
                    }
                }
            }

            // Bottom
            if (this.actualState[i + 1] !== undefined) {
                if (this.actualState[i + 1][0] === (y + 1)) {
                    for (k = this.bottomPointer; k < this.actualState[i + 1].length; k += 1) {
                        if (this.actualState[i + 1][k] >= (x - 1)) {
                            if (this.actualState[i + 1][k] === (x - 1)) {
                                possibleNeighboursList[5] = undefined;
                                this.bottomPointer = k + 1;
                                neighbours += 1;
                            }
                            if (this.actualState[i + 1][k] === x) {
                                possibleNeighboursList[6] = undefined;
                                this.bottomPointer = k;
                                neighbours += 1;
                            }
                            if (this.actualState[i + 1][k] === (x + 1)) {
                                possibleNeighboursList[7] = undefined;
                                if (k === 1) {
                                    this.bottomPointer = 1;
                                } else {
                                    this.bottomPointer = k - 1;
                                }

                                neighbours += 1;
                            }
                            if (this.actualState[i + 1][k] > (x + 1)) {
                                break;
                            }
                        }
                    }
                }
            }

            return neighbours;
        },

        isAlive: function (x, y) {
            "use strict";
            var i, j;

            for (i = 0; i < this.actualState.length; i += 1) {
                if (this.actualState[i][0] === y) {
                    for (j = 1; j < this.actualState[i].length; j += 1) {
                        if (this.actualState[i][j] === x) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },

        removeCell: function (x, y, state) {
            "use strict";
            var i, j;

            for (i = 0; i < state.length; i += 1) {
                if (state[i][0] === y) {

                    if (state[i].length === 2) { // Remove all Row
                        state.splice(i, 1);
                    } else { // Remove Element
                        for (j = 1; j < state[i].length; j += 1) {
                            if (state[i][j] === x) {
                                state[i].splice(j, 1);
                            }
                        }
                    }
                }
            }
        },

        addCell: function (x, y, state) {
            "use strict";
            if (state.length === 0) {
                state.push([y, x]);
                return;
            }

            var k, n, m, tempRow, newState = [], added;

            if (y < state[0][0]) { // Add to Head
                newState = [[y, x]];
                for (k = 0; k < state.length; k += 1) {
                    newState[k + 1] = state[k];
                }

                for (k = 0; k < newState.length; k += 1) {
                    state[k] = newState[k];
                }

                return;

            }

            if (y > state[state.length - 1][0]) { // Add to Tail
                state[state.length] = [y, x];
                return;

            }

            for (n = 0; n < state.length; n += 1) {
                if (state[n][0] === y) { // Level Exists
                    tempRow = [];
                    added = false;
                    for (m = 1; m < state[n].length; m += 1) {
                        if ((!added) && (x < state[n][m])) {
                            tempRow.push(x);
                            added = !added;
                        }
                        tempRow.push(state[n][m]);
                    }
                    tempRow.unshift(y);
                    if (!added) {
                        tempRow.push(x);
                    }
                    state[n] = tempRow;
                    return;
                }

                if (y < state[n][0]) { // Create Level
                    newState = [];
                    for (k = 0; k < state.length; k += 1) {
                        if (k === n) {
                            newState[k] = [y, x];
                            newState[k + 1] = state[k];
                        } else if (k < n) {
                            newState[k] = state[k];
                        } else if (k > n) {
                            newState[k + 1] = state[k];
                        }
                    }

                    for (k = 0; k < newState.length; k += 1) {
                        state[k] = newState[k];
                    }

                    return;
                }
            }
        }
    },

    helpers: {
        readStateIntoListLife: function (state) {
            "use strict";
            var i, j, y;
            for (i = 0; i < state.length; i += 1) {
                for (y in state[i]) {
                    if (state[i].hasOwnProperty(y)) {
                        for (j = 0; j < state[i][y].length; j += 1) {
                            GOL.listLife.addCell(state[i][y][j], parseInt(y, 10), GOL.listLife.actualState);
                        }
                    }
                }
            }
        },

        random: function (min, max) {
            "use strict";
            return min <= max ? min + Math.round(Math.random() * (max - min)) : null;
        }
    }

};

GOL.init();

