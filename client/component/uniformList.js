
import newsAPI from "../services/newsAPI";


class UniformList{
    constructor(global, utils){
        this.UniformList = document.getElementById('uniform-list')
        this.global = global
        this.utils = utils
      
       

    }

    async getUniStudents(){
        
        try{
            this.utils.showSpinner()
            const res = await newsAPI.getNews('university-students', this.global)
          
            const datas = res.data.data
            
            
           this.createUniStudents(datas)
            this.utils.removeSpinner()
        }catch(error){
            console.log(error)
        }

    }

        createUniStudents(datas){
            console.log(datas)
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
}


export default UniformList