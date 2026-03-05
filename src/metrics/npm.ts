import axios from "axios";

//let me define the format on how i need to fetch the data based on what the ajv api returns

export type NpmAjvWeekly={
    downloads:number;
    start:string;
    end:string;
    package:string;
};

// need to define a function which fetches the data and return in NpmAjvFormat

async function fetchAjvWeeklyDownloads():Promise<NpmAjvWeekly>{
    //need to get the url for fetching
    //https://api.npmjs.org/downloads/point/<period>/<package>
    const url = "https://api.npmjs.org/downloads/point/last-week/ajv";
    try{
        const res = await axios.get<NpmAjvWeekly>(url,{timeout:10_000});

        if(typeof res.data?.downloads!=='number'){
            throw new Error(`Unexpected npm response shape from ${url}`);
        }
        return res.data;
    }
    catch(err:any){
        const msg = err?.response
        ?  `npm API error : ${err.response.status} ${JSON.stringify(err.response.data)}`
        :  `npm API error : ${err?.message ?? String(err)}`;
        throw new Error(msg);
    }
}