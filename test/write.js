import { writeFileSync } from 'fs';

const arrayToWrite = ['string1', 'string2', 'string3'];
const fileContent = `export default [
    ${arrayToWrite.map(str => `"${str}"`).join(",\n")}
    ]`;
    
writeFileSync('output.js', fileContent)

