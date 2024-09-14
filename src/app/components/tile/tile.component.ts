import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../../services/game-logic.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
})
export class TileComponent implements OnInit {
  @Input() id!: any;
  hasMine!: boolean;
  number!: number;
  hasFlag!: boolean;
  isSwept!: boolean;
  stopped!: boolean;
  hasWon!: boolean;

  get numberColor() {
    switch(this.number) {
      case 1:
        return '#FBAE77';
      case 2:
        return '#96DEFE';
      case 3:
        return '#E86746';
      case 4:
        return '#242424';
      case 5:
        return '#E86746';
      case 6:
        return '#96DEFE';
      case 7:
        return '#FBAE77';
      case 8:
        return '#242424'
      default:
        return 'white';
    }
  }

  get gameLogicTile() {
    return this.gameLogicService.tileWithID(this.id);
  }
  get hasMineSubject() {
    return this.gameLogicTile.hasMine;
  }
  get numberSubject() {
    return this.gameLogicTile.number;
  }
  get hasFlagSubject() {
    return this.gameLogicTile.hasFlag;
  }
  get isSweptSubject() {
    return this.gameLogicTile.isSwept;
  }

  constructor(private gameLogicService: GameLogicService) {}

  ngOnInit(): void {
    this.hasMineSubject.subscribe((value: boolean)=>{
      this.hasMine = value;
    });
    this.numberSubject.subscribe((value: number)=>{
      this.number = value;
    });
    this.hasFlagSubject.subscribe((value: boolean)=>{
      this.hasFlag = value;
    });
    this.isSweptSubject.subscribe((value: boolean)=>{
      this.isSwept = value;
    });
    this.gameLogicService.stopped$.subscribe((value: boolean)=>{
      this.stopped = value;
    });
    this.gameLogicService.hasWon$.subscribe((value: boolean)=>{
      this.hasWon = value;
    });
  }

  handleClick() {
    this.gameLogicService.clickTile(this.id);
  }
  
  handleContextMenu(event: any) {
    event.preventDefault();
    this.gameLogicService.flagTile(this.id);
  }
  
}
