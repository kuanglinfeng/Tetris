import { Shape, Point, MoveDirection } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";


function isPoint(obj:any):obj is Point {
  if (typeof obj.x === 'undefined') {
    return false
  }
  return true
}

/**
 * 该类中提供一系列函数，根据游戏规则判断各种情况
 */
export class TetrisRule {

  /**
   * 判断某个形状的方块 是否能移动到目标位置
   * @param 
   */
  static canIMove(shape: Shape, targetPoint: Point): boolean {

    // 假设，中心点（0，0）已经移动到了目标位置（a, b），算出每个小方块的坐标
    const targetSquarePoints: Point[] = shape.map(item => {
      return {
        x: item.x + targetPoint.x,
        y: item.y + targetPoint.y
      }
    })

    // 边界判断
    const judge = targetSquarePoints.some(point => {
      // 是否超出边界
      return (point.x < 0 || point.x > GameConfig.panelSize.width - 1 
        || point.y < 0 || point.y > GameConfig.panelSize.height - 1)
    })

    if (judge)  return false

    return true
  }

  // 对move方法进行重载声明
  static move(tetris: SquareGroup, point: Point): boolean
  static move(tetris: SquareGroup, direction: MoveDirection): boolean

  static move(tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection):boolean {
    if (isPoint(targetPointOrDirection)) {
      if (TetrisRule.canIMove(tetris.shape, targetPointOrDirection)) {
        tetris.centerPoint = targetPointOrDirection
        return true
      }
      return false
    } else {
      const direction = targetPointOrDirection
      let targetPoint: Point
      if (direction === MoveDirection.down) {
        targetPoint = {
          x: tetris.centerPoint.x,
          y: tetris.centerPoint.y + 1
        }
      } else if(direction === MoveDirection.left) {
        targetPoint = {
          x: tetris.centerPoint.x - 1,
          y: tetris.centerPoint.y
        }
      } else {
        targetPoint = {
          x: tetris.centerPoint.x + 1,
          y: tetris.centerPoint.y
        }
      }
      return TetrisRule.move(tetris, targetPoint)      
    }

  }

  /**
   * 将当前方块移动到目标方向的终点
   * @param tetris 
   * @param direction 
   */
  static moveDirectly(tetris: SquareGroup, direction: MoveDirection): void {
    while (TetrisRule.move(tetris, direction)) {}
  }


}