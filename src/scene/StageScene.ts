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

    //ステージ難易度
    this.add.text(width / 2 - 150, 100, `Stage 1`,{ 
      fontSize: '48px', 
      color: '#ffffff', 
      fontStyle: 'bold', 
      fontFamily: 'Arial' 
      }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);
    this.add.text(width / 2 - 150, 400, `Stage 2`,{ 
      fontSize: '48px', 
      color: '#ffffff', 
      fontStyle: 'bold', 
      fontFamily: 'Arial' 
      }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);

    // ステージ開始ボタンを追加
    new CustomButton(this, width / 2 + 150, 100, 200, 50, 0x00ff00, 'Level 1', () => {
      //console.log('Play button clicked');
      // Playボタンがクリックされた時の処理
      this.scene.start('st1_question', { StageLevel: 1, questionCount: this.questionCount, score: this.score });
    });
    new CustomButton(this, width / 2 + 150, 170, 200, 50, 0x00ff00, 'Level 2', () => {
      this.scene.start('st1_question', { StageLevel: 2, questionCount: this.questionCount, score: this.score });
    });
    new CustomButton(this, width / 2 + 150, 240, 200, 50, 0x00ff00, 'Level 3', () => {
      this.scene.start('st1_question', { StageLevel: 3, questionCount: this.questionCount, score: this.score });
    });
    new CustomButton(this, width / 2 + 150, 400, 200, 50, 0x00ff00, 'Level 1', () => {
      this.scene.start('st2_question', { StageLevel: 1, questionCount: this.questionCount, score: this.score });
    });
    new CustomButton(this, width / 2 + 150, 470, 200, 50, 0x00ff00, 'Level 2', () => {
      this.scene.start('st2_question', { StageLevel: 2, questionCount: this.questionCount, score: this.score });
    });
    new CustomButton(this, width / 2 + 150, 540, 200, 50, 0x00ff00, 'Level 3', () => {
      this.scene.start('st2_question', { StageLevel: 3, questionCount: this.questionCount, score: this.score });
    });    
  }
}
