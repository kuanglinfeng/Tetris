import { Square } from "./Square";
import { Shape, Point } from "./types";

/**
 * 组合方块
 */
export abstract class SquareGroup {

  private _squares: readonly Square[]

  constructor(
    private _shape: Shape, 
    private _centerPoint: Point, 
    private _color: string) {
      // 设置小方块的数组
      const arr: Square[] = []
      this._shape.forEach(point => {
        const sq = new Square()
        sq.color = this._color
        arr.push(sq)
      })
      this._squares = arr
      this.setSquarePoints()
  }

  
  public get squares() {
    return this._squares
  }

  public get shape() {
    return this._shape
  }
  
  public get centerPoint() {
    return this._centerPoint
  }

  
  public set centerPoint(v : Point) {
    this._centerPoint = v;
    // 同时设置所有小方块的坐标
    this.setSquarePoints()
  }

  /**
   * 根据中心点坐标以及形状设置一个小方块的坐标
   */
  public setSquarePoints() {
    this._shape.forEach((point, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + point.x,
        y: this._centerPoint.y + point.y
      }
    })
  }

  // 旋转方向是否为顺时针
  protected isClock = true
  
  /**
   * 计算旋转之后的形状
   */
  public afterRotateShape(): Shape {
    if (this.isClock) {
      return this._shape.map(point => {
        const newPoint: Point = {
          x: -point.y, 
          y: point.x
        }
        return newPoint
      })
    } else {
      return this._shape.map(point => {
        const newPoint: Point = {
          x: point.y,
          y: -point.x
        }
        return newPoint
      })
    }
  }

  /**
   * 得到旋转之后的形状
   */
  public rotate() {
    const newShape = this.afterRotateShape()
    this._shape = newShape
    this.setSquarePoints()
  }

}