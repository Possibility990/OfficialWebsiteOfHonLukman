
class Utility{
    constructor(){
    
       this._navLink = document.querySelectorAll('.nav-link') 
       this._spinner = document.querySelector('.spinner')
     
       
    //    console.log('worked',this.global)
    
    
       

    }


    highlightActiveLink(){
        this._navLink.forEach(link =>{
            if(window.location.pathname === link.getAttribute('href') )
                link.classList.add('active')
        })
    }

    showSpinner(){
        // console.log('from utils', this.global)
        this._spinner.classList.add('show')
    }
   removeSpinner(){
        this._spinner.classList.remove('show')
    }

}

export default Utility