import { Cursor } from "mongoose";
import newsAPI from "../services/newsAPI";
import Utility from "./utils";
const utils = new Utility()


class NewsFormList{
    constructor(){
        // this._getNews()
        this._newsListEl = document.getElementById('news-list')
        this._newsDetailsEl = document.getElementById('news-details')
        
    }

    async _getNews(){

        try{
            // utils.showSpinner()
        const res = await newsAPI.getNews()
        // utils.removeSpinner()
        const data = res.data.data

        this._render(data)

            

        }catch(error){
            console.log(error)

        }
        
    }

    async getSingle(){
        const id = window.location.search.split('=')[1]
    
        try{
            utils.showSpinner()
            const res = await newsAPI.getSingleNews(id)
            utils.removeSpinner()
           const data = res.data.data
           this._createNewsDetails(data)
            
            

        }catch(error)  {
            console.log(error)

        }
    }


    _createNewsDetails(news){
        // console.log(news.sections[0].text)
        this._newsDetailsEl.innerHTML = `
       
         <div class="container-news mt-5">
    <div>
        <h2 class=""><strong>${news.title}</strong></h2>
        <small>By L&K Media Team on ${news.date}</small>
    </div>
    <div id="img-div">
        <img src="${news.sections[0].image}" alt="">
    </div>

    <div>
        <p>${news.sections[0].text}</p>
    </div>

    <div id="img-div">
        <img src="${news.sections[1].image}" alt="">
    </div>

    <div>
        <p>${news.sections[1].text}</p>
    </div>

    <div id="img-div">
        <img src="${news.sections[2].image}" class="img-fluid" alt="">
    </div>

    <div>
        <p>${news.sections[2].text}</p>
    </div>

 
        
 </div>
        
        `

    }


    _render(news){
        console.log('hello')
        this._newsListEl.innerHTML = news.map(news =>{

            console.log(news)

            return `
               <div class="col-12  col-md-4 col-lg-3 mt-5 mx-4" style="max-width: 18rem">
              
               <a href="newsDetails.html?id=${news._id}">
        <div class="card border-none">
        
            <div class="card-header bg-primary " id="card-head"><h5 class="card-title"><strong> ${news.title}</strong></h5>
            </div>
             <img data-id="${news._id}" class="background-img" src="${news.sections[0].image}" alt="">
            <small class="text-muted general-color mb-0">By L&K Media Team on ${news.date}</small>
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