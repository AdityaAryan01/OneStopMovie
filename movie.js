import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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
const docRef = doc(db, 'movieid', 'documentId'); 
const auth = getAuth();
const provider = new GoogleAuthProvider();



onAuthStateChanged(auth, (user) => {
    if(user) {
        document.getElementById('userid-container').innerHTML=user.uid
        document.getElementById('signOutButton').style.display='block'
        document.getElementById('Login').style.display='none'
        console.log(user)
        if(user.displayName==null){
            var DName=user.email.split('@');
            console.log(DName[0])
            document.getElementById('header').innerHTML="Welcome " + DName[0];
            document.getElementById('u-name').innerHTML= DName[0];
        }
        else{
            document.getElementById('header').innerHTML="Welcome " + user.displayName;
            document.getElementById('u-name').innerHTML=user.displayName;
            console.log(user.displayName)
        }

    } else {
        document.getElementById('signOutButton').style.display="none"
        document.getElementById('Login').style.display='block'
        document.getElementById('header').innerHTML="Welcome"

    }
  })
  const signOutButton = document.getElementById('signOutButton');
        const userSignOut = async() => {
            signOut(auth).then(() => {
                alert('you have signed out succesfully!')
                document.getElementById('header').innerHTML="Welcome"
                document.getElementById('u-name').innerHTML="Guest"
            }).catch((error) => {})
        }
        signOutButton.addEventListener('click', userSignOut);
        	



function hambrgr() {
    var hb = document.querySelector('#hamburger');
    hb.addEventListener('click', btnclick);
    var menu = document.querySelector('.main-menu');
    menu.addEventListener('mouseleave', bttnclick);
    function btnclick() {
        menu.classList.add('active');
    }
    function bttnclick() {
        menu.classList.remove('active');
    }
}
document.getElementById('button').addEventListener('click',hambrgr())



//Trending Movies//
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
    },
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then((response) => {
        console.log(response)
        let images = `<div class="image">`;
        response.results.forEach(function (poster) {
            var base_url = "https://image.tmdb.org/t/p/original";
            //console.log(poster.original_title);//
            images += `
            <div class="movie-image">
            <div id="img-click"><img src=${base_url + poster.poster_path}></div><p id="intel">${poster.overview}</p><h4 id="movie-id">${poster.id}</h4><h4>${poster.original_title}</h4><p id="genre-id">${poster.genre_ids}<p id="release-date">${poster.release_date}</p></div>`;
        });
        document.getElementById('img-grid').innerHTML = images;

    //overview//
    const overview = document.getElementsByClassName("movie-image");
    const imgarray=response.results
    const id=[]
        for(let i = 0; i < imgarray.length ; i++){
            //watchlist btn//
            const addToWatchlistBtn = document.createElement('button');
            addToWatchlistBtn.id='add-to-watchlist-btn';
            addToWatchlistBtn.innerHTML =`<i class="bi bi-bookmark" id="bookmark"></i>`
            //rating btn//
            const ratingbtn=document.createElement('button')
            ratingbtn.id='add-rating-btn';
            ratingbtn.innerHTML=`<i class="bi bi-star-fill"></i>
                    <div class="drop-down-rating">
                        <ul id="rate-list">
                            <button type="button" class="rate" id="1"><li><i class="bi bi-star"></i></li></button>
                            <button type="button" class="rate" id="2"><li><i class="bi bi-star"></i></li></button>
                            <button type="button" class="rate" id="3"><li><i class="bi bi-star"></i></li></button>
                            <button type="button" class="rate" id="4"><li><i class="bi bi-star"></i></li></button>
                            <button type="button" class="rate" id="5"><li><i class="bi bi-star"></i></li></button>
                        </ul>
                </div>`
            const showrating=document.createElement('div')
            showrating.id='show-rating'
            showrating.innerHTML=``
                //video btn//
                const vidbtn=document.createElement('button')
                vidbtn.id='add-video-btn'
                vidbtn.innerHTML=`<i class="bi bi-play-fill"></i><br>`
                var base_url = "https://image.tmdb.org/t/p/original";
                 overview[i].firstElementChild.addEventListener("click" , () =>{
                 var poster=imgarray[i].poster_path
                 var backdrop=imgarray[i].backdrop_path
                 id.push(overview[i].children[2].innerText)
                 var x=overview[i].children[0]
                const info=`<div id="overview-page" style="background-image:linear-gradient(rgba(0, 0, 0, 0.750),rgba(227, 56, 243, 0.600)),url(${base_url+backdrop});>
                <div class="contents"><img src=${base_url+poster}><div id="data"><div id="top-part"><h1>${overview[i].children[3].innerText}</h1><p id="date">${overview[i].children[5].innerText}</p></div><div id=para><h2>Overview</h2><p>${overview[i].children[1].innerText}</p></div></div></div></div>`
                document.getElementById('movie-box').style.display = "none";
                document.getElementById('navbar').style.display = "none";
                document.getElementById('showcase').style.display = "none";
                document.getElementById('tv-box').style.display = "none";
                document.getElementById('overview-class').innerHTML=info
                document.getElementById('overview-class').style.display="block";
                var o=document.getElementById('top-part')
                o.appendChild(addToWatchlistBtn)
                o.appendChild(ratingbtn)
                o.appendChild(vidbtn)
                o.appendChild(showrating)
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
                            const watchlistRef = doc(db, 'watchlists', userId);
                        
                            // Get the current watchlist data
                            getDoc(watchlistRef).then((docSnapshot) => {
                              if (docSnapshot.exists()) {
                                // Watchlist document exists, update the watchlist array
                                const watchlistData = docSnapshot.data();
                                const updatedWatchlist = watchlistData.movies || [];
                        
                                if (!updatedWatchlist.includes(movieId)) {
                                  updatedWatchlist.push(movieId);
                                  // Update the watchlist in Firestore
                                  setDoc(watchlistRef, { movies: updatedWatchlist });
                                } else {
                                  
                                }
                              } else {
                                // Watchlist document doesn't exist, create a new one
                                setDoc(watchlistRef, { movies: [movieId] });
                              }
                            });
                          }
                        })
                }  
                    document.getElementById('add-rating-btn').addEventListener('click',function(){
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
                                        localStorage.setItem('rating',y[i].id)
                                        const opt = {
                                            method: 'POST',
                                            headers: {
                                            accept: 'application/json',
                                            'Content-Type': 'application/json;charset=utf-8',
                                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                                            },
                                            body:JSON.stringify({value:y[i].id}) 
                                        };
                                        
                                        fetch('https://api.themoviedb.org/3/movie/'+idvalue+'/rating', opt)
                                            .then(response => response.json())
                                            .then(response=>{console.log(y[i].id)})
                                            
                                            .catch(err => console.error(err));
                                        z[i].addEventListener('mouseleave',function(){
                                        var u=document.querySelector('.popup')
                                        u.classList.remove('active')
                                        })
                                        document.getElementById('add-rating-btn').addEventListener('mouseleave',function(){
                                            var btn=document.querySelector('.drop-down-rating')
                                            btn.classList.remove('active')
                                            document.getElementById('show-rating').innerHTML=document.getElementById('show-rating').innerHTML=`<p>Your rating:${localStorage.getItem('rating')}</p>`
                                        })
                                    }
                                })
                            }
                    })

                    var v=document.getElementById('add-video-btn')
                    v.addEventListener('click',function(){
                        const idvalue=overview[i].children[2].innerText
                        const options = {
                            method: 'GET',
                            headers: {
                              accept: 'application/json',
                              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                            }
                          };
                          
                          fetch('https://api.themoviedb.org/3/movie/'+idvalue+'/videos?language=en-US', options)
                            .then(response => response.json())
                            .then(response =>{
                                const keyarray=[]
                                response.results.forEach(function(idvid){
                                    keyarray.push(idvid.key)
                                })
                                var basevid_url="https://www.youtube.com/embed/"
                                    var key=keyarray.slice(-1)
                                    document.getElementById('display-video').innerHTML=`<iframe width="600" height="350"  src="https://www.youtube.com/embed/${key}" style="border:none"></iframe>`
                                    document.getElementById('overview-page').style.zIndex="-1"
                                    document.getElementById('overview-page').style.filter="blur(2px)" 
                            })
                            .catch(err => console.error(err));
                    })

                })
                document.getElementById('return').addEventListener('click',function(){
                    document.getElementById('movie-box').style.display = "block";
                    document.getElementById('navbar').style.display = "block";
                    document.getElementById('showcase').style.display = "block";
                    document.getElementById('overview-class').style.display="none";
                    document.getElementById('display-video').innerHTML=``

                })
        }

        // genres//

        var Drama=document.getElementById('Drama')
            Drama.addEventListener('click',function(){
                let images=`<div id=movie-genre><h2>Drama</h2>`
                response.results.forEach(function(id){
                    var genrelist=id.genre_ids
                for(let i in genrelist){
                    if(genrelist[i]==18){
                        var base_url = "https://image.tmdb.org/t/p/original";
                        images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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
 
        var Action=document.getElementById('Action')
        Action.addEventListener('click',function(){
            let images=`<div id=movie-genre style=background-image><h2>Action</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==28){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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

        var Comedy=document.getElementById('Comedy')
        Comedy.addEventListener('click',function(){
            let images=`<div id=movie-genre><h2>Comedy</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==35){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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
    var Family=document.getElementById('Family')
    Family.addEventListener('click',function(){ 
        let images=`<div id=movie-genre><h2>Family</h2>`
        response.results.forEach(function(id){
            var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==10751){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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
var Drama=document.getElementById('Dramamenu')
            Drama.addEventListener('click',function(){
                let images=`<div id=movie-genre><h2>Drama</h2>`
                response.results.forEach(function(id){
                    var genrelist=id.genre_ids
                for(let i in genrelist){
                    if(genrelist[i]==18){
                        var base_url = "https://image.tmdb.org/t/p/original";
                        images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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
 
        var Action=document.getElementById('Actionmenu')
        Action.addEventListener('click',function(){
            let images=`<div id=movie-genre style=background-image><h2>Action</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==28){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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

        var Comedy=document.getElementById('Comedymenu')
        Comedy.addEventListener('click',function(){
            let images=`<div id=movie-genre><h2>Comedy</h2>`
            response.results.forEach(function(id){
                var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==35){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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
    var Family=document.getElementById('Familymenu')
    Family.addEventListener('click',function(){ 
        let images=`<div id=movie-genre><h2>Family</h2>`
        response.results.forEach(function(id){
            var genrelist=id.genre_ids
            for(let i in genrelist){
                if(genrelist[i]==10751){
                    var base_url = "https://image.tmdb.org/t/p/original";
                    images+=`<div class="img"><img src=${base_url + id.poster_path} alt="action"><p>${id.original_title}</p></div>`
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

 //search function//
 var search = document.getElementsByClassName('form-group')[0]
 search.addEventListener('keyup', function (e){
    function searchclick(){
        const movname = e.target.value.toLowerCase();
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
            }
        };
        
        fetch('https://api.themoviedb.org/3/search/movie?query='+movname+'&include_adult=false&language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                let images = `<div class="search-image">`;
                response.results.forEach(function (poster) {
                    var base_url = "https://image.tmdb.org/t/p/original";
                    //console.log(poster.original_title);//
                    images += `
                    <div class="search-movie-image">
                    <div id="img-click"><img src=${base_url + poster.poster_path}></div><p id="intel">${poster.overview}</p><h4 id="movie-id">${poster.id}</h4><h4>${poster.original_title}</h4><p id="genre-id">${poster.genre_ids}<p id="release-date">${poster.release_date}</p></div>`;
                });
                document.getElementById('overview-class').innerHTML = images;
                document.getElementById('overview-class').style.display="block"
                document.getElementById('movie-box').style.display = "none";
                document.getElementById('navbar').style.display = "none";
                document.getElementById('showcase').style.display = "none";
                document.getElementById('tv-box').style.display="none"
                    const searcharray=response.results
                    console.log(searcharray)
                    const searchinfo = document.getElementsByClassName("search-movie-image")
                    const id=[]
                        for (let j = 0; j < searcharray.length; j++) {
                            //watchlist btn//
                            const WatchlistBtn = document.createElement('button');
                            WatchlistBtn.id='watchlistbtn';
                            WatchlistBtn.innerHTML =`<i class="bi bi-bookmark" id="bookmark"></i>`
                            //rating btn//
                            const ratingbtn=document.createElement('button')
                            ratingbtn.id='rating-btn';
                            ratingbtn.innerHTML=`<i class="bi bi-star-fill"></i>
                                    <div class="drop-down-rating">
                                        <ul id="rate-list">
                                            <button type="button" class="rate" id="1"><li><i class="bi bi-star"></i></li></button>
                                            <button type="button" class="rate" id="2"><li><i class="bi bi-star"></i></li></button>
                                            <button type="button" class="rate" id="3"><li><i class="bi bi-star"></i></li></button>
                                            <button type="button" class="rate" id="4"><li><i class="bi bi-star"></i></li></button>
                                            <button type="button" class="rate" id="5"><li><i class="bi bi-star"></i></li></button>
                                        </ul>
                                </div>`
                            const showrate=document.createElement('div')
                            showrate.id='show-rating'
                            showrate.innerHTML=``
                            //video btn//
                            const videobtn=document.createElement('button')
                            videobtn.id='videobtn'
                            videobtn.innerHTML=`<i class="bi bi-play-fill"></i>`
                            searchinfo[j].children[0].addEventListener("click" , () =>{
                                    var poster=searcharray[j].poster_path
                                    var base_url = "https://image.tmdb.org/t/p/original"
                                    id.push(searchinfo[j].children[2].innerText)
                                    let movieinfo=`<div id="search-page" style="background-image:linear-gradient(rgba(0, 0, 0, 0.500), rgba(227, 56, 243, 0.544)),url(${base_url+poster});>
                                    <div class="content">
                                    <img src=${base_url+poster}><div id="database"><div id="toppart"><h1>${searchinfo[j].children[3].innerText}</h1><p id="dates">${searchinfo[j].children[5].innerText}</p></div><div id=para><h2>Overview</h2><p>${searchinfo[j].children[1].innerText}</p></div></div></div></div>`
                                    document.getElementById('movie-box').style.display = "none";
                                    document.getElementById('navbar').style.display = "none";
                                    document.getElementById('showcase').style.display = "none";
                                    document.getElementById('tv-box').style.display="none"
                                    document.getElementById('overview-class').innerHTML=movieinfo
                                    document.getElementById('overview-class').style.display="block"
                                    var o=document.getElementById('toppart')
                                    o.appendChild(WatchlistBtn)
                                    o.appendChild(ratingbtn)
                                    o.appendChild(videobtn)
                                    o.appendChild(showrate)
                                    var b=document.getElementById('watchlistbtn')
                                    b.addEventListener('click',()=>{
                                        for(let j=0;j<id.length;j++){
                                            const data=(id[j])
                                            b.innerHTML=`<i class="bi bi-bookmark-check-fill"></i>`
                                            b.style.color="rgb(69, 244, 16)"
                                            const option = {
                                                method: 'POST',
                                                headers: {
                                                    accept: 'application/json',
                                                    'content-type': 'application/json',
                                                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                                                },
                                                body: JSON.stringify({media_type: 'movie', media_id: data, watchlist: true})
                                            };
                                            fetch('https://api.themoviedb.org/3/account/20861391/watchlist', option)
                                                .then(response => response.json())
                                                .then(response => {
                                                    console.log(response)
                                                })
                                                .catch(err => console.error(err));    
                                            }
                                        })
                                        document.getElementById('rating-btn').addEventListener('click',function(){
                                            var btn=document.querySelector('.drop-down-rating')
                                            btn.classList.add("active")
                                            for(let r=0;r<id.length;r++){
                                            const idvalue=id[r]
                                            var x=document.getElementById('rate-list')
                                            var y=x.children
                                                for(let i=0;i<y.length;i++){
                                                    var z=document.getElementsByClassName('rate')
                                                    z[i].addEventListener('click',function(){
                                                        var u=document.querySelector('.popup')
                                                        u.classList.add('active')
                                                        if(y[i].id==z[i].id){
                                                            const opt = {
                                                                method: 'POST',
                                                                headers: {
                                                                accept: 'application/json',
                                                                'Content-Type': 'application/json;charset=utf-8',
                                                                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                                                                },
                                                                body:JSON.stringify({value:y[i].id}) 
                                                            };
                                                            
                                                            fetch('https://api.themoviedb.org/3/movie/'+idvalue+'/rating', opt)
                                                                .then(response => response.json())
                                                                .then(response)    
                                                                .catch(err => console.error(err));
                                                            z[i].addEventListener('mouseleave',function(){
                                                            var u=document.querySelector('.popup')
                                                            u.classList.remove('active')
                                                            })
                                                            document.getElementById('rating-btn').addEventListener('mouseleave',function(){
                                                                var btn=document.querySelector('.drop-down-rating')
                                                                btn.classList.remove('active')
                                                                const options = {
                                                                    method: 'GET',
                                                                    headers: {
                                                                      accept: 'application/json',
                                                                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                                                                    }
                                                                  };
                                                                  
                                                                  fetch('https://api.themoviedb.org/3/account/20861391/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options)
                                                                    .then(response => response.json())
                                                                    .then(response => {
                                                                        response.results.forEach(function(idval){
                                                                            if(idval.id==idvalue){
                                                                                document.getElementById('show-rating').innerHTML=`<p>Your rating: ${idval.rating}</p>`
                                                                            }
                                                                        })
                                                                    })
                                                                    .catch(err => console.error(err));
                                                            })
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                        for(let j=0;j<id.length;j++){
                                        var v=document.getElementById('videobtn')
                                        const idval=id[j]
                                        v.addEventListener('click',function(){
                                            console.log(idval)
                                            const options = {
                                                method: 'GET',
                                                headers: {
                                                  accept: 'application/json',
                                                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                                                }
                                              };
                                              
                                              fetch('https://api.themoviedb.org/3/movie/'+idval+'/videos?language=en-US', options)
                                                .then(response => response.json())
                                                .then(response =>{
                                                    const keyarray=[]
                                                    response.results.forEach(function(idvid){
                                                        keyarray.push(idvid.key)
                                                    })
                                                    var basevid_url="https://www.youtube.com/embed/"
                                                        var key=keyarray.slice(-1)
                                                        document.getElementById('display-video').innerHTML=`<iframe width="600" height="350"  src="https://www.youtube.com/embed/${key}" style="border:none"></iframe>`
                                                        document.getElementById('search-page').style.zIndex="-1"
                                                        document.getElementById('search-page').style.filter="blur(2px)" 
                                                })
                                                .catch(err => console.error(err));
                                        })
                                        }
                            })       
                        }
            })
        }
        document.querySelector('#searchbtn').addEventListener('click',searchclick)
})
 
// Getting Watchlist Movies//
    onAuthStateChanged(auth, (user) => {
    document.getElementById('moviebtn').addEventListener('click',displayWatchlist)
    function displayWatchlist() {
        const userId = user.uid;
        const watchlistRef = doc(db, 'watchlists', userId);
        getDoc(watchlistRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const watchlistData = docSnapshot.data();
            const watchlist = watchlistData.movies || [];
            const dataarray=[]
            watchlist.forEach((movieId) => {
              console.log(movieId)
              const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
                },
            };
            
            fetch('https://api.themoviedb.org/3/movie/'+movieId+'?language=en-US&page=1', options)
                .then((response) => response.json())
                .then((data) => {
                    dataarray.push(data)
                    let watchlistmov=`<div id="watchlist-movie">
                    <h1>My Watchlist</h1>`
                    for(let i=0;i<dataarray.length;i++){
                        var base_url = "https://image.tmdb.org/t/p/original";
                        watchlistmov+=`<div class="list" style="background-image:linear-gradient(rgba(0, 0, 0, 0.800), rgba(227, 56, 243, 0.700)),url(${base_url+dataarray[i].backdrop_path});">
                                  <img src=${base_url+dataarray[i].poster_path}><div class="informationtv"><h2>${dataarray[i].original_title}</h2><p>${dataarray[i].overview}</p></div></div>`
                    }
                document.getElementById('overview-class').innerHTML=watchlistmov
                document.getElementById('overview-class').style.display="block"
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
    




















































            // // Genre/Categories Sorting //
            // const idarray=[]
            // const length=[]
            // response.results.forEach(function(category){
            //     for(let i in category.genre_ids){
            //     idarray.push(category.genre_ids[i])
            //     length.push(category.genre_ids.length)
            //     }
            // })
            // console.log(idarray)
            // console.log(length)
            //     const options = {
            //         method: 'GET',
            //         headers: {
            //           accept: 'application/json',
            //           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzE1NDhmYjI2YmNlYTcxMThlMzI3NDVmYzBjYjdiOSIsInN1YiI6IjY1OGFhMjczYjdiNjlkMDliNjZkYjZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.A41mpeK2DlbFuMETFias-s7c2CScOU9solqzKdl58mg'
            //         }
            //       };
            //       const genrename=[]
            //       fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            //         .then(res => res.json())
            //         .then(res =>{
            //                 for(let i in idarray){
            //                     res.genres.forEach(name => {
            //                         if(name.id===idarray[i]){
            //                             genrename.push(name.name)
            //                         }
            //                 })
                            
            //             };
            //             console.log(genrename)
            //             length.forEach(function(len){
            //             console.log(len)
            //             let j=0
            //             while(j<len){
            //                 const x=genrename.find(function(d){
            //                     return d
            //                 })
                            
            //                 // const v=document.createElement('id')
            //                 // v.id="genre-id"
            //                 // v.innerText=genrename.shift()
            //                 // movie.appendChild(v)
            //                 console.log(x)
            //                 j++
            //             }        
            //            })       
            //      }) 
    
