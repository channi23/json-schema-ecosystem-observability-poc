import fs from "fs";
import path from "path";
import { fetchAjvWeeklyDownloads } from "./metrics/npm.js";
import { fetchJsonSchemaTopicRepoCount } from "./metrics/github.js";
import { fetchBowtieCompliance } from "./metrics/bowtie.js";
import { fetchDraftAdoption } from "./metrics/draft_adoption.js";
function todayISO() {
    return new Date().toISOString().slice(0, 10);
}
function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}
function readJsonFile(filePath) {
    try {
        const raw = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
function writeJsonFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}
async function main() {
    const githubToken = process.env.GITHUB_TOKEN;
    const dataDir = path.join(process.cwd(), "data");
    ensureDir(dataDir);
    const timestamp = todayISO();
    const [npmDownloads, githubRepos, bowtieCompliance, draftAdoption] = await Promise.all([
        fetchAjvWeeklyDownloads(), fetchJsonSchemaTopicRepoCount(githubToken), fetchBowtieCompliance(), fetchDraftAdoption(githubToken),
    ]);
    const snapshot = {
        timestamp,
        metrics: {
            ajv_weekly_dowloads: npmDownloads.downloads,
            json_schema_topic_repos: githubRepos,
            bowtie_draft2020_12_compliance_count: bowtieCompliance.compliancePercent,
            draft_adoption: draftAdoption,
        },
    };
    const latestPath = path.join(dataDir, "latest.json");
    const historyPath = path.join(dataDir, "history.json");
    writeJsonFile(latestPath, snapshot);
    const history = readJsonFile(historyPath) ?? [];
    const filteredHistory = history.filter((item) => item.timestamp !== timestamp);
    filteredHistory.push(snapshot);
    filteredHistory.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    writeJsonFile(historyPath, filteredHistory);
    console.log("Metrics Collected Successfully");
    console.log(`Wrote ${latestPath}`);
    console.log(`Updated ${historyPath}`);
}
main().catch((err) => {
    console.log("Failed to collect Metrics");
    console.log(err);
    process.exit(1);
});
