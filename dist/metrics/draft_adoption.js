import axios from 'axios';
async function fetchCountForQuery(query, token) {
    const url = "https://api.github.com/search/code";
    try {
        const res = await axios.get(url, {
            timeout: 10_000,
            params: {
                q: query,
                per_page: 1,
            },
            headers: {
                Accept: "application/vnd.github+json",
                "X-GitHub-Api-Version": "2022-11-28",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        if (typeof res.data?.total_count !== "number") {
            throw new Error(`Unexpected GitHub response shape for query: ${query}`);
        }
        return res.data.total_count;
    }
    catch (err) {
        const msg = err?.response ? `GitHub API Error for query "${query}":${err.response.status} ${JSON.stringify(err.response.data)}` : `GitHub API Error for query "${query}":${err?.message ?? String(err)}`;
        throw new Error(msg);
    }
}
export async function fetchDraftAdoption(token) {
    const queries = {
        draft_04: `"json-schema.org/draft-04/schema" extension:json`,
        draft_06: `"json-schema.org/draft-06/schema" extension:json`,
        draft_07: `"json-schema.org/draft-07/schema" extension:json`,
        draft_2019_09: `"json-schema.org/draft/2019-09/schema" extension:json`,
        draft_2020_12: `"json-schema.org/draft/2020-12/schema" extension:json`,
    };
    const [draft_04, draft_06, draft_07, draft_2019_09, draft_2020_12,] = await Promise.all([
        fetchCountForQuery(queries.draft_04, token),
        fetchCountForQuery(queries.draft_06, token),
        fetchCountForQuery(queries.draft_07, token),
        fetchCountForQuery(queries.draft_2019_09, token),
        fetchCountForQuery(queries.draft_2020_12, token),
    ]);
    return {
        draft_04,
        draft_06,
        draft_07,
        draft_2019_09,
        draft_2020_12,
    };
}
