import './css/spinner.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css'

import Utility  from '../component/utils';
import Modal from '../component/modal';
import NewsForm  from '../component/newsForm';
import NewsFormList from '../component/newsFormList';


const utils = new Utility()
const newsForm = new NewsForm()
 const newFromList = new NewsFormList()





const global = {
    currentPage: window.location.pathname,
    APIURL: 'api/news'
}


async function init(){
    switch(global.currentPage){
        case '/':
        case '/home.html':
        case '/index.html':
            console.log('you are in home page')
            // utils.showSpinner()
            newFromList._getNews();
            
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
            newFromList.getSingle();
        break;
        case '/admin.html':
            console.log('you are in admin page')
            const modal = new Modal
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

