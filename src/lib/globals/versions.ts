
type MinecraftVersion = {
    id: string;
    name: string;
    release_target: null | string;
    type: string;
    stable: boolean;
    data_version: number;
    protocol_version: number;
    data_pack_version: number;
    resource_pack_version: number;
    build_time: string;
    release_time: string;
    sha1: string;
};

const response = await fetch("https://raw.githubusercontent.com/misode/mcmeta/summary/versions/data.min.json");
const minecraftVersionData: MinecraftVersion[] = await response.json();

const dpvDict: {[dataPackVersion: number]: string} = {};
const dpvDictSnapshot: {[dataPackVersion: number]: string} = {};

let lastStable: string = "newest";
for (let i = minecraftVersionData[0].data_pack_version; i > 0; i--) {
    const mcVs: MinecraftVersion[] = minecraftVersionData.filter((version: MinecraftVersion) => version.data_pack_version === i);
    if (mcVs.length === 0) {
        continue;
    }
    const stableMcVs: MinecraftVersion[] = mcVs.filter((version: MinecraftVersion) => version.stable);
    if (stableMcVs.length === 1) {
        dpvDict[i] = stableMcVs[0].id;
        lastStable = stableMcVs[0].id;
    } else if (stableMcVs.length > 1) {
        dpvDict[i] = `${stableMcVs[stableMcVs.length-1].id} - ${stableMcVs[0].id}`;
        lastStable = stableMcVs[0].id;
    }
    if (mcVs.length === 1) {
        dpvDictSnapshot[i] = mcVs[0].id + " (" + lastStable + ")";
    } else if (mcVs.length > 1) {
        dpvDictSnapshot[i] = `${mcVs[mcVs.length-1].id} - ${mcVs[0].id} (${lastStable})`;
    }
}

export { dpvDict, dpvDictSnapshot };
