import { Square } from "../Square";
import $ from "jquery"
import { IViewer } from "../types";
import PageConfig from "./PageConfig"


/**
 * 显示一个小方块到页面上
 */
export class SquarePageViewer implements IViewer {

  private dom?: JQuery<HTMLElement>
  // 是否已经移除过了
  private isRemove: boolean = false

  show(): void {
    if (this.isRemove) {
      return;
    }
    if (!this.dom) {
      this.dom = $('<div>').css({
        position: 'absolute',
        width: PageConfig.SquareSize.width,
        height: PageConfig.SquareSize.height,
        border: '1px solid #ccc',
        boxSizing: 'border-box'
      }).appendTo(this.container)
    }
    this.dom.css({
      left: this.squqre.point.x * PageConfig.SquareSize.width,
      top: this.squqre.point.y * PageConfig.SquareSize.height,
      background: this.squqre.color
    })
  }
  remove(): void {
    if (this.dom && !this.isRemove) {
      this.dom.remove()
      this.isRemove = true
    }
  }

  constructor(
    private squqre: Square,
    private container: JQuery<HTMLElement>
  ) {}

}