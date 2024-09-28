import { PianoKey } from './PianoKey';
import { NumberKey } from './NumberKey';
import { CustomButton } from './CustomButton';

//ステージ２の問題の正誤判定をするシーン
export class St2_AnswerScene extends Phaser.Scene {
    private keys: PianoKey[] = []; //キーを格納する配列
    private numkeys: NumberKey[] = []; //数字キーを格納する配列
    private stageLevel: number = 0; //ステージレベル
    private fNote: string | null = null; //一音目
    private sNote: string | null = null; //二音目
    private clickedNum: number = 0; //押された数字
    private correctNum: number = 0; //正解の数字
    private questionCount: number = 0; //問題数
    private score: number = 0; //得点数
    private scoreText: Phaser.GameObjects.Text | null = null; //得点表示
    private resultText: Phaser.GameObjects.Text | null = null; //正誤表示
    private questionText: Phaser.GameObjects.Text | null = null; //問題数表示
    private settingsButton: Phaser.GameObjects.Image | null = null; //音量設定ボタン表示

    constructor() {
        super('st2_answer');
    }

    init(data: any) {
        this.fNote = data.fNote; //一音目
        this.sNote = data.sNote; //二音目
        this.keys = data.keys; //鍵盤が格納された配列
        this.numkeys = data.numkeys; //数字キーが格納された配列
        this.stageLevel = data.stageLevel; //ステージレベル
        this.clickedNum = data.clickedNum; //押された数字
        this.correctNum = data.correctNum; //正解の数字
        this.questionCount = data.questionCount; //問題数
        this.score = data.score; //得点数
    }

    create() {
        //画面の大きさを取得
        const { width, height } = this.game.canvas;

        //正誤判定をする (押された数字と正解の数字を比較)
        const isCorrect = this.clickedNum === this.correctNum;

        // 背景を設定
        this.cameras.main.setBackgroundColor(0xADD8E6);
        // ピアノのキーの部分の背景を黒に設定
        const pianoBackground = this.add.rectangle(width / 2, 600, 1052, 204, 0x000000).setOrigin(0.5);

        //正誤判定の表示
        const resultMessage = isCorrect ? 'Correct!' : 'Wrong!';
        this.resultText = this.add.text(width / 2, 180, resultMessage,{ 
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
        this.questionText = this.add.text(width / 2, 50, `question:  ${this.questionCount}`,{ 
            fontSize: '48px', 
            color: '#ffffff', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
            }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);
        this.scoreText = this.add.text(width / 2, 100, `Score: ${this.score}`,{ 
            fontSize: '48px', 
            color: '#ffffff', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
            }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);
        

        // ピアノキーを配置
        this.keys.forEach(key => {
            const keyColor = key.isBlack ? 0x000000 : 0xFFFFFF;
            const keyImage = this.add.rectangle(key.x, key.isBlack ? 565 : 600, key.isBlack ? 30 : 48, key.isBlack ? 130 : 200, keyColor)
            .setInteractive({ useHandCursor: true });    
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

            
        // 数字キーを配置
        this.numkeys.forEach(numkey => {
            // 初期色を設定
            let keyColor = 0xCCCCCC; 
            if (numkey.num === this.clickedNum && isCorrect===false) {
                // 間違っていたとき、クリックしたキーを赤色に
                keyColor = 0xFF0000;
            }
            if (numkey.num === this.correctNum) {
                //正しいキーなら緑色に
                keyColor = 0x00FF00;
            }
            //カスタムボタンを配置     
            const button = new CustomButton(this, numkey.x, numkey.y, 70, 70, keyColor, `${numkey.num}`, () => {
            });
            // 効果を無効化
            button.disableEffects();
        });

        // 次の問題へのボタン
        if (this.questionCount > 9) {
            new CustomButton(this, 840, 280, 300, 50, 0x00ff00, 'Ending', () => {
                this.scene.start('ending', { score: this.score });
              });
        } else {
            new CustomButton(this, 840, 280, 300, 50, 0x00ff00, 'Next Question', () => {
                this.scene.start('st2_question', { stageLevel: this.stageLevel, questionCount: this.questionCount + 1, score: this.score });
              });
        }

        // 設定ボタンを追加
        this.settingsButton = this.add.image(60, 60, 'settings_button').setInteractive({ useHandCursor: true }).setScale(0.4);;
        this.settingsButton.on('pointerdown', () => {
            this.scene.launch('SettingsPopup');
        });

        // Replay ボタンを追加
        this.enableReplayButton(this.fNote!, this.sNote!);  
    }


    private enableReplayButton(firstNote: string, secondNote: string) {
        new CustomButton(this, 440, 280, 300, 50, 0x00ff00, 'Check Answer', () => {
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