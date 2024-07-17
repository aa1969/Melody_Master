import { PianoKey } from './PianoKey';
import { CustomButton } from './CustomButton';

export class St1_AnswerScene extends Phaser.Scene {
    private keys: PianoKey[] = [];
    private fNote: string | null = null;
    private sNote: string | null = null;
    private clickedNote: string | null = null;
    private questionCount: number = 0;
    private score: number = 0;
    private scoretext: Phaser.GameObjects.Text | null = null;
    private resultText: Phaser.GameObjects.Text | null = null;
    private questiontext: Phaser.GameObjects.Text | null = null;
    private settingsButton: Phaser.GameObjects.Image | null = null;

    constructor() {
        super('st1_answer');
    }

    init(data: any) {
        this.fNote = data.fNote;
        this.sNote = data.sNote;
        this.clickedNote = data.clickedNote;
        this.keys = data.keys;
        this.questionCount = data.questionCount;
        this.score = data.score;
    }

    create() {
        const { width, height } = this.game.canvas;
        const isCorrect = this.clickedNote === this.sNote;

        // 背景を設定
        this.cameras.main.setBackgroundColor(0xADD8E6);
        // ピアノのキーの部分の背景を黒に設定
        const pianoBackground = this.add.rectangle(width / 2, 600, 1052, 204, 0x000000).setOrigin(0.5);

        const resultMessage = isCorrect ? 'Correct!' : 'Wrong!';
        this.resultText = this.add.text(width / 2, 250, resultMessage,{ 
            fontSize: '72px', 
            color: isCorrect ? '#00FF00' : '#FF0000', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
            }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);

        // スコア更新
        if (isCorrect) {
        this.score++;
        }

        //問題番号とスコア
        this.scoretext = this.add.text(width / 2, 50, `Score: ${this.score}`,{ 
            fontSize: '48px', 
            color: '#ffffff', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
            }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);
        this.questiontext = this.add.text(width / 2, 100, `question:  ${this.questionCount}`,{ 
            fontSize: '48px', 
            color: '#ffffff', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
            }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);

        // キーを配置
        this.keys.forEach(key => {
            const keyColor = key.isBlack ? 0x000000 : 0xFFFFFF;
            const keyImage = this.add.rectangle(key.x, key.isBlack ? 565 : 600, key.isBlack ? 30 : 48, key.isBlack ? 130 : 200, keyColor)
            .setInteractive({ useHandCursor: true });
            if (key.note === this.clickedNote && isCorrect===false) {
                // 間違っていたとき、クリックしたキーを赤色に
                keyImage.setFillStyle(0xFF0000);
            }
            if (key.note === this.sNote ) {
                //正しいキーなら緑色に
                keyImage.setFillStyle(0x00FF00);
            }     
            if (key.isBlack) {
                keyImage.setDepth(1);
            }
            // 初期の色を保存
            key.originalColor = keyImage.fillColor;
  
        keyImage.on('pointerdown', () => {
            this.sound.play(key.note);
            
            // キーの色を変える
            keyImage.setFillStyle(0xADFF2F); 

            // 一定時間後に元の色に戻す
            this.time.delayedCall(300, () => {
                keyImage.setFillStyle(key.originalColor);
            });
        });
            
            key.image = keyImage;
            key.color = keyColor;
        });

        // 次の問題へのボタン
        if (this.questionCount >= 3) {
            new CustomButton(this, 840, 400, 300, 50, 0x00ff00, 'Ending', () => {
                this.scene.start('ending', { score: this.score });
              });
        } else {
            new CustomButton(this, 840, 400, 300, 50, 0x00ff00, 'Next Question', () => {
                this.scene.start('st1_question', { questionCount: this.questionCount + 1, score: this.score });
              });
        }

        // 設定ボタンを追加
        this.settingsButton = this.add.image(60, 60, 'settings_button').setInteractive({ useHandCursor: true }).setScale(0.4);
        this.settingsButton.on('pointerdown', () => {
            this.scene.launch('SettingsPopup');
        });

        // Replay ボタンを追加
        this.enableReplayButton(this.fNote!, this.sNote!);       
    }

    private enableReplayButton(firstNote: string, secondNote: string) {
        new CustomButton(this, 440, 400, 300, 50, 0x00ff00, 'Replay', () => {
            // 対応するキーを検索
            const firstKey = this.keys.find(key => key.note === firstNote);
            const secondKey = this.keys.find(key => key.note === secondNote);
    
            // 最初のノートを再生し、キーの色を変更
            this.sound.play(firstNote);
            if (firstKey && firstKey.image) {
                firstKey.image.setFillStyle(0xADFF2F); // キーの色を変更
            }
    
            // 1秒後に2つ目のノートを再生し、キーの色を変更
            this.time.delayedCall(1000, () => {
                this.sound.play(secondNote);
                if (secondKey && secondKey.image) {
                    secondKey.image.setFillStyle(0xADFF2F); // キーの色を変更
                }
            });
    
            // 一定時間後にキーの色を元に戻す
            this.time.delayedCall(1500, () => {
                if (firstKey && firstKey.image) {
                    firstKey.image.setFillStyle(firstKey.originalColor !== undefined ? firstKey.originalColor : firstKey.color); // 元の色に戻す
                }
                if (secondKey && secondKey.image) {
                    secondKey.image.setFillStyle(secondKey.originalColor !== undefined ? secondKey.originalColor : secondKey.color); // 元の色に戻す
                }
            });
        });
    }
      
}
