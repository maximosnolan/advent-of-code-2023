// import * as fs from 'fs';
// import * as readline from 'readline';

// type SeedMap = {
//     [key: string]: number[][];
//   };

// function expandSeedRanges(ranges: number[]): number[] {
// const expandedSeeds: number[] = [];

// for (let i = 0; i < ranges.length; i += 2) {
//     const start = ranges[i];
//     const length = ranges[i + 1];

//     for (let j = 0; j < length; j++) {
//     expandedSeeds.push(start + j);
//     }
// }

// return expandedSeeds;
// }

// function readFileLineByLine(filePath: string): void {
//     const fileStream = fs.createReadStream(filePath);
//     const rl = readline.createInterface({
//         input: fileStream,
//         crlfDelay: Infinity, // To recognize both '\r\n' and '\n' as line endings
//     });

//     // Event listener for each line
//     let currentKey = "";
//     const seedMap: SeedMap = {};
//     let seeds: number[] = [];
    
//     rl.on('line', (line: string) => {
//       if (line.includes("map")) {
//         currentKey = line.split(" ")[0];
//         seedMap[currentKey] = [];
//         console.log(currentKey);
//       } else if (line.includes("seeds:")) {
//         const resultArray = line.split(" ");
//         seeds = resultArray.slice(1).map((str) => parseInt(str, 10));
//       } else if (line.length > 1) {
//         const resultArray = line.split(" ");
//         const intArray: number[] = resultArray.map((str) => parseInt(str, 10));
//         seedMap[currentKey].push(intArray);
//         console.log(intArray);
//       }
    
//       // Your processing logic for each line here
//     });
    
//     // Event listener for the end of the file
//     rl.on('close', () => {
//       console.log("SEEDS " + seeds);


//     const seedKeys = Object.keys(seedMap);

//         for (const key of seedKeys) {
//         const entries = seedMap[key];
//         console.log("KEY IS " + key);
//         if (entries) {
//             const seedModified : boolean[] = Array(seeds.length).fill(false);
//             console.log("BOOLS " + seedModified);
//             for (const entry of entries) {
//                 console.log("SEEDS CURRENTLY ARE " + seeds);
//                 for (let i = 0; i < seeds.length; i++) {
//                     if (entry[1] <= seeds[i] && seeds[i] <= (entry[1] + entry[2]) && seedModified[i] == false) {
//                     const diff = entry[0] - entry[1];
//                     seeds[i] = seeds[i] + diff;
//                     console.log("NEW VALUE " + seeds[i]);
//                     seedModified[i] = true;
//                     }
//                 }
//             console.log(entry);
//             }
//         }
//         }

//       console.log("SOLUTION " + Math.min(...seeds));
//     });


//     rl.on('close', () => {
//         console.log('End of file reached.');
//     });
// }

// readFileLineByLine("example.txt");
import * as readline from 'readline';
import * as fs from 'fs';

type SeedMap = {
  [key: string]: number[][];
};

const rl = readline.createInterface({
  input: fs.createReadStream('example.txt'), // Update with your input file name
  output: process.stdout,
  terminal: false,
});

let currentKey = "";
const seedMap: SeedMap = {};
const seedRanges: number[][] = [];
let seeds: number[] = [];

rl.on('line', (line: string) => {
  if (line.includes("map")) {
    currentKey = line.split(" ")[0];
    seedMap[currentKey] = [];
    console.log(currentKey);
  } else if (line.includes("seeds:")) {
    const resultArray = line.split(" ");
    seedRanges.push(resultArray.slice(1).map((str) => parseInt(str, 10)));
  } else if (line.length > 1) {
    const resultArray = line.split(" ");
    const intArray: number[] = resultArray.map((str) => parseInt(str, 10));
    seedMap[currentKey].push(intArray);
    console.log(intArray);
  }

  // Your processing logic for each line here
});

// Event listener for the end of the file
rl.on('close', () => {
  console.log("SEEDS " + seeds);

  processSeedMap(seedMap, seedRanges, seeds);

  const minLocation = findMinLocation(seeds);
  console.log(minLocation !== Infinity ? "SOLUTION " + minLocation : "No valid solution found");
});

function processSeedMap(seedMap: SeedMap, seedRanges: number[][], seeds: number[]): void {
  const seedKeys = Object.keys(seedMap);

  for (const key of seedKeys) {
    const entries = seedMap[key];
    console.log("KEY IS " + key);
    if (entries) {
      const seedModified: boolean[] = Array(seeds.length).fill(false);
      console.log("BOOLS " + seedModified);
      for (const entry of entries) {
        console.log("SEEDS CURRENTLY ARE " + seeds);
        for (let i = 0; i < seeds.length; i++) {
          if (seedInRange(seeds[i], seedRanges) && !seedModified[i]) {
            const diff = entry[0] - entry[1];
            seeds[i] = seeds[i] + diff;
            console.log("NEW VALUE " + seeds[i]);
            seedModified[i] = true;
          }
        }
        console.log(entry);
      }
    }
  }
}

function findMinLocation(seeds: number[]): number {
  const validSeeds = seeds.filter(seed => isFinite(seed));
  return validSeeds.length > 0 ? Math.min(...validSeeds) : Infinity;
}

function seedInRange(seed: number, ranges: number[][]): boolean {
  for (const range of ranges) {
    const start = range[0];
    const end = start + range[1] - 1;
    if (seed >= start && seed <= end) {
      return true;
    }
  }
  return false;
}
