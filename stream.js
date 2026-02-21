// Test stream file
// Read file "test.txt" in stream and print the content
const fs = require('fs');
const readline = require('readline');

// STREAM
console.time("Stream");
const fileStream = fs.createReadStream('test.txt');
const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});
let count = 0;
rl.on('line', (line) => {
    count++;
});
rl.on('close', () => {
    console.log(`Stream: ${count} lines`);
    console.timeEnd("Stream")
});

// NO STREAM
console.time("No Stream");
const fileContent = fs.readFileSync('test.txt', 'utf8');
console.log(`No Stream: ${fileContent.split('\n').length} lines`);
console.timeEnd("No Stream");