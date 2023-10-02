// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    dir: cc.Vec2 = cc.Vec2.ZERO;
    speed = 1000;

    start() {
        this.dir = this.node.position.normalizeSelf();// tra ve vector co toa do = 1
        this.destroyBullet();
    }

    destroyBullet() {
        this.scheduleOnce(() => {
            this.node.destroy()
        }, 4);
    }

    update(dt) {
        const step = this.dir.mul(this.speed * dt);
        this.node.position = this.node.position.addSelf(step);

    }


}
