import axios from "axios";
export async function fetchJsonSchemaTopicRepoCount(token) {
    const url = "https://api.github.com/search/repositories";
    const q = "topic:json-schema";
    try {
        const res = await axios.get(url, {
            timeout: 10_000,
            params: { q, per_page: 1 }, // we only need total_count, so the repo names do not matter
            headers: {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        if (typeof res.data?.total_count !== "number") {
            throw new Error(`Unexpected GitHub response shape from ${url}`);
        }
        return res.data.total_count;
    }
    catch (err) {
        const msg = err?.response
            ? `GitHub API error: ${err.response.status} ${JSON.stringify(err.response.data)}`
            : `GitHub API error: ${err?.message ?? String(err)}`;
        throw new Error(msg);
    }
}
