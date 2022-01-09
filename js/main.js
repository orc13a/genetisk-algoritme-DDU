// ####################################################################################################
// #### TODO #####
// Lav fitness bedre, kig på genstande i en taske som har en høj pris
// ####################################################################################################

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
    let allBackpacksSum = sumAllBps();

    // Holder på genstande med vægt under 5000g
    let under5000gArray = [];

    // Hvor hver sum objekt af en taske
    for (let i = 0; i < allBackpacksSum.length; i++) {
        const item = allBackpacksSum[i];
        if (item.totalWeight <= 5000) {
            under5000gArray.push(allBps[i]);
        }
    }

    // Gemmer de vægt godkendte tasker
    allBps = under5000gArray;

    updateGeneration();
}

function createNewGen() {
    let newAllBps = [];

    for (let i = 1; i <= 2000; i++) {
        const randomBp1 = allBps[random(0, allBps.length - 1)];
        let randomBp2 = allBps[random(0, allBps.length - 1)];

        while (randomBp1 === randomBp2) {
            randomBp2 = allBps[random(0, allBps.length - 1)];
        }

        const newBp = crossover(randomBp1, randomBp2);
        newAllBps.push(newBp);
    }

    allBps = newAllBps;

    updateGeneration();
}

function crossover(backpack1, backpack2) {
    let pb1 = [...backpack1];
    let pb2 = [...backpack2];

    const pack1Center = Math.ceil(pb1.length / 2);
    const pack2Center = Math.ceil(pb2.length / 2);

    let take1 = pb1.slice(0, pack1Center + 1);
    let take2 = pb2.slice(pack2Center, pb2.length);

    let mergeBackpack = take1.concat(take2);
    let newBackpack = removeDuplicateInArray(mergeBackpack);
    const itemsRemoved = mergeBackpack.length - newBackpack.length;
    replaceDuplicates(pb1, pb2, newBackpack, itemsRemoved);
    if (random(1, 10) === 5) {
        mutat(newBackpack);
    }

    return newBackpack;
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

function replaceDuplicates(backpack1, backpack2, newBackpack, itemsRemoved) {
    let pb1 = [...backpack1];
    let pb2 = [...backpack2];
    let hightsPriceItem = {
        item: '',
        weight: 0,
        price: 0
    };
    // let itemsReplaced = 0;

    for (let i = 1; i <= itemsRemoved; i++) {
        pb1.forEach(item => {
            if (newBackpack.includes(item) === false && item.price > hightsPriceItem.price) {
                hightsPriceItem = item;
                i++;
            }
        });

        pb2.forEach(item => {
            if (newBackpack.includes(item) === false && item.price > hightsPriceItem.price) {
                hightsPriceItem = item;
                i++;
            }
        });
    }
}

function mutat(array) {
    let itemsCopy = [...items];
    array.forEach(elt => {
        const i = itemsCopy.indexOf(elt);
        itemsCopy.splice(i, 1);
    });
    
    for (let i = 1; i <= random(1, 5); i++) {
        const randomIndex = random(0, itemsCopy.length - 1);
        array.push(itemsCopy[randomIndex]);
        // itemsCopy.splice(randomIndex, 1);
    }
}