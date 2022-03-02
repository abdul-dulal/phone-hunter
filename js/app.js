// notFound and empty  Function
const empty = (style) => {
  document.getElementById("empty").style.display = style;
};

const notFound = (style) => {
  document.getElementById("notFound").style.display = style;
};

// previous value clear fundtion
const detail = (id) => {
  const detailsShow = document.getElementById(id);
  detailsShow.textContent = "";
};

// catch  input value
const searchPhone = () => {
  const inputField = document.getElementById("input-field");
  const inputFieldText = inputField.value;
  // previous container value clear
  const container = document.getElementById("container");
  container.textContent = "";
  // previous detailsShow value clear
  detail("detailsShow");
  document.getElementById("spiner").style.display = "block";
  if (inputFieldText == "") {
    document.getElementById("spiner").style.display = "none";
    empty("block");
    notFound("none");
    detail("detailsShow");
  } else {
    // clear input
    inputField.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length == []) {
          document.getElementById("spiner").style.display = "none";
          notFound("block");
          empty("none");
          detail("detailsShow");
        } else {
          // displayAllPhone(data.data);
          displayPhone(data.data.slice(0, 20));
        }
      });
  }
};

// phone details
const displayPhone = (phones) => {
  const container = document.getElementById("container");
  document.getElementById("spiner").style.display = "none";
  container.textContent = "";
  empty("none");
  notFound("none");
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card mt-4">
      <img src="${phone.image}" class="card-img-top w-50 p-3" alt="..." />
      <div class="card-body">
        <h4 class="card-title">${phone.phone_name}</h4>
        <h5 class="card-text">
          ${phone.brand}
        </h5>
        <button class="btn btn-primary rounded mt-3" onclick="showDeatils('${phone.slug}') "> More Deatils</button>

      </div>
  </div>
  
    
    `;
    container.appendChild(div);
  });
};

// id releted Details show

const showDeatils = (details) => {
  const url = `https://openapi.programming-hero.com/api/phone/${details}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showMoreDetails(data.data));
};
const showMoreDetails = (phoneSlug) => {
  const detailsShow = document.getElementById("detailsShow");
  detailsShow.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card  w-50 mx-auto modifi">
  <img src="${
    phoneSlug.image
  }"  class="card-img-top w-25 p-3  mx-auto" alt="..." />
  <div class="card-body">
  <h4 class="card-title">${phoneSlug.name}</h4>
 <p>${
   phoneSlug.releaseDate
     ? phoneSlug.releaseDate
     : ` <p class= "text-danger fs-4 text"> ReleaseDate Not Found  </p>`
 } 
  </p> 
    <h3>Main-Features</h3>
    <ul class="">
      <li class=""> <span>Storage : </span> ${
        phoneSlug.mainFeatures.storage
      }</li>
      <li class=""> <span> DisplaySize : </span>${
        phoneSlug.mainFeatures.displaySize
      }</li>
      <li class=""> <span> ChipSet : </span>${
        phoneSlug.mainFeatures.chipSet
      }</li>
      <li class=""> <span> Memory : </span>${phoneSlug.mainFeatures.memory}</li>
       <li> <span>sensors : </span> ${phoneSlug.mainFeatures.sensors} </li>
    </ul>
    <h3>Others </h3>  
    ${
      phoneSlug.others
        ? ` <ul>
        <li> <span>Bluetooth: </span> ${phoneSlug.others.Bluetooth} </li>
       <li> <span>GPS : </span> ${phoneSlug.others.GPS} </li>
       <li> <span>NFC : </span> ${phoneSlug.others.NFC} </li>
       <li> <span>Radio : </span> ${phoneSlug.others.Radio} </li>
       <li> <span>USB : </span> ${phoneSlug.others.USB} </li>
       <li> <span>WLAN : </span> ${phoneSlug.others.WLAN} </li>
   </ul>`
        : ` <p class= "text-danger fs-4 text"> Not Found Infomation😔😔😔  </p>`
    }
  </div>
  
</div>
  `;

  detailsShow.appendChild(div);
};
