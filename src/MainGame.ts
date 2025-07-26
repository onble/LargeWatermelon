import { Fruit } from "./Fruit";

const { regClass, property } = Laya;

@regClass()
export class MainGame extends Laya.Script {
    declare owner: Laya.Sprite;

    // 水果精灵图列表
    @property([Laya.Texture2D])
    public fruitSprites: Array<Laya.Texture2D> = [];

    // 分数label标签
    @property(Laya.FontClip)
    public scoreLabel: Laya.Label = null;

    // 水果预制节点资源
    @property(Laya.Prefab)
    public fruitPre: Laya.Prefab = null;

    // 顶部区域节点，生成的水果要添加到这个节点里面
    @property(Laya.Sprite)
    public topNode: Laya.Sprite = null;

    // 用来暂存生成的水果节点
    targetFruit: Laya.Image = null;

    // 已创建水果计数
    createFruitCount: number = 0;

    onAwake(): void {
        this.physicsSystemCtrl(true, false);
    }

    onStart(): void {
        this.createOneFruit(0);

        this.bindTouch();
    }

    physicsSystemCtrl(enablePhysics: boolean, enableDebug: boolean) {}

    // 创建一个水果
    createOneFruit(index: number): void {
        let t = this;
        let n = this.fruitPre.create() as Laya.Image;
        n.x = 360;
        this.topNode.addChild(n);
        const image = this.fruitSprites[index];
        n.skin = image.url;
        n.width = image.width;
        n.height = image.height;
        // 获取附加给水果节点的Fruit脚本组件，注意大小写敏感、
        n.getComponent(Fruit).fruitNumber = index;

        // 创建时不受重力影响，碰撞物理边界半径为0
        n.getComponent(Laya.RigidBody).type = "static";
        n.getComponent(Laya.CircleCollider).radius = 1;

        // 从新变大的一个展示效果
        n.scale(0, 0, true);
        Laya.Tween.to(
            n,
            { scaleX: 1, scaleY: 1 },
            500,
            Laya.Ease.backOut,
            new Laya.Handler(this, () => {
                t.targetFruit = n;
            })
        );
    }

    // 绑定Touch事件
    bindTouch() {
        this.owner.on(Laya.Event.MOUSE_DOWN, this.onTouchStart.bind(this));
        this.owner.on(Laya.Event.MOUSE_DRAG, this.onTouchMove.bind(this));
        this.owner.on(Laya.Event.MOUSE_UP, this.onTouchEnd.bind(this));
        this.owner.on(Laya.Event.MOUSE_DRAG_END, this.onTouchEnd.bind(this));
    }

    // tocuh开始
    onTouchStart(e: Laya.Event): void {
        if (null === this.targetFruit) {
            return;
        }

        // 把点击位置的x坐标赋值给水果
        const pos = this.topNode.globalToLocal(new Laya.Point(e.stageX, e.stageY));
        Laya.Tween.to(this.targetFruit, { x: pos.x, y: pos.y }, 100);
    }

    // 拖动
    onTouchMove(e: Laya.Event): void {
        if (null === this.targetFruit) {
            return;
        }

        const pos = this.topNode.globalToLocal(new Laya.Point(e.stageX, e.stageY));
        this.targetFruit.pos(pos.x, pos.y, true);
    }

    // Touch结束
    onTouchEnd(e: Laya.Event): void {
        let t = this;
        if (null == t.targetFruit) {
            return;
        }

        // 让水果降落
        let h = t.targetFruit.height;
        t.targetFruit.getComponent(Laya.CircleCollider).radius = h / 2;
        t.targetFruit.getComponent(Laya.RigidBody).type = "dynamic";
        t.targetFruit.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: 800 });

        // 去掉暂存指向
        t.targetFruit = null;
        // 生成一个新的水果
        Laya.timer.once(500, this, () => {
            0 == t.createFruitCount
                ? (t.createOneFruit(0), t.createFruitCount++)
                : 1 == t.createFruitCount
                ? (t.createOneFruit(0), t.createFruitCount++)
                : 2 == t.createFruitCount
                ? (t.createOneFruit(1), t.createFruitCount++)
                : 3 == t.createFruitCount
                ? (t.createOneFruit(2), t.createFruitCount++)
                : 4 == t.createFruitCount
                ? (t.createOneFruit(2), t.createFruitCount++)
                : 5 == t.createFruitCount
                ? (t.createOneFruit(3), t.createFruitCount++)
                : t.createFruitCount > 5 && (t.createOneFruit(Math.floor(Math.random() * 5)), t.createFruitCount++);
        });
    }
}
