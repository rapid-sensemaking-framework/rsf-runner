# rsf-runner

Welcome to the Rapid Sensemaking Framework ecosystem entry point!


## What Is The "Rapid Sensemaking Framework"?

The rapid sensemaking framework is a set of tools designed to facilitate human conversation, ideation, and reasoning at a large scale.

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

For any good "conversation", there is always a frame. The conversation, at least loosely, has a direction that the people who will participate in it are agreeable to and interested in.

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

## RSF Sequences

## RSF Contactables

## How To Use

- setting up Twilio
- setting up `.env`
- setting up a `sequence.json`
- running an rsf-sequence