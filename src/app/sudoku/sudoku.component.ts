import { Component, OnInit } from '@angular/core';
import { SudokuCell } from '../models/sudoku.interface';
import { SudokuService } from '../services/sudoku.service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {
  grid: SudokuCell[][] = [];
  selectedNumber: number | null = null;
  selectedRow: number | null = null;
  selectedCol: number | null = null;
  timer: number = 0;
  isPuzzleComplete: boolean = false;

  constructor(private sudokuService: SudokuService) { }

  ngOnInit(): void {
    this.grid = this.sudokuService.getInitialGrid();
    setInterval(() => this.timer++, 1000);
  }

  // Handle number selection from the panel
  selectNumber(num: number) {
    this.selectedNumber = num;
  }

  // Clear selected number or cell
  clearSelection() {
    this.selectedNumber = null;
    if (this.selectedRow !== null && this.selectedCol !== null) {
      const cell = this.grid[this.selectedRow][this.selectedCol];
      if (!cell.isStatic) {
        cell.value = null;
        cell.isValid = true;
      }
    }
  }

  // Handle cell click
  onCellClick(row: number, col: number) {
    this.selectedRow = row;
    this.selectedCol = col;

    const cell = this.grid[row][col];
    if (!cell.isStatic && this.selectedNumber !== null) {
      if (this.sudokuService.isMoveValid(this.grid, row, col, this.selectedNumber)) {
        cell.value = this.selectedNumber;
        cell.isValid = true;
      } else {
        cell.isValid = false;
      }
      this.checkCompletion();
    }
  }

  // Check if a cell is selected
  isSelectedCell(row: number, col: number): boolean {
    return this.selectedRow === row && this.selectedCol === col;
  }

  // Check if the puzzle is complete
  checkCompletion() {
    this.isPuzzleComplete = this.sudokuService.isPuzzleComplete(this.grid);
    if (this.isPuzzleComplete) {
      alert('Congratulations, you have completed the puzzle!');
    }
  }

  // Timer formatting
  get formattedTime(): string {
    const minutes = Math.floor(this.timer / 60).toString().padStart(2, '0');
    const seconds = (this.timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
