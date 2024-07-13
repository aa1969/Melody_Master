export class CustomButton extends Phaser.GameObjects.Container {
    private buttonBackground: Phaser.GameObjects.Graphics;
    private buttonText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, color: number, text: string, onClick: Function) {
        super(scene, x, y);

        // ボタンの背景を作成するためのGraphicsオブジェクト
        this.buttonBackground = scene.add.graphics();
        this.buttonBackground.fillStyle(color, 1);
        this.buttonBackground.fillRoundedRect(-width / 2, -height / 2, width, height, 10); // 角を丸める
        this.buttonBackground.lineStyle(2, 0x000000);
        this.buttonBackground.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
        this.add(this.buttonBackground);

        // ボタンのテキスト
        this.buttonText = scene.add.text(0, 0, text, { 
            fontSize: '24px', 
            color: '#ffffff', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
        }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);
        this.add(this.buttonText);

        // ボタンをインタラクティブに設定
        this.buttonBackground.setInteractive(new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height), Phaser.Geom.Rectangle.Contains);

        // ボタン押下時の効果
        this.buttonBackground.on('pointerdown', () => {
            this.buttonBackground.setScale(0.95);
        });

        this.buttonBackground.on('pointerup', () => {
            this.buttonBackground.setScale(1);
            onClick();
        });

        this.buttonBackground.on('pointerout', () => {
            this.buttonBackground.setScale(1);
        });

        this.buttonBackground.on('pointerover', () => {
            this.buttonBackground.clear();
            this.buttonBackground.fillStyle(0xCCCCCC, 1);
            this.buttonBackground.fillRoundedRect(-width / 2, -height / 2, width, height, 10);
            this.buttonBackground.lineStyle(2, 0x000000);
            this.buttonBackground.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
        });

        this.buttonBackground.on('pointerout', () => {
            this.buttonBackground.clear();
            this.buttonBackground.fillStyle(color, 1);
            this.buttonBackground.fillRoundedRect(-width / 2, -height / 2, width, height, 10);
            this.buttonBackground.lineStyle(2, 0x000000);
            this.buttonBackground.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
        });

        // シーンにボタンを追加
        scene.add.existing(this);
    }
}

