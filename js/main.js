// ####################
// Items er under items.js
// ####################

// --------------------------------------------------

// Tilfældigt tal mellem "min" og "max" begge taget med
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Bp = backpack

// Alle generations tasker 
let allBps = [];
let gensBests = [];

// Generate start population
function genStartPop() {
    for (let i = 0; i < 2000; i++) {
        let genstande = [...items]; // Laver kopi af genstande listen
        let newBp = [];
        
        while (sumBp(newBp).totalWeight < 5000) {
            let usedItems = 0;

            if (genstande.length === 0 || usedItems === items.length) {
                break;
            }

            let item = genstande[random(0, genstande.length - 1)];
            const itemIndex = genstande.indexOf(item);
            const newWeight = sumBp(newBp).totalWeight + item.weight;
            
            if (newWeight <= 5000) {
                newBp.push(item);
                genstande.splice(itemIndex, 1);
                usedItems++;
            } else {
                break;
            }
        }

        allBps.push(newBp);
    }

    generations++;
}

function findBestBps() {
    let bestBps = [];
    const allBpsSum = sumAllBps();
    
    allBps.forEach(bp => {
        const fitness = calFitness(bp);
        if (fitness >= 18) {
            bestBps.push(bp);
        }
    });

    return bestBps;
}

function genNewGeneration() {
    for (let i = 0; i < 2000; i++) {
        let genstande = [...items]; // Laver kopi af genstande listen
        let newBp = [];


    }

    generations++;
}

function crossover(backpack1, backpack2) {
    let newBp = [];

    let bp1 = [...backpack1];
    let bp2 = [...backpack2];
    let half = ceil(bp1.length / 2);
    let bp1Half = bp1.slice(0, half);
    let bp2Half = bp2.splice(half, bp2.length);

    newBp = bp1Half.concat(bp2Half);

    
}

function findBestBp() {
    // let best = {
    //     totalWeight: 0,
    //     totalValue: 0
    // };
    let bestValue = 0;
    const allBpsSum = sumAllBps();

    allBpsSum.forEach(bp => {
        if (bp.totalValue > bestValue) {
            bestValue = bp.totalValue;
        }
    });

    gensBests.push(bestValue);
}

function calFitness(bp) {
    const bpSum = sumBp(bp);
    const ratio = (bpSum.totalValue / bpSum.totalWeight) * 100; // Få i procent

    return ratio;
}

// Udregn sum af en taske
function sumBp(bp) {
    let totalWeight = 0;
    let totalValue = 0;

    bp.forEach(item => {
        totalWeight += item.weight;
        totalValue += item.price;
    });

    return {
        totalWeight,
        totalValue
    };
}

// Udregn sum af alle tasker
function sumAllBps() {
    let bps = [];

    allBps.forEach(bp => {
        let totalWeight = 0;
        let totalValue = 0;

        bp.forEach(item => {
            totalWeight += item.weight;
            totalValue += item.price;
        });

        bps.push({
            totalWeight,
            totalValue
        });
    });

    return bps;
}