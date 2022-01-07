// Tilfældigt tal mellem "min" og "max" begge taget med
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let allBackpacks = []; // Holder alle tasker
let nextAllBackpacks = []; // Holder alle tasker

// Laver tasker mellem 2 tal af antal genstande der må komme i
// Der komme kun en af hver genstand i tasken
function generatePossibleBackpacks() {
    let numberItemsAllowed = random(6, 23); // Finder det antal genstande som skal i tasken
    let itemsPickedIndex = []; // Holder på de genstandes index som er blevet pakket
    let backpack = []; // Den taske som bliver pakket

    // Så længde tasken ikke er blevet færdig pakket
    while (itemsPickedIndex.length <= numberItemsAllowed) {
        let newItemIndex = random(0, items.length - 1); // Findet en ny genstand
        // Så længde "newItemIndex" finde en genstand som allerede er blevet taget,
        // skal den finde en ny som ikke er blevet pakket.
        while (itemsPickedIndex.includes(newItemIndex)) {
            newItemIndex = random(0, items.length - 1);
        }
        // Gemmer pakket genstand index
        itemsPickedIndex.push(newItemIndex);
        // Gemmer pakket genstand i tasken
        backpack.push(pickItem(newItemIndex));
    }

    // Sender tasken til array med alle tasker
    allBackpacks.push(backpack);
}

// Hent genstand fra genstand arrayen
function pickItem(index) {
    return items[index];
}

// Udregner sum af vægt og værdi af tasker i alle tasker
function sumAllBackpack() {
    let sumArray = []; // Holder på alle taskers sum
    let backpackWeightSum = 0; // En taske vægt sum
    let backpackPriceSum = 0; // En taske pris sum

    // Gå igennem alle tasker en efter en
    allBackpacks.forEach(b => { // b = taske
        // Denne taskes sum
        backpackWeightSum = 0;
        backpackPriceSum = 0;

        // For hver genstand i denne taske
        b.forEach(i => {
            backpackWeightSum += i.weight;
            backpackPriceSum += i.price;
        });

        // Tilføjer et objekt af denne taskes sum
        sumArray.push({
            totalWeight: backpackWeightSum,
            totalValue: backpackPriceSum
        });
    });

    return sumArray;
}

function calFitnessForAll() {
    // allBackpacks = nextAllBackpacks;

    let allBackpacksSum = sumAllBackpack();

    // Holder på genstande med vægt under 5000g
    let under5000gArray = [];

    // Hvor hver sum objekt af en taske
    for (let i = 0; i < allBackpacksSum.length; i++) {
        const item = allBackpacksSum[i];
        if (item.totalWeight <= 5000) {
            under5000gArray.push(allBackpacks[i]);
        }
    }

    // Gemmer de vægt godkendte tasker
    allBackpacks = under5000gArray;
}

function reproduction() {
    for (let i = 0; i < allBackpacks.length; i++) {
        if (i !== allBackpacks.length - 1) {
            crossover(allBackpacks[i], allBackpacks[i + 1]);
        } else {
            crossover(allBackpacks[0], allBackpacks[i]);
        }
    }

    evolutionTracker();
}

function evolutionTracker() {
    const sum = sumAllBackpack();

    sum.forEach(bp => {
        if (bp.totalValue > bestBackpack.totalValue) {
            bestBackpack = bp;
            lastBestpackGeneration = generation;
        }
    });

    if (generation - lastBestpackGeneration === 10) {
        run = false;
    }

    document.getElementById('generationOutput').innerText = ` ${generation - 10}`;

    generation++;
}

function crossover(pack1, pack2) {
    let pack1Copy = pack1;
    let pack2Copy = pack2;

    const pack1Center = Math.ceil(pack1.length / 2);
    const pack2Center = Math.ceil(pack2.length / 2);

    let take1 = pack1Copy.slice(0, pack1Center + 1);
    let take2 = pack2Copy.slice(pack2Center, pack2.length);

    let mergeBackpack = take1.concat(take2);
    let newBackpack = removeDuplicateInArray(mergeBackpack);
    const itemsRemoved = mergeBackpack.length - newBackpack.length;
    replaceDuplicates(newBackpack, itemsRemoved);

    nextAllBackpacks.push(newBackpack);
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
    let itemsCopy = [...items];
    array.forEach(elt => {
        const i = itemsCopy.indexOf(elt);
        itemsCopy.splice(i, 1);
    });
    
    for (let i = 1; i <= replaceNr; i++) {
        const randomIndex = random(0, itemsCopy.length - 1);
        array.push(itemsCopy[randomIndex]);
        itemsCopy.splice(randomIndex, 1);
    }
}