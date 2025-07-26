const { regClass, property } = Laya;

@regClass()
export class Fruit extends Laya.Script {
    declare owner: Laya.Image;

    // 水果编号，同时用于索引要显示的水果精灵图片
    fruitNumber: number = 0;
}
