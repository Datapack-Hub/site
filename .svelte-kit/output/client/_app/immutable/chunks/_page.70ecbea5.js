const o=async({fetch:e,url:t})=>{const a=await e("https://api.datapackhub.net/projects/");return a.ok?{projects:(await a.json()).result,sortMode:t.searchParams.has("sort")?t.searchParams.get("sort"):"trending"}:{}},s=Object.freeze(Object.defineProperty({__proto__:null,load:o},Symbol.toStringTag,{value:"Module"}));export{s as _,o as l};
