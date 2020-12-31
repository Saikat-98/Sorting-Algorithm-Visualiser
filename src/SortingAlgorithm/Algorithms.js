const index = 'index'
const height = 'height'
const completed = 'completed'
const furnished = 'furnished'


export function getMergeSortAnimations ( array ) {
  const animations = [];
  if ( array.length <= 1 ) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper( array, 0, array.length - 1, auxiliaryArray, animations );
  for ( let i = 0; i < array.length; i++ )
    animations.push( [ i, furnished ] )
  return animations;
}

function mergeSortHelper ( mainArray, startIdx, endIdx, auxiliaryArray, animations ) {
  if ( startIdx === endIdx ) return;
  const middleIdx = Math.floor( ( startIdx + endIdx ) / 2 );
  mergeSortHelper( auxiliaryArray, startIdx, middleIdx, mainArray, animations );
  mergeSortHelper( auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations );
  doMerge( mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations );
}

function doMerge ( mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations ) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while ( i <= middleIdx && j <= endIdx )
  {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push( [ i, j, index ] );
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push( [ i, j, index ] );
    if ( auxiliaryArray[ i ] <= auxiliaryArray[ j ] )
    {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push( [ k, auxiliaryArray[ i ], height ] );
      animations.push( [ k, completed ] );
      mainArray[ k++ ] = auxiliaryArray[ i++ ];
    } else
    {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push( [ k, auxiliaryArray[ j ], height ] );
      animations.push( [ k, completed ] );
      mainArray[ k++ ] = auxiliaryArray[ j++ ];
    }
  }
  while ( i <= middleIdx )
  {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push( [ i, i, index ] );
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push( [ i, i, index ] );
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push( [ k, auxiliaryArray[ i ], height ] );
    animations.push( [ i, completed ] );
    mainArray[ k++ ] = auxiliaryArray[ i++ ];
  }
  while ( j <= endIdx )
  {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push( [ j, j, index ] );
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push( [ j, j, index ] );
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push( [ k, auxiliaryArray[ j ], height ] );
    animations.push( [ j, completed ] );
    mainArray[ k++ ] = auxiliaryArray[ j++ ];
  }
}

export function getBubbleSortAnimations ( array ) {
  const animations = [];
  if ( array.length <= 1 ) return array;
  bubbleSortHelper( array, animations )
  for ( let i = 0; i < array.length; i++ )
    animations.push( [ i, furnished ] )
  return animations;
}

function bubbleSortHelper ( array, animations ) {
  for ( let i = 0; i < array.length; i++ )
  {
    for ( let j = 0; j < array.length - i - 1; j++ )
    {
      animations.push( [ j, j + 1, index ] );
      animations.push( [ j, j + 1, index ] );

      if ( array[ j ] > array[ j + 1 ] )
      {
        let temp = array[ j ];
        array[ j ] = array[ j + 1 ];
        array[ j + 1 ] = temp;
      }
      animations.push( [ j, array[ j ], height ] );
      animations.push( [ j + 1, array[ j + 1 ], height ] );
    }
    animations.push( [ array.length - i - 1, completed ] );
  }
}

export function getQuickSortAnimations ( array ) {
  const animations = []
  if ( array.length < 1 ) return array
  quickSortHelper( array, 0, array.length - 1, animations )
  for ( let i = 0; i < array.length; i++ )
    animations.push( [ i, furnished ] )
  return animations
}

function quickSortHelper ( array, startIdx, endIdx, animations ) {
  if ( startIdx >= endIdx ) return;
  let p = partition( array, startIdx, endIdx, animations )
  animations.push( [ p, completed ] );

  quickSortHelper( array, startIdx, p - 1, animations )
  animations.push( [ startIdx, completed ] );

  quickSortHelper( array, p + 1, endIdx, animations )
  animations.push( [ endIdx, completed ] );

}

function partition ( array, startIdx, endIdx, animations ) {
  let i = startIdx - 1;
  let j = startIdx;
  let pivot = array[ endIdx ];
  while ( j < endIdx )
  {
    if ( array[ j ] <= pivot )
    {
      i++;
      animations.push( [ j, i, index ] );
      animations.push( [ j, i, index ] );

      let temp = array[ j ];
      array[ j ] = array[ i ];
      array[ i ] = temp;

      animations.push( [ j, array[ j ], height ] );
      animations.push( [ i, array[ i ], height ] );
    }
    j++;
  }
  let temp = array[ endIdx ];
  array[ endIdx ] = array[ i + 1 ];
  array[ i + 1 ] = temp;
  animations.push( [ i + 1, array[ i + 1 ], height ] );
  animations.push( [ endIdx, array[ endIdx ], height ] )

  return i + 1;
}

export function getInsertionSortAnimations ( array ) {
  const animations = []
  if ( array.length <= 1 ) return array;
  insertionSortHelper( array, animations );
  for ( let i = 0; i < array.length; i++ )
    animations.push( [ i, furnished ] )
  return animations;
}

function insertionSortHelper ( array, animations ) {
  animations.push( [ 0, completed ] );
  for ( let i = 1; i < array.length; i++ )
  {
    let element = array[ i ]
    let j = i - 1

    while ( j >= 0 && array[ j ] > element )
    {
      array[ j + 1 ] = array[ j ]

      animations.push( [ j + 1, j, index ] );
      animations.push( [ j + 1, j, index ] );

      animations.push( [ j + 1, array[ j + 1 ], height ] );
      j--
    }
    array[ j + 1 ] = element

    animations.push( [ j + 1, array[ j + 1 ], height ] );
    animations.push( [ i, completed ] );

  }
  // for ( let i = 0; i < array.length; i++ )
  //   animations.push( [ i, completed ] );

}

export function getSelectionSortAnimations ( array ) {
  const animations = []
  if ( array.length <= 1 ) return array;
  selectionSortHelper( array, animations );
  for ( let i = 0; i < array.length; i++ )
    animations.push( [ i, furnished ] )
  return animations;
}

function selectionSortHelper ( array, animations ) {
  for ( let i = 0; i < array.length; i++ )
  {
    let min = i
    for ( let j = i; j < array.length; j++ )
      if ( array[ min ] > array[ j ] )
      {
        animations.push( [ i, min, index ] );
        animations.push( [ i, min, index ] );
        min = j
      }

    let temp = array[ i ]
    array[ i ] = array[ min ]
    array[ min ] = temp

    animations.push( [ i, array[ i ], height ] );
    animations.push( [ min, array[ min ], height ] );
    animations.push( [ i, completed ] );
  }
}