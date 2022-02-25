console.log("Welcome to Spotify");

// Initialize the Variables.
let songIndex = 0;
//import sound from '../assets/sound.mp3'
//const audioElement = new Audio('songs/8.mpeg');
let audioElement = new Audio('songs/1.mpeg');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Bakhuda tumhi ho", filePath: "SPOTIFY/songs/1.mpeg",coverPath: "SPOTIFY/cover11.jpg"},
    {songName: "Chali Chali fir", filePath: "SPOTIFY/songs/2.mpeg",coverPath: "SPOTIFY/cover12.jpg"},
    {songName: "Ham nahi sudhrenge", filePath: "SPOTIFY/songs/3.mpeg",coverPath: "SPOTIFY/cover13.jpg"},
    {songName: "Pehli nazar mein", filePath: "SPOTIFY/songs/4.mpeg",coverPath: "SPOTIFY/cover14.jpg"},
    {songName: "Salaam-e-ishq", filePath: "SPOTIFY/songs/5.mpeg",coverPath: "SPOTIFY/cover15.jpg"},
    {songName: "Tinga Tinga", filePath: "SPOTIFY/songs/6.mpeg",coverPath: "SPOTIFY/cover16.jpg"},
    {songName: "Tumse hi", filePath: "SPOTIFY/songs/7.mpeg",coverPath: "SPOTIFY/cover17.jpg"},
    {songName: "Uff teri ada", filePath: "SPOTIFY/songs/8.mpeg",coverPath: "SPOTIFY/cover18.jpg"},

]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByTagName("span")[0].innerText = songs[i].songName;

})

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);//how much percent it has covered.
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

/*Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('çlick',(e)=>{
       console.log(e.target);
    })

    
})*/

//console.log(document.querySelectorAll('.songItemPlay'))
const makeAllPlays = ()=>{
    document.querySelectorAll('.songItemPlay').forEach(element=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

document.querySelectorAll('.songItemPlay').forEach(element=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `SPOTIFY/songs/${songIndex}.mpeg`;
        masterSongName.innerText = songs[songIndex-1].songName;
        
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

document.getElementById('next').addEventListener('click',()=>{
    /*if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex +=1
    }*/
    songIndex = (songIndex +1 + songs.length) % songs.length;
    audioElement.src = `SPOTIFY/songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    /*if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1
    }*/
    songIndex = (songIndex -1 + songs.length) % songs.length;
    audioElement.src = `SPOTIFY/songs/${songIndex+1}.mpeg`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})