// style Function
const empty = (style) => {
  document.getElementById("empty").style.display = style;
};

const notFound = (style) => {
  document.getElementById("notFound").style.display = style;
};

// catch  input value
const searchPhone = () => {
  const inputField = document.getElementById("input-field");
  const inputFieldText = inputField.value;

  const container = document.getElementById("container");
  container.textContent = "";
  document.getElementById("spiner").style.display = "block";
  if (inputFieldText == "") {
    document.getElementById("spiner").style.display = "none";
    empty("block");
    notFound("none");
    const detailsShow = document.getElementById("detailsShow");
    detailsShow.textContent = "";
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
          const detailsShow = document.getElementById("detailsShow");
          detailsShow.textContent = "";
        } else {
          // displayAllPhone(data.data);

          // const result = displayPhoneAll.slice(0, 20);
          displayPhone(data.data.slice(0, 20));
        }
      });
  }
};

// phone details
const displayPhone = (phones) => {
  // console.log(phones);
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
      <img src="${phone.image}" class="card-img-top w-75 p-3" alt="..." />
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
  //   console.log(deatils);
  const url = `https://openapi.programming-hero.com/api/phone/${details}`;
  console.log(url);

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
  }"  class="card-img-top w-25 p-3 h-25 mx-auto" alt="..." />
  <div class="card-body">
  <h4 class="card-title">${phoneSlug.name}</h4>
 <p>${phoneSlug.releaseDate ? phoneSlug.releaseDate : "not found"}
    
  </p> 
    <h3>Main-Features</h3>
    <ul class="">
      <li class=""> <span>Storage : </span>: ${
        phoneSlug.mainFeatures.storage
      }</li>
      <li class=""> <span> DisplaySize : </span>:${
        phoneSlug.mainFeatures.displaySize
      }</li>
      <li class=""> <span> ChipSet : </span>${
        phoneSlug.mainFeatures.chipSet
      }</li>
      <li class=""> <span> Memory </span>${phoneSlug.mainFeatures.memory}</li>
      <li> <span>sensors : </span> ${phoneSlug.mainFeatures.sensors} </li>
    </ul>
 
    <h3>Others </h3>
    <ul>
     <li> <span>Bluetooth: </span> ${phoneSlug.others.Bluetooth} </li>
     <li> <span>GPS : </span> ${phoneSlug.others.GPS} </li>
     <li> <span>NFC : </span> ${phoneSlug.others.NFC} </li>
     <li> <span>Radio : </span> ${phoneSlug.others.Radio} </li>
     <li> <span>USB : </span> ${phoneSlug.others.USB} </li>
     <li> <span>WLAN : </span> ${phoneSlug.others.WLAN} </li>
    </ul>
    
  </div>
  
</div>
  `;

  detailsShow.appendChild(div);
};
