# JSON Schema Ecosystem Observability – Proof of Concept

*(GSoC Qualification Task)*

This repository contains a **Proof of Concept (PoC)** for building an **observability system for the JSON Schema ecosystem**.

The goal of this PoC is to demonstrate how we can automatically collect and track a few meaningful ecosystem metrics over time. These metrics help us understand how the JSON Schema ecosystem is evolving.

But before diving into the metrics, let’s answer a simple question.

## Why do we need ecosystem observability?

Every major open‑source ecosystem eventually needs visibility into questions like:

- How widely is the technology being adopted?
- How many projects exist in the ecosystem?
- Are implementations conforming well to the specification?
- Which versions of the standard are actually used in practice?

An ecosystem observability dashboard helps answer these questions by tracking signals over time.

This can help the community:

- understand the **growth and maturity** of the ecosystem
- identify **which parts of the ecosystem are thriving**
- attract **contributors, maintainers, and sponsors**
- provide visibility into **the impact of JSON Schema in the broader tech ecosystem**

If that explanation felt too long, here is the GPT‑style version:

**TL;DR**

Ecosystem observability is basically a **dashboard for an open‑source ecosystem** that helps the community understand its **growth, adoption, and overall health**.

---

# Metrics Used in This Proof of Concept

For this PoC, the ecosystem is analyzed across **four dimensions**. Each dimension represents a different signal about the health of the ecosystem.

| Dimension | Metric | What It Represents |
|--------|--------|----------------|
| Adoption | npm weekly downloads of **Ajv** | A proxy signal for JSON Schema adoption in the JavaScript ecosystem |
| Breadth | GitHub repositories with the `json-schema` topic | The size of the ecosystem in terms of participating projects |
| Quality | Bowtie compliance score | How well implementations conform to the JSON Schema specification |
| Standard Evolution | JSON Schema draft adoption | Which versions of the JSON Schema specification are used in real projects |

Each metric captures a different perspective on the ecosystem.

Instead of relying on a single number, this approach attempts to build a **multi‑dimensional view of ecosystem health**.

---

## Detailed Metric Explanations

To keep this README focused on usage, the detailed explanation of each metric has been moved to a separate document:

```
DETAILED_OVERVIEW.md
```

That file explains the reasoning behind each metric and why it represents a useful signal for the JSON Schema ecosystem.

---

# Running the Pipeline

## 1. Install dependencies

```bash
npm install
```

## 2. Set the GitHub token

Some metrics rely on the GitHub API (especially code search), which requires authentication.

Set your GitHub token in the terminal:

```bash
export GITHUB_TOKEN=your_github_token_here
```

Verify it is set correctly:

```bash
echo $GITHUB_TOKEN
```

## 3. Run the metrics pipeline

```bash
npm run build
npm start
```

This will:

- build the TypeScript files
- fetch ecosystem metrics
- store the collected data in the `data/` directory

After running successfully, you should see:

```
data/latest.json
 data/history.json
```

- `latest.json` contains the most recent snapshot
- `history.json` stores the accumulated metric history

---

# Visualization

To view the visualization locally, start a simple HTTP server:

```bash
npx http-server
```

Then open:

```
http://127.0.0.1:8080/viz/
```

The dashboard reads data from `data/history.json` and renders the ecosystem graphs.

---

## Quick Run Summary

```bash
npm install
export GITHUB_TOKEN=your_github_token_here
echo $GITHUB_TOKEN
npm run build
npm start
npx http-server
```

Open:

```
http://127.0.0.1:8080/viz/
```

---

## Note

This repository is intentionally minimal and is designed only to demonstrate the core idea of ecosystem observability for the JSON Schema ecosystem.
