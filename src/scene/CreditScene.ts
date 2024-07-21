import { CustomButton } from './CustomButton';
export class CreditScene extends Phaser.Scene {

  constructor() {
    super('credit');
  }

  preload() {
    // No need to load images for text buttons
  }

  create() {
    const { width, height } = this.game.canvas;

    // 背景を追加
    this.cameras.main.setBackgroundColor(0xADD8E6);


    this.add.text(width / 2, 100, `Created by Shun Ando`,{ 
        fontSize: '48px', 
        color: '#ffffff', 
        fontStyle: 'bold', 
        fontFamily: 'Arial' 
      }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);

    this.add.text(width / 2, 200, `Sound : GarageBand`,{ 
        fontSize: '48px', 
        color: '#ffffff', 
        fontStyle: 'bold', 
        fontFamily: 'Arial' 
      }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);
    this.add.text(width / 2, 300, `Language : TypeScript`,{ 
        fontSize: '48px', 
        color: '#ffffff', 
        fontStyle: 'bold', 
        fontFamily: 'Arial' 
      }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);
    this.add.text(width / 2, 400, `Game Engine : Phaser`,{ 
        fontSize: '48px', 
        color: '#ffffff', 
        fontStyle: 'bold', 
        fontFamily: 'Arial' 
      }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);       

    // Backボタンを追加
    new CustomButton(this, width / 2, height / 2 + 270, 200, 50, 0x00ff00, 'Back', () => {
      this.scene.start('title');
    });
  }
}