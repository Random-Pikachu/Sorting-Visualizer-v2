export const heapSort = array => {
    const animations = [];
    const n = array.length;
  
    //max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // Heap sort
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, i, 'compare']);
      animations.push([0, i, 'swap']);
      swap(array, 0, i);
      animations.push([0, i, 'restore']);
      heapify(array, i, 0, animations);
    }
  
    return animations;
  };
  
  const heapify = (array, n, i, animations) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      animations.push([i, largest, 'compare']);
      animations.push([i, largest, 'swap']);
      swap(array, i, largest);
      animations.push([i, largest, 'restore']);
      heapify(array, n, largest, animations);
    }
  };
  
  const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  