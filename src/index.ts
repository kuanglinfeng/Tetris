import { Square } from "./core/Square";
import { IViewer, MoveDirection } from "./core/types";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { SquareGroup } from "./core/SquareGroup";
import { LShape, createTetris } from "./core/Tetris";
import { TetrisRule } from "./core/TetrisRule";

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

  // TetrisRule.move(tetris, {x: tetris.centerPoint.x, y: tetris.centerPoint.y + 1})
  // TetrisRule.move(tetris, MoveDirection.down)
  TetrisRule.move(tetris, MoveDirection.down)

})

$('#btnUp').click(function () {
  // 更改中心点坐标


})

$('#btnLeft').click(function () {
  // 更改中心点坐标
  TetrisRule.move(tetris, MoveDirection.left)

})

$('#btnRight').click(function () {
  // 更改中心点坐标
  TetrisRule.move(tetris, MoveDirection.right)

})

// $('#btnRemove').click(function () {
//   sq.viewer && sq.viewer.remove()
// })

// $('#btnAdd').click(function () {
//   sq.viewer = new SquarePageViewer(sq, $('#root'))
// })

$('#rotate').click(function () {
  // const newShape = tetris.rotate()
  TetrisRule.rotate(tetris)
}) 