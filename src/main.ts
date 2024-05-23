type User = {
  name: string;
  surname: string;
  email: string;
  number: string;
};

let Users: User[] = [];

const addNameInput = document.querySelector(
  ".addNameInput"
) as HTMLInputElement;
const addSurnameInput = document.querySelector(
  ".addSurnameInput"
) as HTMLInputElement;
const addEmailInput = document.querySelector(
  ".addEmailInput"
) as HTMLInputElement;
const addNumberInput = document.querySelector(
  ".addNumberInput"
) as HTMLInputElement;

const searchInput = document.querySelector(".searchInput") as HTMLInputElement;

const numbersUl = document.querySelector(".numbersUl") as HTMLUListElement;
const okButton = document.querySelector(".okButton");
const cancelButton = document.querySelector(".cancelButton");

searchInput.addEventListener("input", (e) => {
  showUsers(searchInput.value);
});

cancelButton?.addEventListener("click", (e) => {
  e.preventDefault();

  addNameInput.value = "";
  addSurnameInput.value = "";
  addEmailInput.value = "";
  addNumberInput.value = "";

  addNumberInput.disabled = false;
});

okButton?.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    addNameInput.value != "" &&
    addSurnameInput.value != "" &&
    addEmailInput.value != "" &&
    addNumberInput.value != ""
  ) {
    let checkNumber = true;

    Users.forEach((e) => {
      if (e.number == addNumberInput.value) {
        e.name = addNameInput.value;
        e.surname = addSurnameInput.value;
        e.email = addEmailInput.value;
        checkNumber = false;
      }
    });

    if (checkNumber) {
      const user: User = {
        name: addNameInput.value,
        surname: addSurnameInput.value,
        email: addEmailInput.value,
        number: addNumberInput.value,
      };

      Users.push(user);
    }

    localStorage.setItem("users", JSON.stringify(Users));
    addNumberInput.disabled = false;
    showUsers();
  }
});

function showUsers(inputValue: string = "") {
  numbersUl.innerHTML = "";

  if (inputValue != "") {
    Users.forEach((e, i) => {
      if (e.name.slice(0, inputValue.length) == inputValue) {
        const li = ` <li> 
          <p>Name: ${e.name}</p>
        
            <p>Surname: ${e.surname}</p>
            <p>Email: ${e.email}</p>
            <p>Number: ${e.number}</p>
            <button class="deleteUser${e.number}">Delete</button>
            <button class="changeUser${e.number}">Change</button>
        
        </li>
        `;
        numbersUl.innerHTML += li;

        const deleteUser = document.querySelector(`.deleteUser${e.number}`);

        deleteUser?.addEventListener("click", (ev) => {
          ev.preventDefault();
          Users.splice(i, 1);
          localStorage.setItem("users", JSON.stringify(Users));
          showUsers();
        });

        const changeUser = document.querySelector(`.changeUser${e.number}`);

        changeUser?.addEventListener("click", (ev) => {
          ev.preventDefault();

          addNameInput.value = e.name;
          addSurnameInput.value = e.surname;
          addEmailInput.value = e.email;
          addNumberInput.value = e.number;

          addNumberInput.disabled = true;
        });
      }
    });

    return;
  }

  ////
  Users.forEach((e, i) => {
    const li = ` <li> 
            <p>Name: ${e.name}</p>
            <p>Surname: ${e.surname}</p>
            <p>Email: ${e.email}</p>
            <p>Number: ${e.number}</p>
            <button class="deleteUser${e.number}">Delete</button>
            <button class="changeUser${e.number}">Change</button>
        
        </li>
        `;
    numbersUl.innerHTML += li;

    const deleteUser = document.querySelector(`.deleteUser${e.number}`);

    deleteUser?.addEventListener("click", (ev) => {
      ev.preventDefault();
      Users.splice(i, 1);
      localStorage.setItem("users", JSON.stringify(Users));
      showUsers();
    });

    const changeUser = document.querySelector(`.changeUser${e.number}`);

    changeUser?.addEventListener("click", (ev) => {
      ev.preventDefault();

      addNameInput.value = e.name;
      addSurnameInput.value = e.surname;
      addEmailInput.value = e.email;
      addNumberInput.value = e.number;

      addNumberInput.disabled = true;
    });
  });
}
function addUsersInArray() {
  Users = JSON.parse(localStorage.getItem("users") as string);
}

addUsersInArray();
showUsers();
