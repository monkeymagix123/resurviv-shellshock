import { GameConfig } from "../../shared/gameConfig";
import type { ConfigType, DeepPartial } from "./config";

const BACKPACK_LEVEL = 3;

// change this to the region of the server
// export const THIS_REGION: "na" | "eu" | "local" = "local";
export const THIS_REGION: "na" | "eu" | "local" = "na";

const serverDataConfig = {
    local: {},
    na: {
        gameServer: {
            apiServerUrl: "https://sus1.tailf587b3.ts.net/",
        },
        regions: {
            na: {
                https: true,
                address: "sus2.tailf587b3.ts.net/",
                l10n: "index-north-america",
            },
            // eu: {
            //     https: false,
            //     address: "217.160.224.171:8001",
            //     l10n: "index-europe",
            // },
        },
        thisRegion: "na",
    },
    // eu: {
    //     gameServer: {
    //         apiServerUrl: "http://217.160.224.171",
    //     },
    //     regions: {
    //         eu: {
    //             https: false,
    //             address: "217.160.224.171:8001",
    //             l10n: "index-europe",
    //         },
    //     },
    //     thisRegion: "eu",
    // },
};

export const CustomConfig: DeepPartial<ConfigType> = {
    ...serverDataConfig[THIS_REGION],
    client: {
        theme: "main",
    },
    modes: [
        {
            mapName: "main",
            teamMode: 1,
            enabled: true,
        },
        {
            mapName: "main",
            teamMode: 2,
            enabled: true,
        },
        {
            mapName: "main",
            teamMode: 4,
            enabled: true,
        },
    ],
    gameConfig: {
        disableKnocking: true,
        disableGroupSpectate: true,
        gas: {
            damageTickRate: 1,
        },
        player: {
            baseSwitchDelay: 0.05,
            defaultItems: {
                backpack: "backpack03",
                helmet: "helmet03",
                chest: "chest03",
                scope: "4xscope",
                perks: [
                    {
                        type: "endless_ammo",
                        droppable: false,
                    },
                    {
                        type: "takedown",
                        droppable: false,
                    },
                ],

                inventory: {
                    frag: 3,
                    smoke: 1,
                    mirv: 1,
                    bandage: GameConfig.bagSizes["bandage"][BACKPACK_LEVEL],
                    healthkit: GameConfig.bagSizes["healthkit"][BACKPACK_LEVEL],
                    soda: GameConfig.bagSizes["soda"][BACKPACK_LEVEL],
                    painkiller: GameConfig.bagSizes["painkiller"][BACKPACK_LEVEL],
                    "1xscope": 1,
                    "2xscope": 1,
                    "4xscope": 1,
                },
            },
        },
    },
};
