import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getHeapSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getInsertionSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getSelectionSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 280;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }
  /*Merge Sort
  Best Case: O(nlogn)
  Worst Case: O(nlogn)*/
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  /*Quick Sort
   Best Case: O(nlogn)
   Worst Case: O(n^2)*/
  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][0] === "compare";
      if (isColorChange) {
        const [_, barOneIdx, barTwoIdx] = animations[i];
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [_, barOneIdx, newHeight] = animations[i];
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  /*Heap Sort
  Best Case: O(nlogn)
  Worst Case: O(nlogn)*/
  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][0] === "compare";
      if (isColorChange) {
        const [_, barOneIdx, barTwoIdx] = animations[i];
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [_, barOneIdx, barTwoIdx] = animations[i];
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  /*Bubble Sort
   Best Case: O(n)
   Worst Case: O(n^2)*/
  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][0] === "compare";
      if (isColorChange) {
        const [_, barOneIdx, barTwoIdx] = animations[i];
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [_, barOneIdx, newHeight] = animations[i];
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  /*Insertion Sort
  Best Case: O(n)
  Worst Case: O(n^2)*/

  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][0] === "compare";
      if (isColorChange) {
        const [_, barOneIdx, barTwoIdx] = animations[i];
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [_, barIdx, newHeight] = animations[i];
        setTimeout(() => {
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  /*Selection Sort
  Best Case: O(n^2)
  Worst Case: O(n^2)*/

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][0] === "compare";
      if (isColorChange) {
        const [_, barOneIdx, barTwoIdx] = animations[i];
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        const [_, barIdx, newHeight] = animations[i];
        setTimeout(() => {
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
