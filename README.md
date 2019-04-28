# rsf-runner

Welcome to the Rapid Sensemaking Framework ecosystem entry point!

- [Skip to `Non-technical Overview`](#non-technical-overview)
- [Skip to `Principles`](#principles)
- [Skip to `Technical Overview`](#technical-overview)
- [Skip to `rsf-operators`](#rsf-operators)
- [Skip to `rsf-sequences`](#rsf-sequences)
- [Skip to `rsf-contactables`](#rsf-contactables)
- [Skip to `How to Use & Getting Started`](#how-to-use--getting-started)


## What Is The "Rapid Sensemaking Framework"?

The rapid sensemaking framework is a set of tools designed to facilitate human conversation, ideation, reasoning, and decision taking at a large scale.

Common processes for gathering human expressions (be they ideas, questions, claims, votes, edits, etc) are encoded as pluggable open-source modules that can reach across the various digital devices and applications we commonly use.

Skilled facilitators and process designers can use the rapid sensemaking framework to conduct and unfold processes for ideation, discussion, evaluation, and decision making.

Inspirations and related projects include the likes of
- [Kialo](https://www.kialo.com/)
    - tool to engage in thoughtful discussion, understand different points of view, and help with collaborative decision-making
- [Pol.is](https://pol.is/home)
    - helps organizations understand themselves by visualizing what their members think. Get a clear picture of all the points of view to help move a conversation forward.
- [Groupmap](https://www.groupmap.com/)
    - capturing individual thinking, revealing the group perspective, all in real-time. Collaborative decision making.
- [All Our Ideas](https://www.allourideas.org/)
    - start with a question and some seed ideas and create a "wiki survey". The best ideas bubble to the top.
- [Stormz](https://stormz.me)
    - enables you to design and facilitate collective intelligence sessions to test participant's knowledge, foster meaningful conversations, co-create solutions and make informed decisions.
- [Codigital](https://www.codigital.com/)
    - "Real-Time Ideas Engine". For large groups to generate, prioritize and refine ideas.
- [Loomio](https://www.loomio.org/)
    - helps people have discussions and make decisions together
- [Assembl](https://bluenove.com/en/offers/assembl/)
    - massive collective intelligence is the capacity to mobilize communities on a large scale (hundreds and thousands of participants) around key stakes and challenges to co-create new solutions in a short space of time
- [IdeaLoom](https://www.idealoom.org/)
    - sister project to Assembl
    - allows large communities to hold a meaningful conversation at scale, reach a common understanding, and develop solutions beyond what each participant could have envisioned

The basic tenets are
- ideation
- evaluation and ranking, sorting
- selection, voting, consenting


Apart from a few integrations, such as ones that Loomio has with Slack, these platforms require participants to join a new platform, and familiarize with a new tool. The RSF assumes the opposite, and brings the conversation to an already familiar space to participants: a chat platform they're already using. The process designer can even specify different people as reachable on DIFFERENT platforms, and the process can still be conducted.



## Non-technical Overview
At the moment, no graphical user interface exists for the configuration process. Until one does, let's paint a picture of what that would be like.

For any good "conversation", there is always a frame. The conversation, at least loosely, has a direction that the people who will participate in it are agreeable to and interested in. Divergent phases and convergent phases of the conversation should nicely flow and blend.

So someone who has a frame for a conversation, and wants to foster engagement pulls from a selection of available recipes for a social process, and stitches them together into a beautifully crafted flow. Things that this person would be tuning could include amount of time available for each part of the process. Loomio includes some wonderful [help text explaining best practices](https://help.loomio.org/en/user_manual/getting_started/decision_tools/) for using the powerful tools in the decision/polling toolbox of Loomio.

Once they draft the flow, they setup either an opt-in process where participants will select themselves, or if they have verbal or written consent via a personal connection, they could input each participant. To input a participant just requires adding the relevant info for the contact method they want to connect via, such as email, text, or something else.

Different stages of a process could have different participants. A different group might be included as the 'ideation' group than the 'evaluation' group.

Finally, kickoff the process...

Ideally, a live dashboard of events taking place in the process, and results coming in would be viewable, and even options for people playing facilitator type roles to add the human touch of fostering the social intelligence, and getting to great outcomes.

Once every step of the process has completed, the final results will be saved to the computer that was hosting the process, though they could also be uploaded somewhere digitally available, or posted into a database for longevity.



## Principles

The tools should offer participants in processes as much transparency into the process as makes sense for the use case. In most cases, all the participants should have the results of the entire process, rather than constrict the results to the facilitator. The process should benefit everyone.



## Technical Overview
The rsf-runner consumes a JSON file, which will be described in [RSF Operators](#rsf-operators).

The JSON file describes a sequence, where each step in the sequence has inputs and outputs.
The only expectation is that each step in the sequence read an input as JSON from a known file, and write the final
output to a JSON file with a known name when it's done.

The properties of the output of each step in the sequence should match the properties required
as the input for the next step in the sequence.

The rsf-runner has been defined flexibly enough that technically different steps in the sequence could be written
in different languages, as long as they read JSON inputs and write JSON outputs. JSON is a nice portable data format for this.

Each step in the sequence is run as a child process (as in thread process) to the main sequence which is unfolding. In other words, each step on its own would be runnable from the command line, but instead is being initiated by this process, which is then the 'parent' process (process as in thread process). The parent process is listening/waiting for the child process to exit, at which point (if it was successful) it will read the results of that process back in, which have been written to the filesystem temporarily as a JSON file.

With those results, it will either pass them as an input into the next step in the process, or, if it was the last step, it will write them to a `output.json` file in the main folder in which this was run. 

This `output.json` is where the final results can be found.

The input for the initial operator in the sequence should be written into an `input.json` file which is sitting in the root directory in which the main process is being run.




## RSF Operators

Operators are called operators because they perform operations. These operations can either be very quick, just performing a very simple transformation on data, requiring no human input, or they can involve lots of human input, and be medium to long running operations, meaning they could take days or weeks.

An operator can do whatever it takes to ingest and coordinate this human input, which will very likely involve standing up web servers, and other connection/protocol variants.

At the time of writing, two operators of interest have been developed, that are easily made to be compatible with one another.
- [rsf-collect-responses](https://github.com/rapid-sensemaking-framework/rsf-collect-responses)
    - for a prompt, collect statements numbering up to a given maximum (or unlimited) from a list of participants
- [rsf-response-for-each](https://github.com/rapid-sensemaking-framework/rsf-response-for-each)
    - for a list/array of statements, collect a response or vote (from a limited number of valid options, or unlimited) for each from a list of participants

If writing an operator in `node`, a convenience library has been written, called [rsf-reader-writer](https://github.com/rapid-sensemaking-framework/rsf-reader-writer). Check it out for its super simple API for reading the input and writing the output.

RSF Operators are modules that can be run from the command line, that follow a certain pattern of reading a file with a specific name `input.json` as an input, running as long as it needs to transform that input into a desired output, and then writing that output to a JSON file with a specific name `output.json`, and exiting the process. At the fundamentals, that is it. Obviously, infinitely diverse functionality can be written that adheres to those simple principles. The only requirements are a file system and the ability to run a process thread.

The idea is that each operator should clearly define what properties or values it expects from the JSON input,
and what properties or values it returns as the JSON output, if its successful.

By doing so, RSF Operators can build up as a library over time, and where outputs of one operator match the inputs of another,
those operators can be strung together into an RSF Sequence. They could start to be combined in many different orders and in many different ways.

An RSF Operator will be written into an RSF Sequence JSON file. It should have the following properties
in order to be compatible to run properly in the `rsf-runner` sequence runner.

`id`: `String`, an identifying string for this operator, should contain no spaces, use hyphens or camelCase to separate words

`description`: `String`, should describe at a high level what this module does. meant for reading by humans

`language`: `String`, which language is this operator implemented in. Supported languages so far: `node`, `rust`

`version`: `String`, (NOT IN USE YET) which version of the language does this require

`contract`: `Object`, the specification of what this operator needs as input, and gives as output

`contract.needs`: `JSON`, array or object, valid JSON data defining the shape and type of the data needed as input

`contract.gives`: `JSON`, array or object, valid JSON data defining the shape and type of the data this will output

`dependencies_file`: `String | Object`, the full data required to specify dependencies for the code file. In node this is `package.json` data, rust this is `Cargo.toml` data, etc.

`code_file`: `String`, the actual code representing the primary logic of the operator. Can rely heavily on dependency imports. Gets written to a file, then run.

### Example

As an example, here is the JSON for a `node` based operator, that takes in an array of numbers, adds them all together,
and outputs a configuration suitable for consumption by [rsf-collect-responses](https://github.com/rapid-sensemaking-framework/rsf-collect-responses).

```json
    {
        "id": "addup-configure-collect-responses",
        "description": "Add numbers in an array and produce an rsf-collect-responses configuration",
        "language": "node",
        "version": "10.15.1",
        "contract": {
            "needs": ["number"],
            "gives": {
                "max_time": "number",
                "prompt": "string",
                "max_responses": "number",
                "participants_config": [{
                    "id": "string",
                    "name": "string",
                    "type": "string"
                }]
            }
        },
        "dependencies_file": {
            "dependencies": {
                "rsf-reader-writer": "^0.0.2"
            }
        },
        "code_file": "const { readInput, writeOutput } = require('rsf-reader-writer');const input = readInput(__dirname);const result = input.reduce((memo, val) => memo + val, 0);writeOutput(__dirname, {max_time: 30000, prompt: `hi, please offer up to ${result} ideas`, max_responses: result, participants_config: [{ id: '+12223334444', name: 'Somebody Lastname', type: 'phone' }]});"
    }
```

So if we wrote `input.json` to the file system as the following:
```json
[1, 2, 3]
```
This operator would take that value in, add up the numbers, and output the following to `output.json`
```json
{
    "max_time": 30000,
    "prompt": "hi, please offer up to 6 ideas",
    "max_responses": 6,
    "participants_config": [{ "id": "+12223334444", "name": "Somebody Lastname", "type": "phone" }]
}
```
The places where `6` appears in the JSON are places where the value transformed from the input are placed.

See the full example in [example-sequence.json](./example-sequence.json).

**Todos**
- [ ] programmatically validate that the languages (and their versions) specified in a sequence JSON file are all present on the device, and available in the PATH, before running the sequence




## RSF Sequences

Sequences are called sequences because they are a series of Operators placed into a specific order, and the order is important.

While you could technically create a sequence of one and only one Operator, those will be the less interesting of the use cases than ones that string many operators together into a longer flow. Even Operators implemented in different languages are able to be strung together.

An RSF Sequence is encoded into a JSON file, making it super portable, savable, and shareable. It is simply an array of RSF Operator JSON objects. The following is an example with abbreviations, the full copy of which can be seen in [example-sequence.json](./example-sequence.json).

```json
[
    {
        "id": "addup-configure-collect-responses",
        "description": "Add numbers in an array and produce an rsf-collect-responses configuration",
        ...
        "contract": {
            ...
            "gives": {
                "max_time": "number",
                "prompt": "string",
                "max_responses": "number",
                "participants_config": [{
                    "id": "string",
                    "name": "string",
                    "type": "string"
                }]
            }
        },
        "code_file": "const { readInput, writeOutput } = require('rsf-reader-writer');const input = readInput(__dirname);const result = input.reduce((memo, val) => memo + val, 0);writeOutput(__dirname, {max_time: 30000, prompt: `hi, please offer up to ${result} ideas`, max_responses: result, participants_config: [{ id: '+12223334444', name: 'Somebody Lastname', type: 'phone' }]});"
    },
    {
        "id": "rsf-collect-responses",
        "description": "Gather input from people based on a prompt",
        ...
        "contract": {
            "needs": {
                "max_time": "number",
                "prompt": "string",
                "max_responses": "number",
                "participants_config": [{
                    "id": "string",
                    "name": "string",
                    "type": "string"
                }]
            },
            ...
        },
        "code_file": "require('rsf-collect-responses').main(__dirname)"
    }
]
```

It is especially important the `contract.gives` property of one Operator, matches the `contract.needs` property of the following Operator, identically.

In order to run a sequence, the file should be sitting in the filesystem on your computer where you also have the code for `rsf-runner` sitting. Obviously, the first Operator has no Operator that precedes it, so it needs to be given an input.
Prior to trying to run a Sequence it is important to write a file named `input.json` to the `rsf-runner` folder.
The file should contain valid JSON data that matches the `contract.needs` property of the FIRST Operator.
Say that `contract.needs` for the first Operator is:
```json
["number"]
```
Then `input.json` could look like:
```json
[1, 2, 3]
```
or
```json
[5, 6, 7, 8, 9]
```
etc.

Now, with `input.json` in place: to boot it, assuming the file name is `sequence.json` (and its in the same folder as rsf-runner code), just run:
```shell
node index.js ./sequence.json
```

Using `npm start` will also conveniently run that exact same command.

This will launch the process, and it will remain running as a process until the full sequence completes. Once the final Operator has completed, the `rsf-runner` will write the results of it to an `output.json` in the same directory as its running in.

While the sequence is running, logs of its progress and operations will be written to the terminal its running in prefixed with the `id` of the Operator its currently running, like the following:
```shell
...
rsf-response-for-each: Creating temporary directory for operator
rsf-response-for-each: Writing dependencies spec to file
rsf-response-for-each: Writing operator code to file
rsf-response-for-each: Installing dependencies
rsf-response-for-each: Writing operator input to JSON file
rsf-response-for-each: Executing operator...
...
```

> Note that if you have configured a long running process, this will mean that you will want to run it NOT on a laptop most likely, as stopping the computer will halt the process temporarily.

Some sequences may include processes that run temporary web servers, in which case it is important the ports on which those web servers are running are accessible online, for which we recommend a tool like [ngrok](https://ngrok.com/) for tunneling, or running it on a production server that can accept incoming connections.

> Be mindful of putting sensitive data into a JSON Sequence file, such as people's email addresses or phone numbers, that the file isn't committed to GIT and published online.


**Todos**
- [ ] programmatically validate before running the sequence that the `contract.gives` property of each Operator, matches identically to the `contract.needs` property of the following Operator



## RSF Contactables

Contactables are at the heart of the Rapid Sensemaking Framework. They represent a way to open up bi-directional channels of communication between a "bot"/operator, and a human, represented in the most basic form of digital communication, strings of text.

A Contactable represents the idea that the Operator can "hear" a person, and a person can "hear" an Operator. Thus, the API for a Contactable is literally as simple in `node` as `.speak()`, `.listen()`. The full API will be defined soon.

Each Contactable will represent an ability to bi-directionally communicate with a human, via the same API, independent of what technology and protocol is carrying the communications.

Configurations for people will be given as arrays in `partipantsConfig`, and the Operators will carry out their operations, independent of what channels they are communicating via, thus enabling the full cross-platform cross-protocol solution.

A `personConfig` object will be at a minimum something like:
```json
{
    "type": "phone",
    "id": "+12223334444"
}
```
`"name"` is treated as an optional property

At the time of writing, Operators that use Contactables include [rsf-collect-responses](https://github.com/rapid-sensemaking-framework/rsf-collect-responses) and [rsf-response-for-each](https://github.com/rapid-sensemaking-framework/rsf-response-for-each).

### Implementations So Far

[rsf-contactable](https://github.com/rapid-sensemaking-framework/rsf-contactable) is the main source of information on implemented carrier types, but here is a short and simple list:

- [rsf-textable](https://github.com/rapid-sensemaking-framework/rsf-textable) implements a texting carrier, via the [Twilio](https://www.twilio.com/) APIs
    - the `type` to give as a `personConfig` JSON object is simply `phone` and the number must be formatted '+12223334444' (North American)

### Contactable API Specification

Please write other Contactable carriers, simply conforming to this minimal API!
To get them fully implemented, please submit a PR to [rsf-contactable](https://github.com/rapid-sensemaking-framework/rsf-contactable).

#### `constructor(id, name)`

`id` : `String`, this value should represent the full information required to contact a person via the type of carrier it is over. For example, if `type` is `phone`, then `id` should be of the format `+12223334444`, but if `type` is `email` then `id` should be a valid email, e.g. `person@somesite.com`

`name` : `String`, optional, a name which can be used throughout the Operators at times to address the person in a more congenial way, during communications with them, if appropriate.

#### `.speak(text: String)`
Send a string of text to the person represented by the given Contactable.

#### `.listen(callback(text: String))`
Set a function which will be called any time that the person represented sends a string of text back to the Operator.


#### `.id` : `String`
The `id` of the person given to the `constructor` function.

#### `.name` : `String`
The `name` of the person given to the `constructor` function.


## How To Use & Getting Started
It is possible to do free of charge testing with Twilio, it just appends a little message into the text messages that it sends, which is fine for testing.

- [setting up Twilio](https://www.twilio.com/docs/sms/quickstart/node#sign-up-for-twilio-and-get-a-twilio-phone-number)
- make a copy of `.example.env` and rename it `.env`, fill in the values with those from Twilio
    - To see what they each mean, see https://github.com/rapid-sensemaking-framework/rsf-textable#environment-variables
- set up [ngrok](https://ngrok.com/) and run it as `./ngrok http 1337`
- make a copy of `example-sequence.json` and rename it `sequence.json`
- change the value `+12223334444` in `sequence.json` to your phone number
- run `npm start`
- complete the process as it texts you!
- check out `output.json` once the process completes