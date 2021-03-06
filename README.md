# rsf-runner

Welcome to the Rapid Sensemaking Framework ecosystem entry point!

- [Skip to `Non-technical Overview`](#non-technical-overview)
- [Skip to `Principles`](#principles)
- [Skip to `Technical Overview`](#technical-overview)
- [Skip to `rsf-operators`](#rsf-operators)
- [Skip to `rsf-contactables`](#rsf-contactables)


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

The tools should offer participants in processes as much transparency into the process as makes sense for the use case. In most cases, all the participants should have the results of the entire process, rather than constrict the results to the facilitator. The process should benefit everyone, and be non value extractive in its approach to working with data.



## Technical Overview

Talk about noflo components and graphs.



## RSF Operators

Operators are called operators because they perform operations. These operations can either be very quick, just performing a very simple transformation on data, requiring no human input, or they can involve lots of human input, and be medium to long running operations, meaning they could take days or weeks.

An operator can do whatever it takes to ingest and coordinate this human input, which will very likely involve standing up web servers, and other connection/protocol variants.

At the time of writing, just a few operators of interest have been developed, that are easily made to be compatible with one another.
- [rsf-collect-responses](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/CollectResponses.js)
    - for a prompt, collect statements numbering up to a given maximum (or unlimited) from a list of participants
    - ![rsf collect responses v0.0.31 screenshot](./screenshots/rsf-collect-responses-v0.0.31.png)
- [rsf-response-for-each](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/ResponseForEach.js)
    - for a list/array of statements, collect a response or vote (from a limited number of valid options, or unlimited) for each from a list of participants
- [rsf-pairwise-comparison](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/PairwiseComparison.js)
    - input: a list of statements, process: have all participants choose preferences between pairs of statements, return the list of compared/ranked results.
- [rsf-collect-participants](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/CollectParticipants.js)
    - input: nothing, process: spin up a web server with a form and collect peoples contact info that opt in to participate, output: a list of Contactable participantConfigs
    - ![rsf collect participants v0.0.13 screenshot](./screenshots/rsf-collect-participants-v0.0.13.png)
    
Lots of other Operators have already been considered for implementation, for example
- rsf-sort-full-list
- rsf-dot-vote
- rsf-pick-from-full-list
- rsf-share-results
    - input: anything + participantConfigs, process: share the input, which are likely results from a process, with people

The idea is that each operator should clearly define what properties or values it expects as input,
and what properties or values it returns as output, if its successful.

By doing so, RSF Operators can build up as a library over time, and where outputs of one operator match the inputs of another,
those operators can be strung together into more complex sequences. They could start to be combined in many different orders and in many different ways. For example, the output of `CollectResponses` feeds nicely into the `statements` input of `ResponseForEach`.

## RSF Contactables

Contactables are at the heart of the Rapid Sensemaking Framework. They represent a way to open up bi-directional channels of communication between a "bot"/operator, and a human, represented in the most basic form of digital communication, strings of text.

A Contactable represents the idea that the Operator can "hear" a person, and a person can "hear" an Operator. Thus, the API for a Contactable is literally as simple in `node` as `.speak()`, `.listen()`. The full API will be defined soon.

Each Contactable will represent an ability to bi-directionally communicate with a human, via the same API, independent of what technology and protocol is carrying the communications.

Configurations for people will be given as arrays in `participantsConfig`, and the Operators will carry out their operations, independent of what channels they are communicating via, thus enabling the full cross-platform cross-protocol solution.

A `personConfig` object will be at a minimum something like:
```json
{
    "type": "phone",
    "id": "+12223334444"
}
```
`"name"` is treated as an optional property

At the time of writing, Operators that use Contactables include [rsf-pairwise-comparison](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/PairwiseComparison.js), [rsf-collect-responses](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/CollectResponses.js) and [rsf-response-for-each](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/ResponseForEach.js).

There is a module that collect a `participantsConfig` array as an output, which can then be fed in to another module. That is [rsf-collect-participants](https://github.com/rapid-sensemaking-framework/noflo-rapid-sensemaking/blob/master/components/CollectParticipants.js).

### Implementations So Far

[rsf-contactable](https://github.com/rapid-sensemaking-framework/rsf-contactable) is the main source of information on implemented carrier types, but here is a short and simple list:

- [rsf-textable](https://github.com/rapid-sensemaking-framework/rsf-textable) implements a texting carrier, via the [Twilio](https://www.twilio.com/) APIs
    - the `type` to give as a `personConfig` JSON object is simply `phone` and the number must be formatted '+12223334444' (North American)
- [rsf-mattermostable](https://github.com/rapid-sensemaking-framework/rsf-mattermostable) implements a [Mattermost](https://mattermost.com/) carrier, via the Mattermost APIs
    - the `type` to give as a `personConfig` JSON object is simply `mattermost` and the format must be like 'username@https://mattermost-server.com'

Implementations under consideration:
- rsf-messenger (fb)
- rsf-telegram
- rsf-emailable
- rsf-ssb (secure scuttlebutt)

### Challenges

The biggest challenge so far encountered is rate limits on APIs. This constrains the number of messages that can be sent by a "bot" within a certain period of time, limited differently depending on the system. If the contactable implementation doesn't take that into account, some messages will be dropped, which breaks the viability of the system. It is important to research the rate limits of a given system and make sure that an implementation conforms to them.

### Contactable API Specification

Please write other Contactable carriers, simply conforming to this minimal API!
To get them fully implemented, please submit a PR to [rsf-contactable](https://github.com/rapid-sensemaking-framework/rsf-contactable).

#### `constructor(id, name)`

`id` : `String`, this value should represent the full information required to contact a person via the type of carrier it is over. For example, if `type` is `phone`, then `id` should be of the format `+12223334444`, but if `type` is `email` then `id` should be a valid email, e.g. `person@somesite.com`

`name` : `String`, optional, a name which can be used throughout the Operators at times to address the person in a more congenial way, during communications with them, if appropriate.

#### `.speak(text: String)`
Send a string of text to the person represented by the given Contactable.

**Todo**
- [ ] update .speak API so that it returns a promise that resolves when confirmation that the message has successfully been sent and received occurs. this will allow finer control of flow important in modules.

#### `.listen(callback(text: String))`
Set a function which will be called any time that the person represented sends a string of text back to the Operator.

#### `.stopListening()`
Calling this will prevent any and all callbacks passed to `listen` from firing again. Should be called as cleanup after use.


#### `.id` : `String`
The `id` of the person given to the `constructor` function.

#### `.name` : `String`
The `name` of the person given to the `constructor` function.
