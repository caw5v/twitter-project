/*-----------------------------------------------------
                      VARIABLES 
------------------------------------------------------*/
let initialState = Math.floor(Math.random() * 5);
let previewImageArray = [];
let backArray = [];
let relevantSearch = [];

const pageTitle = document.querySelector("title");
const tabDecoration = document.querySelectorAll(".tab-decoration");
const tabSpan = document.querySelectorAll(".tab-span");
const nameNumOfTweetsContainer = document.querySelector(".name-num-of-tweets-container");
const backgroundImage = document.querySelector(".background-image");
const dynamicNameHandleDateContainer = document.querySelector(".dynamic-name-handle-date-container");
const dynamicFollowingFollowersContainer = document.querySelector(".dynamic-following-followers-container");
const centralContent = document.querySelector(".central-content");
const mainContent = document.querySelector(".main-content");
const tweets = document.querySelector(".tweets");
const backArrow = document.querySelector(".back-arrow");
const dynamicDataYouMightLikeContainer = document.querySelector(".dynamic-data-you-might-like-container");
const input = document.querySelector("input");
const searchField = document.querySelector(".search-field");
const searchRecommendationContainer = document.querySelector("#search-recommendation-container");

/*----------------------------------------------------
                      FUNCTIONS 
 ----------------------------------------------------*/
/*object property existence */
const propExist = () => {
  if (userData[initialState].description && userData[initialState].website) {
    return `<h3>${userData[initialState].displayName}<i class="flaticon-verify"></i></h3>
            <p class='user-name'>${userData[initialState].userName}</p>
            
            <p>${userData[initialState].description}</p>
            
            <div class='account-info-container'> 
            <a href='${userData[initialState].website}'>${userData[initialState].website}</a>
            <p>
              <i class="flaticon-calendar"></i> Joined
              <span class="date-joined">${userData[initialState].joinedDate}</span>
            </p>
            </div>`;
  } else if (userData[initialState].description) {
    return `<h3>${userData[initialState].displayName}<i class="flaticon-verify"></i></h3>
            <p class='user-name'>${userData[initialState].userName}</p>
            
            <p>${userData[initialState].description}</p>
            
            <div class='account-info-container'> 
        
            <p>
              <i class="flaticon-calendar"></i> Joined
              <span class="date-joined">${userData[initialState].joinedDate}</span>
            </p>
            </div>`;
  } else if (userData[initialState].website) {
    return `<h3>${userData[initialState].displayName}<i class="flaticon-verify"></i></h3>
            <p class='user-name'>${userData[initialState].userName}</p>
            
            
            
            <div class='account-info-container'> 
            <a href='${userData[initialState].website}'>${userData[initialState].website}</a>
            <p>
              <i class="flaticon-calendar"></i> Joined
              <span class="date-joined">${userData[initialState].joinedDate}</span>
            </p>
            </div>`;
  } else {
    return `<h3>${userData[initialState].displayName}<i class="flaticon-verify"></i></h3>
            <p class='user-name'>${userData[initialState].userName}</p>
            
           
            
            <div class='account-info-container'> 
           
            <p>
              <i class="flaticon-calendar"></i> Joined
              <span class="date-joined">${userData[initialState].joinedDate}</span>
            </p>
            </div>`;
  }
};

/* check if url is an img */
const isPhoto = (url) => {
  if (url.match(/photo|jpg|png|jpeg|gif|imgr|img|image|images/) === null) {
    return false;
  } else {
    return true;
  }
};

/* check for img or text*/
const textImageConditional = (element) => {
  if (isPhoto(element) === true) {
    return `<div class='tweet-img-container' style='border-radius:20px;background-image:url(${element}); background-position:center; background-size:cover'></div>`;
  } else {
    return `<span class='tweet-span'>${element}</span>`;
  }
};

/* loop through tabDecoration and remove class "tab-underline"*/
const setActive = (el) => {
  for (let tab of tabSpan) {
    tab.classList.remove("tab-underline");
    tab.classList.remove("tab-bold-color");
  }

  el.classList.add("tab-underline");
  el.classList.add("tab-bold-color");
};

/* re-populate with new data */
const repopulateData = (value) => {
  if (typeof value === "object") {
    initialState = Number(value.currentTarget.children[0].children[1].firstElementChild.id);
    backArray.push(initialState);

    previewImageArray = [];

    const loopIteratorNumYouMightLike = dynamicDataYouMightLikeContainer.childNodes.length;
    for (let i = loopIteratorNumYouMightLike; i > 0; i--) {
      dynamicDataYouMightLikeContainer.removeChild(dynamicDataYouMightLikeContainer.childNodes[dynamicDataYouMightLikeContainer.childNodes.length - 1]);
    }

    populateYouMightLike();

    const loopIteratorNumTweets = tweets.childNodes.length;
    for (let i = loopIteratorNumTweets; i > 0; i--) {
      tweets.removeChild(tweets.childNodes[tweets.childNodes.length - 1]);
    }

    dynamicData();
    popupInfo();
  } else {
    initialState = value;

    previewImageArray = [];

    const loopIteratorNum = tweets.childNodes.length;
    for (let i = loopIteratorNum; i > 0; i--) {
      tweets.removeChild(tweets.childNodes[tweets.childNodes.length - 1]);
    }

    dynamicData();
  }
};

/* controls backArray */
const back = () => {
  if (backArray.length <= 1) {
    repopulateData(initialState);
  } else {
    backArray.pop();

    repopulateData(backArray[backArray.length - 1]);
  }
};

/* added event listeners to tabs to pass current target to setActive() */
for (let tab of tabDecoration) {
  tab.addEventListener("click", (e) => {
    setActive(e.currentTarget.children[0]);
  });
}

/* listener for back arrow */
backArrow.addEventListener("click", () => {
  return back();
});

window.addEventListener("scroll", () => {
  const mainButton = document.querySelector(".main-button");
  const headerMainButton = document.querySelector("#header-main-button");

  if (mainButton.getBoundingClientRect().y <= 0) {
    headerMainButton.classList.remove("header-main-button-hidden");
    headerMainButton.classList.add("header-main-button-visible");
  } else if (mainButton.getBoundingClientRect().y > 0) {
    headerMainButton.classList.remove("header-main-button-visible");
    headerMainButton.classList.add("header-main-button-hidden");
  }
});

/*-----------------------------------------------------------
                         DYNAMIC HTML                       
-------------------------------------------------------------*/
function dynamicData() {
  pageTitle.innerHTML = `
  ${userData[initialState].displayName} (${userData[initialState].userName})
  `;

  nameNumOfTweetsContainer.innerHTML = `
        <h3>${userData[initialState].displayName}<i class="flaticon-verify"></i></h3>
        <p>${userData[initialState].tweetCount}</p>
  `;

  backgroundImage.innerHTML = `
      <img src="${userData[initialState].coverPhotoURL}" alt="user-background" />
            <div class="user-image-button">
              
            <img src="${userData[initialState].avatarURL}" alt="user-image" />
        
              <a href="">
                <button class='main-button' type="button">Follow</button>
                </a>
            
            </div>
  `;

  dynamicNameHandleDateContainer.innerHTML = `
   
      ${propExist()} 

  `;

  dynamicFollowingFollowersContainer.innerHTML = `
  <h4>${userData[initialState].followingCount} <span class="follow-spans">Following</span></h4>
            <h4>${userData[initialState].followerCount} <span class="follow-spans">Followers</span></h4>
  `;

  userData[initialState].tweets.forEach((tweet) => {
    const dynamicTweetContainer = document.createElement("div");
    dynamicTweetContainer.classList.add("dynamic-tweet-container");

    dynamicTweetContainer.innerHTML = `
 <div class="conditional-tweet-header"></div>
             <div class="main-tweet-content">
               <div class="user-image">
                 <img class='userAvatar tweet-userAvatar' src="${userData[initialState].avatarURL}" alt="user-image" />
               </div>
               <div class="central-content">
                 <div class="verified-account-handle-date">
                   <p>
                     <span>
                       ${userData[initialState].displayName}<i class="flaticon-verify"></i>
                     </span>
                    ${userData[initialState].userName} · ${userData[initialState].date()} 
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
    tweets.append(dynamicTweetContainer);
    mainContent.appendChild(tweets);

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
}
dynamicData();

/*-------------------------------------------------------- 
          POPULATING THE YOU-MIGHT-LIKE-CONTAINER
  ---------------------------------------------------------*/

function populateYouMightLike() {
  userData.forEach((element, index) => {
    if (index !== initialState) {
      const divRows = document.createElement("div");
      divRows.classList.add("account-data-button-container");

      divRows.addEventListener("click", (e) => {
        repopulateData(e);
      });

      divRows.innerHTML = `
                            
       <div class='img-para-container'>
        <img class="account-img userAvatar" src="${element.avatarURL}" />
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
    }
  });
}
populateYouMightLike();

/*------------------------------------------------------------
                  POPUP ACCOUNT INFO CARDS                   
--------------------------------------------------------------*/

function popupInfo() {
  const userAvatar = document.querySelectorAll(".userAvatar");

  for (let avatar of userAvatar) {
    avatar.addEventListener("mouseover", (e) => {
      if (e.currentTarget.classList[0] === "account-img") {
        const accountNum = e.currentTarget.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[1].id;
        const tweetPopup = document.createElement("div");

        tweetPopup.classList.add("tweet-popup");
        tweetPopup.classList.add("tweet-popup-in");
        tweetPopup.setAttribute("id", "tweet-popup-id");
        tweetPopup.innerHTML = `
            <div class="user-image">
              <img class="userAvatar" src="${userData[accountNum].avatarURL}" alt="user-image" />
            </div>
            <p>
              <span>
                ${userData[accountNum].displayName}
                <i class="flaticon-verify"></i>
              </span>
              ${userData[accountNum].userName} · ${userData[accountNum].date()}
            </p>
            <p>${userData[accountNum].description}</p>
            <div class='follower-following'>
              <h4>
                ${userData[accountNum].followingCount} <span class="follow-spans">Following</span>
              </h4>
              <h4>
                ${userData[accountNum].followerCount} <span class="follow-spans">Followers</span>
              </h4>
            </div>
        `;

        avatar.addEventListener("mouseleave", (e) => {
          const currentSelection = e.currentTarget.parentNode.childNodes[e.currentTarget.parentNode.childNodes.length - 1];

          currentSelection.classList.add("tweet-popup-out");
          currentSelection.classList.remove("tweet-popup-in");
        });

        e.currentTarget.parentNode.appendChild(tweetPopup);
        if (accountNum === "2") {
          document.querySelector(".tweet-popup-in").style.marginBottom = "-16em";
          document.querySelector(".tweet-popup-out").style.marginBottom = "-16em";
        } else if (accountNum === "1") {
          document.querySelector(".tweet-popup-in").style.marginBottom = "-15em";
          document.querySelector(".tweet-popup-out").style.marginBottom = "-15em";
        } else if (accountNum === "3") {
          document.querySelector(".tweet-popup-in").style.marginBottom = "-14.5em";
          document.querySelector(".tweet-popup-out").style.marginBottom = "-14.5em";
        } else if (accountNum === "0") {
          document.querySelector(".tweet-popup-in").style.marginBottom = "-13em";
          document.querySelector(".tweet-popup-out").style.marginBottom = "-13em";
        }

        const popupNodes = document.querySelectorAll("#tweet-popup-id");
        for (let pop of popupNodes) {
          pop.addEventListener("mouseover", () => {
            pop.classList.add("tweet-popup-in");
            pop.classList.remove("tweet-popup-out");
          });

          pop.addEventListener("mouseleave", () => {
            pop.classList.remove("tweet-popup-in");
            pop.classList.add("tweet-popup-out");
          });
        }
      } else {
        const tweetPopup = document.createElement("div");

        tweetPopup.classList.add("tweet-popup-in");
        tweetPopup.setAttribute("id", "tweet-popup-id");
        tweetPopup.innerHTML = `
            <div class="user-image">
              <img class="userAvatar" src="${userData[initialState].avatarURL}" alt="user-image" />
            </div>
            <p>
              <span>
                ${userData[initialState].displayName}
                <i class="flaticon-verify"></i>
              </span>
              ${userData[initialState].userName} · ${userData[initialState].date()}
            </p>
            <p>${userData[initialState].description}</p>
            <div class='follower-following'>
              <h4>
                ${userData[initialState].followingCount} <span class="follow-spans">Following</span>
              </h4>
              <h4>
                ${userData[initialState].followerCount} <span class="follow-spans">Followers</span>
              </h4>
            </div>
        `;
        console.log(e.currentTarget.parentElement.parentElement);
        e.currentTarget.parentNode.appendChild(tweetPopup);

        avatar.addEventListener("mouseleave", (e) => {
          const currentSelection = e.currentTarget.parentNode.childNodes[e.currentTarget.parentNode.childNodes.length - 1];
          console.log(currentSelection);
          currentSelection.classList.add("tweet-popup-out");
          currentSelection.classList.remove("tweet-popup-in");
        });

        const popupNodes = document.querySelectorAll("#tweet-popup-id");
        for (let pop of popupNodes) {
          pop.addEventListener("mouseover", () => {
            pop.classList.add("tweet-popup-in");
            pop.classList.remove("tweet-popup-out");
          });

          pop.addEventListener("mouseleave", () => {
            pop.classList.remove("tweet-popup-in");
            pop.classList.add("tweet-popup-out");
          });
        }
      }
    });
  }
}
popupInfo();
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

/*----------------------------------------------------------
                          SEARCH
-----------------------------------------------------------*/
let found = null;

window.addEventListener("click", () => {
  if (document.activeElement === input) {
    searchRecommendationContainer.classList.add("search-recommendation-container-visible");
    if (document.querySelector(".search-result")) {
      searchRecommendationContainer.innerHTML = ``;
    } else {
      searchRecommendationContainer.innerHTML = `
      Try searching for people
      `;
    }
  } else {
    searchRecommendationContainer.classList.remove("search-recommendation-container-visible");
    searchRecommendationContainer.innerHTML = ``;
  }
});

searchField.addEventListener("keyup", (e) => {
  for (let i = 0; i < userData.length; i++) {
    found = relevantSearch.some((user) => {
      console.log(user);
      if (user === userData[i].displayName) {
        return true;
      } else {
        return false;
      }
    });

    if (relevantSearch) {
      searchRecommendationContainer.innerHTML = ``;
    }

    if (undefined || searchField.value === "" || searchField.value === " ") {
      searchField.value = "";
      relevantSearch = [];
      searchRecommendationContainer.innerHTML = `
    Try searching for people
    `;
    } else if (searchField.value.split("")[0].toUpperCase() === userData[i].displayName[userData[i].displayName.length - userData[i].displayName.length] && found === false) {
      relevantSearch.push(userData[i].displayName);
      searchRecommendationContainer.innerHTML = ``;
    }
  }
  console.log(found);

  for (let i = 0; i > relevantSearch.length; i++) {
    if (searchField.value.trim() === relevantSearch[i]) {
      relevantSearch = [searchField.value.trim()];
    }
  }

  if (relevantSearch) {
    relevantSearch.forEach((element, index) => {
      const searchResult = document.createElement("div");
      searchResult.classList.add("search-result");

      searchResult.addEventListener("click", (e) => {
        repopulateData(e);
      });

      let user = null;

      for (let i = 0; i < userData.length; i++) {
        if (element === userData[i].displayName) {
          user = userData[i];
          console.log(userData.indexOf(user), searchResult);

          searchResult.innerHTML = `
       <div class='img-para-container'>
        <img class="account-img userAvatar" src="${user.avatarURL}" />
        <div class="account-para-container">
        <p id='${userData.indexOf(user)}'>${user.displayName}</p>
        <p>${user.userName}</p>
        </div>
       </div>
       
       <a href="">
       <button class='you-might-like-button' type="button">Follow</button>
       </a> 
      `;
        }
      }

      searchRecommendationContainer.appendChild(searchResult);
    });
  }
  console.log(relevantSearch);
});
