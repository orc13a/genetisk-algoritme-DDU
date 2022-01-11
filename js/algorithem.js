let generation = 0;

function updateGeneration() {
    generation++;
    document.getElementById('generationOutput').innerHTML = ` ${generation}`;
}

// Trin 1, lav tilfældige start tasker
for (let i = 1; i <= 2000; i++) {
    createFirstGeneration();
}

updateGeneration();
removeOverWeight();
updateWeight();
/* for (let i = 1; i <= 100; i++) {
    removeOverWeight();

    createNewGen();
} */

console.log(allBps);
console.log(sumAllBps());