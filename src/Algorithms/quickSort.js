export const quickSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  };
  
  const quickSortHelper = (array, startIdx, endIdx, animations) => {
    if (startIdx >= endIdx) return;
    
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  };
  
  const partition = (array, startIdx, endIdx, animations) => {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
  
    for (let i = startIdx; i < endIdx; i++) {
      // Compare current element with pivot
      animations.push([i, endIdx, 'compare']);
  
      if (array[i] <= pivotValue) {
        // Swap elements
        animations.push([i, array[pivotIdx], 'swap']);
        animations.push([pivotIdx, array[i], 'swap']);
        swap(array, i, pivotIdx);
        pivotIdx++;
      }
  
      // Reset color after comparison
      animations.push([i, endIdx, 'restore']);
    }
  
    // Swap pivot element with element at pivotIdx
    animations.push([pivotIdx, endIdx, 'compare']);
    animations.push([pivotIdx, array[endIdx], 'swap']);
    animations.push([endIdx, array[pivotIdx], 'swap']);
    swap(array, pivotIdx, endIdx);
  
    return pivotIdx;
  };
  
  const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };  