# JSON Schema Ecosystem Observability – Proof of Concept

*(GSoC Qualification Task)*

This repository contains a small **proof of concept** for observing signals from the **JSON Schema ecosystem**.  
The goal here is simple: collect a few ecosystem metrics automatically and store them over time so we can understand how the ecosystem is evolving.

This repo intentionally keeps things minimal. It mainly shows **how the pipeline runs**, where the data goes, and where the explanations live.

---

# Index

- [How to Run the Pipeline](#how-to-run-the-pipeline)
- [What This Repository Contains](#what-this-repository-contains)
- [Documentation](#documentation)
- [AI Assistance](#ai-assistance)

---

# How to Run the Pipeline

Install dependencies:

```bash
npm install
```

Set a GitHub token (required for GitHub API queries):

```bash
export GITHUB_TOKEN=your_github_token_here
```

Verify it:

```bash
echo $GITHUB_TOKEN
```

Run the pipeline:

```bash
npm run build
npm start
```

This will collect the metrics and store them in the **data** directory:

```
data/latest.json
 data/history.json
```

- `latest.json` → most recent snapshot
- `history.json` → accumulated metric history

---

# Visualization

To see the simple dashboard locally:

```bash
npx http-server
```

Then open:

```
http://127.0.0.1:8080/viz/
```

The graphs read directly from `data/history.json`.

---

# What This Repository Contains

This proof of concept collects a few ecosystem signals such as:

- npm downloads of Ajv
- repositories using the `json-schema` topic
- Bowtie compliance score
- JSON Schema draft adoption

The goal is not to build a full observability platform yet, but to demonstrate how such a system could work.

---

# Documentation

More detailed explanations are in the `docs` directory.

**Detailed explanation of the metrics:**

```
docs/DETAILED_OVERVIEW.md
```

**Review of the existing ecosystem codebase:**

```
docs/EXISTING_CODE_REVIEW.md
```

Those documents explain the reasoning behind the metrics and the analysis of the existing implementation.

---

# AI Assistance

A short note about how AI tools were used during research, verification, and troubleshooting can be found here:

```
docs/AI_ASSISTANCE_LOG.md
```

---

This repository is intentionally lightweight and focused on demonstrating the **core idea of ecosystem observability for JSON Schema**.
