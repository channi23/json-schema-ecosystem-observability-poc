# Detailed Overview of Ecosystem Metrics

This document explains in a bit more detail the metrics used in the **JSON Schema Ecosystem Observability Proof of Concept**.

The idea behind these metrics is pretty simple: instead of looking at only one number to describe the ecosystem, we look at a few different signals that together give a better picture of what is going on.

Each metric represents a slightly different angle of the ecosystem such as adoption, ecosystem size, implementation quality, and how the standard itself evolves over time.

## Index

- [Metric Dimensions](#metric-dimensions)
- [1. Adoption — npm Downloads of Ajv](#1-adoption--npm-downloads-of-ajv)
- [2. Breadth — GitHub Repositories with `json-schema` Topic](#2-breadth--github-repositories-with-json-schema-topic)
- [3. Quality — Bowtie Compliance Score](#3-quality--bowtie-compliance-score)
- [4. Standard Evolution — JSON Schema Draft Adoption](#4-standard-evolution--json-schema-draft-adoption)
- [Why Multiple Metrics Matter](#why-multiple-metrics-matter)
- [How would I automate this weekly](#how-would-i-automate-this-weekly)
- [Challenges I faced while implementing this](#challenges-i-faced-while-implementing-this)

---

# Metric Dimensions

In this proof of concept we currently look at four main dimensions:

| Dimension | Metric |
|--------|--------|
| Adoption | npm weekly downloads of Ajv |
| Breadth | GitHub repositories with the `json-schema` topic |
| Quality | Bowtie compliance score |
| Standard Evolution | JSON Schema draft adoption |

The idea is that no single metric can explain an ecosystem properly, so combining a few different ones gives a more balanced view.

---

# 1. Adoption — npm Downloads of Ajv

**Metric:** Weekly npm downloads of the package `ajv`.

Ajv is one of the most widely used JSON Schema validator libraries in the JavaScript ecosystem. A lot of developer tools and frameworks rely on it internally for schema validation.

Because of that, the number of downloads Ajv gets each week can act as a **rough signal of JSON Schema adoption** in the JavaScript ecosystem.

### Why this metric is useful

This metric can help us understand things like:

- Is JSON Schema usage increasing over time?
- Are more tools starting to rely on schema validation?
- Is the developer ecosystem around JSON Schema expanding?

It is not a perfect measure, but it still gives a useful directional signal.

---

# 2. Breadth — GitHub Repositories with `json-schema` Topic

**Metric:** Number of repositories tagged with the GitHub topic `json-schema`.

This metric gives a sense of the **size of the ecosystem** by counting projects that explicitly tag themselves as related to JSON Schema.

### Why this metric is useful

It helps give a rough idea of:

- how many tools and libraries exist
- how many projects identify themselves as part of the ecosystem
- how the ecosystem grows over time

The number is not perfect because topics can be noisy, but it still works as a simple and reproducible way to approximate ecosystem breadth.

---

# 3. Quality — Bowtie Compliance Score

**Metric:** Compliance score derived from Bowtie's implementation test results.

The **Bowtie project** runs the official JSON Schema test suite against multiple validator implementations.

These tests basically check whether different validators behave according to the JSON Schema specification.

For this proof of concept, the compliance score is taken from the **mean compliance value** reported by Bowtie.

### Why this metric is useful

This metric gives an idea of:

- how well validator implementations follow the specification
- how consistent behavior is across different implementations

If compliance scores are high, it usually means the specification is well understood and implementations behave similarly.

### Example interpretation

For example if Bowtie reports something like:

```
Mean compliance ≈ 0.98
```

That basically means validator implementations pass around **98% of the official test cases**.

---

# 4. Standard Evolution — JSON Schema Draft Adoption

**Metric:** Number of repositories referencing different JSON Schema drafts.

JSON Schema evolves through specification drafts such as:

- Draft-04
- Draft-06
- Draft-07
- Draft-2019-09
- Draft-2020-12

Many schema files include a `$schema` field that references one of these drafts.

For example:

```
"$schema": "http://json-schema.org/draft-07/schema#"
```

By searching repositories for these references we can get a rough idea of **which drafts are being used in real projects**.

### Why this metric is useful

This helps answer questions like:

- Which drafts are the most widely used?
- Are projects slowly moving to newer drafts?
- How quickly does the ecosystem adopt newer versions of the specification?

This gives some insight into how the **standard evolves in practice**, not just in theory.

---

# Why Multiple Metrics Matter

One single metric usually cannot explain the health of an ecosystem.

For example:

- downloads might increase even if the ecosystem diversity decreases
- repository count might grow even if implementations are inconsistent

Because of this, combining multiple signals across **adoption, breadth, quality, and standard evolution** helps create a more realistic view of what is happening in the ecosystem.

This proof of concept is only a starting point, but it shows how a small set of metrics can already provide some useful insight into the JSON Schema ecosystem.

---

# How would I automate this weekly

This can be automated using **GitHub Actions**. A scheduled workflow (cron job) can run the metrics script once per week, fetch the latest ecosystem data, and update the `data/history.json` file.


Example GitHub Actions workflow:

```yaml
name: weekly-ecosystem-metrics

on:
  schedule:
    - cron: "0 0 * * 0"   # runs once every week

jobs:
  collect-metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm install

      - name: Run metrics pipeline
        run: npm run start
```

This workflow would run the metrics script once per week and update the dataset automatically.

---

# Challenges I faced while implementing this

### 1. Choosing meaningful ecosystem metrics

One challenge was deciding which metrics actually represent the health of the JSON Schema ecosystem. Instead of picking arbitrary numbers, I researched how other ecosystems measure themselves. Looking at dashboards like the CNCF landscape helped me understand that ecosystems are usually described using multiple dimensions such as adoption, ecosystem size, and implementation health.

Reference  
https://landscape.cncf.io/stats

---

### 2. Implementing the Bowtie compliance metric

Another challenge was implementing the Bowtie compliance score. I was not familiar with Bowtie before starting this project, so I had to first understand how it measures validator compliance using the official JSON Schema test suite.

Reference  
https://github.com/bowtie-json-schema/bowtie

---

### 3. Running Bowtie from Node.js

While integrating Bowtie into the pipeline, I initially tried using Node.js child process utilities like `execFile`, but had trouble passing data between commands. The solution was to use `spawn` with pipes so the output of `bowtie latest-report` could be piped directly into `bowtie statistics`. This allowed the compliance value to be extracted correctly.

Reference  
https://nodejs.org/api/child_process.html
