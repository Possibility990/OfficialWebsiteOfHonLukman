// import { Cursor } from "mongoose";
import newsAPI from "../services/newsAPI";
import Utility from "./utils";
const utils = new Utility()


class NewsFormList{
    constructor(){
     
   
        this._newsListEl = document.getElementById('news-list')
        this._newsDetailsEl = document.getElementById('news-details')
        
    }


    async _getNews(global){
        
        
        try{
            utils.showSpinner()
        const res = await newsAPI.getNews('news', global)
        
        const data = res.data.data
        this._render(data)
        utils.removeSpinner()
        utils.displayPagination(global)

            

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

 
    
    

}

export default NewsFormList