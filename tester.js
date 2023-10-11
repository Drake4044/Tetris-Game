const piece = {
    position: { x: 5, y: 5 },
    shape: [
      [0, 1, 0],//  
      [1, 1, 1] // j = 1
    //    i          = 1
    ]
  }

/*

  i = 1
  j = 0

  row = [1, 1, 1], [1, 0, 0]
  row = [1]


*/

const rotate = () => {
    const rotated = []
    
    for (let i = 0; i < piece.shape[0].length; i++ ) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j-- ) {
        console.log(j);
        console.log(i);
        console.log(row);
        console.log(piece.shape[j][i]);
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    piece.shape = rotated 

}

rotate()

console.log(piece.shape);