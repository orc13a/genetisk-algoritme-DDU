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

function continueAlgo() {
    let noChange = 0;
    let valueChange = 0;

    if (gensBests.length > 11) {
        for (let i = gensBests.length - 1; i >= gensBests.length - 11; i--) {
            const best = gensBests[i];
    
            if (best !== valueChange) {
                valueChange = best;
            } else {
                noChange++;
            }
        }
    
        if (noChange === 5) {
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

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

    allBps.forEach(bp => {
        const fitness = calFitness(bp);
        if (fitness >= 20) {
            bestBps.push(bp);
        }
    });

    return bestBps;
}

function genNewGeneration() {
    const bestBps = findBestBps();
    allBps = [];

    for (let i = 0; i < 2000; i++) {
        let newBp = [];
        const bp1 = bestBps[random(0, bestBps.length - 1)];
        const bp2 = bestBps[random(0, bestBps.length - 1)];

        newBp = crossover(bp1, bp2);
        allBps.push(newBp);
    }

    generations++;
}

function crossover(backpack1, backpack2) {
    let newBp = [];

    let bp1 = [...backpack1];
    let bp2 = [...backpack2];
    let half = Math.ceil(bp1.length / 2);
    let bp1Half = bp1.slice(0, half);
    let bp2Half = bp2.splice(half, bp2.length);

    let mergeBackpack = bp1Half.concat(bp2Half);
    newBp = removeDuplicateInArray(mergeBackpack);
    const itemsRemoved = mergeBackpack.length - newBp.length;
    replaceDuplicates(newBp, itemsRemoved);

    return newBp;
}

function findDuplicateInArray(array) {
    let duplicates = [];
    let foundDuplicates = array.filter((item, index) => array.indexOf(item) !== index);

    for (const i of foundDuplicates) {
        duplicates.push(i.item);
    }

    return duplicates;
}

function removeDuplicateInArray(array) {
    let arr = [...array];
    const duplicats = findDuplicateInArray(array);

    for (let i = 0; i < arr.length; i++) {
        const it = arr[i];
        if (duplicats.includes(it.item) === true) {
            arr.splice(i, 1);
            let di = duplicats.indexOf(it.item);
            duplicats.splice(di, 1);
            i = 0;
        }
    }

    return arr;
}

function replaceDuplicates(array, replaceNr) {
    let genstande = [...items]; // Laver kopi af genstande listen
    array.forEach(elt => {
        const i = genstande.indexOf(elt);
        genstande.splice(i, 1);
    });

    for (let i = 1; i <= replaceNr; i++) {
        const bpSum = sumBp(array);

        for(let i = 0; i < genstande.length; i++) {
            const item = genstande[i];      
            const itemIndex = i;
            const newWeight = bpSum.totalWeight + item.weight;
            if (newWeight <= 5000) {
                array.push(item);
                genstande.splice(itemIndex, 1);
                break;
            }
        }
    }
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