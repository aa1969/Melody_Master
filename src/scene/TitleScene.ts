import { CustomButton } from './CustomButton';
export class TitleScene extends Phaser.Scene {

  constructor() {
    super('title');
  }

  preload() {
    // No need to load images for text buttons
  }

  create() {
    const { width, height } = this.game.canvas;

    // 背景を追加
    this.cameras.main.setBackgroundColor(0xADD8E6);

    // Playボタンを追加
    new CustomButton(this, width / 2, height / 2 + 100, 200, 50, 0x00ff00, 'Play', () => {
      //console.log('Play button clicked');
      // Playボタンがクリックされた時の処理
      this.scene.start('stage');
    });
    
    // Ruleボタンを追加
    new CustomButton(this, width / 2, height / 2 + 200, 200, 50, 0x00ff00, 'Rule', () => {
      // Ruleボタンがクリックされた時の処理
      this.scene.launch('popup');
    });
  }
}