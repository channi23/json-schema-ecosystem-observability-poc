import { spawn } from "child_process";
async function runBowtie(args, input) {
    return new Promise((resolve, reject) => {
        const child = spawn("bowtie", args, { stdio: ["pipe", "pipe", "pipe"] });
        let stdout = "";
        let stderr = "";
        child.stdout.on("data", d => stdout += d.toString());
        child.stderr.on("data", d => stderr += d.toString());
        child.on("close", code => {
            if (code !== 0) {
                reject(new Error(`bowtie failed: ${stderr}`));
            }
            else {
                resolve(stdout);
            }
        });
        if (input) {
            child.stdin.write(input);
        }
        child.stdin.end();
    });
}
function findPercent(obj) {
    const candidates = [
        obj?.mean,
        obj?.overall?.compliance_percent,
        obj?.compliacePercent,
        obj?.compliance_percent,
        obj?.compliacePercent,
        obj?.summary?.compliance_percent,
        obj?.summary?.compliacePercent,
    ];
    for (const c of candidates) {
        if (typeof c === "number") {
            if (c >= 0 && c <= 1)
                return c * 100;
            if (c > 1 && c <= 100)
                return c;
        }
    }
    //if we could not find that expected in the above paths, then we need to scan the entire object
    const stack = [obj];
    //let us do the dfs
    while (stack.length) {
        const curr = stack.pop();
        if (!curr || typeof curr !== "object")
            continue;
        for (const [k, v] of Object.entries(curr)) {
            if (typeof v === "number") {
                const key = k.toLowerCase();
                if (key.includes("compliance") || key === "mean" || key === "median") {
                    if (v >= 0 && v <= 1)
                        return v * 100;
                    if (v > 1 && v <= 100)
                        return v;
                }
            }
            else if (v && typeof v === "object") {
                stack.push(v);
            }
        }
    }
    return null;
}
export async function fetchBowtieCompliance() {
    const report = await runBowtie(["latest-report", "--dialect", "draft2020-12"]);
    //it will run this bowtie latest-report --dialect draft2020-12
    //next i need to compute the stats from the output
    const statsText = await runBowtie(["statistics", "--format", "json"], report);
    let statsJson;
    try {
        statsJson = JSON.parse(statsText);
    }
    catch {
        throw new Error("Bowtie statistics output was not valid JSON.");
    }
    const compliance = findPercent(statsJson);
    if (compliance == null) {
        throw new Error("Could not find a compliance percent in Bowtie statistics JSON. Inspect the printed Bowtie JSON above and adjust extractor paths.");
    }
    return { dialect: "draft2020-12", compliancePercent: compliance };
}
