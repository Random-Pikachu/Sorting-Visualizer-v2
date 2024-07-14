import React from 'react';
import './SortingVisualizer.css';
import { mergeSort } from '../Algorithms/mergeSort';
import { quickSort } from '../Algorithms/quickSort';
import { heapSort } from '../Algorithms/heapSort';
import { bubbleSort } from '../Algorithms/bubbleSort';

const NUMBER_OF_ARRAY_BARS = 195;
const ANIMATION_SPEED = 5; // in milliseconds

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      currentTimeouts: [],
    };
    this.resetArray = this.resetArray.bind(this);
    this.clearTimeouts = this.clearTimeouts.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.quickSort = this.quickSort.bind(this);
    this.heapSort = this.heapSort.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
  }

  componentDidMount() {
    this.resetArray();
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  resetArray() {
    this.clearTimeouts();

    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 650));
    }

    this.setState({ array }, () => {
      const arrayBars = document.getElementsByClassName('array-bar');
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = 'pink';
      }
    });
  }

  clearTimeouts() {
    const { currentTimeouts } = this.state;
    currentTimeouts.forEach(timeout => {
      clearTimeout(timeout);
    });
    this.setState({ currentTimeouts: [] });
  }


  //Merge Sort

  mergeSort() {
    this.clearTimeouts();

    const animations = mergeSort(this.state.array.slice());
    const timeouts = [];
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        if (!barOneStyle || !barTwoStyle) continue;
        const color = i % 3 === 0 ? 'rgb(252, 186, 3)' : 'pink';
        timeouts.push(setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED));
      }
      
      
      else {
        const [barOneIdx, newHeight] = animations[i];
        if (barOneIdx >= arrayBars.length) continue;
        const barOneStyle = arrayBars[barOneIdx].style;
        if (!barOneStyle) continue;
        timeouts.push(setTimeout(() => {
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED));
      }
    }
    this.setState({ currentTimeouts: timeouts });
  }


//Quick Sort

// it is giving error without using question marks befor .style i currently don't know why but it works that matters
  quickSort() {
    this.clearTimeouts();
    const animations = quickSort(this.state.array.slice());
    const timeouts = [];

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, action] = animations[i];

      if (action === 'compare') {
        const color = isColorChange ? 'rgb(252, 186, 3)' : 'pink';
        timeouts.push(setTimeout(() => {
          console.log('Comparing bars:', barOneIdx, barTwoIdx);
          const barOneStyle = arrayBars[barOneIdx]?.style;
          const barTwoStyle = arrayBars[barTwoIdx]?.style;
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED));
      } 
      
      else if (action === 'swap') {
        timeouts.push(setTimeout(() => {
          console.log('Swapping bars:', barOneIdx, barTwoIdx);
          const barOneStyle = arrayBars[barOneIdx]?.style;
          const barTwoStyle = arrayBars[barTwoIdx]?.style;
          if (barOneStyle) barOneStyle.height = `${barTwoIdx}px`;
          if (barTwoStyle) barTwoStyle.height = `${barOneIdx}px`;
        }, i * ANIMATION_SPEED));
      } 
      
      else if (action === 'restore') {
        timeouts.push(setTimeout(() => {
          console.log('Restoring bars:', barOneIdx, barTwoIdx);
          const barOneStyle = arrayBars[barOneIdx]?.style;
          const barTwoStyle = arrayBars[barTwoIdx]?.style;
          if (barOneStyle) barOneStyle.backgroundColor = 'pink';
          if (barTwoStyle) barTwoStyle.backgroundColor = 'pink';
        }, i * ANIMATION_SPEED));
      }
    }

    this.setState({ currentTimeouts: timeouts });
  }




//Bubble Sort -->Poora ek Din lag gaya errors theek karte karte aur logic samjhte samjhte

  bubbleSort() {
    this.clearTimeouts();
    const timeouts = [];
    const animations = bubbleSort(this.state.array.slice());

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, type] = animations[i];

      if (type === 'compare') {
        const color = isColorChange ? 'rgb(252, 186, 3)' : 'pink';
        timeouts.push(setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED));
      } 
      
      else if (type === 'restore') {
        timeouts.push(setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          if (barOneStyle) barOneStyle.backgroundColor = 'pink';
          if (barTwoStyle) barTwoStyle.backgroundColor = 'pink';
        }, i * ANIMATION_SPEED));
      } 
      
      else if (type === 'swap') {
        timeouts.push(setTimeout(() => {
          const barStyle = arrayBars[barOneIdx].style;
          barStyle.height = `${barTwoIdx}px`;
        }, i * ANIMATION_SPEED));
      }
    }

    this.setState({ currentTimeouts: timeouts });
  }


  

//Heap Sort

  heapSort() {
    this.clearTimeouts();
    const animations = heapSort(this.state.array.slice());
    const timeouts = [];
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const [barOneIdx, barTwoIdx, type] = animations[i];

      if (type === 'compare') {
        const color = i % 3 !== 2 ? 'rgb(255, 38, 82)' : 'pink';
        timeouts.push(setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          if (barOneStyle) barOneStyle.backgroundColor = color;
          if (barTwoStyle) barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED));
      } 
      
      
      else if (type === 'swap') {
        timeouts.push(setTimeout(() => {
          const tempHeight = this.state.array[barOneIdx];
          this.state.array[barOneIdx] = this.state.array[barTwoIdx];
          this.state.array[barTwoIdx] = tempHeight;

          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          if (barOneStyle) barOneStyle.height = `${this.state.array[barOneIdx]}px`;
          if (barTwoStyle) barTwoStyle.height = `${this.state.array[barTwoIdx]}px`;
        }, i * ANIMATION_SPEED));
      } 
      
      
      else if (type === 'restore') {
        timeouts.push(setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          if (barOneStyle) barOneStyle.backgroundColor = 'pink';
          if (barTwoStyle) barTwoStyle.backgroundColor = 'pink';
        }, i * ANIMATION_SPEED));
      }
    }

    this.setState({ currentTimeouts: timeouts });
  }


  render() {
    const { array } = this.state;
  
    return (
      <div>
        <div className="title-container">
          <h1>Sorting-Visualizer</h1>
        </div>
        <div className="main-container">
          <div className="array-container">
            {array.map((value, idx) => (
              <div
                className="array-bar"
                key={idx}
                style={{ height: `${value}px` }}
              ></div>
            ))}
          </div>
          <div className="button-container">
            <button onClick={this.resetArray} id="New-array">Generate New Array</button>
            <button onClick={this.mergeSort} id="merge-sort">Merge Sort</button>
            <button onClick={this.quickSort} id="quick-sort">Quick Sort</button>
            <button onClick={this.heapSort} id="heap-sort">Heap Sort</button>
            <button onClick={this.bubbleSort} id="bubble-sort">Bubble Sort</button>
          </div>
        </div>
      </div>
    );
  }  
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
