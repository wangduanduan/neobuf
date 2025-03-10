const d1 = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};

const d2 = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const;

const d3 = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};

// d1 = d2
d2.Down = 2
console.log(d2)