import type { MapDef } from "../../../../shared/defs/mapDefs";
import { DeatchmatchMain } from "./main";
import { GameConfig } from "../../../../shared/gameConfig";
import { util } from "../../../../shared/utils/util";
import { THIS_REGION } from "../../resurviv-config";

// export const DeatchmatchCoop: MapDef = util.mergeDeep({}, DeatchmatchMain,
//     {
//         gameMode: {
//             maxPlayers: 100,
//             factionMode: true,
//             factions: 2,
//         },
//     }
// );
let mapDef = structuredClone(DeatchmatchMain);

mapDef.gameMode.maxPlayers = 100;
mapDef.gameMode.factionMode = true;
mapDef.gameMode.factions = 2;
mapDef.gameMode.coopMode = true;

export const Coop = mapDef;