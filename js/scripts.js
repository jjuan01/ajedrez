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
    this.allPresentPieces = []
    this.pieceElementToMove
    this.pieceToMove
    this.colorPieceToMove
    this.numberPieceToMove

    this.startID
    this.startLetter
    this.startNumber
    this.startLetterInNumber

    //Rook like movement
    this.possiblePathTopID = []
    this.possiblePathBottomID = []
    this.possiblePathLeftID = []
    this.possiblePathRightID = []

    this.pieceInPathTop = []
    this.pieceInPathRight = []
    this.pieceInPathBottom = []
    this.pieceInPathLeft = []
    
    this.cellsInPath = []
    this.pieceInPath = []

    this.canEat = []

    this.cellToMove
    this.finalCellTarget


    this.pieces = this.getCellsWithPieces()
    this.clickEvents()
  }

  getCellsWithPieces(){
    for(let i = 0; i < allPiecesTypes.length; i++){
      for(let j = 0; j < colors.size; j++){
        for(let k = 1; k <= 2; k++){
          if(allPiecesTypes[i] != "pawn"){
            let pieceClass = colors.get(j) + " " + allPiecesTypes[i] + " " + k
            let checkPieceExistance = document.getElementsByClassName(pieceClass)               
            if(checkPieceExistance.length >= 1){
              this.allPresentPieces.push(pieceClass)  
            }

          }
        }
        for(let k = 1; k <= 8; k++){
          if(allPiecesTypes[i] == "pawn"){
            let pieceClass = colors.get(j) + " " + allPiecesTypes[i] + " " + k
            let checkPieceExistance = document.getElementsByClassName(pieceClass)            
            if(checkPieceExistance.length >= 1){
              this.allPresentPieces.push(pieceClass)  
            }  
          }
        }
      
      }
    }
    
    let blackRook1 = document.getElementsByClassName("black rook 1")[0]
    // let blackRook2 = document.getElementsByClassName("black rook 2")[0]

    // let blackKnight1 = document.getElementsByClassName("black Knight 1")[0]
    // let blackKnight2 = document.getElementsByClassName("black Knight 2")[0]

    // let blackBishop1 = document.getElementsByClassName("black Bishop 1")[0]
    // let blackBishop2 = document.getElementsByClassName("black Bishop 2")[0]

    // let blackKing1 = document.getElementsByClassName("black King 1")[0]
    // let blackKing2 = document.getElementsByClassName("black King 2")[0]

    // let blackQueen1 = document.getElementsByClassName("black Queen 1")[0]
    // let blackQueen2 = document.getElementsByClassName("black Queen 2")[0]

    let blackpawn1 = document.getElementsByClassName("black pawn 1")[0]


    // let whiteRook1 = document.getElementsByClassName("white rook 1")[0]
    // let pieces = [blackRook1, blackRook2,blackKnight1, blackKnight2, ,blackBishop1, blackBishop2, blackKing1, blackKing2, blackQueen1, blackQueen2, blackpawn1]
    let pieces = [blackRook1, blackpawn1]


    return pieces
  }

  clickEvents(pieces){
    for (let i = 0 ; i < this.pieces.length; i++) {
      document.getElementById(this.pieces[i].id).addEventListener('click', this.determinePieceToMove, false) 
    }
  }  
  
  clickEventsPath(){
    for (let i = 0 ; i < (this.cellsInPath.length + this.canEat.length); i++) {
      if(this.cellsInPath[i] != undefined){
        document.getElementById(this.cellsInPath[i].id).addEventListener('click', this.determiningWhereToMove, false) 
  
      }
      if(this.canEat[i] != undefined){
        document.getElementById(this.canEat[i].id).addEventListener('click', this.determiningWhereToMove, false) 
  
      }
    }
  }

  determinePieceToMove(ev){
  

    self.pieceElementToMove = ev
    self.startID = self.pieceElementToMove.target.id
    self.startLetter = startID[0]
    self.startNumber = parseInt(startID[1], 10)
    self.startLetterInNumber = letterToNumbers.get(startLetter)

    // Determining Color of Piece To Move
    if(self.pieceElementToMove.srcElement.classList.contains("w")){
      // let isWhite = true
      self.colorPieceToMove = 0
      
    }else if(self.pieceElementToMove.srcElement.classList.contains("b")){
      // let isBlack = true
      self.colorPieceToMove = 1
      
    }

    //Determining piece type
    for(let i = 0; i < allPiecesTypes.length; i++){
      if(self.pieceElementToMove.srcElement.classList.contains(allPiecesTypes[i])){
        self.pieceToMove = allPiecesTypes[i]
        break
      }
    }

    //Determining piece number
    if(self.pieceElementToMove.srcElement.classList.contains("1")){
      self.numberPieceToMove = 1
    }else if(self.pieceElementToMove.srcElement.classList.contains("2")){
      self.numberPieceToMove = 2
    }else if(self.pieceElementToMove.srcElement.classList.contains("3")){
      self.numberPieceToMove = 3
    }else if(self.pieceElementToMove.srcElement.classList.contains("4")){
      self.numberPieceToMove = 4
    }else if(self.pieceElementToMove.srcElement.classList.contains("5")){
      self.numberPieceToMove = 5
    }else if(self.pieceElementToMove.srcElement.classList.contains("6")){
      self.numberPieceToMove = 6
    }else if(self.pieceElementToMove.srcElement.classList.contains("7")){
      self.numberPieceToMove = 7
    }else if(self.pieceElementToMove.srcElement.classList.contains("8")){
      self.numberPieceToMove = 8
    }

    switch(self.pieceToMove){
      // Rook
      case allPiecesTypes[0]:
        moveRook()
        break
        
    }  

  } 

  moveRook(){ 

    let y = [self.startNumber, self.startNumber]
    let x = [self.startLetterInNumber, self.startLetterInNumber]

    for(let j = 0; j < 8; j++){
      //Path in Y
      //Top
      if((y[0] - 1) >= 1){
        let cell = y[0] - 1
        //Asigning possible path on top IDs
        this.possiblePathTopID.push(self.startLetter + cell.toString())
      }
      //Bottom
      if((y[1] + 1) <= 8) {
        let cell = y[1] + 1
        //Asigning possible path on bottom IDs
        this.possiblePathBottomID.push(self.startLetter + cell.toString())
      }
      //Path in x 
      //left
      if((x[0] - 1) >= 1){
        let cell = x[0] - 1
        //Asigning possible path on left IDs
        this.possiblePathLeftID.push(letterToNumbers.get(parseInt(cell.toString(),10)) + self.startNumber)  
      }
      //right
      if((x[1] + 1) <= 8) {
        let cell = x[1] + 1
        //Asigning possible path on left IDs
        this.possiblePathRightID.push(letterToNumbers.get(parseInt(cell.toString(),10)) + self.startNumber)
      }
      y[0] -= 1
      y[1] += 1
      x[0] -= 1
      x[1] += 1
    }

    let longestPath = 0
    let pathsLengths = []
    pathsLengths.push(this.possiblePathTopID.length, this.possiblePathBottomID.length, this.possiblePathLeftID.length, this.possiblePathRightID.length)

    //Defining the path with more cells
    for(let i = 0; i < pathsLengths.length; i++){ 
      if(pathsLengths[i] > longestPath){
        longestPath = pathsLengths[i]
      }
    }


    //Array of cells in the path
    for(let i = 0; i < longestPath; i++){
      if(this.possiblePathTopID[i] != undefined){
        let checkPieces = document.getElementById(this.possiblePathTopID[i])
        if(this.pieceInPathTop.length === 0){
          if(checkPieces.classList.contains("piece")){
            this.pieceInPathTop.push(document.getElementById(this.possiblePathTopID[i]))
          }else{
            this.cellsInPath.push(document.getElementById(this.possiblePathTopID[i]))
            }
        }
      }
      if(this.possiblePathBottomID[i] != undefined){
        let checkPieces = document.getElementById(this.possiblePathBottomID[i])
        if(this.pieceInPathBottom.length === 0){
          if(checkPieces.classList.contains("piece")){
            this.pieceInPathBottom.push(document.getElementById(this.possiblePathBottomID[i]))
          }else{
            this.cellsInPath.push(document.getElementById(this.possiblePathBottomID[i]))
          }
        }
      }
      if(this.possiblePathLeftID[i] != undefined){
        let checkPieces = document.getElementById(this.possiblePathLeftID[i])
        if(this.pieceInPathLeft.length === 0){
          if(checkPieces.classList.contains("piece")){
            this.pieceInPathLeft.push(document.getElementById(this.possiblePathLeftID[i]))
          }else{
            this.cellsInPath.push(document.getElementById(this.possiblePathLeftID[i]))
          }
        }
      }
      if(this.possiblePathRightID[i] != undefined){
        let checkPieces = document.getElementById(this.possiblePathRightID[i])
        if(this.pieceInPathRight.length === 0){
          if(checkPieces.classList.contains("piece")){
            this.pieceInPathRight.push(document.getElementById(this.possiblePathRightID[i]))
          }else{
            this.cellsInPath.push(document.getElementById(this.possiblePathRightID[i]))
          }
        }
      }
    }   
    let PieceInPathQ = this.pieceInPathTop.length + this.pieceInPathRight.length + this.pieceInPathBottom.length + this.pieceInPathLeft.length
    for(let i = 0; i < PieceInPathQ; i++){
      if(this.pieceInPathTop[i] != undefined){
        this.pieceInPath.push(this.pieceInPathTop[i])
      }
      if(this.pieceInPathRight[i] != undefined){
        this.pieceInPath.push(this.pieceInPathRight[i])
      }
      if(this.pieceInPathBottom[i] != undefined){
        this.pieceInPath.push(this.pieceInPathBottom[i])
      }
      if(this.pieceInPathLeft[i] != undefined){
        this.pieceInPath.push(this.pieceInPathLeft[i])
      }

    }

    this.showPath()
    this.determinieIfCanEat()
    this.showCanEat()
    this.clickEventsPath()
  }

  determinieIfCanEat(){
    for(let i = 0; i < (this.pieceInPath.length); i++){
      switch(colorPieceToMove){
        case 0:
          // if()
          
          if(this.pieceInPath[i].classList.contains('black')){
            self.canEat.push(self.pieceInPath[i])
          }
        case 1:
          // if()
          
          if(this.pieceInPath[i].classList.contains('white')){
            this.canEat.push(this.pieceInPath[i])
          }
      }
    }
    
  }

  showPath(){
    for(let i = 0; i < this.cellsInPath.length; i++){

      if(this.cellsInPath[i].classList.contains('w')){
        this.cellsInPath[i].classList.remove('w')
        this.cellsInPath[i].classList.add('onPathW')
        this.cellsInPath[i].classList.add('selectable')
      }
      if(this.cellsInPath[i].classList.contains('b')){
        this.cellsInPath[i].classList.remove('b')  
        this.cellsInPath[i].classList.add('onPathB')
        this.cellsInPath[i].classList.add('selectable')
      }  
    }
  }

  removePath(){
    for(let i = 0; i < this.cellsInPath.length; i++){

      if(this.cellsInPath[i].classList.contains('onPathW')){
        this.cellsInPath[i].classList.remove('onPathW')
        this.cellsInPath[i].classList.remove('selectable')
        this.cellsInPath[i].classList.add('w')
      }
      if(this.cellsInPath[i].classList.contains('onPathB')){
        this.cellsInPath[i].classList.remove('onPathB')  
        this.cellsInPath[i].classList.remove('selectable')
        this.cellsInPath[i].classList.add('b')
      }  
    }
  }

  showCanEat(){
    for(let i = 0; i < this.canEat.length; i++){
      if(this.canEat[i].classList.contains('w')){
        this.canEat[i].classList.remove('w')
        this.canEat[i].classList.add('canBeEaten')
      }
      if(this.canEat[i].classList.contains('b')){
        this.canEat[i].classList.remove('b')  
        this.canEat[i].classList.add('canBeEaten')
      }  
    }
  }

  determiningWhereToMove(ev){
    
    removeEventListener()

    self.cellElementToMove = ev
    self.finalCellTarget = self.cellElementToMove.target

    moveHere()
    
  }

  moveHere(){

    this.removePath()

    self.pieceElementToMove.target.classList.remove('piece')
    self.pieceElementToMove.target.classList.remove(colors.get(self.colorPieceToMove))
    self.pieceElementToMove.target.classList.remove(self.pieceToMove)
    self.pieceElementToMove.target.classList.remove(self.numberPieceToMove)

    self.cellElementToMove.target.classList.add('piece')
    self.cellElementToMove.target.classList.add(colors.get(self.colorPieceToMove))
    self.cellElementToMove.target.classList.add(self.pieceToMove)
    self.cellElementToMove.target.classList.add(self.numberPieceToMove)
  }

  removeEventListener(){
    for (let i = 0 ; i < (this.cellsInPath.length + this.canEat.length); i++) {
      if(this.cellsInPath[i] != undefined){
        document.getElementById(this.cellsInPath[i].id).removeEventListener('click', this.determiningWhereToMove, false) 
      }
      if(this.canEat[i] != undefined){
        document.getElementById(this.canEat[i].id).removeEventListener('click', this.determiningWhereToMove, false) 
      }
    }
  }
}



function start(){
  newMove = new NewMove()
}

function removeEventListener(){
  newMove.removeEventListener()
}

function moveRook(){
  newMove.moveRook()
}

function moveHere(){
  newMove.moveHere()
}

