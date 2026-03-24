
class GlobalState{
    constructor(){
    this.currentPage = window.location.pathname
    // this.APIURL = '/api/'
    this.APIURL = 'http://localhost:5000/api/'
    this.page = 1
    this.totalPages = 1
    this.resutlt  = 0
    this.totalResult= 0


}

        
}

export default  new GlobalState()