import type { MapDef } from "../../../../shared/defs/mapDefs";
import { DeatchmatchMain } from "./main";
import { GameConfig } from "../../../../shared/gameConfig";
import { util } from "../../../../shared/utils/util";
import { THIS_REGION } from "../../resurviv-config";

let mapDef = structuredClone(DeatchmatchMain);

mapDef.gameMode.maxPlayers = 100;
mapDef.gameMode.factionMode = true;
mapDef.gameMode.factions = 2;
mapDef.gameMode.coopMode = true;

mapDef.mapGen.fixedSpawns[0]["zone"] = 2;

export const Coop = mapDef;