class NewMove{

  constructor(){
    this.inicializar = this.inicializar.bind(this)
    this.test = this.test.bind(this)
    this.inicializar()
  }

  inicializar(){
    this.allPieces = []
    this.pieceElementToMove
    this.agregarEventosClickPieces()
  }

  test(){
    console.log("al fin!")
  }
 
  agregarEventosClickPieces(pieces){
    for (let i = 0 ; i < this.pieces.length; i++) {
      document.getElementById(this.pieces[i].id).addEventListener('click', this.move, false ) 
    }
    this.test()
  }

  move(event){

    this.test.bind(this)

  }
}

function start(){
  newMove = new NewMove()
}

