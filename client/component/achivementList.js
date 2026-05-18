import newsAPI from "../services/newsAPI";


class AchievementList{
    constructor(global, utils){
        this.achievementList = document.getElementById('section-container')
        this.global = global
        this.utils = utils
        this.getAchievements()
      
       

    }

    async getAchievements(){
        
        try{
            this.utils.showSpinner()
            const res = await newsAPI.getNews('achievements', this.global)
          
            const datas = res.data.data
            
            // this.global.page = res.data.page;
            // this.global.totalPages = res.data.totalPages;
          
            
             this.createAchievement(datas)
        //    this.displayPagination(this.global)
            this.utils.removeSpinner()
        }catch(error){
            console.log(error)
        }

    }

        async createAchievement(datas){

            const page = this.global.currentPage
            const current = page.slice(1)
            const currentPage = current.split('.')[0]
            console.log(currentPage, page)

        const filterAchievement = datas.filter((data)=>{
            return data.projectcateogry.toLowerCase() === currentPage
            
        })

        const actualAchievement = filterAchievement.map(data=>{

            const image = data.images.map(image=>{
            
                    return `
                    ${image.url? `
                          <div class="col-12 col-md-6 col-lg-4">
                    <div class="card h-100">
                        <div id="ach-div">
                        <img src="${image.url}" class="img-fluid" alt="">
                        </div>
                        
                         <h4 id="caption" class=" text-wrap m-0">
                            ${image.caption || ''}
                        </h4>
                        
                    </div>
                    </div>
                        
                        ` : ''}
                    `
            }).join('');

            return `
        
    <section  id="achivement" class="text-center mt-5">
                ${data.video? `  <div class="video-div">
            <iframe 
            width="560" 
            height="315" 
            src="${data.video}" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>
            <p>${data.videocaption || ''} </p>
        </div>` : ''}

               <div id="title" class="mt-3"><p>${data.title || ''}</p> ${data.link ? `<span><a  target="_blank" href="">Read More</a></span>`: ''}</div>
        <div class="row g-4 mt-3">     
                    ${image}

         </div>
   </section>    
            
            `
        }).join('')


            this.achievementList.innerHTML = actualAchievement
        //    switch(this.global.currentPage){
        //     case '/education.html':
        //         console.log('educatoin')
        //     break;
        //     case '/health.html':
        //         console.log('health');
        //     break;
        //     case '/agriculture.html':
        //         console.log('ariculture')
        //     break;
        //     case '/employment.html':
        //         console.log('employment');
        //     break;
        //     case '/empowerment.html':
        //         console.log('empowerment')
        //     break;
        //     case 'festive-supply.html':
        //         console.log('festive supply');
        //     break;                
        //     case '/human-capital.html':
        //         console.log('human capital');
        //     break;
        //     case '/palliative.html':
        //         console.log('palliative');
        //     break
        //     case '/road-infrastructure.html':
        //         console.log('road insgrasture');
        //     break;
        //     case '/ruralelect.html':
        //         console.log('rural elect');
        //     break;
        //     case '/skill-acquisition.html':
        //         console.log('skill');
        //     break;
        //     case '/water-supply.html':
        //         console.log('water suppluy')
        //    }
        
            
                
            
        
     }

               }


export default AchievementList