//ローディングシーン
export class LoadingScene extends Phaser.Scene {

  constructor() {
    super('loading');
  }

  preload() {
    // No need to load images for text buttons
  }

  create() {
    //画面の大きさを取得
    const { width, height } = this.game.canvas;

    // 背景を追加
    this.cameras.main.setBackgroundColor(0xADD8E6);

    //音量を設定
    this.sound.volume = 0.5;

    //タイトルへ
    this.scene.start('title');
  }
}