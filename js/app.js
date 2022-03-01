const searchPhone = () => {
  //   console.log("heloo");
  const inputField = document.getElementById("input-field");
  const inputFieldText = inputField.value;
  // clear input
  inputField.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data));
};

const displayPhone = (phones) => {
  console.log(phones);
  const container = document.getElementById("container");
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
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

const showDeatils = (deatils) => {
  //   console.log(deatils);
  const url = `https://openapi.programming-hero.com/api/phone/${deatils}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showMoreDeatils(data.data));
};

const showMoreDeatils = (phoneSlug) => {
  console.log(phoneSlug);
  const deatilsShow = document.getElementById("deatilsShow");
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card text-center w-25 mx-auto">
  <img src="${phoneSlug.image}" class="card-img-top" alt="..." />
  <div class="card-body">
 <p>${phoneSlug.releaseDate ? phoneSlug.releaseDate : "not found"}
    
  </p>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> Storage: ${
        phoneSlug.mainFeatures.storage
      }</li>
      <li class="list-group-item"> DisplaySize:${
        phoneSlug.mainFeatures.displaySize
      }</li>
      <li class="list-group-item"> ChipSet${phoneSlug.mainFeatures.chipSet}</li>
      <li class="list-group-item"> Memory${phoneSlug.mainFeatures.memory}</li>
    </ul>
  </div>
</div>
  `;
  deatilsShow.appendChild(div);
};
