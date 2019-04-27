// SEQUENCE RUNNER!

require('dotenv').config()
const fs = require('fs')
const path = require('path')

const { INPUT_FILE_NAME, OUTPUT_FILE_NAME } = require('rfs-reader-writer')

// use a bash command helper like shelljs
const shell = require('shelljs')

// check if languages of operators are available, and any other validation
const validateSequence = (sequence) => {
    if (sequence.length < 1) {
        return {
            valid: false,
            message: "Sequence must contain at least 1 operator"
        }
    }
    return {
        valid: true,
        message: ""
    }
}

// dependencies file name, code file main, dependencies install command, run code command
const languageMaps = {
    node: ['package.json', 'index.js', 'npm install', 'node index.js'],
    rust: ['Cargo.toml', 'src/main.rs', null, 'cargo run']
}

// it will run this for each operator in the sequence
const runOperator = (sequence, index, input) => {
    const operator = sequence[index]

    console.log(`Running ${operator.id} operator`)
    console.log(`description: ${operator.description || 'no description'}`)

    // create a folder with the id of operator
    console.log(`${operator.id}: Creating temporary directory for operator`)
    fs.mkdirSync(path.join(__dirname, operator.id))

    // write the dependencies file into the folder
    console.log(`${operator.id}: Writing dependencies spec to file`)
    const depsFileName = languageMaps[operator.language][0]
    fs.writeFileSync(path.join(__dirname, operator.id, depsFileName), JSON.stringify(operator.dependencies_file))

    // write the code file into the folder
    console.log(`${operator.id}: Writing operator code to file`)
    const codeFileName = languageMaps[operator.language][1]
    fs.writeFileSync(path.join(__dirname, operator.id, codeFileName), operator.code_file)

    // install any dependencies
    const installDepsCommand = languageMaps[operator.language][2]
    if (installDepsCommand) {
        console.log(`${operator.id}: Installing dependencies`)
        shell.cd(operator.id)
        shell.exec(installDepsCommand, { silent: true })
        shell.cd('..')
    }

    // write the input into the folder, as JSON
    console.log(`${operator.id}: Writing operator input to JSON file`)
    fs.writeFileSync(path.join(__dirname, operator.id, INPUT_FILE_NAME), JSON.stringify(input))

    // execute the process, and wait for it to complete
    console.log(`${operator.id}: Executing operator...`)
    const runCommand = languageMaps[operator.language][3]
    shell.cd(operator.id)
    shell.exec(runCommand)
    shell.cd('..')
    console.log(`${operator.id}: complete`)

    // on complete, move to next operator, providing the output of the
    // last, as input for the next, until all the sequence is complete
    const outputBuffer = fs.readFileSync(path.join(__dirname, operator.id, OUTPUT_FILE_NAME))
    const output = JSON.parse(outputBuffer)
    console.log(`${operator.id}: output: `, output)

    // clean out the folder of the operator
    shell.rm('-rf', path.join(__dirname, operator.id))
    
    // call the next in the sequence, if there is one
    if (sequence[index + 1]) {
        // pass the output of this operator
        // in as the input to the next one
        runOperator(sequence, index + 1, output)
    } else {
        // otherwise store the results
        fs.writeFileSync(path.join(__dirname, OUTPUT_FILE_NAME), JSON.stringify(output))
    }
}


// read in sequence file
const sequenceToRun = require('./sequence.1.json')
const checkValid = validateSequence(sequenceToRun)
if (!checkValid.valid) {
    console.log('Invalid sequence, exiting. Message:')
    console.log(checkValid.message)
    process.exit(1)
}

const initialIndex = 0
const initialInput = [3]
runOperator(sequenceToRun, initialIndex, initialInput)
// exit

