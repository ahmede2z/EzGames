import { Injectable } from '@angular/core';
import { SudokuCell } from '../models/sudoku.interface';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  constructor() { }

  // Method to return the initial Sudoku grid
  getInitialGrid(): SudokuCell[][] {
    const puzzle: (number | null)[][] = [
      [5, 3, null, null, 7, null, null, null, null],
      [6, null, null, 1, 9, 5, null, null, null],
      [null, 9, 8, null, null, null, null, 6, null],
      [8, null, null, null, 6, null, null, null, 3],
      [4, null, null, 8, null, 3, null, null, 1],
      [7, null, null, null, 2, null, null, null, 6],
      [null, 6, null, null, null, null, 2, 8, null],
      [null, null, null, 4, 1, 9, null, null, 5],
      [null, null, null, null, 8, null, null, 7, 9]
    ];

    return puzzle.map(row =>
      row.map(value => ({
        value,
        isStatic: value !== null,
        isValid: true
      }))
    );
  }

  // Validate if the number can be placed in a given cell
  isMoveValid(grid: SudokuCell[][], row: number, col: number, num: number): boolean {
    // Check the row
    for (let i = 0; i < 9; i++) {
      if (grid[row][i].value === num) return false;
    }

    // Check the column
    for (let i = 0; i < 9; i++) {
      if (grid[i][col].value === num) return false;
    }

    // Check the 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j].value === num) return false;
      }
    }

    return true;
  }

  // Check if the Sudoku puzzle is fully solved
  isPuzzleComplete(grid: SudokuCell[][]): boolean {
    return grid.every(row =>
      row.every(cell => cell.value !== null && cell.isValid)
    );
  }
}
