import { PianoKey } from './PianoKey';
import { CustomButton } from './CustomButton';

//ステージ１の問題の正誤判定をするシーン
export class St1_AnswerScene extends Phaser.Scene {
    private keys: PianoKey[] = []; //キーを格納する配列
    private fNote: string | null = null; //一音目
    private sNote: string | null = null; //二音目
    private stageLevel: number = 0; //ステージレベル
    private clickedNote: string | null = null; //押されたキー
    private questionCount: number = 0; //問題数
    private score: number = 0; //得点数
    private scoreText: Phaser.GameObjects.Text | null = null; //得点表示
    private resultText: Phaser.GameObjects.Text | null = null; //正誤表示
    private questionText: Phaser.GameObjects.Text | null = null; //問題数表示
    private settingsButton: Phaser.GameObjects.Image | null = null; //音量設定ボタン表示

    constructor() {
        super('st1_answer');
    }

    //前のシーンからデータを受け取る
    init(data: any) {
        this.fNote = data.fNote; //一音目
        this.sNote = data.sNote; //二音目
        this.stageLevel = data.stageLevel; //ステージレベル
        this.clickedNote = data.clickedNote; //押されたキー
        this.keys = data.keys; //鍵盤が格納された配列
        this.questionCount = data.questionCount; //問題数
        this.score = data.score; //得点
    }

    create() {
        //画面の大きさを取得
        const { width, height } = this.game.canvas; 

        //正誤判定をする (押されたキーと二音目を比較)
        const isCorrect = this.clickedNote === this.sNote; 

        // 背景を設定
        this.cameras.main.setBackgroundColor(0xADD8E6);

        // ピアノのキーの部分の背景を黒に設定
        const pianoBackground = this.add.rectangle(width / 2, 600, 1052, 204, 0x000000).setOrigin(0.5);

        //正誤判定の表示
        const resultMessage = isCorrect ? 'Correct!' : 'Wrong!';
        this.resultText = this.add.text(width / 2, 250, resultMessage,{ 
            fontSize: '72px', 
            color: isCorrect ? '#00FF00' : '#FF0000', 
            fontStyle: 'bold', 
            fontFamily: 'Arial' 
            }).setOrigin(0.5).setShadow(2, 2, '#000000', 2);

        // 正解したとき、スコア更新
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
        

        // キーを配置
        this.keys.forEach(key => {
            //白鍵と黒鍵の色を設定
            const keyColor = key.isBlack ? 0x000000 : 0xFFFFFF; 

            //白鍵と黒鍵の大きさと場所を設定
            const keyImage = this.add.rectangle(key.x, key.isBlack ? 565 : 600, key.isBlack ? 30 : 48, key.isBlack ? 130 : 200, keyColor)
            .setInteractive({ useHandCursor: true });

            if (key.note === this.clickedNote && isCorrect===false) {
                //このキーが押されたキーで不正解のとき、赤色に
                keyImage.setFillStyle(0xFF0000);
            }
            if (key.note === this.sNote ) {
                //このキーが二音目のキー(正答)のとき、緑色に
                keyImage.setFillStyle(0x00FF00);
            }
            
            //黒鍵を白鍵の上に置く
            if (key.isBlack) {
                keyImage.setDepth(1);
            }

            // 初期の色を保存
            key.originalColor = keyImage.fillColor;

        //このキーが押されたとき
        keyImage.on('pointerdown', () => {
            //このキーの音を再生する
            this.sound.play(key.note);
            
            // キーの色を変える
            keyImage.setFillStyle(0xADFF2F); 

            // 一定時間後に元の色に戻す
            this.time.delayedCall(300, () => {
                keyImage.setFillStyle(key.originalColor);
            });
        });

            //キーのイメージオブジェクトと色を保存
            key.image = keyImage;
            key.color = keyColor;
        });

        // 次の問題へのボタン
        if (this.questionCount > 9) {
            //問題カウントが9より大きいとき、エンディングボタンを追加
            new CustomButton(this, 840, 400, 300, 50, 0x00ff00, 'Ending', () => {
                //endingSceneへ(得点)
                this.scene.start('ending', { score: this.score });
              });
        } else {
            //問題カウントが9以下の時、ネクストクエスチョンボタンを追加
            new CustomButton(this, 840, 400, 300, 50, 0x00ff00, 'Next Question', () => {
                //questionSceneへ(ステージレベル、問題数+1、得点数)
                this.scene.start('st1_question', { stageLevel: this.stageLevel, questionCount: this.questionCount + 1, score: this.score });
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

    //リプレイボタンを追加する関数
    private enableReplayButton(firstNote: string, secondNote: string) {
        new CustomButton(this, 440, 400, 300, 50, 0x00ff00, 'Replay', () => {
            // 一音目と二音目のキーを検索
            const firstKey = this.keys.find(key => key.note === firstNote);
            const secondKey = this.keys.find(key => key.note === secondNote);
    
            // 最初のノートを再生し、キーの色を変更
            this.sound.play(firstNote);
            if (firstKey && firstKey.image) {
                firstKey.image.setFillStyle(0xADFF2F); // キーの色を変更
            }
    
            // 1000ms後に2つ目のノートを再生し、キーの色を変更
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
