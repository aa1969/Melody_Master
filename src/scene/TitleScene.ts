import { CustomButton } from './CustomButton';

//タイトルシーン
export class TitleScene extends Phaser.Scene {

  constructor() {
    super('title');
  }

  preload() {
    // No need to load images for text buttons
  }

  create() {
    //画面の大きさを取得
    const { width, height } = this.game.canvas;

    // 背景を追加
    this.cameras.main.setBackgroundColor(0xADD8E6);


    this.add.text(width / 2, 250, `Melody Master`,{ 
      fontSize: '120px', 
      color: '#ffffff', 
      fontStyle: 'bold', 
      fontFamily: 'Arial' 
    }).setOrigin(0.5).setShadow(2, 2, '#000000', 2); 

    // Playボタンを追加
    new CustomButton(this, width / 2, height / 2 + 100, 200, 50, 0x00ff00, 'Play', () => {
      //console.log('Play button clicked');
      // Playボタンがクリックされた時の処理
      this.scene.start('stage');
    });
    
    // Ruleボタンを追加
    new CustomButton(this, width / 2, height / 2 + 200, 200, 50, 0x00ff00, 'Credit', () => {
      // Ruleボタンがクリックされた時の処理
      this.scene.launch('credit');
    });
  }
}