import { Square } from "./Square";
import { Sharp, Point } from "./types";

/**
 * 组合方块
 */
export class SquareGroup {

  private _squares: readonly Square[]

  constructor(
    private _sharp: Sharp, 
    private _centerPoint: Point, 
    private _color: string) {
      // 设置小方块的数组
      const arr: Square[] = []
      this._sharp.forEach(point => {
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

  
  public get centerPoint() {
    return this._centerPoint
  }

  
  public set centerPoint(v : Point) {
    this._centerPoint = v;
    // 同时设置所有小方块的坐标
    this._sharp.forEach((point, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + point.x,
        y: this._centerPoint.y + point.y
      }
    })

  }
  
  
  



}