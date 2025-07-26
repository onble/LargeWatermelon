const { regClass, property } = Laya;
/**
 * 引擎自带的适配方案更好，这里保留这个脚本只是为了和教程尽可能一致。其他冗余脚本也是这个原因。
 */
@regClass()
export class FillScreen extends Laya.Script {
    declare owner: Laya.Sprite;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        this.owner.size(Laya.stage.width, Laya.stage.height);
    }
}
