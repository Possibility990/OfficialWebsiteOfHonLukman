

class Modal{
    constructor(){
       this._modalIcon = document.querySelector('#admin-icon') 
       this._modalEl =  document.querySelector('#modal')
       this.addEventListeners()
    }

    addEventListeners(){
      this._modalIcon.addEventListener('click', this._open.bind(this))  
      window.addEventListener('click', this._outsideEvent.bind(this))
      document.addEventListener('closeModal', this._modalClose.bind(this))
    }

    _open(){

        this._modalEl.style.display = 'block'
        console.log(this._modalEl)
        console.log('hello')

    }
    _close(){
          this._modalEl.style.display = 'none'

    }

    _modalClose(){
        this._close()
    }

    _outsideEvent(e){

        if(e.target === this._modalEl){
            this._close()
        }

    }
}


export default Modal