const apikey="02ae867dcdf14639a290bc6f442307c9";
var article_area=document.getElementById("news-articles");

function getNews(news){
  let output="";
  if(news.totalResults>0){
    news.articles.forEach(ind=>{
      output+= 
        ` <section class="container">
          <li class="article"><a class="article-link" href="${ind.url}" target="_blank">
          <div class="img_area">
          <img src="${ind.urlToImage}" class="article-img" alt="${ind.title}"></img>
          </div>
          <h2 class="article-title">${ind.title}</h2>
          <p class="article-description">${ind.description || "Description not available"}</p> <br>
          <span class="article-author">-${ind.author? ind.author: "Anon"}</span><br>
          </a>
          </li>
          </section>
        `;
    });
    article_area.innerHTML=output;
  }
  else
  { 
    article_area.innerHTML='<li class="not-found">No article was found based on the search.</li>';
  }
};

async function retreive(searchValueText=""){

    article_area.innerHTML='<p class="load">News are Loading...</p>';
    
    if(searchValueText!=""){
      url=`https://newsapi.org/v2/everything?q=${searchValueText}&apiKey=${apikey}`;
    }
    else
    {
      url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
    }
    const response=await fetch(url);
    const result=await response.json();
    getNews(result);
}

async function searchvalue(e){  
    if (event.key === "Enter")
     {
      retreive(e.target.value);
     }
};

function start(){
  document.getElementById("search").addEventListener('keypress',searchvalue);
  retreive();
}

(function(){
  start();}
)();