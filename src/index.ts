import { Square } from "./core/Square";
import { IViewer } from "./core/types";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup";
import { LSharp, createTetris } from "./core/Tetris";

const tetris = createTetris({x: 3, y: 2})

tetris.squares.forEach(square => {
   square.viewer = new SquarePageViewer(square, $('#root'))
})

// const sq = new Square()

// sq.viewer = new SquarePageViewer(sq, $('#root'))


// sq.color = 'red'

// sq.point = {
//   x:3,
//   y:0
// }

$('#btnDown').click(function () {
  // 更改中心点坐标
  tetris.centerPoint = {
    x: tetris.centerPoint.x,
    y: tetris.centerPoint.y + 1
  }

})

$('#btnUp').click(function () {
  // 更改中心点坐标
  tetris.centerPoint = {
    x: tetris.centerPoint.x,
    y: tetris.centerPoint.y - 1
  }

})

$('#btnLeft').click(function () {
  // 更改中心点坐标
  tetris.centerPoint = {
    x: tetris.centerPoint.x - 1,
    y: tetris.centerPoint.y
  }

})

$('#btnRight').click(function () {
  // 更改中心点坐标
  tetris.centerPoint = {
    x: tetris.centerPoint.x + 1,
    y: tetris.centerPoint.y
  }

})

// $('#btnRemove').click(function () {
//   sq.viewer && sq.viewer.remove()
// })

// $('#btnAdd').click(function () {
//   sq.viewer = new SquarePageViewer(sq, $('#root'))
// })