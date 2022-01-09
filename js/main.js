// Tilfældigt tal mellem "min" og "max" begge taget med
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getItem(index) {
    return items[index];
}

// All backpacks
let allBps = [];  

// Skaber første generation
function createFirstGeneration() {
    const backSize = random(10, 23);
    let bp = [];

    // Fuld tasken op
    while (bp.length <= backSize) {
        let randomItem = getItem(random(0, 23));
        // Tilføj genstand som ikke er i tasken
        while (bp.includes(randomItem) === true) {
            randomItem = getItem(random(0, 23));
        }
        bp.push(randomItem);
    }

    allBps.push(bp);
}

// Udregn alle taskers totale vægt og værdi
function sumAllBps() {
    let allSumBps = []; 
    let totalWeight = 0;
    let totalValue = 0;

    allBps.forEach(bp => {
        bp.forEach(item => {
            totalWeight += item.weight;
            totalValue += item.price;
        });

        allSumBps.push({
            totalWeight,
            totalValue
        });

        totalWeight = 0;
        totalValue = 0;
    });

    return allSumBps;
}

function removeOverWeight() {
    const bpsSum = sumAllBps();

    for (let i = 0; i < bpsSum.length; i++) {
        const bp = bpsSum[i];
        if (bp.totalWeight > 5000) {
            allBps.splice(i, 1);
            i--;
        }
    }

    updateGeneration();
}