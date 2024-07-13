export interface PianoKey {
    note: string;     // 音符の名前（例: 'C0', 'C#0'）
    x: number;        // X座標
    isBlack: boolean; // 黒鍵かどうかのフラグ
    image?: Phaser.GameObjects.Rectangle; // イメージオブジェクト
    color?: number;   // 色
    originalColor?: number; //変更した色を保存する用
  }
  