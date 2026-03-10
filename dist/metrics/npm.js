import axios from "axios";
// need to define a function which fetches the data and return in NpmAjvFormat
export async function fetchAjvWeeklyDownloads() {
    //need to get the url for fetching
    //https://api.npmjs.org/downloads/point/<period>/<package>
    const url = "https://api.npmjs.org/downloads/point/last-week/ajv";
    try {
        const res = await axios.get(url, { timeout: 10_000 });
        if (typeof res.data?.downloads !== 'number') {
            throw new Error(`Unexpected npm response shape from ${url}`);
        }
        return res.data;
    }
    catch (err) {
        const msg = err?.response
            ? `npm API error : ${err.response.status} ${JSON.stringify(err.response.data)}`
            : `npm API error : ${err?.message ?? String(err)}`;
        throw new Error(msg);
    }
}
