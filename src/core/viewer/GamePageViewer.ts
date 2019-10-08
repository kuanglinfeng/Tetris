import { GameViewer, GameStatus } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer {

  onGamePause(): void { 
    this._msgDom.css({
      display: 'flex'
    })
    this._msgDom.find('p').html('游戏暂停')
  }
  onGameStart(): void {
    this._msgDom.hide()
  }
  onGameOver(): void {
    this._msgDom.css({
      display: 'flex'
    }) 
    this._msgDom.find('p').html('游戏结束')
  }

  private _nextDom = $('#next')
  private _panelDom = $('#panel')
  private _scoreDom = $('#score')
  private _msgDom = $('#msg')

  showScore(score: number): void {
    this._scoreDom.html(score.toString())
  }

  init(game: Game): void {
    // 1. 设置宽高
    this._panelDom.css({
      width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
      height: GameConfig.panelSize.height * PageConfig.SquareSize.height
    })
    this._nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
      height: GameConfig.nextSize.height * PageConfig.SquareSize.height
    })

    // 2. 注册键盘事件
    $(document).keydown((e) => {
      const keyCode = e.keyCode

      if (keyCode === 37) {
        game.controlLeft()
      } else if (keyCode === 38) {
        game.controlRotate()
      } else if (keyCode === 39) {
        game.controlRight()
      } else if (keyCode === 40) {
        game.controlDown()
      } else if (keyCode === 32) {
        if (game.gameStatus === GameStatus.playing) {
          game.pause()
        } else {
          game.start()
        }
      }
    })

  }

  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, this._nextDom)
    })
  }  
  
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer!.remove()
      sq.viewer = new SquarePageViewer(sq, this._panelDom)
    })
  }

  
}