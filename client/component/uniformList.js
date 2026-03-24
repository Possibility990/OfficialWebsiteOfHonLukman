
import newsAPI from "../services/newsAPI";


class UniformList{
    constructor(global, utils){
        this.UniformList = document.getElementById('uniform-list')
        this.global = global
        this.utils = utils
          this.paginationBtn = document.querySelector('#pagination')
        
      
       

    }

    async getUniStudents(){
        
        try{
            this.utils.showSpinner()
            const res = await newsAPI.getNews('university-students', this.global)
          
            const datas = res.data.data
           this.global.page = res.data.page
           this.global.totalPages = res.data.totalPages
            
           this.createUniStudents(datas)
           this.displayPagination(this.global)
            this.utils.removeSpinner()
        }catch(error){
            console.log(error)
        }

    }

        createUniStudents(datas){
           
        const students = datas.map(data=>{

          return ` <div class="col-12 col-md-6 col-lg-4">

            <div class="card scholar-card border-0 custom-nav2">

            <div class="scholar-img">
            <img src="${data.image || '../images/scholars.png' }" alt="Scholar" loading="lazy">
            </div>

            <div class="card-body custom-nav text-white">

                <ul class="list-unstyled scholar-info mb-0">

                <li><strong>Name:</strong> ${data.fullname}</li>
                <li><strong>Level:</strong> ${data.level}</li>
                <li><strong>Course:</strong> ${data.course}</li>
                <li><strong>Tel:</strong> ${data.tel}</li>
                <li><strong>LGA:</strong> ${data.lga}</li>
                <li><strong>Parent:</strong> ${data.parentname}</li>
                <li><strong>Guardian Tel:</strong> ${data.parenttel}</li>

                </ul>

            </div>

            </div>

        </div>`

        }).join('')
       

          this.UniformList.innerHTML = `${students}`

        
     }

            displayPagination(global){
                console.log(global.page, 'from pagination')
        const div = document.createElement('div')
        div.classList.add('pagination1')
        div.innerHTML = `
         <button class="btn btn-primary" id="prev">Prev</button>
            <button class="btn btn-primary" id="next">Next</button>
            <h5 id="page-counter"> Page: ${global.page} of ${global.totalPages}</h5>
        `
        this.paginationBtn.appendChild(div)
     
        this.prevBtn = document.querySelector('#prev')
        this.nextBtn = document.querySelector('#next')
        // Disable prevBtn on firt page
        if(global.page === 1){
            this.prevBtn.disabled = true
            // this.nextBtn.disabled = false
        }

        // Disable nextBtn on last Page

        if(global.page === global.totalPages){
            //  this.prevBtn.disabled = false
            this.nextBtn.disabled = true
        }
    
        this.prevBtn.addEventListener('click', this.prev.bind(this, global))
        this.nextBtn.addEventListener('click', this.next.bind(this,global))
    }

       // Previous
       async prev(global){

            global.page--
            this.paginationBtn.innerHTML = ''

            this.getUniStudents()
            console.log(global.page, 'from prev')
         
           
           
        }

        // Previous
       async next(global){
            global.page++
            this.paginationBtn.innerHTML = ''

            this.getUniStudents()
            
      
            
           
        }
}


export default UniformList