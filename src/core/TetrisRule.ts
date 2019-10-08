import { Shape, Point, MoveDirection } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";


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
  static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {

    // 假设，中心点（0，0）已经移动到了目标位置（a, b），算出每个小方块的坐标
    const targetSquarePoints: Point[] = shape.map(item => {
      return {
        x: item.x + targetPoint.x,
        y: item.y + targetPoint.y
      }
    })

    // 边界判断
    let judge = targetSquarePoints.some(point => {
      // 是否超出边界
      return (point.x < 0 || point.x > GameConfig.panelSize.width - 1 
        || point.y < 0 || point.y > GameConfig.panelSize.height - 1)
    })

    if (judge)  return false

    // 判断是否与已有的方块有重叠
    judge = targetSquarePoints.some(point => 
      exists.some(item => item.point.x === point.x && item.point.y === point.y)
    )
    
    if (judge)  return false

    return true
  }

  // 对move方法进行重载声明
  static move(tetris: SquareGroup, point: Point, exists: Square[]): boolean
  static move(tetris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean

  static move(tetris: SquareGroup, targetPointOrDirection: Point | MoveDirection, exists: Square[]):boolean {
    if (isPoint(targetPointOrDirection)) {
      if (TetrisRule.canIMove(tetris.shape, targetPointOrDirection, exists)) {
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
      return TetrisRule.move(tetris, targetPoint, exists)      
    }

  }

  /**
   * 将当前方块移动到目标方向的终点
   * @param tetris 
   * @param direction 
   */
  static moveDirectly(tetris: SquareGroup, direction: MoveDirection, exists: Square[]): void {
    while (TetrisRule.move(tetris, direction, exists)) {}
  }


  static rotate(tetris: SquareGroup, exists: Square[]): boolean {
    // 得到旋转后新的形状
    const newShape = tetris.afterRotateShape()
    if (this.canIMove(newShape, tetris.centerPoint, exists)) {
      tetris.rotate()
      return true
    } else {
      return false
    }
  }


  /**
   * 从已存在的方块中进行消除 并返回消除的行数
   * @param exists 
   */
  static deleteSquares(exists: Square[]): number {
    // 1. 获取y坐标数组
    const ys = exists.map(sq => sq.point.y)

    // 2. 获取最大最小的y坐标
    const maxY = Math.max(...ys)
    const minY = Math.min(...ys)

    // 3. 循环判断每一行是否可消除
    let lineSum = 0
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(exists, y)) {
        lineSum++
      }
    }
    return lineSum
  }

  /**
   * 消除一行
   * @param exists 
   * @param y 
   */
  private static deleteLine(exists: Square[], y: number): boolean {    
    const squares = exists.filter(sq => sq.point.y === y)
    if (squares.length === GameConfig.panelSize.width) {
      // 这一行可以消除
      squares.forEach(sq => {
        // 1. 从界面中移除视觉上的方块
        if (sq.viewer) {
          sq.viewer.remove()
        }
        // 2. 从数组中消除逻辑上的方块
        const index = exists.indexOf(sq)
        exists.splice(index, 1)
      })
       // 3. 剩下的，y坐标比当前y坐标小的方块，y+1
      exists.filter(sq => sq.point.y < y).forEach(sq => {
      sq.point = {
          x: sq.point.x,
          y: sq.point.y + 1
        }
      })

      return true
    }
    return false
  }



}