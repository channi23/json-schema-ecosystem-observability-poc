# Detailed Overview of Ecosystem Metrics

This document provides a deeper explanation of the metrics used in the **JSON Schema Ecosystem Observability Proof of Concept**.

The goal of these metrics is to capture different signals about the health, growth, and evolution of the JSON Schema ecosystem. Instead of relying on a single number, the system observes multiple **dimensions of the ecosystem**.

Each metric represents a different perspective on ecosystem activity.

---

# Metric Dimensions

The Proof of Concept currently considers four primary dimensions:

| Dimension | Metric |
|--------|--------|
| Adoption | npm weekly downloads of Ajv |
| Breadth | GitHub repositories with the `json-schema` topic |
| Quality | Bowtie compliance score |
| Standard Evolution | JSON Schema draft adoption |

These dimensions together attempt to provide a balanced view of ecosystem health.

---

# 1. Adoption — npm Downloads of Ajv

**Metric:** Weekly npm downloads of the package `ajv`.

Ajv is one of the most widely used JSON Schema validator implementations in the JavaScript ecosystem.

Many tools and frameworks rely on Ajv internally to validate schemas. Because of this, the weekly download count of Ajv acts as a **proxy signal for JSON Schema adoption** in the broader JavaScript ecosystem.

### Why this metric is useful

It helps answer questions like:

- Is JSON Schema usage increasing over time?
- Are more projects integrating schema validation?
- Are developer tools adopting JSON Schema more frequently?

---

# 2. Breadth — GitHub Repositories with `json-schema` Topic

**Metric:** Number of repositories tagged with the GitHub topic `json-schema`.

This metric measures the **size of the ecosystem** in terms of projects that explicitly identify themselves as part of the JSON Schema ecosystem.

### Why this metric is useful

It helps understand:

- ecosystem size
- number of tools and libraries
- community participation

This metric can also reveal how the ecosystem grows over time as more repositories adopt the topic.

---

# 3. Quality — Bowtie Compliance Score

**Metric:** Compliance score derived from Bowtie's implementation test results.

The **Bowtie project** runs the official JSON Schema test suite across multiple validator implementations.

These tests measure whether implementations behave according to the specification.

The compliance score used in this PoC is derived from the **mean compliance value** reported by Bowtie.

### Why this metric is useful

This metric indicates:

- how well validator implementations conform to the specification
- how consistent the ecosystem is across implementations

Higher compliance suggests that the specification is well understood and implemented consistently.

### Interpretation

For example:

```
Mean compliance ≈ 0.98
```

This means implementations pass roughly **98% of the specification test cases**.

---

# 4. Standard Evolution — JSON Schema Draft Adoption

**Metric:** Number of repositories referencing specific JSON Schema drafts.

JSON Schema evolves through specification drafts such as:

- Draft-04
- Draft-06
- Draft-07
- Draft-2019-09
- Draft-2020-12

This metric searches GitHub repositories for schema references such as:

```
"$schema": "http://json-schema.org/draft-07/schema#"
```

and similar draft identifiers.

### Why this metric is useful

It helps answer important ecosystem questions:

- Which drafts are most widely used?
- Are projects migrating to newer drafts?
- How quickly does the ecosystem adopt new versions of the specification?

Understanding draft adoption provides insight into the **real-world evolution of the standard**.

---

# Why Multiple Metrics Matter

A single metric cannot fully describe the health of an ecosystem.

For example:

- downloads may grow even if ecosystem diversity shrinks
- repository count may grow even if implementations are inconsistent

By combining metrics across **adoption, breadth, quality, and evolution**, the system provides a more complete view of the ecosystem.

---

