import { Sharp, Point } from "./types";
import { getRandom } from "./util";
import { SquareGroup } from "./SquareGroup";


export const TSharp: Sharp = [
  {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}
]

export const LSharp: Sharp = [
  {x: -2, y: 0}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}
]

export const LMirrorSharp: Sharp = [
  {x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}, {x: 0, y: -1}
]

export const SSharp: Sharp = [
  {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 1}
]

export const SMirrorSharp: Sharp = [
  {x: 0, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}
]

export const SquareSharp: Sharp = [
  {x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}
]

export const LineSharp: Sharp = [
  {x: -1, y: 0}, {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}
]

export const sharps = [
  TSharp,
  LSharp,
  LMirrorSharp,
  SSharp,
  SMirrorSharp,
  SquareSharp,
  LineSharp
]

export const colors = [
  'red',
  '#fff',
  'green',
  'blue',
  'orange'
]

/**
 * 随机产生一个俄罗斯方块 （颜色随机，形状随机）
 * @param centerPoint 
 */
export function createTetris(centerPoint: Point) {
  let index = getRandom(0, sharps.length)
  const sharp = sharps[index]
  index = getRandom(0, colors.length)
  const color = colors[index]
  return new SquareGroup(sharp, centerPoint, color)
}