import { GameStatus, MoveDirection, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import GameConfig from "./GameConfig";
import { Square } from "./Square";

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init
  // 当前玩家操作的方块
  private _curTetris?: SquareGroup
  // 下一个方块
  private _nextTetris: SquareGroup = createTetris({x: 0, y: 0})
  // 计时器
  private _timer?: number 
  // 自动下落的间隔时间
  private _duration: number = 1000
  // 保存已经落下的方块
  private _exists: Square[] = []

  constructor(private _viewer: GameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
    this._viewer.showNext(this._nextTetris)

  }

  /**
   * 游戏开始
   */
  start() {
    // 游戏状态改变
    if (this._gameStatus === GameStatus.playing) {
      return;
    }
    this._gameStatus = GameStatus.playing
    if (!this._curTetris) {
      // 给当前玩家操作的方块赋值
      this.switchTetris()
    }
    this.autoDrop()

  }


  /**
   * 游戏暂停
   */
  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause
      clearInterval(this._timer)
      this._timer = undefined
    }
  }

  controlLeft() {
    if(this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._curTetris, MoveDirection.left, this._exists)
    }
  }

  controlRight() {
    if(this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.move(this._curTetris, MoveDirection.right, this._exists)
    }
  }

  controlDown() {
    if(this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.moveDirectly(this._curTetris, MoveDirection.down, this._exists)
      // 触底
      this.hitBottom()
    }
  }

  controlRotate() {
    if(this._curTetris && this._gameStatus === GameStatus.playing) {
      TetrisRule.rotate (this._curTetris, this._exists)
    }
  }




  /**
   * 当前方块自由下落
   */
  private autoDrop() {
    if (this._timer || this._gameStatus !== GameStatus.playing) {
      return;
    }
    this._timer = setInterval(() => {
      if (this._curTetris) {
        if(!TetrisRule.move(this._curTetris, MoveDirection.down, this._exists)) {
          // 触底
          this.hitBottom()
        }
      }
    }, this._duration)
  }

  /**
   * 切换方块
   */
  private switchTetris() {
    this._curTetris = this._nextTetris
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris)
    this._nextTetris = createTetris({x: 0, y: 0})
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris)
    this._viewer.switch(this._curTetris)
    this._viewer.showNext(this._nextTetris)
  }

  /**
   * 设置中心点坐标 让该方块出现在区域的中上方
   * @param width 
   * @param tetris 
   */
  private resetCenterPoint(width:number, tetris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1
    const y = 0
    tetris.centerPoint = {x, y}
    while (tetris.squares.some(item => item.point.y < 0)) {
      tetris.squares.forEach(sq => sq.point = {
        x: sq.point.x,
        y: sq.point.y + 1
      })
    }

  }

  /**
   * 触底之后的操作
   */
  private hitBottom() {
    // 将当前的俄罗斯方块包含的小方块加入到exists数组中
    this._exists.push(...this._curTetris!.squares)

    // 处理移除
    const num = TetrisRule.deleteSquares(this._exists)
    console.log(num)
    // 切换方块
    this.switchTetris()

  }

}