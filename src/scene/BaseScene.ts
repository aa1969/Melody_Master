export class BaseScene extends Phaser.Scene {
    private settingsButton: Phaser.GameObjects.Image | null = null;
    protected volume: number = 0.5; // デフォルトの音量を0.5に設定

    constructor(key: string) {
        super(key);
    }

    preload() {
        // 設定ボタンの画像をロードする
        this.load.image('settings_button', 'assets/settings_button.png');
    }

    create() {
        const { width, height } = this.game.canvas;
        this.cameras.main.setBackgroundColor(0xFFFF00);
        console.log('base');

        // 設定ボタンを追加
        this.settingsButton = this.add.image(100, 100, 'settings_button').setInteractive({ useHandCursor: true });
        console.log('Settings button image:', this.settingsButton);
        this.settingsButton.on('pointerdown', () => {
            this.scene.launch('SettingsPopup', { volume: this.volume });
        });
    }
}
