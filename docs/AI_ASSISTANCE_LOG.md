# AI Assistance Log

This file documents where AI tools were used during the development of this project. The goal is to keep the process transparent and clearly show where AI helped during research, validation, and implementation.

---

## 1. Research Assistance

AI was used during the research phase to better understand how large open‑source ecosystems measure themselves. It helped locate useful references and documentation such as the CNCF ecosystem landscape and other projects that maintain ecosystem dashboards.

This mainly helped speed up the research process while identifying meaningful ecosystem metrics. AI was also used to fetch documentation links and examples of organizations or projects that overlap with the JSON Schema ecosystem, which helped me understand how ecosystem metrics are usually designed.

AI was also occasionally used to explain concepts when something was not immediately clear during research.

---

## 2. Code Verification and Edge Case Checking

The initial implementation of the metrics pipeline was written manually. The metric selection, pipeline structure, and core logic were designed and implemented independently.

After writing the code, AI was used mainly as a review tool to check whether I had missed any obvious edge cases or possible failure points. In this sense, AI acted more as a verification step rather than generating the actual implementation.

---

## 3. Implementation Troubleshooting (Bowtie Integration)

While integrating the Bowtie CLI into the Node.js pipeline, I faced some difficulties executing and chaining CLI commands using Node's `child_process` utilities.

AI helped explore alternative approaches, which eventually led to using a `spawn`‑based approach with pipes. This allowed the output of `bowtie latest-report` to be piped directly into `bowtie statistics`, making it possible to correctly extract the compliance statistics from the CLI output.

---

## Summary

AI was mainly used in this project in two places:

- **Research support** for quickly finding ecosystem references and documentation
- **Verification and troubleshooting** during parts of the implementation
