let container = document.getElementById("container");
let owner = "https://bit.ly/37yvrOV";
container.innerHTML = null;
let data = JSON.parse(localStorage.getItem("videoSuggestion")) || [];

redirect = () => {
  window.location.href = "./index.html";
};

videoDom = ({ id: { videoId }, snippet: { title, description } }, id) => {
  let videoSec = document.createElement("div");
  let iframe = document.createElement("iframe");
  if (videoId) {
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
  } else {
    iframe.src = `https://www.youtube.com/embed/${id}`;
  }
  iframe.allowFullscreen = true;
  videoSec.append(iframe);

  let vidTitle = document.createElement("h3");
  vidTitle.textContent = title;

  let lastDiv = document.createElement("div");
  let des = document.createElement("p");
  des.textContent = description;

  let subs = document.createElement("div");
  let susbBtn = document.createElement("button");
  susbBtn.textContent = "Subscribe";
  subs.append(susbBtn);
  lastDiv.append(des, subs);

  container.append(videoSec, vidTitle, lastDiv);
};

videoDom(data, data.id);

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




