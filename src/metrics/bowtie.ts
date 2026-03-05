import {execFile} from "child_process";
import {promisify} from "util"
//we are using bowtie cli
//the child process module allows the node to spawn a new process and run the commands

import { spawn } from "child_process";
//using spawn as execFile did not consider input , so now i am gonna use pipes

const execFileAsync = promisify(execFile); //creates a promise verison of execFile

type BowtieStatistics = any;

async function runBowtie(args:string[],input?:string):Promise<string>{
    return new Promise((resolve,reject)=>{
        const child = spawn("bowtie",args,{stdio:["pipe","pipe","pipe"]});

        let stdout="";
        let stderr="";

        child.stdout.on("data",d=>stdout+=d.toString());
        child.stderr.on("data",d=>stderr+=d.toString());

        child.on("close",code=>{
            if(code!==0){
                reject(new Error(`bowtie failed: ${stderr}`));
            }else{
                resolve(stdout);
            }
        });

        if(input){
            child.stdin.write(input);
        }
        child.stdin.end();
    });
}

function findPercent(obj:any):number|null{
    const candidates:any[]=[
        obj?.overall?.compliance_percent,
        obj?.overall?.compliacePercent,
        obj?.compliance_percent,
        obj?.compliacePercent,
        obj?.summary?.compliance_percent,
        obj?.summary?.compliacePercent,
    ];
    for(const c of candidates){
        if(typeof c === "number" && c>=0 && c<=100){
            return c;
        }
    }
    //if we could not find that expected in the above paths, then we need to scan the entire object

    const stack:any[] = [obj];
    //let us do the dfs
    while(stack.length){
        const curr = stack.pop();
        if(!curr||typeof curr !=="object") continue;
        for(const[k,v] of Object.entries(curr)){
            if(typeof v ==="number" && v>=0 && v<=100){
                const key = k.toLowerCase();
                if(key.includes("compliance")) return v;
            }
            else if(v && typeof v ==="object"){
                stack.push(v);
            }
        }
    }
    return null;
}

export async function fetchBowtieCompliance():Promise<{
    dialect:"draft2020-12";
    compliancePercent:number;
}>{
    const report  = await runBowtie(["latest-report","--dialect","draft2020-12"]);
    //it will run this bowtie latest-report --dialect draft2020-12

    //next i need to compute the stats from the output

    const statsText = await runBowtie(["statistics","--format","json"],report);

    let statsJson:BowtieStatistics;
    try{
        statsJson = JSON.parse(statsText);
    }
    catch{
        throw new Error("Bowtie statistics output was not valid JSON.");
    }
    const compliance = findPercent(statsJson);
    if(compliance==null){
        throw new Error("Could not find a compliance percent in Bowtie statistics JSON. Print the JSON and adjust extractor paths.");

    }
    return {dialect:"draft2020-12",compliancePercent:compliance};


}
