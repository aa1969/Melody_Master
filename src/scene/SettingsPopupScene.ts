import { CustomButton } from './CustomButton';
export class SettingsPopupScene extends Phaser.Scene {
    private sliderHandle: Phaser.GameObjects.Rectangle | null = null;

    constructor() {
        super({ key: 'SettingsPopup' });
    }

    create() {
        const { width, height } = this.game.canvas;

        // ポップアップの背景を作成
        const popupBackground = this.add.rectangle(width / 2, height / 2, 400, 300, 0xFFFFFF).setOrigin(0.5);
        const popupText = this.add.text(width / 2, height / 2 - 120, 'Settings',{ 
            fontSize: '32px', 
            color: '#000000', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
            }).setOrigin(0.5);

        // Backボタンを追加
        new CustomButton(this, width / 2 + 160, height / 2 - 120, 40, 40, 0xFF0000, 'X', () => {
            this.scene.stop('SettingsPopup');
            });

        // スライダーの背景を作成
        const sliderBackground = this.add.rectangle(width / 2, height / 2, 300, 20, 0xCCCCCC).setOrigin(0.5);

        // バーの位置を計算して設定
        const initialHandleX = width / 2 - 150 + this.sound.volume * 300;
        this.sliderHandle = this.add.rectangle(initialHandleX, height / 2, 20, 40, 0x000000).setOrigin(0.5).setInteractive({ useHandCursor: true, draggable: true });

        // ドラッグ操作の処理
        this.input.setDraggable(this.sliderHandle);

        this.sliderHandle.on('drag', (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            const newX = Phaser.Math.Clamp(dragX, width / 2 - 150, width / 2 + 150);
            this.sliderHandle!.setX(newX);
            // すべてのシーンに新しい音量を反映させる
            this.sound.volume = (newX - (width / 2 - 150)) / 300;
        });
    }
}

