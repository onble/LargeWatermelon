import { MainGame } from "./MainGame";

const { regClass, property } = Laya;

@regClass()
export class Fruit extends Laya.Script {
    declare owner: Laya.Image;

    // 水果编号，同时用于索引要显示的水果精灵图片
    fruitNumber: number = 0;

    // 和底部边界的碰撞次数，用来标记第一次碰撞时播放音效
    downWallColl: number = 0;

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

                        // 创建合成的水果
                        MainGame.Instance.createLevelUpFruit(selfFruitNumber + 1, new Laya.Vector2(pos.x, pos.y));
                        // 销毁两个碰撞的水果
                        self.owner.active = false;
                        other.owner.active = false;
                        other.owner.destroy();
                        self.owner.destroy();
                    })
                );
            }
        }
    }
}
