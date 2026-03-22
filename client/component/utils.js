



class Utility{
    constructor(){
    
       
       this._navLink = document.querySelectorAll('.nav-link') 
       this._spinner = document.querySelector('.spinner')
       this.paginationBtn = document.querySelector('#pagination')
       
    //    console.log('worked',this.global)
    
    
       

    }

    displayPagination(global){
        const div = document.createElement('div')
        div.classList.add('pagination1')
        div.innerHTML = `
         <button class="btn btn-primary" id="prev">Prev</button>
            <button class="btn btn-primary" id="next">Next</button>
            <h3 id="page-counter"> Page1 of Total pages</h3>
        `
        this.paginationBtn.appendChild(div)
     
        this.prevBtn = document.querySelector('#prev')
        this.nextBtn = document.querySelector('#next')
        this.prevBtn.addEventListener('click', this.prev.bind(this,global))
        this.nextBtn.addEventListener('click', this.next.bind(this,global))
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

        // Previous
        prev(global){

            if(global.page === 1){
                 this.prevBtn.disabled = true
                 this.nextBtn.disabled = false
                return
            }
            global--
           
           
        }

        // Previous
        next(global){
            if(global.page === global.totalPages){
                this.nextBtn.disabled = true
                this.prevBtn.disabled = false
                return
            }
            global++
           
        }
}

export default Utility