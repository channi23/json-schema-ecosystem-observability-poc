# Existing Code Review

Here's a review of the current proof-of-concept that lives in `projects/initial-data/` in the main JSON Schema ecosystem repo.

The point of this review is to get a sense of:

- what the current pipeline already does well
- where it's weak or missing things
- how it might grow into a real system for tracking the ecosystem

While I was looking at this repo, I also checked out how other open source ecosystems track their stats. A good example is the **CNCF landscape dashboards for Kubernetes and cloud-native stuff**.

One thing you notice is that ecosystem metrics usually fall into two big buckets:

**1. Generic ecosystem metrics**  
These are the usual stats you see in almost any open source ecosystem.

**2. Organization / ecosystem specific metrics**  
These are more custom, designed for the org specific tech or community.


If you think about the pipeline this way, it's easier to see what it's already catching and what's missing.

## Index

- [What the Current Pipeline Does Well](#what-the-current-pipeline-does-well)
- [Why the Current Pipeline Is Relevant](#why-the-current-pipeline-is-relevant)
- [Limitations of the Current Pipeline](#limitations-of-the-current-pipeline)
- [What I observed when i ran the code locally](#what-i-observed-when-i-ran-the-code-locally)
- [Generic Ecosystem Metrics (Based on Research)](#generic-ecosystem-metrics-based-on-research)
- [Organization / Ecosystem Specific Metrics](#organization--ecosystem-specific-metrics)
- [Suggested Improvements](#suggested-improvements)
- [Recommendation](#recommendation)

---

# What the Current Pipeline Does Well

The pipeline is mainly set up to collect **repo lifecycle info** for anything tagged with the `json-schema` topic on GitHub.

### Repository creation

Tracking when a repo gets created is a good way to see **how the ecosystem is growing over time**.

It can help answer stuff like:

- Are new JSON Schema projects still popping up?
- When did things start to take off?
- Did growth ever slow down?

### First commit date

The first commit is a better signal for when someone actually started building something. Sometimes a repo is created but nothing happens for a while.

So, first commit gives a slightly more accurate "real start" date.

### First release date

First release is an even better sign of **project maturity**.

A repo might exist for ages, but once it pushes a release, it's usually at least usable by someone.

### Repository topics

Topics help you break up the ecosystem:

- validators
- tooling
- docs
- integrations

This gives a rough sense of what kinds of tools are out there.

### Topic based ecosystem discovery

Using the `json-schema` GitHub topic is actually a **simple and repeatable way** to find projects.

It's not perfect (and sometimes noisy), but it gives you a clear, automated way to define what counts as part of the ecosystem.

---

# Why the Current Pipeline Is Relevant

Even though it's pretty basic, this pipeline is still useful for **tracking ecosystem growth and maturity**.

It can help answer things like:

- Is the ecosystem still growing or has it slowed down?
- How long does it take for a project to go from creation to first release?
- When did new waves of development happen?

So overall, the pipeline catches **how the ecosystem emerges and how projects mature over time** (at least for repos that use the JSON Schema topic).

That makes it a good **baseline inventory and growth dataset**.

But it doesn't really tell us much about health or adoption just yet.

---

# Limitations of the Current Pipeline

### Noisy ecosystem boundaries

GitHub topics aren't perfect. Some important repos might not use the `json-schema` topic, and some that do might not really be relevant.

### Focus on existence instead of activity

Right now, the pipeline mostly tracks **when repos are created and when they first release**.

It doesn't really say if a project is still alive, maintained, or actually used.

### No adoption or impact signals

Things like downloads, dependents, contributors, or real-world usage aren't captured at all.

### Repository types are all mixed together

You get everything in the same bucket:

- forks
- archived repos
- dead/inactive projects
- experiments

Some filtering or labeling would make the data way more useful.

### Limited ecosystem insight

Right now, it's more of an **inventory** than a real health check.

---

# What I observed when i ran the code locally

When i ran the `initial-data` pipeline locally it successfully produced a CSV dataset containing repositories associated with the `json-schema` GitHub topic. In a test run with a limited `NUM_REPOS` setting, i basically got an output with 10 repos, each record included the repo_name, topic, creation date, first commit date, and first release date. The sample included well-known projects such as `ajv`, `react-jsonschema-form` `pydantic`,`fastapi` and `jsonschema2pojo`, indicating that the topic based discovery method can surface meaningful ecosystem participants.

However, the discovered repos span multiple categories such as validators, frameworks, libraries, and developer tooling. This suggests that the current pipeline captures a broad "JSON Schema related" ecosystem rather than only core implementations.

Additionally, repositories without GitHub releases may be skipped because of strict release lookup logic, which could under represent early stage or experimental projects.

Overall the pipeline works well as an initial ecosystem inventory tool, but we should probably treat it as a first pass view of the ecosystem and move towards adding more meaningful metrics.

---

# Generic Ecosystem Metrics (Based on Research)

Looking at other ecosystems like Kubernetes and CNCF, there are some metrics that always pop up.

These are all about **activity, adoption, and community engagement**.

For example:

- stars
- forks
- contributors
- commit activity
- release frequency
- issue activity

These stats help answer:

- Is the project still being worked on?
- Do people care or use it?
- Is there a healthy contributor base?

Right now, none of these are in the current pipeline.

---

# Organization / Ecosystem Specific Metrics

Besides the generic stuff, most ecosystems also track **signals that are specific to their tech**.

For JSON Schema, some interesting ones might be:

- validator compliance scores (Bowtie)
- which schema drafts are being adopted
- usage of schema validators
- how schemas are actually used across repos

These are much more specific to JSON Schema and help show how the spec is used in the real world.

---

# Suggested Improvements

The lifecycle metrics already in the pipeline are still useful, so keep them as a **baseline inventory**.

But the pipeline would be a lot better if we add more signals.

### Maintenance signals

Some things that could help:

- last commit date
- last release date
- open issues count
- is the repo archived or disabled
- recent branch activity

### Adoption and importance signals

To get a sense of impact:

- stars
- forks
- watchers
- contributors
- package downloads or dependents

### Repository classification

Adding some labels would help a lot, like:

- main programming language
- repo type (validator, tooling, integration, etc.)
- package ecosystem

### Derived lifecycle metrics

Sometimes, derived stats tell a better story than just raw dates.

For example:

- days from creation to first commit
- days from creation to first release
- days since last activity
- release cadence

These help you see **maturity and maintenance patterns** at a glance.

---

# Recommendation

All in all, i would keep the current work as the current pipeline is a **good start for inventory and growth tracking**.

But to really get ecosystem observability, it should combine:

- lifecycle metrics (already there)
- activity signals
- adoption signals
- JSON Schema specific stuff

Putting all these together would give a much clearer picture of how the JSON Schema ecosystem is doing and evolving.

*(This doc will probably keep changing as we figure out what the ecosystem observability system should look like.)*