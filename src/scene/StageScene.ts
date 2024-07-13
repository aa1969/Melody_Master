import { CustomButton } from './CustomButton';
export class StageScene extends Phaser.Scene {
  private questionCount: number = 0;
  private score: number = 0;

  constructor() {
    super('stage');
  }

  preload() {
    // No need to load images for text buttons
  }

  create() {
    const { width, height } = this.game.canvas;

    // 背景を追加
    this.cameras.main.setBackgroundColor(0xADD8E6);

    // Playボタンを追加
    new CustomButton(this, width / 2, height / 2 + 100, 200, 50, 0x00ff00, 'Stage 1', () => {
      //console.log('Play button clicked');
      // Playボタンがクリックされた時の処理
      this.scene.start('st1_question', { questionCount: this.questionCount, score: this.score });
    });
    new CustomButton(this, width / 2, height / 2 + 200, 200, 50, 0x00ff00, 'Stage 2', () => {
      //console.log('Play button clicked');
      // Playボタンがクリックされた時の処理
      this.scene.start('st2_question', { questionCount: this.questionCount, score: this.score });
    });
    
  }
}
