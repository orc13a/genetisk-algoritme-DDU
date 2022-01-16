let generations = 0;
let run = true;

genStartPop();
findBestBp();

while (continueAlgo()) {
    genNewGeneration();
    findBestBp();
}