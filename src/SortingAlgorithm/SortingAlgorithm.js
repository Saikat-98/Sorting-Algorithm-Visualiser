import React from 'react';
import { Button, Paper, Slider, Typography, withStyles } from '@material-ui/core'
import { getMergeSortAnimations, getBubbleSortAnimations, getQuickSortAnimations, getInsertionSortAnimations, getSelectionSortAnimations } from './Algorithms.js';
import './SortingAlgorithm.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = Math.floor( ( window.innerWidth - 200 ) / 4 );
// const NUMBER_OF_ARRAY_BARS = 4;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#cb901b';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const COMPLETED_COLOR = '#10e43e';

const FURNISHED_COLOR = '#52e5df';

const styles = theme => ( {

} )

class SortingVisualizer extends React.Component {
  constructor ( props ) {
    super( props );
    this.flag = false;
    this.state = {
      array: [],
      sliderValue: NUMBER_OF_ARRAY_BARS,
    };
  }

  componentDidMount () {
    this.resetArray();
  }

  componentDidUpdate () {
    if ( !this.flag )
    {
      const arrayBars = document.getElementsByClassName( 'array-bar' );
      for ( let i = 0; i < this.state.sliderValue; i++ )
        arrayBars[ i ].style.backgroundColor = PRIMARY_COLOR
    }
  }

  resetArray () {
    const array = [];
    for ( let i = 0; i < this.state.sliderValue; i++ )
      array.push( randomIntFromInterval( 100, 500 ) );

    this.setState( { array }, () => this.flag = false );
  }

  mergeSort () {
    const animations = getMergeSortAnimations( this.state.array );
    let is_barTwo_completed = false;
    let is_barOne_completed = false;
    for ( let i = 0; i < animations.length; i++ )
    {
      const arrayBars = document.getElementsByClassName( 'array-bar' );
      // const isColorChange = i % 3 !== 2;
      if ( animations[ i ][ 2 ] === 'index' )
      {
        const [ barOneIdx, barTwoIdx ] = animations[ i ];
        const barOneStyle = arrayBars[ barOneIdx ].style;
        const barTwoStyle = arrayBars[ barTwoIdx ].style;
        const color = animations[ i + 1 ][ 2 ] === 'index' ? SECONDARY_COLOR : PRIMARY_COLOR;
        // eslint-disable-next-line no-loop-func
        setTimeout( () => {
          if ( is_barOne_completed || barOneStyle.backgroundColor === 'rgb(16, 228, 62)' )
          {
            is_barOne_completed = true;

            if ( color === 'red' )
              barOneStyle.backgroundColor = color;
            if ( color === '#cb901b' )
            {
              is_barOne_completed = false;
              barOneStyle.backgroundColor = COMPLETED_COLOR;
            }
          }
          else if ( is_barTwo_completed || barTwoStyle.backgroundColor === 'rgb(16, 228, 62)' )
          {
            is_barTwo_completed = true;
            if ( color === 'red' )
              barTwoStyle.backgroundColor = color;
            if ( color === '#cb901b' )
            {
              barTwoStyle.backgroundColor = COMPLETED_COLOR;
              is_barTwo_completed = false;
            }
          }
          else
          {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }

        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 2 ] === 'height' )
      {
        setTimeout( () => {
          const [ barOneIdx, newHeight ] = animations[ i ];
          const barOneStyle = arrayBars[ barOneIdx ].style;
          barOneStyle.height = `${ newHeight }px`;
          // this.flag = true;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'completed' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = COMPLETED_COLOR;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'furnished' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = FURNISHED_COLOR;
        }, i * ANIMATION_SPEED_MS + 500 );
      }
    }
  }

  quickSort () {
    const animations = getQuickSortAnimations( this.state.array );
    for ( let i = 0; i < animations.length; i++ )
    {
      const arrayBars = document.getElementsByClassName( 'array-bar' );
      if ( animations[ i ][ 2 ] === 'index' )
      {
        const [ barOneIdx, barTwoIdx ] = animations[ i ];
        const barOneStyle = arrayBars[ barOneIdx ].style;
        const barTwoStyle = arrayBars[ barTwoIdx ].style;
        const color = animations[ i + 1 ][ 2 ] === 'index' ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout( () => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 2 ] === 'height' )
      {
        setTimeout( () => {
          const [ barOneIdx, newHeight ] = animations[ i ];
          const barOneStyle = arrayBars[ barOneIdx ].style;
          barOneStyle.height = `${ newHeight }px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'completed' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = COMPLETED_COLOR;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'furnished' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = FURNISHED_COLOR;
        }, i * ANIMATION_SPEED_MS + 500 );
      }
    }
  }

  insertionSort () {
    const animations = getInsertionSortAnimations( this.state.array )
    // console.log( animations )
    // eslint-disable-next-line no-unused-vars
    let is_barTwo_completed = false;
    let is_barOne_completed = false;

    for ( let i = 0; i < animations.length; i++ )
    {
      const arrayBars = document.getElementsByClassName( 'array-bar' );
      if ( animations[ i ][ 2 ] === 'index' )
      {
        const [ barOneIdx, barTwoIdx ] = animations[ i ];
        const barOneStyle = arrayBars[ barOneIdx ].style;
        const barTwoStyle = arrayBars[ barTwoIdx ].style;
        let color = animations[ i + 1 ][ 2 ] === 'index' ? SECONDARY_COLOR : PRIMARY_COLOR;

        // eslint-disable-next-line no-loop-func
        setTimeout( () => {
          if ( is_barOne_completed || barOneStyle.backgroundColor === 'rgb(16, 228, 62)' )
          {
            is_barOne_completed = true;

            if ( color === 'red' )
              barOneStyle.backgroundColor = color;
            if ( color === '#cb901b' )
            {
              is_barOne_completed = false;
              barOneStyle.backgroundColor = COMPLETED_COLOR;
            }
          }
          else if ( is_barTwo_completed || barTwoStyle.backgroundColor === 'rgb(16, 228, 62)' )
          {
            is_barTwo_completed = true;
            if ( color === 'red' )
              barTwoStyle.backgroundColor = color;
            if ( color === '#cb901b' )
            {
              barTwoStyle.backgroundColor = COMPLETED_COLOR;
              is_barTwo_completed = false;
            }
          }
          else
          {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 2 ] === 'height' )
      {
        setTimeout( () => {
          const [ barOneIdx, newHeight ] = animations[ i ];
          const barOneStyle = arrayBars[ barOneIdx ].style;
          barOneStyle.height = `${ newHeight }px`;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'completed' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = COMPLETED_COLOR;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'furnished' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = FURNISHED_COLOR;
        }, i * ANIMATION_SPEED_MS + 500 );
      }
    }
  }

  bubbleSort () {
    const animations = getBubbleSortAnimations( this.state.array )
    for ( let i = 0; i < animations.length; i++ )
    {
      const arrayBars = document.getElementsByClassName( 'array-bar' );
      if ( animations[ i ][ 2 ] === 'index' )
      {
        const [ barOneIdx, barTwoIdx ] = animations[ i ];
        const barOneStyle = arrayBars[ barOneIdx ].style;
        const barTwoStyle = arrayBars[ barTwoIdx ].style;
        const color = animations[ i + 1 ][ 2 ] === 'index' ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout( () => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 2 ] === 'height' )
      {
        setTimeout( () => {
          const [ barOneIdx, newHeight1 ] = animations[ i ];
          const [ barTwoIdx, newHeight2 ] = animations[ i++ ];
          const barOneStyle = arrayBars[ barOneIdx ].style;
          const barTwoStyle = arrayBars[ barTwoIdx ].style;
          barOneStyle.height = `${ newHeight1 }px`;
          barTwoStyle.height = `${ newHeight2 }px`;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'completed' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = COMPLETED_COLOR;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'furnished' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = FURNISHED_COLOR;
        }, i * ANIMATION_SPEED_MS + 500 );
      }
    }
  }

  selectionSort () {
    const animations = getSelectionSortAnimations( this.state.array )
    for ( let i = 0; i < animations.length; i++ )
    {
      const arrayBars = document.getElementsByClassName( 'array-bar' );
      if ( animations[ i ][ 2 ] === 'index' )
      {
        const [ barOneIdx, barTwoIdx ] = animations[ i ];
        const barOneStyle = arrayBars[ barOneIdx ].style;
        const barTwoStyle = arrayBars[ barTwoIdx ].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout( () => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 2 ] === 'height' )
      {
        setTimeout( () => {
          const [ barOneIdx, newHeight ] = animations[ i ];
          const barOneStyle = arrayBars[ barOneIdx ].style;
          barOneStyle.height = `${ newHeight }px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'completed' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = COMPLETED_COLOR;
        }, i * ANIMATION_SPEED_MS );
      }
      else if ( animations[ i ][ 1 ] === 'furnished' )
      {
        const [ barOneIdx ] = animations[ i ];
        setTimeout( () => {
          arrayBars[ barOneIdx ].style.backgroundColor = FURNISHED_COLOR;
        }, i * ANIMATION_SPEED_MS + 500 );
      }
    }
  }

  handleChange = ( event, newValue ) => {
    this.flag = true;
    this.setState( { sliderValue: newValue } )
    this.resetArray()
  }

  render () {
    const { array } = this.state;
    return (
      <Paper className="background-image" style={ { height: window.innerHeight } }>
        <div style={ { display: 'flex', justifyContent: 'space-around' } }>
          <Button disabled={ this.state.flag } className="button" onClick={ () => this.resetArray() }><span style={ { fontSize: 15, fontStyle: 'oblique', fontWeight: 600 } }>Generate New Array</span></Button>
          <Paper style={ { width: "25%", boxShadow: 'none', textAlign: 'center', background: 'transparent' } }>
            <Typography style={ { position: 'relative', top: 30, color: 'white' } }>Manage your array</Typography>
            <Slider value={ this.state.sliderValue }
              onChange={ this.handleChange }
              step={ 5 }
              min={ 50 }
              max={ NUMBER_OF_ARRAY_BARS }
              style={ { marginTop: 25, width: '50%' } } />
          </Paper>

          <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
            <Button className="button" onClick={ () => this.bubbleSort() }><span style={ { fontSize: 12 } }>Bubble Sort</span></Button>
            <Button className="button" onClick={ () => this.selectionSort() }><span style={ { fontSize: 12 } }>Selection Sort</span></Button>
            <Button className="button" onClick={ () => this.insertionSort() }><span style={ { fontSize: 12 } }>Insertion Sort</span></Button>
            <Button className="button" onClick={ () => this.mergeSort() }><span style={ { fontSize: 12 } }>Merge Sort</span></Button>
            <Button className="button" onClick={ () => this.quickSort() }><span style={ { fontSize: 12 } }>Quick Sort</span></Button>
          </div>
        </div>
        <div className="array-container" style={ { top: 150, width: `${ window.innerWidth - 200 }px` } }>
          { array.map( ( value, idx ) => (
            <div
              className="array-bar"
              key={ idx }
              style={ {
                backgroundColor: PRIMARY_COLOR,
                height: `${ value }px`,
                // width: 50
              } }>
              {/* { value } */ }
            </div>
          ) ) }

          {/* <button onClick={ () => this.testSortingAlgorithms() }>
          Test Sorting Algorithms (BROKEN)
        </button> */}
        </div>
      </Paper>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval ( min, max ) {
  // min and max included
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

export default withStyles( styles )( SortingVisualizer )

// function arraysAreEqual ( arrayOne, arrayTwo ) {
//   if ( arrayOne.length !== arrayTwo.length ) return false;
//   for ( let i = 0; i < arrayOne.length; i++ )
//   {
//     if ( arrayOne[ i ] !== arrayTwo[ i ] )
//     {
//       return false;
//     }
//   }
//   return true;
// }
