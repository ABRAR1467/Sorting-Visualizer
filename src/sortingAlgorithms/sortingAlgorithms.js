export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
export function getBubbleSortAnimations(array) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push(["compare", j, j + 1]);
      animations.push(["compare", j, j + 1]);
      if (array[j] > array[j + 1]) {
        animations.push(["swap", j, array[j + 1]]);
        animations.push(["swap", j + 1, array[j]]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return animations;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  buildMaxHeap(array, animations);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    animations.push(["swap", 0, endIdx]); // Push indices, not values
    [array[0], array[endIdx]] = [array[endIdx], array[0]];
    siftDown(array, 0, endIdx - 1, animations);
  }
  return animations;
}


function buildMaxHeap(array, animations) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(array, currentIdx, array.length - 1, animations);
  }
}

function siftDown(array, currentIdx, endIdx, animations) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = childOneIdx + 1 <= endIdx ? childOneIdx + 1 : -1;
    let idxToSwap = childOneIdx;
    if (childTwoIdx !== -1 && array[childTwoIdx] > array[childOneIdx]) {
      idxToSwap = childTwoIdx;
    }
    if (array[idxToSwap] > array[currentIdx]) {
      animations.push(["compare", currentIdx, idxToSwap]); // Compare indices
      animations.push(["compare", currentIdx, idxToSwap]); // Revert comparison
      animations.push(["swap", currentIdx, idxToSwap]);   // Swap indices
      [array[currentIdx], array[idxToSwap]] = [array[idxToSwap], array[currentIdx]];
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push(["compare", i, endIdx]);
    animations.push(["compare", i, endIdx]);
    if (array[i] <= pivotValue) {
      animations.push(["swap", i, array[pivotIdx]]);
      animations.push(["swap", pivotIdx, array[i]]);
      [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
      pivotIdx++;
    }
  }
  animations.push(["swap", pivotIdx, array[endIdx]]);
  [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
  return pivotIdx;
}

export function getInsertionSortAnimations(array) {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      animations.push(["compare", j, j - 1]);
      animations.push(["compare", j, j - 1]);
      [array[j], array[j - 1]] = [array[j - 1], array[j]];
      animations.push(["swap", j, array[j]]);
      animations.push(["swap", j - 1, array[j - 1]]);
      j--;
    }
  }
  return animations;
}

export function getSelectionSortAnimations(array) {
  const animations = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      animations.push(["compare", minIdx, j]);
      animations.push(["compare", minIdx, j]);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push(["swap", i, array[minIdx]]);
      animations.push(["swap", minIdx, array[i]]);
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }
  }
  return animations;
}




