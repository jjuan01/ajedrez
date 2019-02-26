const allPiecesTypes = [
  "rook", 
  "knight", 
  "bishop", 
  "king",
  "queen",
  "pawn",
]

var colors = new Map()
colors.set(0, "white")
colors.set(1, "black")

var letterToNumbers = new Map()
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

class NewMove{

  constructor(){
    this.inicializar = this.inicializar.bind(this)
    // this.pieceElementToMove = this.pieceElementToMove.bind(this)
    this.inicializar()
  }

  inicializar(){

    var self = this
    this.allPieces = []
    this.pieceElementToMove
    this.colorPieceToMove
    this.pieces = this.getCellsWithPieces()
    this.agregarEventosClickPieces()
  }

  getCellsWithPieces(){
    for(let i = 0; i < allPiecesTypes.length; i++){
      for(let j = 0; j < colors.size; j++){
        for(let k = 1; k <= 2; k++){
          if(allPiecesTypes[i] != "pawn"){
            let pieceClass = colors.get(j) + " " + allPiecesTypes[i] + " " + k
            let checkPieceExistance = document.getElementsByClassName(pieceClass)               
            if(checkPieceExistance.length >= 1){
              this.allPieces.push(pieceClass)  
            }

          }
        }
        for(let k = 1; k <= 8; k++){
          if(allPiecesTypes[i] == "pawn"){
            let pieceClass = colors.get(j) + " " + allPiecesTypes[i] + " " + k
            let checkPieceExistance = document.getElementsByClassName(pieceClass)            
            if(checkPieceExistance.length >= 1){
              this.allPieces.push(pieceClass)  
            }  
          }
        }
      
      }
    }
    let blackRook1 = document.getElementsByClassName("black rook 1")[0]
    let blackpawn1 = document.getElementsByClassName("black pawn 1")[0]

    // let whiteRook1 = document.getElementsByClassName("white rook 1")[0]
    let pieces = [blackRook1, blackpawn1]

    return pieces
  }

  agregarEventosClickPieces(pieces){
    for (let i = 0 ; i < this.pieces.length; i++) {
      document.getElementById(this.pieces[i].id).addEventListener('click', this.determiningWhatToMove, false) 
    }
  }

  // determinePieceToMove(){
    
  // }

  determiningWhatToMove(ev){
    
    // this.pruebaMover()
    let pieceToMove

    // let colorPieceToMove

    self.pieceElementToMove = ev

    // let pieceToMoveID = self.pieceElementToMove.target.id
    // let elementPieceToMove = document.getElementById(pieceToMoveID)

    // elementPieceToMove.classList.add('pieceToMove')


    // Determining Color of Piece To Move
    if(self.pieceElementToMove.srcElement.classList.contains("w")){
      // let isWhite = true
      self.colorPieceToMove = 0
      // console.log("white")
      // console.log(self.colorPieceToMove)
    }else if(self.pieceElementToMove.srcElement.classList.contains("b")){
      // let isBlack = true
      self.colorPieceToMove = 1
      // console.log("black")
      // console.log(self.colorPieceToMove)
    }

    for(let i = 0; i < allPiecesTypes.length; i++){
      if(self.pieceElementToMove.srcElement.classList.contains(allPiecesTypes[i])){
        pieceToMove = allPiecesTypes[i]
        break
      }
    }

    switch(pieceToMove){
      // Rook
      case allPiecesTypes[0]:
        moveRook()
        break
        
    }  

  } 

  moveRook(){
    let startID = self.pieceElementToMove.target.id
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

    let canEat = []

    // let pieceInPath = [pieceInPathTop, pieceInPathRight, pieceInPathBottom, pieceInPathLeft]    

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

    // let piecesInPath = 
  
    for(let i = 0; i < (pieceInPathBottom.length + pieceInPathTop.length + pieceInPathRight.length + pieceInPathLeft.length); i++){
      switch(colorPieceToMove){
        case 0:
          console.log("come negras")
        case 1:
          console.log("come negras")
      }
    }
  }
}





function start(){
  newMove = new NewMove()
}

function moveRook(){
  newMove.moveRook()
}

