// import { Cursor } from "mongoose";
import newsAPI from "../services/newsAPI";
import Utility from "./utils";
const utils = new Utility()


class NewsFormList{
    constructor(){
    
   
        this._newsListEl = document.getElementById('news-list')
        this._newsDetailsEl = document.getElementById('news-details')
          this.paginationBtn = document.querySelector('#pagination')
        
    }


    async _getNews(global){
        
        
        try{
            utils.showSpinner()
        const res = await newsAPI.getNews('news', global)
        
        const data = res.data.data
        global.page = res.data.page
        global.totalPages = res.data.totalPages
        global.totalResults = res.data.totalResults
        
        this._render(data)
        utils.removeSpinner()
        this.displayPagination(global)

            

        }catch(error){
            alert('server Error')
            utils.removeSpinner();

        }
        
    }

    async getSingle(global){
        const id = window.location.search.split('=')[1]
    
        try{
            utils.showSpinner()
            const res = await newsAPI.getSingleNews(id, global, 'news')
            const data = res.data.data
            this._createNewsDetails(data)
            utils.removeSpinner()
            
            

        }catch(error)  {
          alert('server error')

        }
    }


   _createNewsDetails(news){

    const sectionsHTML = news.sections.map(section => {

        const imageHTML = section.image
        ? `<div class="img-div">
                <img src="${section.image}" class="img-fluid" alt="">
           </div>`
        : '';

        const textHTML = section.text
        ? `<p>${section.text}</p>`
        : '';

        return `
            ${imageHTML}
            ${textHTML}
        `;

    }).join('');

    this._newsDetailsEl.innerHTML = `
        <div class="container-news mt-5">

            <div>
                <h2><strong>${news.title}</strong></h2>
                <small>By L&K Media Team on ${news.date.slice(0,10)}</small>
            </div>

            ${sectionsHTML}

        </div>
    `;
}


    _render(news){
        this._newsListEl.innerHTML = news.map(news =>{

            return `
               <div class="col-12  col-md-4 col-lg-3 mt-5 mx-4" style="max-width: 18rem">
              
               <a href="newsDetails.html?id=${news._id}">
        <div class="card border-none">
        
            <div class="card-header bg-primary " id="card-head"><h5 class="card-title"><strong> ${news.title}</strong></h5>
            </div>
             <img data-id="${news._id}" class="background-img" src="${news.sections[0].image}" alt="">
            <small class="text-muted general-color mb-0">By L&K Media Team on ${news.date.slice(0,10)}</small>
            <div class="card-body ">
                <p class="card-text">${news.curiosityGap}</p>
            </div>

            </div>
            </a>
    </div>`
        }).join('')

       
    }



        displayPagination(global){
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

            this._getNews(global)
            console.log(global.page, 'from prev')
         
           
           
        }

        // Previous
       async next(global){
            global.page++
            this.paginationBtn.innerHTML = ''

            this._getNews(global)
            
      
            
           
        }


 
    
    

}

export default NewsFormList