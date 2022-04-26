let watchArr = JSON.parse(localStorage.getItem("watchLater")) || [];
let containerBox = document.getElementById("down-container");
let banner = document.getElementById("banner-display");
let toggleBar = document.querySelector("label");
let sort = document.getElementById("sorting");


createDom = (watchList) => {
  containerBox.innerHTML = null;
  watchList.map(
    (
      {
        snippet: {
          channelTitle,
          localized: { title },
          thumbnails: {
            high: { url },
          },
        },
      },
      index
    ) => {
      let box = document.createElement("div");
      box.setAttribute("class", "box");

      let imgBox = document.createElement("div");
      imgBox.setAttribute("class", "frame");
      let img = document.createElement("img");
      img.src = url;
      imgBox.append(img);

      let content = document.createElement("div");
      content.setAttribute("class", "content");
      let videotitle = document.createElement("h4");
      videotitle.textContent = title;
      let channel = document.createElement("p");
      channel.textContent = channelTitle;
      content.append(videotitle, channel);

      let removebox = document.createElement("div");
      let removeText = document.createElement("button");
      removeText.textContent = "Remove from Watch later";
      removeText.setAttribute("class", "removeText");
      let removeBtn = document.createElement("i");
      removeBtn.setAttribute("class", "fa-solid fa-ellipsis-vertical");
      removebox.append(removeBtn, removeText);

      box.append(imgBox, content, removebox);
      containerBox.append(box);

      let count = 0;
      removeBtn.onclick = () => {
        count++;
        if (count === 1) {
          removeText.style.display = "block";
        } else {
          removeText.style.display = "none";
          count = 0;
        }
      };

      removeText.onclick = () => {
        removeFromList(index, watchList);
      };
    }
  );
};
createDom(watchArr);

if (watchArr.length === 0) {
  banner.src = "https://i.insider.com/5b0d4c731ae6622f008b4f81?width=700";
} else if (watchArr.length !== 0) {
  let {
    snippet: {
      thumbnails: {
        high: { url },
      },
    },
  } = watchArr[0];
  banner.src = url;
}

if (watchArr.length !== 0) {
  sort.addEventListener("change", () => {
    let selected = sort.value;
    if (selected !== "") {
      if (selected === "oldest") {
        createDom(watchArr);
        banner.src = null;
        let {
          snippet: {
            thumbnails: {
              high: { url },
            },
          },
        } = watchArr[0];
        banner.src = url;
      } else if (selected === "newest") {
        let reversed = [];
        watchArr
          .slice()
          .reverse()
          .forEach((ele) => {
            reversed.push(ele);
          });
        createDom(reversed);
        banner.src = null;
        let {
          snippet: {
            thumbnails: {
              high: { url },
            },
          },
        } = reversed[0];
        banner.src = url;
      }
    }
  });
}

removeFromList = (index, arr) => {
  arr.splice(index, 1);
  localStorage.setItem("watchLater", JSON.stringify(arr));
  window.location.reload();
};

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


