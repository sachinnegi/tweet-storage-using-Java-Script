const tweetList=document.querySelector('#tweet-list');
eventListener();
function eventListener(){
    document.querySelector('#form').addEventListener('submit',newTweet);
    //------remove a tweet---------
    tweetList.addEventListener('click',delTweet);
    // loading tweet from local storage at the start of the page
    document.addEventListener('DOMContentLoaded',localStorageOnLoad);

} 
function newTweet(e){
    e.preventDefault();
    const tweet=document.getElementById('tweet').value;
    this.reset();
    //console.log(tweet);
    //--create remove button---
    const removeBtn=document.createElement('a');
    removeBtn.classList="remove-tweet";
    removeBtn.textContent="X";
    //-----create list-------
    const li=document.createElement('li');
    li.textContent=tweet;
    //Add the remove button to each tweet
    li.appendChild(removeBtn);
    //----insert list item----
    tweetList.appendChild(li);
    //-------removing tweet from dom------
    

    //-------adding tweet to local storage--------
    addTweetLocalStorage(tweet);
    alert("Tweet Added!");
    
}
function delTweet(e){
    if(e.target.classList.contains("remove-tweet")){
        e.target.parentElement.remove();
    }

    //-------removing tweet from local Storage-----
    removeTweetLocalStorage(e.target.parentElement.textContent);
}

// ------function for adding tweet to local storage--------
function addTweetLocalStorage(tweet){
    let tweets=getTweetFromStorage();
    //console.log(tweets);
    tweets.push(tweet);
    localStorage.setItem('tweets',JSON.stringify(tweets))
}

function getTweetFromStorage(){
    let tweets;
    if(localStorage.getItem("tweets")===null){
        tweets=[];
    }
    else{
        tweets=JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
function localStorageOnLoad(){
    let tweets=getTweetFromStorage();
    tweets.forEach(function(tweet){
        const removeBtn=document.createElement('a');
        removeBtn.classList="remove-tweet";
        removeBtn.textContent="X";
        const li=document.createElement('li');
        li.textContent=tweet;
        li.appendChild(removeBtn);
        tweetList.appendChild(li);
    })
}
//******remoiving tweets from Local Storage******
function removeTweetLocalStorage(tweet){
    let tweets=getTweetFromStorage();
    const  tweetDelete=tweet.substring(0,tweet.length-1);
    tweets.forEach(function(tweetLs,index){
        if(tweetDelete===tweetLs){
            tweets.splice(index,1);
        }
    })
    //********save the current new array**********
    localStorage.setItem('tweets',JSON.stringify(tweets));
    
}