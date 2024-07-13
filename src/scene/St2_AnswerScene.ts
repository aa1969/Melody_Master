import { PianoKey } from './PianoKey';
import { CustomButton } from './CustomButton';

export class St2_AnswerScene extends Phaser.Scene {
    private keys: PianoKey[] = [];
    private correctNote: string | null = null;
    private clickedNote: string | null = null;
    private questionCount: number = 0;
    private score: number = 0;
    private scoretext: Phaser.GameObjects.Text | null = null;
    private resultText: Phaser.GameObjects.Text | null = null;
    private questiontext: Phaser.GameObjects.Text | null = null;
    private settingsButton: Phaser.GameObjects.Image | null = null;

    constructor() {
        super('st2_answer');
    }

    init(data: any) {
        this.correctNote = data.correctNote;
        this.clickedNote = data.clickedNote;
        this.keys = data.keys;
        this.questionCount = data.questionCount;
        this.score = data.score;
    }

    create() {
        const { width, height } = this.game.canvas;
        const isCorrect = this.clickedNote === this.correctNote;

        // 背景を設定
        this.cameras.main.setBackgroundColor(0xADD8E6);
        // ピアノのキーの部分の背景を黒に設定
        const pianoBackground = this.add.rectangle(width / 2, 575, 1052, 204, 0x000000).setOrigin(0.5);

        const resultMessage = isCorrect ? 'Correct!' : 'Wrong!';
        this.resultText = this.add.text(width / 2, 300, resultMessage,{ 
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
            const keyImage = this.add.rectangle(key.x, key.isBlack ? 540 : 575, key.isBlack ? 30 : 48, key.isBlack ? 130 : 200, keyColor);
            if (key.note === this.clickedNote && isCorrect===false) {
                // 間違えたとき、クリックしたキーを赤色に
                keyImage.setFillStyle(0xFF0000);
            }
            if (key.note === this.correctNote ) {
                //正しいキーなら緑色に
                keyImage.setFillStyle(0x00FF00);
            }     
            if (key.isBlack) {
                keyImage.setDepth(1);
            }

            key.image = keyImage;
            key.color = keyColor;
        });

        // 次の問題へのボタン
        if (this.questionCount >= 3) {
            new CustomButton(this, 640, 380, 300, 50, 0x00ff00, 'Ending', () => {
                this.scene.start('ending', { score: this.score });
              });
        } else {
            new CustomButton(this, 640, 380, 300, 50, 0x00ff00, 'Next Question', () => {
                this.scene.start('st2_question', { questionCount: this.questionCount + 1, score: this.score });
              });
        }

        // 設定ボタンを追加
        this.settingsButton = this.add.image(60, 60, 'settings_button').setInteractive({ useHandCursor: true }).setScale(0.4);;
        this.settingsButton.on('pointerdown', () => {
            this.scene.launch('SettingsPopup');
        });
    }
}