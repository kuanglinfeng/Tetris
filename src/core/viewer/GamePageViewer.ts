import { GameViewer } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'

export class GamePageViewer implements GameViewer {

  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, $('#next'))
    })
  }  
  
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer!.remove()
      sq.viewer = new SquarePageViewer(sq, $('#panel'))
    })
  }

  
}