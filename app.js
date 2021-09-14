let randomNum = Math.floor(Math.random() * 5);
window.onload = (e) => {
  /*------------------------------------------------------
            POPULATING INITIAL STATE
   -----------------------------------------------------*/
  /* variables */

  const pageTitle = document.querySelector("title");
  const nameNumOfTweetsContainer = document.querySelector(".name-num-of-tweets-container");
  const backgroundImage = document.querySelector(".background-image");
  const dynamicNameHandleDateContainer = document.querySelector(".dynamic-name-handle-date-container");
  const dynamicFollowingFollowersContainer = document.querySelector(".dynamic-following-followers-container");
  const centralContent = document.querySelector(".central-content");
  const previewImageArray = [];

  /* dynamic html */

  pageTitle.innerHTML = `
  ${userData[randomNum].displayName} (${userData[randomNum].userName})
  `;

  nameNumOfTweetsContainer.innerHTML = `
        <h3>${userData[randomNum].displayName}<i class="flaticon-verify"></i></h3>
        <p>${userData[randomNum].tweetCount}</p>
  `;

  backgroundImage.innerHTML = `
      <img src="${userData[randomNum].coverPhotoURL}" alt="user-background" />
            <div class="user-image-button">
              
            <img src="${userData[randomNum].avatarURL}" alt="user-image" />
        
              <a href="">
                <button type="button">Follow</button>
                </a>
            
            </div>
  `;

  dynamicNameHandleDateContainer.innerHTML = `
         <h3>${userData[randomNum].displayName}<i class="flaticon-verify"></i></h3>
            <p>${userData[randomNum].userName}</p>
            <p>
              <i class="flaticon-calendar"></i> Joined
              <span class="date-joined">${userData[randomNum].joinedDate}</span>
            </p>
  `;

  dynamicFollowingFollowersContainer.innerHTML = `
  <h4>${userData[randomNum].followingCount} <span class="follow-spans">Following</span></h4>
            <h4>${userData[randomNum].followerCount} <span class="follow-spans">Followers</span></h4>
  `;

  /* loop to populate tweet content */
  userData[randomNum].tweets.forEach((tweet) => {
    const dynamicTweetContainer = document.createElement("div");
    dynamicTweetContainer.classList.add("dynamic-tweet-container");
    console.log(targetId);
    dynamicTweetContainer.innerHTML = `


 <div class="conditional-tweet-header"></div>
             <div class="main-tweet-content">
               <div class="user-image">
                 <img class='userAvatar' src="${userData[randomNum].avatarURL}" alt="user-image" />
               </div>
               <div class="central-content">
                 <div class="verified-account-handle-date">
                   <p>
                     <span>
                       ${userData[randomNum].displayName}<i class="flaticon-verify"></i>
                     </span>
                    ${userData[randomNum].userName} · ${userData[randomNum].date()} 
                   </p>
                   <div class="embed-tweet" title="more">
                     ···
                   </div>
                 </div>
                
                 ${textImageConditional(tweet.tweet)}
                
                 <div class="like-comment-share">
                   <div>
                     <div class="icon-container">
                       <i class="flaticon-speech-bubble comment"></i>
                     </div>
                     <p class="icon-action-count comment-count">2.8k</p>
                   </div>
                   <div>
                     <div class="icon-container">
                       <i class="flaticon-refreshing retweet"></i>
                     </div>
                     <p class="icon-action-count retweet-count">2.8k</p>
                   </div>
                   <div>
                     <div class="icon-container">
                       <i class="flaticon-heart heart"></i>
                     </div>
                     <p class="icon-action-count heart-count">2.8k</p>
                   </div>
                   <div>
                     <div class="icon-container">
                       <i class="flaticon-upload share"></i>
                     </div>
                   </div>
                 </div>
                 </div>
               </div>
             </div>

             `;
    document.querySelector(".main-content").append(dynamicTweetContainer);

    /*------------------------------------------------------------
                POPULATING TIMELINE-IMAGES-CONTAINER 
     ------------------------------------------------------------*/
    if (isPhoto(tweet.tweet) === true) {
      previewImageArray.push(tweet.tweet);

      document.querySelector(".one").style.backgroundImage = `url(${previewImageArray[0]})`;
      document.querySelector(".two").style.backgroundImage = `url(${previewImageArray[1]})`;
      document.querySelector(".three").style.backgroundImage = `url(${previewImageArray[2]})`;
      document.querySelector(".four").style.backgroundImage = `url(${previewImageArray[3]})`;
      document.querySelector(".five").style.backgroundImage = `url(${previewImageArray[4]})`;
      document.querySelector(".six").style.backgroundImage = `url(${previewImageArray[5]})`;
    }
  });

  /*-------------------------------------------------------- 
          POPULATING THE YOU-MIGHT-LIKE-CONTAINER
  ---------------------------------------------------------*/

  const dynamicDataYouMightLikeContainer = document.querySelector(".dynamic-data-you-might-like-container");

  userData.forEach((element, index) => {
    const divRows = document.createElement("div");
    divRows.classList.add("account-data-button-container");
    divRows.addEventListener("click", (e) => {
      console.log(e.currentTarget.children[0].children[1].firstElementChild.id);
      targetId = Number(e.currentTarget.children[0].children[1].firstElementChild.id);
    });
    divRows.innerHTML = `
                            
       <div class='img-para-container'>
       <img class="account-img" src="${element.avatarURL}" />
       <div class="account-para-container">
       <p id='${index}'>${element.displayName}</p>
       <p>${element.userName}</p>
       </div>
       </div>
       
       <a href="">
       <button class='you-might-like-button' type="button">Follow</button>
       </a>
       
       `;
    dynamicDataYouMightLikeContainer.appendChild(divRows);
  });

  /*----------------------------------------------------------- 
            POPULATING THE WHATS-HAPPENING-CONTAINER
  ------------------------------------------------------------*/

  const dynamicDataWhatsHappeningContainer = document.querySelector(".dynamic-data-whats-happening-container");

  news.forEach((element) => {
    const divRows = document.createElement("div");
    divRows.innerHTML = `
      <div class='whats-happening-rows'>
      
      <div class='event-text'>
      <p>${element.event} · ${element.timestamp}</p>
      <h3>${element.tweet}</h3>
      </div>
      
      
      <div class='row-image-container' style='background-image: url(${element.image})'></div>
      
      </div>
      `;
    dynamicDataWhatsHappeningContainer.appendChild(divRows);
  });
};

let targetId = null;

/* function to loop through tabDecoration and remove class "tab-underline" and forOf for eventListener*/
const tabDecoration = document.querySelectorAll(".tab-decoration");
const tabSpan = document.querySelectorAll(".tab-span");

function setActive(el) {
  for (let tab of tabSpan) {
    tab.classList.remove("tab-underline");
    tab.classList.remove("tab-bold-color");
  }

  el.classList.add("tab-underline");
  el.classList.add("tab-bold-color");
}

for (let tab of tabDecoration) {
  tab.addEventListener("click", (e) => {
    setActive(e.currentTarget.children[0]);
  });
}

/*-------------------------------------------------
                    FUNCTIONS
--------------------------------------------------*/

/* function to check if url is a photo */
const isPhoto = (url) => {
  if (url.match(/photo|jpg|png|jpeg|gif|imgr|img|image|images/) === null) {
    return false;
  } else {
    return true;
  }
};

const textImageConditional = (element) => {
  if (isPhoto(element) === true) {
    return `<div class='tweet-img-container' style='border-radius:20px;background-image:url(${element}); background-position:center; background-size:cover'></div>`;
  } else {
    return `<span class='tweet-span'>${element}</span>`;
  }
};

const isId = () => {
  if (randomNum) {
    return targetId;
  } else {
    return randomNum;
  }
};
