import { CustomButton } from './CustomButton';

//エンディングシーン
export class EndingScene extends Phaser.Scene {
  private score: number = 0;
  private endText: Phaser.GameObjects.Text | null = null;

  constructor() {
      super('ending');
  }

  init(data: any) {
      this.score = data.score;
  }

  create() {
      //画面の大きさを取得
      const { width, height } = this.game.canvas;

      // 背景を設定
      this.cameras.main.setBackgroundColor(0xADD8E6);

      // 終了メッセージを表示
      this.endText = this.add.text(width / 2, height / 2, `Final Score: ${this.score}`,{ 
        fontSize: '84px', 
        color: '#ffffff', 
        fontStyle: 'bold', 
        fontFamily: 'Arial' 
        }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);

      // リスタートボタンを追加
      new CustomButton(this, width / 2, height / 2 + 200, 300, 50, 0x00ff00, 'Go back title', () => {
        this.scene.start('title', { questionCount: 1, score: 0 });
      });
  }
}

