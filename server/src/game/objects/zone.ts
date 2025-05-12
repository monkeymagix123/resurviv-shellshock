import { Vec2 } from "../../../../shared/utils/v2";
import { Game } from "../game";
import { Obstacle } from "./obstacle";

import { TeamColor } from "../../../../shared/defs/maps/factionDefs";
import { ObjectType } from "../../../../shared/net/objectSerializeFns";
import { Player } from "./player";
import { AABB, coldet } from "../../../../shared/utils/coldet";
import { Collider } from "../../../../shared/utils/coldet";

import { coopConfig } from "../../../../shared/coopConfig";

export class Zone extends Obstacle {
    // last in zone
    zone!: {
        red: boolean;
        blue: boolean;
    }

    // capturing: 0|1|2|3 = 0; // 3: contested
    capturing: TeamColor.Red | TeamColor.Blue | 0 = 0;
    timer = 0;
    takeoverTimer = 0;

    constructor(game: Game, pos: Vec2, type: string, layer: number, ori?: number, scale?: number, parentBuildingId?: number, puzzlePiece?: string, isSkin?: boolean) {
        super(game, pos, type, layer, ori, scale, parentBuildingId, puzzlePiece, isSkin);

        this.zone = {
            red: false,
            blue: false,
        }
    }

    private inactiveEnd(b: boolean) {
        if (b) return "";
        return "_inactive";
    }

    getColor(red: boolean = this.zone.red, blue: boolean = this.zone.blue): string {
        if (red && blue) {
            // contested
            return "_purple";
        }
        // if (this.capturing)

        // hmm maybe diff colors for red inactive and active
        if (red || this.capturing === TeamColor.Red) {
            return `_red${this.inactiveEnd(red)}`;
        }
        if (blue || this.capturing === TeamColor.Blue) {
            return `_blue${this.inactiveEnd(blue)}`;
        }

        // return "_gray";
        return "";
    }

    update(dt: number) {
        let red = false;
        let blue = false;

        let aabb = this.collider as AABB

        // get current players in the zone
        let playersOn = this.game.grid.intersectCollider(this.collider)
            .filter((obj): obj is Player => obj.__type === ObjectType.Player && !obj.dead && !obj.downed && !obj.disconnected
            && coldet.testPointAabb(obj.pos, aabb.min, aabb.max)
        );

        let count = [0, 0, 0];

        for (const player of playersOn) {
            // const p = player as Player;
            if (player.teamId <= 2) {
                count[player.teamId]++;
            }
        }

        if (count[TeamColor.Red] > 0) {
            red = true;
            // this.type = "zone_red";
            this.capturing = TeamColor.Red;
        }
        if (count[TeamColor.Blue] > 0) {
            blue = true;
            this.capturing = TeamColor.Blue;
        }

        // this.game.grid.updateObject(this);
        // this.serializeFull();
        // this.setDirty();
        // this.game.netSync();

        let a: Zone;
        if (this.getColor() != this.getColor(red, blue)) {
            // update
            this.dead = true;
            this.setDirty();

            // let end = "";
            // if (red && blue) {
            //     end = "_purple";
            // } else if (red) {
            //     end = "_red";
            // } else if (blue) {
            //     end = "_blue";
            // }
            let end = this.getColor(red, blue);
            a = this.game.map.genAuto(`zone${end}`, this.pos, this.layer, this.ori) as Zone;
            this.copyTo(a);

            a.zone.red = red;
            a.zone.blue = blue;

            this.game.curZone = a;
        }
    }

    copyTo(a: Zone): void {
        a.zone.red = this.zone.red;
        a.zone.blue = this.zone.blue;

        a.capturing = this.capturing;
        a.timer = this.timer;
        a.takeoverTimer = this.takeoverTimer;
    }
}