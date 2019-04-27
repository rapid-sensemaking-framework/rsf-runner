# rsf-runner

Input: a sequence of rsf-runner compatible steps, as JSON

An example:
```json
[
    {
        "id": "addup",
        "description": "Add numbers in an array",
        "language": "node",
        "version": "10.15.1",
        "dependencies_file": {
            "dependencies": {
                "rsf-reader-writer": "^0.0.2"
            }
        },
        "code_file": "const { readInput, writeOutput } = require('rsf-reader-writer');const input = readInput(__dirname);const result = input.reduce((memo, val) => memo + val, 0);writeOutput(__dirname, {max_time: 30000, prompt: `hi, please offer up to ${result} ideas`, max_responses: result, participants_config: [{ id: '+12223334444', name: 'Person Lastname', type: 'phone' }]});"
    },
    {
        "id": "rsf-collect-responses",
        "description": "Gather input from people based on a prompt",
        "language": "node",
        "version": "10.15.1",
        "dependencies_file": {
            "dependencies": {
                "rsf-collect-responses": "^0.0.25"
            }
        },
        "code_file": "require('rsf-collect-responses').main(__dirname)"
    }
]
```

Output: the results of the sequence, written to `output.json`