import { PianoKey } from './PianoKey';
import { NumberKey } from './NumberKey';
import { CustomButton } from './CustomButton';

//ステージ2の問題を作成するシーン
export class St2_QuestionScene extends Phaser.Scene {
    private keys: PianoKey[] = []; //キーを格納する配列
    private numkeys: NumberKey[] = []; //数字キーを格納する配列
    private stageLevel: number = 0; //ステージレベル
    private fNote: string | null = null; //一音目
    private sNote: string | null = null; //二音目
    private correctNum: number = 0; //正解の数字
    private questionCount: number = 0; //問題数
    private score: number = 0; //得点数
    private scoreText: Phaser.GameObjects.Text | null = null; //得点数表示
    private questionText: Phaser.GameObjects.Text | null = null; //問題数表示
    private settingsButton: Phaser.GameObjects.Image | null = null; //音量設定ボタン表示
  
    constructor() {
      super('st2_question');
    }

    //前のシーンからデータを受け取る
    init(data: any) {
      this.stageLevel = data.stageLevel; //ステージレベル
      this.questionCount = data.questionCount; //問題数
      this.score = data.score; //得点数
    }
  
    preload() {
      //設定ボタンのイメージ画像を入手
      this.load.image('settings_button', 'assets/settings_button.png');
      // 音声ファイルのロード（省略）
      this.load.audio('C0', 'assets/C0.mp3');
      this.load.audio('C#0', 'assets/Csharp0.mp3');
      this.load.audio('D0', 'assets/D0.mp3');
      this.load.audio('D#0', 'assets/Dsharp0.mp3');
      this.load.audio('E0', 'assets/E0.mp3');
      this.load.audio('F0', 'assets/F0.mp3');
      this.load.audio('F#0', 'assets/Fsharp0.mp3');
      this.load.audio('G0', 'assets/G0.mp3');
      this.load.audio('G#0', 'assets/Gsharp0.mp3');
      this.load.audio('A0', 'assets/A0.mp3');
      this.load.audio('A#0', 'assets/Asharp0.mp3');
      this.load.audio('B0', 'assets/B0.mp3');
      this.load.audio('C1', 'assets/C1.mp3');
      this.load.audio('C#1', 'assets/Csharp1.mp3');
      this.load.audio('D1', 'assets/D1.mp3');
      this.load.audio('D#1', 'assets/Dsharp1.mp3');
      this.load.audio('E1', 'assets/E1.mp3');
      this.load.audio('F1', 'assets/F1.mp3');
      this.load.audio('F#1', 'assets/Fsharp1.mp3');
      this.load.audio('G1', 'assets/G1.mp3');
      this.load.audio('G#1', 'assets/Gsharp1.mp3');
      this.load.audio('A1', 'assets/A1.mp3');
      this.load.audio('A#1', 'assets/Asharp1.mp3');
      this.load.audio('B1', 'assets/B1.mp3');
      this.load.audio('C2', 'assets/C2.mp3');
      this.load.audio('C#2', 'assets/Csharp2.mp3');
      this.load.audio('D2', 'assets/D2.mp3');
      this.load.audio('D#2', 'assets/Dsharp2.mp3');
      this.load.audio('E2', 'assets/E2.mp3');
      this.load.audio('F2', 'assets/F2.mp3');
      this.load.audio('F#2', 'assets/Fsharp2.mp3');
      this.load.audio('G2', 'assets/G2.mp3');
      this.load.audio('G#2', 'assets/Gsharp2.mp3');
      this.load.audio('A2', 'assets/A2.mp3');
      this.load.audio('A#2', 'assets/Asharp2.mp3');
      this.load.audio('B2', 'assets/B2.mp3');
    }
  
    create() {
      //画面の大きさを取得
      const { width, height } = this.game.canvas;
      //console.log('Q');

      // 背景を黄色に設定
      this.cameras.main.setBackgroundColor(0xADD8E6);

      // ピアノのキーの部分の背景を黒に設定
      const pianoBackground = this.add.rectangle(width / 2, 600, 1052, 204, 0x000000).setOrigin(0.5);
  
      // キーの設定
      this.keys = [
        { note: 'C0', x: 140, isBlack: false, keynum: 0 },
        { note: 'C#0', x: 160, isBlack: true, keynum: 1 },
        { note: 'D0', x: 190, isBlack: false, keynum: 2 },
        { note: 'D#0', x: 220, isBlack: true, keynum: 3 },
        { note: 'E0', x: 240, isBlack: false, keynum: 4 },
        { note: 'F0', x: 290, isBlack: false, keynum: 5 },
        { note: 'F#0', x: 310, isBlack: true, keynum: 6 },
        { note: 'G0', x: 340, isBlack: false, keynum: 7 },
        { note: 'G#0', x: 365, isBlack: true, keynum: 8 },
        { note: 'A0', x: 390, isBlack: false, keynum: 9 },
        { note: 'A#0', x: 420, isBlack: true, keynum: 10 },
        { note: 'B0', x: 440, isBlack: false, keynum: 11 },
        { note: 'C1', x: 490, isBlack: false, keynum: 12 },
        { note: 'C#1', x: 510, isBlack: true, keynum: 13 },
        { note: 'D1', x: 540, isBlack: false, keynum: 14 },
        { note: 'D#1', x: 570, isBlack: true, keynum: 15 },
        { note: 'E1', x: 590, isBlack: false, keynum: 16 },
        { note: 'F1', x: 640, isBlack: false, keynum: 17 },
        { note: 'F#1', x: 660, isBlack: true, keynum: 18 },
        { note: 'G1', x: 690, isBlack: false, keynum: 19 },
        { note: 'G#1', x: 715, isBlack: true, keynum: 20 },
        { note: 'A1', x: 740, isBlack: false, keynum: 21 },
        { note: 'A#1', x: 770, isBlack: true, keynum: 22 },
        { note: 'B1', x: 790, isBlack: false, keynum: 23 },
        { note: 'C2', x: 840, isBlack: false, keynum: 24 },
        { note: 'C#2', x: 860, isBlack: true, keynum: 25 },
        { note: 'D2', x: 890, isBlack: false, keynum: 26 },
        { note: 'D#2', x: 920, isBlack: true, keynum: 27 },
        { note: 'E2', x: 940, isBlack: false, keynum: 28 },
        { note: 'F2', x: 990, isBlack: false, keynum: 29 },
        { note: 'F#2', x: 1010, isBlack: true, keynum: 30 },
        { note: 'G2', x: 1040, isBlack: false, keynum: 31 },
        { note: 'G#2', x: 1065, isBlack: true, keynum: 32 },
        { note: 'A2', x: 1090, isBlack: false, keynum: 33 },
        { note: 'A#2', x: 1120, isBlack: true, keynum: 34 },
        { note: 'B2', x: 1140, isBlack: false, keynum: 35 },
      ];
  
      this.keys.forEach(key => {
        //白鍵と黒鍵の色を設定
        const keyColor = key.isBlack ? 0x000000 : 0xFFFFFF;

        //白鍵と黒鍵の大きさと場所を設定
        const keyImage = this.add.rectangle(key.x, key.isBlack ? 565 : 600, key.isBlack ? 30 : 48, key.isBlack ? 130 : 200, keyColor)

        //黒鍵を白鍵の上に置く
        if (key.isBlack) {
          keyImage.setDepth(1);
        }

        //キーのイメージオブジェクトと色を保存
        key.image = keyImage;
        key.color = keyColor;
      });

      //数字キーを設定
      this.numkeys=[
        { num: -12, x: 200, y: 375 },
        { num: -11, x: 280, y: 375 },
        { num: -10, x: 360, y: 375 },
        { num: -9, x: 440, y: 375 },
        { num: -8, x: 520, y: 375 },
        { num: -7, x: 600, y: 375 },
        { num: -6, x: 680, y: 375 },
        { num: -5, x: 760, y: 375 },
        { num: -4, x: 840, y: 375 },
        { num: -3, x: 920, y: 375  },
        { num: -2, x: 1000, y: 375 },
        { num: -1, x: 1080, y: 375 },
        { num: 1, x: 200, y: 455 },
        { num: 2, x: 280, y: 455 },
        { num: 3, x: 360, y: 455 },
        { num: 4, x: 440, y: 455 },
        { num: 5, x: 520, y: 455 },
        { num: 6, x: 600, y: 455 },
        { num: 7, x: 680, y: 455 },
        { num: 8, x: 760, y: 455 },
        { num: 9, x: 840, y: 455 },
        { num: 10, x: 920, y: 455 },
        { num: 11, x: 1000, y: 455 },
        { num: 12, x: 1080, y: 455 },
      ];
      this.numkeys.forEach(numkey => {
        new CustomButton(this, numkey.x, numkey.y, 70, 70, 0x00ff00, `${numkey.num}`, () => {
          // numkeyボタンがクリックされた時の処理
          //anserSceneへ(ステージレベル、押された数字、正しい数字、一音目、二音目、数字キーの配列、鍵盤の配列、現在の問題番号、現在の得点)
          this.scene.start('st2_answer', { stageLevel: this.stageLevel, clickedNum: numkey.num, correctNum: this.correctNum, 
                                          fNote: this.fNote, sNote: this.sNote, numkeys: this.numkeys, keys: this.keys, 
                                          questionCount: this.questionCount, score: this.score });
        });
      });
      
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
      

      // 設定ボタンを追加
      this.settingsButton = this.add.image(60, 60, 'settings_button').setInteractive({ useHandCursor: true }).setScale(0.4);
      this.settingsButton.on('pointerdown', () => {
        //this.scene.stop('st2_question'); 
          this.scene.launch('SettingsPopup');
      });

      this.presentQuestion(this.stageLevel);
    }
  
    private presentQuestion(stageLevel: number) {
      const keys = this.keys;  
      let firstNoteIndex; //一音目のインデックス
      let secondNoteIndex; //二音目のインデックス
      let Length = 0; //一音目と二音目の差の最大値

      if(stageLevel === 1){ Length = 5;} //ステージレベル1のときの音の最大差は5
      if(stageLevel === 2){ Length = 9;} //ステージレベル2のときの音の最大差は9
      if(stageLevel === 3){ Length = 13;} //ステージレベル3のときの音の最大差は13

      do {
        //一音目のインデックスを (Length ~ 鍵盤の最大インデックス-Length) で生成 
        firstNoteIndex = Phaser.Math.RND.between(Length, keys.length - Length);

        //二音目のインデックスを一音目のインデックス + (-Length ~ Length)で生成
        secondNoteIndex = firstNoteIndex + Phaser.Math.RND.between(-Length, Length);
      } while (secondNoteIndex === firstNoteIndex); //一音目と二音目のインデックスが同じときもう一度この処理を行う

      //一音目と二音目を設定
      const firstNote = keys[firstNoteIndex];
      const secondNote = keys[secondNoteIndex];
      this.fNote = firstNote.note;
      this.sNote = secondNote.note;

      //正解の数字(二音の差)を設定
      this.correctNum = secondNote.keynum - firstNote.keynum;

      //一音目を再生
      this.sound.play(firstNote.note);
  
      this.time.delayedCall(1000, () => {
        //1000ms後、二音目を再生
        this.sound.play(secondNote.note);

        //リプレイボタンを有効にする
        this.enableReplayButton(firstNote.note, secondNote.note);
      });
    }

    private enableReplayButton(firstNote: string, secondNote: string) {
      // Playボタンを追加
    new CustomButton(this, 640, 200, 200, 50, 0x00ff00, 'Replay', () => {
      // Playボタンがクリックされた時の処理
      //一音目を鳴らす
      this.sound.play(firstNote);       
          this.time.delayedCall(1000, () => {
          //1000ms後、二音目を鳴らす
          this.sound.play(secondNote);  
          });
    });      
  }
}