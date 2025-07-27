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
    public scoreLabel: Laya.FontClip = null;

    // 水果预制节点资源
    @property(Laya.Prefab)
    public fruitPre: Laya.Prefab = null;

    // 顶部区域节点，生成的水果要添加到这个节点里面
    @property(Laya.Sprite)
    public topNode: Laya.Sprite = null;

    // 用来挂载落下的水果，作为他们的父节点，方便遍历查找
    @property(Laya.Sprite)
    fruitNode: Laya.Sprite = null;

    // 果汁效果图，水果颗粒
    @property([Laya.Texture2D])
    fruitL: Array<Laya.Texture2D> = [];

    // 果粒散溅
    @property([Laya.Texture2D])
    guozhiL: Array<Laya.Texture2D> = [];

    // 果汁效果
    @property([Laya.Texture2D])
    guozhiZ: Array<Laya.Texture2D> = [];

    // 果汁预制资源
    @property(Laya.Prefab)
    juicePre: Laya.Prefab = null;

    // 效果挂载的节点
    @property(Laya.Sprite)
    effectNode: Laya.Sprite = null;

    // 遮罩背景图节点
    @property(Laya.Prefab)
    maskBg: Laya.Prefab = null;

    // 彩带精灵图
    @property([Laya.Texture2D])
    caidaiSprites: Array<Laya.Texture2D> = [];

    // 彩带预制节点
    @property(Laya.Prefab)
    caidaiPre: Laya.Prefab = null;

    // 合成大西瓜效果挂载节点
    @property(Laya.Sprite)
    daxiguaEffectNode: Laya.Sprite = null;

    @property(Laya.Prefab)
    gameOverPre: Laya.Prefab = null;

    @property(Laya.Sprite)
    dashLineNode: Laya.Sprite = null;

    isDashLineInit: boolean = false;

    // 标记游戏结束
    gameOverSign: number = 0;

    // 全部水果最高高度
    theFruitHeight: number = -1200;

    // 用来暂存生成的水果节点
    targetFruit: Laya.Image = null;

    // 已创建水果计数
    createFruitCount: number = 0;

    // 分数变动和结果
    scoreObj = {
        isScoreChanged: false,
        target: 0,
        change: 0,
        score: 0,
    };

    // 设置一个静态单例引用，方便其他类中调用该类方法
    static Instance: MainGame = null;

    onAwake(): void {
        null != MainGame.Instance && MainGame.Instance.destroy();
        MainGame.Instance = this;

        this.physicsSystemCtrl(true, false);
    }

    onStart(): void {
        this.createOneFruit(0);

        this.bindTouch();
    }

    onUpdate(): void {
        this.updateScoreLabel();
    }

    /**
     * 创建一个升级的水果
     * @param fruitNumber 水果编号
     * @param position 水果位置
     */
    createLevelUpFruit(fruitNumber: number, position: Laya.Vector2) {
        let _t = this;
        let o = this.fruitPre.create() as Laya.Image;
        _t.fruitNode.addChild(o);
        o.skin = _t.fruitSprites[fruitNumber].url;
        o.width = _t.fruitSprites[fruitNumber].width;
        o.height = _t.fruitSprites[fruitNumber].height;
        o.getComponent(Fruit).fruitNumber = fruitNumber;
        o.pos(position.x, position.y);
        o.scale(0, 0, true);

        o.getComponent(Laya.RigidBody).linearVelocity = { x: 0, y: -10 };
        o.getComponent(Laya.CircleCollider).radius = o.height / 2;
        Laya.Tween.to(o, { scaleX: 1, scaleY: 1 }, 500, Laya.Ease.backOut, new Laya.Handler(this, () => {}));
    }

    //#region 分数面板更新
    setScoreTween(score: number) {
        let scoreObj = this.scoreObj;
        if (scoreObj.target != score) {
            scoreObj.target = score;
            scoreObj.change = Math.abs(scoreObj.target - scoreObj.score);
            scoreObj.isScoreChanged = true;
        }
    }

    /**
     * 这里的分数更新是把总分传过去然后和原分值比较出差值，通过update函数把差值一点点更新到scoreLabel中，形成分数滚动效果。
     */
    updateScoreLabel() {
        let scoreObj = this.scoreObj;
        if (scoreObj.isScoreChanged) {
            scoreObj.score += (Laya.timer.delta / 1000) * scoreObj.change * 5;
            if (scoreObj.score >= scoreObj.target) {
                scoreObj.score = scoreObj.target;
                scoreObj.isScoreChanged = false;
            }
            const t = Math.floor(scoreObj.score);
            this.scoreLabel.value = t.toString();
        }
    }

    //#endregion 分数面板更新

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
        n.getComponent(Laya.CircleCollider).enabled = false;

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
        this.owner.on(Laya.Event.MOUSE_DOWN, this.onTouchStart);
        this.owner.on(Laya.Event.MOUSE_DRAG, this.onTouchMove);
        this.owner.on(Laya.Event.MOUSE_UP, this.onTouchEnd);
        this.owner.on(Laya.Event.MOUSE_DRAG_END, this.onTouchEnd);
    }

    // tocuh开始
    onTouchStart = (e: Laya.Event) => {
        if (null === this.targetFruit) {
            return;
        }

        // 把点击位置的x坐标赋值给水果
        const pos = this.topNode.globalToLocal(new Laya.Point(e.stageX, e.stageY));
        Laya.Tween.to(this.targetFruit, { x: pos.x, y: this.targetFruit.y }, 100);
    };

    // 拖动
    onTouchMove = (e: Laya.Event) => {
        if (null === this.targetFruit) {
            return;
        }

        const pos = this.topNode.globalToLocal(new Laya.Point(e.stageX, e.stageY));
        this.targetFruit.pos(pos.x, this.targetFruit.y, true);
    };

    // Touch结束
    onTouchEnd = (e: Laya.Event) => {
        let t = this;
        if (null == t.targetFruit) {
            return;
        }

        // 让水果降落
        let h = t.targetFruit.height;
        t.targetFruit.getComponent(Laya.CircleCollider).radius = h / 2;
        t.targetFruit.getComponent(Laya.CircleCollider).enabled = true;
        t.targetFruit.getComponent(Laya.RigidBody).type = "dynamic";
        t.targetFruit.getComponent(Laya.RigidBody).setVelocity({ x: 0, y: 80 });

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
    };

    createFruitBoomEffect(fruitNumber: number, t: Laya.Vector2, width: number) {
        let localT = new Laya.Point(t.x, t.y);
        let _t = this;

        // 播放音效
        Laya.SoundManager.playSound("musics/boomBang.mp3", 1);
        Laya.SoundManager.playSound("musics/deskBang.mp3", 1);
        for (let o = 0; o < 10; o++) {
            let c = _t.juicePre.create() as Laya.Image;
            _t.effectNode.addChild(c);
            c.skin = _t.guozhiL[fruitNumber].url;
            let a = 359 * Math.random();
            let i = 30 * Math.random() + width;
            let l = new Laya.Vector2(Math.sin((a * Math.PI) / 180) * i, Math.cos((a * Math.PI) / 180) * i);
            let randomScale = 0.5 * Math.random() + width / 100;
            c.scale(randomScale, randomScale, true);
            let p = 0.5 * Math.random();
            const randomRotate = _t.randomInteger(-360, 360);
            c.pos(localT.x, localT.y);
            Laya.Tween.to(
                c,
                {
                    x: c.x + l.x,
                    y: c.y + l.y,
                    scaleX: 0.3,
                    scaleY: 0.3,
                    alpha: 0.1,
                    skewX: randomRotate,
                    skewY: randomRotate,
                },
                p * 1000,
                undefined,
                new Laya.Handler(this, () => {
                    c.active = false;
                    c.destroy();
                })
            );
        }

        for (let f = 0; f < 20; f++) {
            let h = _t.juicePre.create() as Laya.Image;
            _t.effectNode.addChild(h);
            h.skin = _t.fruitL[fruitNumber].url;
            h.active = true;
            let a = 359 * Math.random();
            let i = 30 * Math.random() + width;
            let l = new Laya.Vector2(Math.sin((a * Math.PI) / 180) * i, Math.cos((a * Math.PI) / 180) * i);
            let randomScale = 0.5 * Math.random() + width / 100;
            h.scale(randomScale, randomScale, true);
            let p = 0.5 * Math.random();
            h.pos(localT.x, localT.y);
            Laya.Tween.to(
                h,
                {
                    x: h.x + l.x,
                    y: h.y + l.y,
                    scaleX: 0.3,
                    scaleY: 0.3,
                    alpha: 0.1,
                },
                p * 1000,
                undefined,
                new Laya.Handler(this, () => {
                    h.active = false;
                    h.destroy();
                })
            );

            let m = _t.juicePre.create() as Laya.Image;
            _t.effectNode.addChild(m);
            m.active = true;
            m.skin = _t.guozhiZ[fruitNumber].url;
            m.pos(localT.x, localT.y);
            m.scale(0, 0, true);
            const randomRotate = _t.randomInteger(0, 360);
            m.skewX = randomRotate;
            m.skewY = randomRotate;
            Laya.Tween.to(
                m,
                { scaleX: 0.3, scaleY: 0.3, alpha: 0 },
                p * 1000,
                undefined,
                new Laya.Handler(this, () => {
                    m.active = false;
                    m.destroy();
                })
            );
        }
    }

    randomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createBigWaterMelonEffect() {
        this.owner.off(Laya.Event.MOUSE_DOWN, this.onTouchStart);
        this.owner.off(Laya.Event.MOUSE_DRAG, this.onTouchMove);
        this.owner.off(Laya.Event.MOUSE_UP, this.onTouchEnd);
        this.owner.off(Laya.Event.MOUSE_DRAG_END, this.onTouchEnd);
        let _t = this;
        // 大西瓜显示特效
        let e = _t.maskBg.create() as Laya.Sprite;
        _t.daxiguaEffectNode.addChild(e);

        // let c = new Laya.Image();

        // c.url = _t.fruitSprites[10].url;
        // c.width = _t.fruitSprites[10].width;
        // c.height = _t.fruitSprites[10].height;
        // _t.daxiguaEffectNode.addChild(c);
        // c.pos(150, 320);

        // // 旋转的光圈背景图
        // let r = new Laya.Image(_t.caidaiSprites[8].url);
        // r.scale(3, 3, true);
        // c.addChild(r);
        // r.pos(-190, 170);
        // Laya.Tween.to(
        //     r,
        //     { rotation: 360 },
        //     5000,
        //     Laya.Ease.backOut,
        //     new Laya.Handler(this, () => {
        //         r.active = false;
        //         r.destroy();
        //     })
        // );

        // 播放音效
        Laya.SoundManager.playSound("musics/cheer.mp3", 1);
        // 抛洒彩带效果
        // TODO:
    }

    /** 游戏结束 */
    gameOver() {
        var _t = this;
        if (_t.gameOverSign == 0) {
            // 游戏结束，水果自爆
            for (
                let t = 0,
                    n = function (n: number) {
                        if (!_t.fruitNode.getChildAt(n)) {
                            // 有可能刚好自爆时候游戏结束,可能会获得不到节点而报错
                            return;
                        }
                        setTimeout(function () {
                            _t.createFruitBoomEffect(
                                _t.fruitNode.getChildAt(n).getComponent(Fruit).fruitNumber,
                                new Laya.Vector2(
                                    (_t.fruitNode.getChildAt(n) as Laya.Image).x,
                                    (_t.fruitNode.getChildAt(n) as Laya.Image).y
                                ),
                                (_t.fruitNode.getChildAt(n) as Laya.Image).width
                            );

                            let score =
                                _t.scoreObj.target + _t.fruitNode.getChildAt(n).getComponent(Fruit).fruitNumber + 1;
                            _t.setScoreTween(score);
                            _t.fruitNode.getChildAt(n).active = false;
                            _t.fruitNode.getChildAt(n).destroy();
                        }, 100 * ++t);
                    },
                    o = this.fruitNode.numChildren - 1;
                o >= 0;
                o--
            )
                n(o);

            _t.dashLineNode.active = true;

            for (let c = 1; c < _t.topNode.numChildren; c++) {
                _t.topNode.getChildAt(c).active = false;
            }

            Laya.timer.once(3000, this, () => {
                _t.showGameOverPanel();
            });

            _t.gameOverSign++;
        }
    }

    /**
     *  显示游戏失败的界面
     */
    showGameOverPanel() {
        this.owner.off(Laya.Event.MOUSE_DOWN, this.onTouchStart);
        this.owner.off(Laya.Event.MOUSE_DRAG, this.onTouchMove);
        this.owner.off(Laya.Event.MOUSE_UP, this.onTouchEnd);
        this.owner.off(Laya.Event.MOUSE_DRAG_END, this.onTouchEnd);

        const gameOverPanel = this.gameOverPre.create();
        this.owner.addChild(gameOverPanel);
    }
}
