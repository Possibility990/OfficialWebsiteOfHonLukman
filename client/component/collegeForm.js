
import newsAPI from "../services/newsAPI"


class CollegeForm{
    constructor(global, utils){
    this.collegeForm = document.querySelector('#college-form')
    this.fileInput = document.querySelector("#fileInput")
    this._preview = document.getElementById('preview')

    this.global= global
    this.utils = utils
    this.addEventListener()
  
   
    }

    addEventListener(){
        this.collegeForm.addEventListener('submit', this.handleUniSubmit.bind(this))
        this.fileInput.addEventListener('change', this._changeEvent.bind(this))
    }


     _changeEvent(){
        const file =  this.fileInput.files[0]

        if(file){
            const reader = new FileReader()

            reader.onload =  (e)=> {
            this._preview.src = e.target.result;
            this._preview.style.display = "block";
    };

            reader.readAsDataURL(file);
            
        }

    }



   async handleUniSubmit(e){
      if (!this.collegeForm.reportValidity()) return;
        e.preventDefault()
        const formData = new FormData(this.collegeForm);
      

// formData.append("image", this.fileInput.files[0]);
// formData.append("fullName", this.uniForm.elements.fullName.value);
// formData.append("level", this.uniForm.elements.level.value);
// formData.append("degree", this.uniForm.elements.degree.value);
// formData.append("course", this.uniForm.elements.course.value);
// formData.append("email", this.uniForm.elements.email.value);
// formData.append("tell", this.uniForm.elements.tell.value);
// formData.append("lga", this.uniForm.elements.lga.value);
// formData.append("address", this.uniForm.elements.address.value);
// formData.append("dob", this.uniForm.elements.dob.value);
// formData.append("parentName", this.uniForm.elements.parentName.value);
// formData.append("parentTell", this.uniForm.elements.parentTell.value);
    //    console.log(formData.values())

    

 
        // const fullName = this.uniForm.elements['full-name'].value
        // const level = this.uniForm.elements.level.value
        // const degree = this.uniForm.elements.degree.value
        // const course = this.uniForm.elements.course.value
        // const email = this.uniForm.elements.email.value
        // const tell = this.uniForm.elements.tel.value
        // const lga = this.uniForm.elements.lga.value
        // const address = this.uniForm.elements.address.value
        // const dob = this.uniForm.elements.dob.value
        // const parentName = this.uniForm.elements['parent-name'].value
        // const parentTell = this.uniForm.elements['parent-tell'].value

        // console.log(fullName, level, degree, course,email,tell,lga,address,dob,parentName,parentTell)

    // validate form

    const maxSize = 300 * 1024

        if(this.fileInput.files.length === 0){
             alert('Please upload a file')
            return
        
        }else if(this.fileInput.files[0].size > maxSize){
               alert('file size can not be greater than 300kb')
            return

        }

        //    post uni students
        this.utils.showSpinner()
       
        const collegeStudents = await newsAPI.postNews(formData, 'college-students', this.global)
        this.utils.removeSpinner()

        this.collegeForm.reset()
        alert('Data uploaded successfully')
        this._preview.style.display = 'none'
        // console.log(uniStudents)

    }

  
    

    
}


export default CollegeForm;