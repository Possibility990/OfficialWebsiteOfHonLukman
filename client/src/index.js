import './css/spinner.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css'


// import NewsAPI from '../services/newsAPI';
import global from '../component/global';
import Utility  from '../component/utils';
import Modal from '../component/modal';
import NewsForm  from '../component/newsForm';
import NewsFormList from '../component/newsFormList';



// const newsApi = new NewsAPI()
const utils = new Utility()
const newsForm = new NewsForm(global)
 const newFromList = new NewsFormList()








async function init(){
    switch(global.currentPage){
        case '/':
        case '/home.html':
        case '/index.html':
            console.log('you are in home page')
            // utils.showSpinner()
            newFromList._getNews(global);
        
            
            // utils.removeSpinner()

        break;
        case '/about.html':
          
            console.log('you are in about')
        break;
        case '/university.html':
            console.log('your are in university page')
        break;
        case '/college.html':
            console.log('you are in college page')
        break;
        case '/newsDetails.html':
            console.log('you are in news details page')
            newFromList.getSingle(global);
        break;
        case '/admin.html':
            console.log('you are in admin page')
            const modal = new Modal()
            newsForm.render();
            // utils.showSpinner();
            // newsForm.postNews();
            // utils.removeSpinner();
            // utils.removeSpinner()
        break;
    }

    utils.highlightActiveLink()
}


document.addEventListener('DOMContentLoaded', init)

