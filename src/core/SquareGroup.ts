import { Square } from "./Square";
import { Shape, Point } from "./types";

/**
 * 组合方块
 */
export class SquareGroup {

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
        sq.point = {
          x: this._centerPoint.x + point.x,
          y: this._centerPoint.y + point.y
        }
        arr.push(sq)
      })
      this._squares = arr
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
    this._shape.forEach((point, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + point.x,
        y: this._centerPoint.y + point.y
      }
    })

  }
  
  
  



}