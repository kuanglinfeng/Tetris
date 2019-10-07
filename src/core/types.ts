import { SquareGroup } from "./SquareGroup";

export interface Point {
  readonly x: number,
  readonly y: number
}

export interface IViewer {
  /**
   * 显示
   */
  show(): void,
  /**
   * 移除，不再显示
   */
  remove(): void
}

/**
 * 方块组合成的形状
 */
export type Shape = Point[]


export enum MoveDirection {
  left,
  right,
  down
}

export enum GameStatus {
  init,
  playing,
  pause,
  over
}

export interface GameViewer {
  /**
   * 
   * @param tetris 下一个方块对象
   */
  showNext(tetris: SquareGroup): void

  /**
   * 
   * @param tetris 切换的方块对象
   */
  switch(tetris: SquareGroup): void

}