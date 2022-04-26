let query = document.getElementById("search_input");
let suggetionBox = document.getElementById("suggestionBox");
let oldDebounce;

takeInput = async () => {
  try {
    let inputQuery = query.value;
    if (query.value !== "") {
      const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=${inputQuery}&key=AIzaSyCFcwVctQaDHwO6ay73ariI12SoVPco44s`
      );
      let data = await res.json();
      return data.items;
    }
  } catch (er) {
    console.log(`This is the ${er}`);
  }
};

main = async () => {
  let serverResponse = await takeInput();
  if (serverResponse === undefined) {
    return;
  }
  buildSuggestion(serverResponse);
};

debounce = (func, delay) => {
  if (oldDebounce) {
    clearTimeout(oldDebounce);
  }
  oldDebounce = setTimeout(() => {
    func();
  }, delay);
};

buildSuggestion = (resArray) => {
  suggetionBox.innerHTML = null;
  suggetionBox.style.display = "block";
  resArray.map(({ snippet: { title } }, index) => {
    let box = document.createElement("div");
    box.setAttribute("class", "suggestionDiv");
    let icon = document.createElement("div");
    icon.setAttribute("class", "fa-solid fa-magnifying-glass");
    let text = document.createElement("p");
    text.textContent = title;
    box.append(icon, text);
    suggetionBox.append(box);

    box.onclick = () => {
      localStorage.setItem("videoSuggestion", JSON.stringify(resArray[index]));
      window.location.href = "./video.html";
    };
  });
};


window.addEventListener("click", (event) => {
    let hideBox = suggetionBox;
    if (
      event.target !== hideBox &&
      event.target.parentNode !== hideBox &&
      event.target !== query
    ) {
      hideBox.style.display = "none";
    }
  });
  
  redirect = () => {
    window.location.href = "./index.html";
  };