let formStu = document.getElementById("formstu");
let formName = document.getElementById("name");
let formEmail = document.getElementById("email");
let formMobile = document.getElementById("mobile");
let formCustomerValue = document.getElementById("customerValue");  
let tableBody = document.querySelector("#example tbody");

let btnSubmit = document.getElementById("submit");
let btnHidden = document.getElementById("contIdEdit");

class client {
  constructor(id, name, email, mobile, customerValue) {  
    this.id = id;
    this.Name = name;
    this.Email = email;
    this.Mobile = mobile;
    this.CustomerValue = customerValue;  
  }

  showData() {
    client.showHtml(this.id, this.Name, this.Email, this.Mobile, this.CustomerValue);  
    return this;
  }

  storeData() {
    let allData = JSON.parse(localStorage.getItem("client")) ?? [];  
    allData.push({
      id: this.id,
      name: this.Name,
      email: this.Email,
      mobile: this.Mobile,
      customerValue: this.CustomerValue  
    });
    localStorage.setItem("client", JSON.stringify(allData));  
  }

  static showClients() {  
    tableBody.innerHTML ='';
    if (localStorage.getItem("client")) {  
      JSON.parse(localStorage.getItem("client")).forEach((item) => {  
        client.showHtml(item.id, item.name, item.email, item.mobile, item.customerValue); 
      });
    }
  }

  updateClient(id) {  
    const numericId = parseInt(id);
    let newItem = {
      id: numericId,
      name: this.Name,
      email: this.Email,
      mobile: this.Mobile,
      customerValue: this.CustomerValue  
    };
    const updateData = JSON.parse(localStorage.getItem("client")).map(  
      (item) => {
        if (item.id === numericId) {
          return newItem;
        }
        return item;
      }
    );

    localStorage.setItem("client", JSON.stringify(updateData));  
  }

  static showHtml(id, name, email, mobile, customerValue) {  
    let trEl = document.createElement("tr");
    trEl.innerHTML = `
              <td>${name}</td>
              <td>${email}</td>
              <td>${mobile}</td>
              <td>${customerValue}</td> <!-- تمت إضافته -->
              <td>
                <button class="btn btn-danger delete text-center" data-id="${id}">
                DELETE
                 </button>
                <button class="btn btn-primary edit text-center" data-id="${id}">
                EDIT
                 </button>
              </td>
        `;
    tableBody.appendChild(trEl);
  }
}

client.showClients();

formStu.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contIdEdit.value) {
    let id = Math.floor(Math.random() * 100000);
    const clientOne = new client(
      id,
      formName.value,
      formEmail.value,
      formMobile.value,
      formCustomerValue.value
    );

    clientOne.showData().storeData();
  } else {
    const id = parseInt(contIdEdit.value);
    const newClient = new client(
      id,
      formName.value,
      formEmail.value,
      formMobile.value,
      formCustomerValue.value
    );
    newClient.updateClient(id);
    btnSubmit.value = "ADD New client";  
    contIdEdit.value = "";
    client.showClients();
  }

  formName.value = "";
  formEmail.value = "";
  formMobile.value = "";
  formCustomerValue.value = "";  
});

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let id = parseInt(e.target.getAttribute("data-id"));
    let clients = JSON.parse(localStorage.getItem("client"));  
    let newData = clients.filter((item) => item.id != id);
    localStorage.setItem("client", JSON.stringify(newData));  

     
    e.target.parentElement.parentElement.remove();
  }

  if (e.target.classList.contains("edit")) {
    let id = parseInt(e.target.getAttribute("data-id"));
    let item = JSON.parse(localStorage.getItem("client")).find(  
      (item) => item.id === id
    );

    formName.value = item.name;
    formEmail.value = item.email;
    formMobile.value = item.mobile;
    formCustomerValue.value = item.customerValue; 
    contIdEdit.value = id;
    btnSubmit.value = "Edit This Client";
  }
});

