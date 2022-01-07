let generation = 1;
let lastBestpackGeneration = 1;
let bestBackpack = {
    totalWeight: 0,
    totalValue: 0
};
let run = true;

// Trin 1, lav tilfældige start tasker
for (let i = 0; i < 500001; i++) {
    generatePossibleBackpacks();
}

while (run) {
    // Trin 2
    calFitnessForAll();

    // Trin 3
    reproduction();
}

// console.log(allBackpacks);
console.log(bestBackpack);
// console.log(nextAllBackpacks);