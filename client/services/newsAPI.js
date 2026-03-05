import axios from 'axios'

class NewsAPI{
    constructor(){
        //Before hosting
        this._APIURL = 'http://localhost:5000/api/news'
        //after hosting
        // this._APIURL = '/api/ideas'
    }

    getNews(){

        return axios.get(this._APIURL);
      
    }

    getSingleNews(id){
        return axios.get(`${this._APIURL}/${id}`)
    }

    
    postNews(data){
        
      return   axios.post(this._APIURL, data)
    }

    updateNews(id, data){
        return axios.put(`${this._APIURL}/${id}`, data)
    }

    deleteNews(id){
       
 
      return axios.delete(`${this._APIURL}/${id}`)
        
    }
}

export default new NewsAPI()