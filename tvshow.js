import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc,getDoc,setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBNJxtZgQ64UNMUuctUQKjQvUX93TIO2RE",
    authDomain: "osm-auth.firebaseapp.com",
    projectId: "osm-auth",
    storageBucket: "osm-auth.appspot.com",
    messagingSenderId: "538945508541",
    appId: "1:538945508541:web:a6ee02a300ee11c88a13d4",
    measurementId: "G-B4DKVTE7CG"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth();
  const docRef = doc(db, 'tvid', 'tvdocumentId');

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
    }
  };
fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
.then(response => response.json())
.then(response => {
        console.log(response)
        let images = `<div class="showsimg">`;
        response.results.forEach(function (poster) {
            var base_url = "https://image.tmdb.org/t/p/original";
            //console.log(poster.original_title);//
            images += `
            <div class="tv-image">
            <img src=${base_url + poster.poster_path}><p id="inteltv">${poster.overview}</p><h4 id="tv-id">${poster.id}</h4><h4>${poster.name}</h4><p id="genretv-id">${poster.genre_ids}<p id="release-date">${poster.first_air_date}</p></div>`;
        });
        document.getElementById('tv-grid').innerHTML = images;

        var gridd = document.querySelector('.showsimg')
        var tvarray = gridd.children

        //search function//
        var search = document.getElementsByClassName('form-group')[0]
        const searcharray=response.results
        search.addEventListener('keyup', function (e) {
            var gridd = document.querySelector('.showsimg')
            var tvarray = gridd.children
            function searchtvclick(){
                for (let j = 0; j < tvarray.length; j++) {
                    var tvnamelist = tvarray[j]
                    var showname=(tvnamelist.children[3].innerText)
                    var tvname = e.target.value.toLowerCase();
                    var x = showname.toLowerCase()
                        if (x == tvname) {
                            var poster=searcharray[j].poster_path
                            var backdrop=searcharray[j].backdrop_path
                            var base_url = "https://image.tmdb.org/t/p/original"
                            x=tvarray[j].children[0]
                            let tvinfo=`<div id="searchtv-page" style="background-image:linear-gradient(rgba(0, 0, 0, 0.500), rgba(227, 56, 243, 0.544)),url(${base_url+backdrop});>
                            <div class="contenttv">
                            <img src=${base_url+poster}><div class="databasetv"><h1>${tvarray[j].children[3].innerText}</h1><h2>Overview</h2><p>${tvarray[j].children[1].innerText}</p></div></div></div>`
                            document.getElementById('movie-box').style.display = "none";
                            document.getElementById('navbar').style.display = "none";
                            document.getElementById('showcase').style.display = "none";
                            document.getElementById('tv-box').style.display = "none";
                            document.getElementById('overviewtv-class').innerHTML=tvinfo
                            document.getElementById('overviewtv-class').style.display="block"
                        }
                        else{
                           continue
                        }
                    }
            }
            document.getElementById('return').addEventListener('click',function(){
                document.getElementById('movie-box').style.display = "block";
                document.getElementById('navbar').style.display = "block";
                document.getElementById('showcase').style.display = "block";
                document.getElementById('tv-box').style.display = "block";
                document.getElementById('overviewtv-class').style.display="none";
            })
        document.querySelector('#searchbtn').addEventListener('click',searchtvclick)
        })

    //overview//
    const overview = document.getElementsByClassName("tv-image");
    const imgarray=response.results
    const id=[]
        for(let i = 0; i < imgarray.length ; i++){
            var base_url = "https://image.tmdb.org/t/p/original";
           //watchlist btn//
           const addToWatchlisttvBtn = document.createElement('button');
           addToWatchlisttvBtn.id='add-to-watchlist-btn';
           addToWatchlisttvBtn.innerHTML =`<i class="bi bi-bookmark" id="bookmark"></i>`
           //rating btn//
           const ratingtvbtn=document.createElement('button')
           ratingtvbtn.id='add-ratingtv-btn';
           ratingtvbtn.innerHTML=`<i class="bi bi-star-fill"></i>
                   <div class="drop-down-rating">
                       <ul id="rate-list">
                           <button type="button" class="rate" id="1"><li><i class="bi bi-star"></i></li></button>
                           <button type="button" class="rate" id="2"><li><i class="bi bi-star"></i></li></button>
                           <button type="button" class="rate" id="3"><li><i class="bi bi-star"></i></li></button>
                           <button type="button" class="rate" id="4"><li><i class="bi bi-star"></i></li></button>
                           <button type="button" class="rate" id="5"><li><i class="bi bi-star"></i></li></button>
                       </ul>
               </div>`
            const showratingtv=document.createElement('div')
            showratingtv.id='show-ratingtv'
            showratingtv.innerHTML=``
            //video btn//
            const vidtvbtn=document.createElement('button')
            vidtvbtn.id='add-videotv-btn'
            vidtvbtn.innerHTML=`<i class="bi bi-play-fill"></i><br>`   
            overview[i].addEventListener("click" , () =>{
                 var poster=imgarray[i].poster_path
                 var backdrop=imgarray[i].backdrop_path
                 id.push(overview[i].children[2].innerText)
                 var x=overview[i].children[0]
                const tvinfo=`<div id="overviewtv-page" style="background-image:linear-gradient(rgba(0, 0, 0, 0.500),rgba(227, 56, 243, 0.644)),url(${base_url+backdrop});>
                <div class="contentstv"><img src=${base_url+poster}><div id="datatv"><div id="top-part"><h1>${overview[i].children[3].innerText}</h1><p id="date">${overview[i].children[5].innerText}</p></div><div id=paratv><h2>Overview</h2><p>${overview[i].children[1].innerText}</p></div></div></div></div>`
                document.getElementById('movie-box').style.display = "none";
                document.getElementById('navbar').style.display = "none";
                document.getElementById('showcase').style.display = "none";
                document.getElementById('tv-box').style.display = "none";
                document.getElementById('overviewtv-class').innerHTML=tvinfo
                document.getElementById('overviewtv-class').style.display="block";
                var o=document.getElementById('top-part')
                o.appendChild(addToWatchlisttvBtn)
                o.appendChild(ratingtvbtn)
                o.appendChild(vidtvbtn)
                o.appendChild(showratingtv)
                for(let j=0;j<id.length;j++){
                    const data=(id[j])
                    onAuthStateChanged(auth, (user) => {
                    var b=document.getElementById('add-to-watchlist-btn')
                    b.addEventListener('click',addToWatchlist(data))
                    b.addEventListener('click',function(){
                        b.innerHTML=`<i class="bi bi-bookmark-check-fill"></i>`
                        b.style.color="rgb(69, 244, 16)" 
                    })
                    function addToWatchlist(movieId) {
                        const userId = user.uid;
                       
                        const watchlistRef = doc(db, 'tv-watchlists', userId);
                    
                        // Get the current watchlist data
                        getDoc(watchlistRef).then((docSnapshot) => {
                          if (docSnapshot.exists()) {
                            // Watchlist document exists, update the watchlist array
                            const watchlistData = docSnapshot.data();
                            const updatedWatchlist = watchlistData.tvshows || [];
                    
                            if (!updatedWatchlist.includes(movieId)) {
                              updatedWatchlist.push(movieId);
                              // Update the watchlist in Firestore
                              setDoc(watchlistRef, { tvshows: updatedWatchlist });
                            } else {
                              
                            }
                          } else {
                            // Watchlist document doesn't exist, create a new one
                            setDoc(watchlistRef, { tvshoes: [movieId] });
                          }
                        });
                      }
                    })
            }
                document.getElementById('add-ratingtv-btn').addEventListener('click',function(){
                    var btn=document.querySelector('.drop-down-rating')
                    btn.classList.add("active")
                    const idvalue=overview[i].children[2].innerText
                    var x=document.getElementById('rate-list')
                    var y=x.children
                        for(let i=0;i<y.length;i++){
                            var z=document.getElementsByClassName('rate')
                            z[i].addEventListener('click',function(){
                                var u=document.querySelector('.popup')
                                u.classList.add('active')
                                if(y[i].id==z[i].id){
                                    const options = {
                                        method: 'POST',
                                        headers: {
                                          accept: 'application/json',
                                          'Content-Type': 'application/json;charset=utf-8',
                                          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                                        },
                                        body:JSON.stringify({value:y[i].id}) 
                                      };
                                      
                                      fetch('https://api.themoviedb.org/3/tv/'+idvalue+'/rating', options)
                                        .then(response => response.json())
                                        .then(response => console.log(response))
                                        .catch(err => console.error(err));
                                    }
                                z[i].addEventListener('mouseleave',function(){
                                    var u=document.querySelector('.popup')
                                    u.classList.remove('active')
                                    const options = {
                                        method: 'GET',
                                        headers: {
                                          accept: 'application/json',
                                          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                                        }
                                      };
                                      
                                      fetch('https://api.themoviedb.org/3/account/20861391/rated/tv?language=en-US&page=1&sort_by=created_at.asc', options)
                                        .then(response => response.json())
                                        .then(response => {
                                            response.results.forEach(function(idval){
                                                if(idval.id==idvalue){
                                                    document.getElementById('show-ratingtv').innerHTML=`<p>Your rating: ${idval.rating}</p>`
                                                }
                                            })
                                        })
                                        .catch(err => console.error(err));
                                })
                            })
                        }
                        document.getElementById('add-ratingtv-btn').addEventListener('mouseleave',function(){
                            var btn=document.querySelector('.drop-down-rating')
                            btn.classList.remove('active')
                        })
                }) 
                    var v=document.getElementById('add-videotv-btn')
                    v.addEventListener('click',function(){
                        const idvalue=overview[i].children[2].innerText
                        const options = {
                            method: 'GET',
                            headers: {
                              accept: 'application/json',
                              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                            }
                          };
                          
                          fetch('https://api.themoviedb.org/3/tv/'+idvalue+'/videos?language=en-US', options)
                            .then(response => response.json())
                            .then(response =>{
                                const keyarray=[]
                                response.results.forEach(function(idvid){
                                    keyarray.push(idvid.key)
                                })
                                var basevid_url="https://www.youtube.com/embed/"
                                    var key=keyarray.slice(-1)
                                    document.getElementById('display-video').innerHTML=`<iframe width="600" height="350"  src="https://www.youtube.com/embed/${key}" style="border:none"></iframe>`
                                    document.getElementById('overviewtv-page').style.zIndex="-1"
                                    document.getElementById('overviewtv-page').style.filter="blur(2px)" 
                            })
                            .catch(err => console.error(err));
                    })
 
            })
        }
        document.getElementById('return').addEventListener('click',function(){
            document.getElementById('movie-box').style.display = "block";
            document.getElementById('navbar').style.display = "block";
            document.getElementById('showcase').style.display = "block";
            document.getElementById('tv-box').style.display = "block";
            document.getElementById('overviewtv-class').style.display="none"
            document.getElementById('display-video').innerHTML=``
        
        //genres tv//
        var Drama=document.getElementById('Dramatv')
            Drama.addEventListener('click',function(){
                let images=`<div id=movie-genretv><h2>Drama</h2>`
                response.results.forEach(function(id){
                    var genrelist=id.genre_ids
                for(let i in genrelist){
                    if(genrelist[i]==18){
                        var base_url = "https://image.tmdb.org/t/p/original";
                        images+=`<div class="imgtv"><img src=${base_url + id.poster_path} alt="action"><p>${id.name}</p></div>`
                    }
                }
            })
            document.getElementById('movie-box').style.display = "none";
            document.getElementById('navbar').style.display = "none";
            document.getElementById('showcase').style.display = "none";
            document.getElementById('tv-box').style.display="none"
            document.getElementById('overviewtv-class').innerHTML=images
            document.getElementById('overviewtv-class').style.display="block"
    })
 
        var Action=document.getElementById('Actiontv')
        Action.addEventListener('click',function(){
            let images=`<div id=movie-genretv><h2>Action</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==28){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="imgtv"><img src=${base_url + id.poster_path} alt="action"><p>${id.name}</p></div>`
                }
            }
        })
        document.getElementById('movie-box').style.display = "none";
        document.getElementById('navbar').style.display = "none";
        document.getElementById('showcase').style.display = "none";
        document.getElementById('tv-box').style.display="none"
        document.getElementById('overviewtv-class').innerHTML=images
        document.getElementById('overviewtv-class').style.display="block"
        
})

        var Comedy=document.getElementById('Comedytv')
        Comedy.addEventListener('click',function(){
            let images=`<div id=movie-genretv><h2>Comedy</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==35){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="imgtv"><img src=${base_url + id.poster_path} alt="action"><p>${id.name}</p></div>`
                }
            }
        })
        document.getElementById('movie-box').style.display = "none";
        document.getElementById('navbar').style.display = "none";
        document.getElementById('showcase').style.display = "none";
        document.getElementById('tv-box').style.display="none"
        document.getElementById('overviewtv-class').innerHTML=images
        document.getElementById('overviewtv-class').style.display="block"
})
    var Family=document.getElementById('Familytv')
    Family.addEventListener('click',function(){ 
        let images=`<div id=movie-genretv><h2>Family</h2>`
        response.results.forEach(function(id){
            var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==10751){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="imgtv"><img src=${base_url + id.poster_path} alt="action"><p>${id.name}</p></div>`
                }
            }  
        })
        document.getElementById('movie-box').style.display = "none";
        document.getElementById('navbar').style.display = "none";
        document.getElementById('showcase').style.display = "none";
        document.getElementById('tv-box').style.display="none"
        document.getElementById('overviewtv-class').innerHTML=images
        document.getElementById('overviewtv-class').style.display="block"
})
var Drama=document.getElementById('Dramatvmenu')
            Drama.addEventListener('click',function(){
                let images=`<div id=movie-genre><h2>Drama</h2>`
                response.results.forEach(function(id){
                    var genrelist=id.genre_ids
                for(let i in genrelist){
                    if(genrelist[i]==18){
                        var base_url = "https://image.tmdb.org/t/p/original";
                        images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.name}</p></div>`
                    }
                }
            })
            document.getElementById('movie-box').style.display = "none";
            document.getElementById('navbar').style.display = "none";
            document.getElementById('showcase').style.display = "none";
            document.getElementById('tv-box').style.display="none"
            document.getElementById('overview-class').innerHTML=images
            document.getElementById('overview-class').style.display="block"
    })
 
        var Action=document.getElementById('Actiontvmenu')
        Action.addEventListener('click',function(){
            let images=`<div id=movie-genre style=background-image><h2>Action</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==28){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.name}</p></div>`
                }
            }
        })
        document.getElementById('movie-box').style.display = "none";
        document.getElementById('navbar').style.display = "none";
        document.getElementById('showcase').style.display = "none";
        document.getElementById('tv-box').style.display="none"
        document.getElementById('overview-class').innerHTML=images
        document.getElementById('overview-class').style.display="block"
        
})

        var Comedy=document.getElementById('Comedytvmenu')
        Comedy.addEventListener('click',function(){
            let images=`<div id=movie-genre><h2>Comedy</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==35){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.menu}</p></div>`
                }
            }
        })
        document.getElementById('movie-box').style.display = "none";
        document.getElementById('navbar').style.display = "none";
        document.getElementById('showcase').style.display = "none";
        document.getElementById('tv-box').style.display="none"
        document.getElementById('overview-class').innerHTML=images
        document.getElementById('overview-class').style.display="block"
})
    var Family=document.getElementById('Familytvmenu')
    Family.addEventListener('click',function(){ 
        let images=`<div id=movie-genre><h2>Family</h2>`
        response.results.forEach(function(id){
            var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==10751){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.menu}</p></div>`
                }
            }
  
        })
        document.getElementById('movie-box').style.display = "none";
        document.getElementById('navbar').style.display = "none";
        document.getElementById('showcase').style.display = "none";
        document.getElementById('tv-box').style.display="none"
        document.getElementById('overview-class').innerHTML=images
        document.getElementById('overview-class').style.display="block"
})

})
});
//Getting Watchlist TV Shows//
onAuthStateChanged(auth, (user) => {
    document.getElementById('showsbtn').addEventListener('click',displayWatchlist)
    function displayWatchlist() {
        const userId = user.uid;
        const watchlistRef = doc(db, 'tv-watchlists', userId);
        getDoc(watchlistRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const watchlistData = docSnapshot.data();
            const watchlist = watchlistData.tvshows || [];
            const dataarray=[]
            watchlist.forEach((tvId) => {
              console.log(tvId)
              const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                },
            };
            
            fetch('https://api.themoviedb.org/3/tv/'+tvId+'?language=en-US&page=1', options)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    dataarray.push(data)
                    let watchlistmov=`<div id="watchlist-movie">
                    <h1>My Watchlist</h1>`
                    for(let i=0;i<dataarray.length;i++){
                        var base_url = "https://image.tmdb.org/t/p/original";
                        watchlistmov+=`<div class="list" style="background-image:linear-gradient(rgba(0, 0, 0, 0.800), rgba(227, 56, 243, 0.700)),url(${base_url+dataarray[i].backdrop_path});">
                                  <img src=${base_url+dataarray[i].poster_path}><div class="informationtv"><h2>${dataarray[i].name}</h2><p>${dataarray[i].overview}</p></div></div>`
                    }
                document.getElementById('overviewtv-class').innerHTML=watchlistmov
                document.getElementById('overviewtv-class').style.display="block"
                document.getElementById('userid-container').style.display="none"
                document.getElementById('movie-box').style.display = "none";
                document.getElementById('navbar').style.display = "none";
                document.getElementById('showcase').style.display = "none";
                document.getElementById('tv-box').style.display="none"
                });
            })
            
        } 
        })
      }
    })



    