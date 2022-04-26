let container = document.getElementById("container");
let resultContainer = document.getElementById("resultContainer");
let suggestions = document.getElementById("suggestions");
let toggleBar = document.querySelector("label");
let watchBucket = JSON.parse(localStorage.getItem("watchLater")) || [];
let owner = "https://bit.ly/37yvrOV";
let recommendations = document.getElementsByClassName("suggest");
for (let i = 2; i < recommendations.length; i++) {
  recommendations[i].onclick = () => {
    let text = recommendations[i].textContent;
    searchQuery(text);
  };
}

search = () => {
  inputQuery = query.value;
  searchQuery(inputQuery);
};

// FOR BUTTON PRESS
searchQuery = async (inputQuery) => {
  const res = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${inputQuery}&key=AIzaSyCFcwVctQaDHwO6ay73ariI12SoVPco44s`
  );
  let data = await res.json();
  resultsDom(data.items);
};

resultsDom = (results) => {
  container.innerHTML = null;
  suggestions.innerHTML = null;
  suggestions.style.display = "none";
  container.style.padding = "unset";
  resultContainer.innerHTML = null;
  let heading = document.createElement("h2");
  heading.textContent = "Top results";
  resultContainer.append(heading);
  results.map(
    (
      {
        id: { videoId },
        snippet: {
          channelTitle,
          title,
          description,
          thumbnails: {
            high: { url },
          },
          publishTime,
        },
      },
      index
    ) => {
      if (videoId === undefined) {
        return;
      }

      let resultBox = document.createElement("div");
      resultBox.setAttribute("class", "resultBox");
      let left = document.createElement("div");
      let poster = document.createElement("img");
      poster.src = url;
      left.append(poster);

      let right = document.createElement("div");
      let videotitle = document.createElement("h4");
      videotitle.textContent = title;

      let profilediv = document.createElement("div");
      profilediv.setAttribute("class", "profileDiv");
      let profile = document.createElement("img");
      profile.src = owner;
      let channlename = document.createElement("p");
      channlename.textContent = channelTitle;
      profilediv.append(profile, channlename);

      let publish = document.createElement("p");
      publish.textContent = publishTime;

      let des = document.createElement("p");
      des.textContent = description;

      right.append(videotitle, profilediv, publish, des);

      resultBox.append(left, right);
      resultContainer.append(resultBox);
      resultContainer.style.display = "block";

      resultBox.onclick = () => {
        localStorage.setItem("videoSuggestion", JSON.stringify(results[index]));
        window.location.href = "./video.html";
      };
    }
  );
};

async function getData() {
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=33&regionCode=IN&key=AIzaSyCFcwVctQaDHwO6ay73ariI12SoVPco44s`
    );

    let data = await res.json();
    return data.items;
  } catch (er) {
    console.log(`The error is ${er}`);
  }
}

async function trendingDOM() {
  let trends = await getData();

  container.innerHTML = null;

  trends.map(
    (
      {
        id,
        snippet: {
          title,
          channelTitle,
          publishedAt,
          thumbnails: {
            medium: { url },
          },
        },
        statistics: { viewCount },
      },
      index
    ) => {
      let box = document.createElement("div");
      box.setAttribute("class", "boxContent");

      let imgBox = document.createElement("div");
      imgBox.setAttribute("class", "btnn");
      let img = document.createElement("img");
      img.setAttribute("class", "thumbnail");
      img.src = url;

      let iframe = document.createElement("iframe");
      iframe.setAttribute("class", "preview");

      iframe.src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&mute=1&showinfo=0&controls=0&autoplay=1`;
      iframe.allow = "fullscreen";
      iframe.allow = "autoplay";

      imgBox.append(img, iframe);

      let contentBox = document.createElement("div");
      contentBox.style.padding = "0 10px";
      contentBox.setAttribute("class", "btnn");

      let userBox = document.createElement("div");
      let userImg = document.createElement("img");
      userImg.setAttribute("class", "owner");
      userImg.src = owner;
      userBox.append(userImg);

      let sideBox = document.createElement("div");
      sideBox.setAttribute("class", "sidebox");
      let vidTitle = document.createElement("h4");
      vidTitle.textContent = title;
      let channelName = document.createElement("p");
      channelName.textContent = channelTitle;
      let desc = document.createElement("p");
      let s1 = document.createElement("span");
      if (viewCount.length < 6) {
        viewCount = `${Math.round(viewCount / 1000)}k`;
      } else if (viewCount.length >= 6) {
        viewCount = `${Math.round(viewCount / 1000000)}m`;
      }
      s1.textContent = `views : ${viewCount}`;
      let s2 = document.createElement("span");
      time = publishedAt.substring(0, 10).split("");
      s2.textContent = `Date : ${publishedAt.substring(0, 10)}`;
      desc.append(s1, s2);
      sideBox.append(vidTitle, channelName, desc);

      contentBox.append(userBox, sideBox);

      let watchLater = document.createElement("button");
      watchLater.setAttribute("class", "wtchLater");
      watchLater.textContent = "Watch Later";

      box.append(imgBox, contentBox, watchLater);

      container.append(box);

      let clicked = document.getElementsByClassName("btnn");
      for (let i = 0; i < clicked.length; i++) {
        clicked[i].onclick = () => {
          localStorage.setItem(
            "videoSuggestion",
            JSON.stringify(trends[index])
          );
          window.location.href = "./video.html";
        };
      }
      watchLater.onclick = () => {
        watchBucket.push(trends[index]);
        localStorage.setItem("watchLater", JSON.stringify(watchBucket));
        watchLater.textContent = "Added ✔️";
        watchLater.style.color = "#000";
        watchLater.style.backgroundColor = "#d6ffd6";
      };
    }
  );
}

trendingDOM();

// TOGGLEER
let elements = document.getElementsByClassName("mode");
for (let i = 0; i < elements.length; i++) {
  document
    .getElementById("toggler")
    .addEventListener("change", function (event) {
      if (event.target.checked) {
        elements[i].removeAttribute("data-theme");
      } else {
        elements[i].setAttribute("data-theme", "default");
      }
    });
}

let count = 0;
toggle = () => {
  count++;
  if (count === 1) {
    toggleBar.style.visibility = "visible";
  } else {
    toggleBar.style.visibility = "hidden";
    count = 0;
  }
};

wtchRedirect = () => {
  window.location.href = "./watchLater.html";
};
