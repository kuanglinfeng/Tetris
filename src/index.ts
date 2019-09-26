import { Square } from "./core/Square";
import { IViewer } from "./core/types";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"

const sq = new Square()

sq.viewer = new SquarePageViewer(sq, $('#root'))


sq.color = 'red'

sq.point = {
  x:3,
  y:0
}

$('#btnDown').click(function () {
  sq.point = {
    x: sq.point.x,
    y: sq.point.y + 1
  }
})

$('#btnRemove').click(function () {
  sq.viewer && sq.viewer.remove()
})

$('#btnAdd').click(function () {
  sq.viewer = new SquarePageViewer(sq, $('#root'))
})