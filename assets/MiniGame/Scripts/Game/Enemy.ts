// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SCORE } from "../Helper/constants";
import { getDistance } from "../Helper/utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Enemy extends cc.Component {

    @property(cc.Animation)
    anim: cc.Animation = null;

    dir: cc.Vec2 = cc.Vec2.ZERO;
    speed = 50;

    posEndX = 0;
    posEndY = 0;
    isCheck = false;

    start() {

    }

    setDir() {
        if (this.isCheck) { return; }
        this.dir = this.node.position.normalizeSelf();
        let Pi = Math.PI;
        let angle = Math.atan2(this.dir.x, this.dir.y) * (180 / Pi)
        this.node.angle = -angle + 180;
        // this.node.scaleY = this.node.x > 0 ? -this.node.scaleY : this.node.scaleY;
        cc.log(this.node.x);
        let distance = getDistance(this.node.position, cc.v2(-this.node.x, -this.node.y))
        let act = cc.moveTo(distance / this.speed, cc.v2(-this.node.x, -this.node.y))
        this.node.runAction(cc.sequence(act, cc.callFunc(() => {
            this.node.destroy()
        })))
    }

    onCollisionEnter(other) {
        if (other.tag === 0) {
            this.isCheck = true;
            this.anim.play('Destroy');
            this.node.emit(SCORE);
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 0.3)
            other.node.destroy();
        }
    }
}
