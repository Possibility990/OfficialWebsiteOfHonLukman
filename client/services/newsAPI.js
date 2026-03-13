import axios from 'axios'

class NewsAPI{
    constructor(){
        //Before hosting
      
       
       
        //after hosting
        // this._APIURL = '/api/ideas'
    }

    getNews(endPoint, global){
        
            
        // console.log('hello bili',this.global.APIURL)
        return axios.get(`${global.APIURL}${endPoint}?page=${global.page}`);
        // return axios.get('http://localhost:5000/api/news?page=1');
      
    }

    getSingleNews(id, global, endPoint){
        return axios.get(`${global.APIURL}${endPoint}/${id}`)
    }

    
    postNews(data, endPoint, global){
        console.log(global.APIURL, 'from post news')
        
      return   axios.post(`${global.APIURL}${endPoint}`, data)
    }

    updateNews(id, data, endPoint){
        return axios.put(`${global.APIURL}${endPoint}/${id}`, data)
    }

    deleteNews(id, endPoint){
       
 
      return axios.delete(`${global.APIURL}${endPoint}/${id}`)
        
    }
}

export default new NewsAPI()