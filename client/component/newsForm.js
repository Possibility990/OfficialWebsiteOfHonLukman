
// import ideasAPI from "../services/ideasAPI"
import newsAPI from "../services/newsAPI"
import Utility from "./utils"
const utils = new Utility()




class NewsForm{
    constructor(global){
        this.global = global
        this._formBox = document.getElementById('modal-child')
  
    }

    // ADD EVENT LISTENERS
    _addEventListeners(){
        this._newsForm.addEventListener('submit', this._handleSubmitEvent.bind(this))
    }

    // HANDLE SUBMIT EVENT

   async _handleSubmitEvent(e){
        e.preventDefault()
        const formData = new FormData(this._newsForm)
     
        // const title = formData.get('title');
        // const image1 = formData.get('sections[0][image]')
        // const paragraph1 = formData.get('sections[0][text]')
        // const image2 = formData.get('sections[1][image]')
        // const paragraph2 = formData.get('sections[1][text]')
        // const image3 = formData.get('sections[2][image]')
        // const paragraph3 = formData.get('sections[2][text]')


        const title = this._newsForm.elements.title.value
        const firstParagrap = this._newsForm.elements.text0.value
    
        //   VALIDATE FORM BEFORE SUBMISSION
        if(!title || !firstParagrap){
            alert('Title or first paragraph can not be empty ')
            return
        }



        // -- Show spinner 
        utils.showSpinner()
          const newNews = await newsAPI.postNews(formData, 'news', this.global)
    

        this._newsForm.reset();
        alert('News submited successfully')

        document.dispatchEvent(new Event('closeModal'))
            // -- Hide spinner
            utils.removeSpinner();

    }


    // RENDER FORM TO ADMIN PAGE
    render(){
             this._formBox.innerHTML = `<form action="" id="news-form">
  <div class="form-group">
    <label>Title</label>
    <input type="text" name="title">
  </div>

  <!-- NEW FIELD -->
  <div class="form-group">
    <label>Curiosity Hook</label>
    <input 
      type="text" 
      name="curiosityGap" 
      maxlength="120"
      placeholder="Enter curiosity gap headline (max 120 characters)">
  </div>

  <div class="form-group">
    <input type="file" name="image0" accept=".jpg,.png,image/*">
    <textarea name="text0" placeholder="Section 1 text"></textarea>
  </div>

  <div class="form-group">
    <input type="file" name="image1" accept=".jpg,.png,image/*">
    <textarea name="text1" placeholder="Section 2 text"></textarea>
  </div>

  <div class="form-group">
    <input type="file" name="image2" accept=".jpg,.png,image/*">
    <textarea name="text2" placeholder="Section 3 text"></textarea>
  </div>

  <button type="submit">Submit</button>
</form> `
            this._newsForm = document.getElementById('news-form')
            this._addEventListeners()
    }
}

export default NewsForm