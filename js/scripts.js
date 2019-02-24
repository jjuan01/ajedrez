

function getCellsWithPieces(){
  let blackRook1 = document.getElementsByClassName("black rook 1")[0]
  let blackpawn1 = document.getElementsByClassName("black pawn 1")[0]
  let pieces = [blackRook1, blackpawn1]
return pieces
}

class NewMove{

  constructor(){
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
  }

  inicializar(){
    this.pieces = getCellsWithPieces()
    this.agregarEventosClickPieces()
  }

  move(ev){
    
    const allPieces = [
      "rook", 
      "knight", 
      "bishop", 
      "king",
      "queen",
      "pawn",
    ]
    let pieceToMove
    let colorPieceToMove

    let letterToNumbers = new Map()
      letterToNumbers.set("a", 1)
      letterToNumbers.set("b", 2)
      letterToNumbers.set("c", 3)
      letterToNumbers.set("d", 4)
      letterToNumbers.set("e", 5)
      letterToNumbers.set("f", 6)
      letterToNumbers.set("g", 7)
      letterToNumbers.set("h", 8)
      letterToNumbers.set(1, "a")
      letterToNumbers.set(2, "b")
      letterToNumbers.set(3, "c")
      letterToNumbers.set(4, "d")
      letterToNumbers.set(5, "e")
      letterToNumbers.set(6, "f")
      letterToNumbers.set(7, "g")
      letterToNumbers.set(8, "h")

    window.globalPieceToMove = ev

    // let pieceToMoveID = ev.target.id
    // let elementPieceToMove = document.getElementById(pieceToMoveID)

    // elementPieceToMove.classList.add('pieceToMove')

    if(ev.srcElement.classList.contains("w")){
      let isWhite = true
      console.log("white")
      console.log(isWhite)
    }else if(ev.srcElement.classList.contains("b")){
      let isBlack = true
      console.log("black")
      console.log(isBlack)
    }

    
    


    for(let i = 0; i < allPieces.length; i++){
      if(ev.srcElement.classList.contains(allPieces[i])){
        pieceToMove = allPieces[i]
        break
      }
    }

    switch(pieceToMove){
// Rook
      case allPieces[0]:
        console.log("TORRE")
        console.log(ev.target.id)
        let startID = ev.target.id
        let startLetter = startID[0]
        let startNumber = parseInt(startID[1], 10)
        let startLetterInNumber = letterToNumbers.get(startLetter)

        // console.log(startID)
        // console.log(startLetter)
        // console.log(startNumber)
        // console.log(startLetterInNumber)

        let possiblePathTopID = []
        let possiblePathBottomID = []
        let possiblePathLeftID = []
        let possiblePathRightID = []

        let cellsInPath = []

        let pieceInPathTop = []
        let pieceInPathRight = []
        let pieceInPathBottom = []
        let pieceInPathLeft = []

        // let pieceInPath = [pieceInPathTop, pieceInPathRight, pieceInPathBottom, pieceInPathLeft]

        // let canEat

        let y = [startNumber, startNumber]
        let x = [startLetterInNumber, startLetterInNumber]

        for(let j = 0; j < 8; j++){
        //Path in Y
          //Top
          if((y[0] - 1) >= 1){
            let cell = y[0] - 1
            //Asigning possible path on top IDs
            possiblePathTopID.push(startLetter + cell.toString())
          }
          //Bottom
          if((y[1] + 1) <= 8) {
            let cell = y[1] + 1
            //Asigning possible path on bottom IDs
            possiblePathBottomID.push(startLetter + cell.toString())
          }
        //Path in x 
          //left
          if((x[0] - 1) >= 1){
            let cell = x[0] - 1
            //Asigning possible path on left IDs
            possiblePathLeftID.push(letterToNumbers.get(parseInt(cell.toString(),10)) + startNumber)  
          }
          //right
          if((x[1] + 1) <= 8) {
            let cell = x[1] + 1
            //Asigning possible path on left IDs
            possiblePathRightID.push(letterToNumbers.get(parseInt(cell.toString(),10)) + startNumber)
          }
          y[0] -= 1
          y[1] += 1
          x[0] -= 1
          x[1] += 1
        }

        let longestPath = 0
        let pathsLengths = []
        pathsLengths.push(possiblePathTopID.length, possiblePathBottomID.length, possiblePathLeftID.length, possiblePathRightID.length)
        //Defining the path with more cells
        for(let i = 0; i < pathsLengths.length; i++){ 
          if(pathsLengths[i] > longestPath){
            longestPath = pathsLengths[i]
          }
        }


        //Array of cells in the path
        for(let i = 0; i < longestPath; i++){
          if(possiblePathTopID[i] != undefined){
            let checkPieces = document.getElementById(possiblePathTopID[i])
            if(pieceInPathTop.length === 0){
              if(checkPieces.classList.contains("piece")){
                pieceInPathTop.push(document.getElementById(possiblePathTopID[i]))
              }else{
                cellsInPath.push(document.getElementById(possiblePathTopID[i]))
              }
            }
          }
          if(possiblePathBottomID[i] != undefined){
            let checkPieces = document.getElementById(possiblePathBottomID[i])
            if(pieceInPathBottom.length === 0){
              if(checkPieces.classList.contains("piece")){
                pieceInPathBottom.push(document.getElementById(possiblePathBottomID[i]))
              }else{
                cellsInPath.push(document.getElementById(possiblePathBottomID[i]))
              }
            }
          }
          if(possiblePathLeftID[i] != undefined){
            let checkPieces = document.getElementById(possiblePathLeftID[i])
            if(pieceInPathLeft.length === 0){
              if(checkPieces.classList.contains("piece")){
                pieceInPathLeft.push(document.getElementById(possiblePathLeftID[i]))
              }else{
                cellsInPath.push(document.getElementById(possiblePathLeftID[i]))
              }
            }
          }
          if(possiblePathRightID[i] != undefined){
            let checkPieces = document.getElementById(possiblePathRightID[i])
            if(pieceInPathRight.length === 0){
              if(checkPieces.classList.contains("piece")){
                pieceInPathRight.push(document.getElementById(possiblePathRightID[i]))
              }else{
                cellsInPath.push(document.getElementById(possiblePathRightID[i]))
              }
            }
          }
        }   

        //Showing path
        for(let i = 0; i < cellsInPath.length; i++){

          if(cellsInPath[i].classList.contains('w')){
            cellsInPath[i].classList.remove('w')
            cellsInPath[i].classList.add('onPathw')
          }
          if(cellsInPath[i].classList.contains('b')){
            cellsInPath[i].classList.remove('b')  
            cellsInPath[i].classList.add('onPathb')
          }  
        }

      break
    }   
  } 

  agregarEventosClickPieces(){
    
    for (let i = 0 ; i < this.pieces.length; i++) {
      console.log(this.pieces[i])
      console.log(this.pieces[i].id)
      document.getElementById(this.pieces[i].id).addEventListener('click', this.move, false ) 
    }
  }

}



function start(){
  newMove = new NewMove()
}
