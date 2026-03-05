

class Utility{
    constructor(){
       this._navLink = document.querySelectorAll('.nav-link') 
       this._spinner = document.querySelector('.spinner')

    }

    highlightActiveLink(){
        this._navLink.forEach(link =>{
            if(window.location.pathname === link.getAttribute('href') )
                link.classList.add('active')
        })
    }

    showSpinner(){
        console.log(this._spinner)
        this._spinner.classList.add('show')
    }
   removeSpinner(){
        console.log(this._spinner)
        this._spinner.classList.remove('show')
    }
}

export default Utility