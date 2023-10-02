// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    loadingProgressBar: cc.Sprite = null;

    @property(cc.Label)
    labelUpdateProgress: cc.Label = null;

    loading : any;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.loadingSource()
    }

    loadingSource(){
        let count = 0;
        this.schedule(this.loading = () => {
            count += 2;
            this.loadingProgressBar.node.active = true;
            this.loadingProgressBar.fillRange = count/100;
            this.labelUpdateProgress.string = count + "%";
            if (count >= 100) {
               this.unschedule(this.loading);
                cc.director.loadScene("Home");
            }
        }, 0.000001);
    }

    // update (dt) {}
}
