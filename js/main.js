// Tilfældigt tal mellem "min" og "max" begge taget med
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getItem(index) {
    return items[index];
}

// All backpacks
let allBps = [];  

function createFirstGeneration() {
    const backSize = random(10, 23);
    let bp = [];

    while (bp.length <= backSize) {
        let randomItem = getItem(random(0, 23));
        while (bp.includes(randomItem) === true) {
            randomItem = getItem(random(0, 23));
        }
        bp.push(randomItem);
    }

    allBps.push(bp);
}