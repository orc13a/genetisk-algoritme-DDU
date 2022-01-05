// Tilfældigt tal mellem "min" og "max" begge taget med
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let allBackpacks = []; // Holder alle tasker

// Laver tasker mellem 2 tal af antal genstande der må komme i
// Der komme kun en af hver genstand i tasken
function generatePossibleBackpacks() {
    let numberItemsAllowed = random(5, 15); // Finder det antal genstande som skal i tasken
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

// TODO
// Lav dette forloop om til en funktion som  kun laver de mulige unikke tasker
for (let i = 0; i < 100; i++) {
    generatePossibleBackpacks();
}

console.log(sumAllBackpack());

