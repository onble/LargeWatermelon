import { MainGame } from "./MainGame";

const { regClass, property } = Laya;

@regClass()
export class Fruit extends Laya.Script {
    declare owner: Laya.Image;

    // 水果编号，同时用于索引要显示的水果精灵图片
    fruitNumber: number = 0;

    // 和底部边界的碰撞次数，用来标记第一次碰撞时播放音效
    downWallColl: number = 0;

    edgeX: number = 0;

    //过线停留时间
    checkEndTime: number = 0;

    //碰撞合并次数
    combineCount: number = 0;

    //已经触发过线的次数，防止一直触发
    endCount: number = 0;

    // 碰撞开始事件
    onTriggerEnter(other: Laya.ColliderBase, self?: Laya.ColliderBase, contact?: any): void {
        let _t = this;
        let fruitNode = MainGame.Instance.fruitNode;

        // 是否碰撞到底部边界
        if (other.label === "downwall") {
            // 碰撞后将其加入到fruitNode节点下
            fruitNode.addChild(self.owner);

            // 是否第一次碰撞
            if (_t.downWallColl == 0) {
                // 播放碰撞音效
            }
            _t.downWallColl++;
        }

        // 是否碰到其他水果
        if (other.label === "fruit") {
            fruitNode.addChild(self.owner);

            if (self.rigidBody) {
                self.rigidBody.angularVelocity = 0;
            }

            // 下面的水果碰撞上面的水果跳过
            if ((self.owner as Laya.Image).y > (other.owner as Laya.Image).y) {
                return;
            }

            let othFruitNumber = other.owner.getComponent(Fruit).fruitNumber;
            let selfFruitNumber = _t.fruitNumber;

            // 两个水果编号一样
            if (othFruitNumber == selfFruitNumber) {
                // 两个都已经时西瓜的情况
                if (selfFruitNumber == 10) {
                    return;
                }

                let pos = { x: (other.owner as Laya.Image).x, y: (other.owner as Laya.Image).y };
                let pos2 = { x: (other.owner as Laya.Image).x, y: (other.owner as Laya.Image).y };

                // TODO:合并效果，音效，得分，生成一个新的水果

                // 得分

                let score = MainGame.Instance.scoreObj.target + selfFruitNumber + 1;
                MainGame.Instance.setScoreTween(score);

                // 去掉碰撞边界，避免再次碰撞
                // FIXME:注意下面这里的逻辑改变
                (other as Laya.CircleCollider).enabled = false;
                (self as Laya.CircleCollider).enabled = false;

                Laya.Tween.to(
                    self.owner,
                    { x: pos.x, y: pos.y },
                    100,
                    undefined,
                    new Laya.Handler(this, () => {
                        // 创建爆浆效果，果汁飞溅的效果
                        MainGame.Instance.createFruitBoomEffect(
                            selfFruitNumber,
                            new Laya.Vector2(pos2.x, pos2.y),
                            (self.owner as Laya.Image).width
                        );

                        if (selfFruitNumber == 9) {
                            MainGame.Instance.createBigWaterMelonEffect();
                        }

                        // 销毁两个碰撞的水果
                        self.owner.active = false;
                        other.owner.active = false;
                        other.owner.destroy();
                        self.owner.destroy();

                        // 创建合成的水果
                        MainGame.Instance.createLevelUpFruit(selfFruitNumber + 1, new Laya.Vector2(pos.x, pos.y));
                    })
                );
            }
        }
    }
    onUpdate(): void {
        let _t = this;

        // 防止水果超出左右边界
        if (_t.owner.x < this.owner.width / 2) {
            this.owner.x = this.owner.width / 2;
        } else if (_t.owner.x > 720 - this.owner.width / 2) {
            this.owner.x = 720 - this.owner.width / 2;
        }

        // 碰线检测
        if (_t.owner.parent.name == "fruitNode") {
            _t.checkEndTime += Laya.timer.delta / 1000;
            if (_t.owner.y < MainGame.Instance.dashLineNode.y && _t.endCount == 0 && _t.checkEndTime > 3) {
                _t.owner.color = "#FF0000";
                // 将不透明度变化转换为 Laya 的 alpha (0-1)
                const fadeToTransparent = { alpha: 0 };
                const fadeToOpaque = { alpha: 1 }; // Cocos的255对应Laya的1

                // 创建闪烁动画序列
                Laya.Tween.to(
                    this.owner,
                    fadeToTransparent,
                    300,
                    Laya.Ease.linearIn,
                    Laya.Handler.create(this, () => {
                        Laya.Tween.to(this.owner, fadeToOpaque, 300, Laya.Ease.linearIn);
                    })
                ).repeat = 3; // 重复整个序列3次

                // 3次重复后执行结束游戏
                Laya.timer.once(1800, this, () => {
                    // 0.3s*2 * 3 = 1800ms
                    MainGame.Instance.gameOver();
                });
            }
        }
    }
}
