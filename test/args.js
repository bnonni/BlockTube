const args = process.argv;
const promptCheck = args.includes('-p')
const nLengthCheck = args.find(n => /-n=[0-9]{2,3}/.test(n))
console.log(promptCheck)

let n = nLengthCheck?.split('=')[1] ?? 10;
console.log(n)