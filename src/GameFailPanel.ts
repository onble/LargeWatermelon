const { regClass, property } = Laya;

@regClass()
export class GameFailPanel extends Laya.Script {
    declare owner: Laya.Sprite;

    @property(Laya.Sprite)
    public restartButton: Laya.Sprite = null;

    //组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
    onAwake(): void {
        this.restartButton.on(Laya.Event.MOUSE_DOWN, this, this.onRestartClick);
    }

    private onRestartClick(): void {
        Laya.Scene.open("Scene/Scene.ls", true);
    }

    onDestroy(): void {
        this.restartButton.off(Laya.Event.MOUSE_DOWN, this, this.onRestartClick);
    }
}
