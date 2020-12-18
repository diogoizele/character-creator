let allItems = [
  "Espada Longa",
  "Espada Curta",
  "Espada dos Diurnos",
  "Espadilha da Morte",
  "Lâmina da Perdição",
  "Espada Negra de Sauron",
  "Espada Encantada com Fogo",
  "Arco Recurvo",
  "Escudo Leve",
  "Lança Pontuda",
  "Cajado do Xamã",
  "Cajado do Fogo Sombrio",
  "Cajado da Névoa",
  "Adaga Sangrenta",
  "Lâmina Cálida",
  "Lâmina Enfeitiçada Enferrujada",
  "Machado Pesado",
  "Machado Afiado",
  "Machado Poderoso do Destino",
  "Clava Destruidora",
  "Besta Simples",
  "Besta de Pulso",
  "Aljava com 10 Flechas",
  "Aljava com 20 Dardos",
  "Poção de Vida",
  "Poção de Mana",
  "Bastão de Madeira",
  "Arco Drástico",
];
allItems.sort();
let inventory = ["Poção de Vida", "Poção de Vida", "Poção de Mana"];
let handleAllItems = allItems.map(item => item);
let chars = []; // array para os personagens criados

let body = document.body;
let allItemsContainer = document.querySelector(".allItems");
let inventoryContainer = document.querySelector(".inventory");
let btnAddItem = document.querySelector("#addItem");
let inputFile = document.querySelector(".sec-image input");
let imageContainer = document.querySelector("div.img");
let selectRace = document.querySelector("#selectRace");
let selectProfession = document.querySelector("#selectProfession");
let inputElement = document.querySelectorAll(".elements label");
let btnCreateChar = document.querySelector("#createChar");
let newName = "";
let currentItem = "";
let imageBase64 = "";
let state = 0; // estado de click para mostrar os items no card
let arrAtributtes = [];

let allItemsButtons = [
  {
    name: "Editar",
    func: editItem,
  },
  {
    name: "Excluir",
    func: deleteItem,
  },
  {
    name: "Equipar",
    func: equipItem,
  },
];

let inventoryButtons = [
  {
    name: "Desequipar",
    func: unequipItem,
  },
];

getItemsLocalStorage();
getCharsLocalStorage();

function checkAttributes() {
  document.querySelectorAll(".attributes input").forEach((attribute, index) => {
    attribute.onchange = () => {
      arrAtributtes[index] = attribute.value;
      if (attribute.value > 4 || attribute.value < -4) {
        body.appendChild(
          createMessageSpan(
            "Os valores para atributos devem estar entre -4 e 4!"
          )
        );
        if (attribute.value > 4) {
          attribute.value = 4;
        } else if (attribute.value < -4) {
          attribute.value = -4;
        }
        return;
      }
      document.querySelectorAll(".attributes input").forEach(allAttribs => {
        if (allAttribs.value != "" && allAttribs.value == attribute.value) {
          allAttribs.style.backgroundColor = "#A6001C";
        }
        if (allAttribs.value != "" && allAttribs.value != attribute.value) {
          allAttribs.style.backgroundColor = "#0FA675";
        }
      });
    };
  });
}

function createMessageSpan(span) {
  let div = document.createElement("div");
  div.classList.add("span");

  let divMessage = document.createElement("div");
  divMessage.classList.add("div-message");

  let h1 = document.createElement("h1");
  h1.innerHTML = span;

  let closeButton = document.createElement("button");
  closeButton.innerHTML = "x";
  closeButton.classList.add("close");
  closeButton.addEventListener("click", function() {
    body.removeChild(div);
  });

  divMessage.appendChild(h1);
  div.appendChild(divMessage);
  div.appendChild(closeButton);
  return div;
}

function createInputSpan(span) {
  let div = document.createElement("div");
  div.classList.add("span");

  let h1 = document.createElement("h1");
  h1.innerHTML = span;

  let input = document.createElement("input");
  input.setAttribute("placeholder", "Nome do item...");
  if (span == "Editar Item: ") {
    input.value = currentItem.textContent;
  } else if (span == "Adicionar Item: ") {
    input.value = "";
  }

  let button = document.createElement("button");
  button.innerHTML = span.substr(0, span.length - 2);
  button.addEventListener("click", function() {
    newName = input.value;
    if (span == "Editar Item: ") {
      let itemIndex = allItems.indexOf(currentItem.textContent);
      allItems[itemIndex] = newName;

      let itemIndexHandle = handleAllItems.indexOf(currentItem.textContent);
      handleAllItems[itemIndexHandle] = newName;

      setItemsLocalStorage();
      currentItem.textContent = newName;

      getItemsLocalStorage();
      handleAllItems = allItems.map(item => item);
    } else if (span == "Adicionar Item: ") {
      input.value = "";
      allItemsContainer.innerHTML = "";

      handleAllItems.push(newName);
      allItems.push(newName);
      setItemsLocalStorage();

      getItemsLocalStorage();
      handleAllItems = allItems.map(item => item);

      renderItems(handleAllItems, allItemsContainer, allItemsButtons);
    }
    body.removeChild(div);
  });

  let closeButton = document.createElement("button");
  closeButton.innerHTML = "x";
  closeButton.classList.add("close");
  closeButton.addEventListener("click", function() {
    body.removeChild(div);
  });

  div.appendChild(closeButton);
  div.appendChild(h1);
  div.appendChild(input);
  div.appendChild(button);

  return div;
}

function createChar() {
  let radioSelected = "";
  document.querySelectorAll(".elements input").forEach(radio => {
    if (radio.checked) {
      switch (radio.id) {
        case "fire":
          radioSelected = "Mago de Fogo";
          break;
        case "water":
          radioSelected = "Mago de Água";
          break;
        case "air":
          radioSelected = "Mago de Ar";
          break;
        case "earth":
          radioSelected = "Mago de Terra";
          break;
      }
    }
  });
  let characteristics = new Characteristics(
    document.querySelector("#inputName").value,
    document.querySelector("#selectRace").value,
    document.querySelector("#selectProfession").value,
    document.querySelector("#selectGender").value || "Gênero: Desconhecido",
    document.querySelector("#inputAge").value || "Idade: Desconhecida",
    document.querySelector("#inputWeight").value || "Peso: Desconhecido",
    document.querySelector("#inputHeight").value || "Altura: Desconhecida",
    document.querySelector("#selectTrend").value,
    radioSelected || null
  );
  let attributes = new Attributes(
    document.querySelector("#force").value,
    document.querySelector("#power").value,
    document.querySelector("#constituition").value,
    document.querySelector("#dexterity").value,
    document.querySelector("#perception").value,
    document.querySelector("#intelligence").value,
    document.querySelector("#agility").value,
    document.querySelector("#charisma").value,
    document.querySelector("#stealth").value
  );
  let status = new Status(
    document.querySelector("#level").value,
    document.querySelector("#xp").value,
    document.querySelector("#damage").value,
    document.querySelector("#health").value,
    document.querySelector("#mana").value
  );
  let charInventory = new Inventory(
    document.querySelector("#gold").value,
    inventory
  );

  let char = new Character(
    characteristics,
    attributes,
    status,
    charInventory,
    readImage()
  );
  return char;
}

function renderChar(char) {
  let container = document.querySelector(".characters");
  let divChar = document.createElement("div");
  divChar.classList.add("card");

  let divImg = document.createElement("div");
  divImg.classList.add("img-card");
  divImg.style.backgroundImage = `url(${char.image})`;

  let divHeader = document.createElement("div");
  divHeader.classList.add("header");
  let pHeader = [
    { class: "name", value: char.characteristics.name },
    { class: "xp", value: char.status.xp, span: "XP: " },
    { class: "level", value: char.status.level, span: "Nível: " },
  ];
  pHeader.forEach(p => {
    let pElement = document.createElement("p");
    pElement.classList.add(p.class);

    if (p.hasOwnProperty("span")) {
      if (p.span == "XP: ") {
        pElement.innerHTML = `XP: ${p.value}`;
      } else {
        pElement.innerHTML = `Nível: ${p.value}`;
      }
    } else {
      pElement.innerHTML = p.value;
    }

    divHeader.appendChild(pElement);
  });

  let divInfo = document.createElement("div");
  divInfo.classList.add("info");

  let divCharacteristics = document.createElement("div");
  divCharacteristics.classList.add("characteristics-card");

  // cria um vetor com os valores de characteristics
  let characteristicsValues = Object.values(char.characteristics);
  characteristicsValues.shift(); // remove o primeiro valor: nome

  characteristicsValues.forEach((characteristics, index) => {
    let p = document.createElement("p");
    if (index == 3 && characteristics != "Idade: Desconhecida") {
      p.innerHTML = `${characteristics} anos`;
    } else if (index == 4 && characteristics != "Peso: Desconhecido") {
      p.innerHTML = `${characteristics}kg`;
    } else if (index == 5 && characteristics != "Altura: Desconhecida") {
      p.innerHTML = `${characteristics / 100}m`;
    } else {
      p.innerHTML = characteristics;
    }
    divCharacteristics.appendChild(p);
  });

  let divAttributes = document.createElement("div");
  divAttributes.classList.add("attributes-card");
  let attributesValues = Object.values(char.attributes);
  attributesValues.forEach(attrib => {
    let p = document.createElement("p");
    p.innerHTML = attrib;
    divAttributes.appendChild(p);
  });

  let divStatus = document.createElement("div");
  divStatus.classList.add("status-card");
  let pStatus = [
    { value: char.status.basicAttack, span: "Dano: " },
    { value: char.status.health, span: "Vida: " },
    { value: char.status.mana, span: "Mana: " },
  ];
  pStatus.forEach(p => {
    let pElement = document.createElement("p");
    pElement.innerHTML = `${p.span}${p.value}`;
    divStatus.appendChild(pElement);
  });

  let divItems = document.createElement("div");
  let pItems = document.createElement("p");
  pItems.innerHTML = "Itens 🛈";

  pItems.addEventListener("mouseenter", _ => {
    if (state == 0) {
      showItems(char.inventory.items);
      state = 1;
    }
  });

  pItems.addEventListener("mouseout", e => {
    if (state == 1) {
      let divItemsCard = e.target.nextElementSibling;
      divItems.removeChild(divItemsCard);
      state = 0;
    }
  });

  function showItems(items) {
    let div = document.createElement("div");
    div.classList.add("toggle");
    items.forEach(item => {
      let span = document.createElement("span");
      span.innerHTML = item;
      div.appendChild(span);
    });
    divItems.appendChild(div);
  }

  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = "x";
  closeBtn.classList.add("closeBtn");
  closeBtn.addEventListener("click", e => {
    let idx = "";
    container.removeChild(e.target.parentElement.parentElement);
    chars = JSON.parse(localStorage.getItem("chars"));
    chars.forEach((char, index) => {
      let charHtmlName =
        e.target.parentElement.parentElement.firstChild.nextElementSibling
          .firstChild.textContent;
      let charArrayName = char.characteristics.name;
      if (charHtmlName == charArrayName) {
        idx = index;
      }
    });
    chars.splice(idx, 1);
    setCharsLocalStorage();
  });

  divItems.appendChild(pItems);
  divItems.classList.add("items-card");

  divInfo.appendChild(divCharacteristics);
  divInfo.appendChild(divAttributes);
  divInfo.appendChild(divStatus);
  divInfo.appendChild(divItems);
  divInfo.appendChild(closeBtn);

  divChar.appendChild(divImg);
  divChar.appendChild(divHeader);
  divChar.appendChild(divInfo);

  container.appendChild(divChar);
}

function resetForm() {
  let fields = [
    "#inputName",
    "#selectRace",
    "#selectProfession",
    "#selectGender",
    "#inputAge",
    "#inputWeight",
    "#inputHeight",
    "#selectTrend",
    "#force",
    "#power",
    "#constituition",
    "#dexterity",
    "#perception",
    "#intelligence",
    "#agility",
    "#charisma",
    "#stealth",
    "#level",
    "#xp",
    "#damage",
    "#health",
    "#mana",
    "#gold",
  ];
  fields.forEach(field => {
    document.querySelector(field).value = "";
  });
}

function addCharInArray(char) {
  chars.push(char);
  setCharsLocalStorage();
}

function renderItems(arr = [], container, btns) {
  getItemsLocalStorage();
  arr.forEach(item => {
    let div = document.createElement("div");
    div.classList.add("item");

    let p = document.createElement("p");
    p.innerHTML = item;

    let divButtons = document.createElement("div");
    divButtons.classList.add("btns");

    btns.forEach(btn => {
      let button = document.createElement("button");
      button.innerHTML = btn.name;
      button.addEventListener("click", btn.func);

      divButtons.appendChild(button);
    });

    div.appendChild(p);
    div.appendChild(divButtons);

    container.appendChild(div);
  });
}

function editItem(e) {
  currentItem = e.target.parentElement.parentElement.firstChild;
  body.appendChild(createInputSpan("Editar Item: "));
}

function deleteItem(e) {
  let button = e.target;
  let item = button.parentElement.parentElement;
  let itemName = item.firstChild.textContent;
  let itemIndex = allItems.indexOf(itemName);

  allItems.splice(itemIndex, 1);
  allItemsContainer.removeChild(item);
  setItemsLocalStorage();
}

function equipItem(e) {
  let button = e.target;
  let item = button.parentElement.parentElement;
  let itemName = item.firstChild.textContent;
  let itemIndex = handleAllItems.indexOf(itemName);

  inventory.push(itemName);
  handleAllItems.splice(itemIndex, 1);

  inventoryContainer.innerHTML = "";

  renderItems(inventory, inventoryContainer, inventoryButtons);

  allItemsContainer.removeChild(item);
}
function unequipItem(e) {
  let button = e.target;
  let item = button.parentElement.parentElement;
  let itemName = item.firstChild.textContent;
  let itemIndex = inventory.indexOf(itemName);

  getItemsLocalStorage();
  handleAllItems = allItems.map(item => item);

  inventory.splice(itemIndex, 1);
  inventoryContainer.removeChild(item);

  allItemsContainer.innerHTML = "";
  renderItems(handleAllItems, allItemsContainer, allItemsButtons);
}

function setItemsLocalStorage() {
  let allItemsLocal = JSON.stringify(allItems);
  localStorage.setItem("allItems", allItemsLocal);
}

function getItemsLocalStorage() {
  if (localStorage.hasOwnProperty("allItems")) {
    allItems = JSON.parse(localStorage.getItem("allItems"));
  }
}

function setCharsLocalStorage() {
  let charsLocal = JSON.stringify(chars);
  localStorage.setItem("chars", charsLocal);
}

function getCharsLocalStorage() {
  if (localStorage.hasOwnProperty("chars")) {
    chars = JSON.parse(localStorage.getItem("chars"));
    chars.forEach(char => {
      renderChar(char);
    });
  }
}

function handleProfessions(race) {
  selectProfession.innerHTML = "";
  let optHidden = document.createElement("option");
  selectProfession.appendChild(optHidden);
  optHidden.setAttribute("hidden", "");
  switch (race.value) {
    case "Humano": {
      let professions = [
        "Guerreiro",
        "Arqueiro",
        "Mago",
        "Ladrão",
        "Druída",
        "Vampiro",
      ];
      professions.forEach(option => {
        let opt = document.createElement("option");
        selectProfession.appendChild(opt);
        opt.innerHTML = option;
      });
      break;
    }
    case "Elfo": {
      let professions = ["Guerreiro", "Arqueiro", "Mago", "Assassino"];
      professions.forEach(option => {
        let opt = document.createElement("option");
        selectProfession.appendChild(opt);
        opt.innerHTML = option;
      });
      break;
    }
    case "Anão": {
      let professions = ["Guerreiro", "Arqueiro"];
      professions.forEach(option => {
        let opt = document.createElement("option");
        selectProfession.appendChild(opt);
        opt.innerHTML = option;
      });
      break;
    }
    case "Kroler": {
      let professions = ["Assassino"];
      professions.forEach(option => {
        let opt = document.createElement("option");
        selectProfession.appendChild(opt);
        opt.innerHTML = option;
      });
      break;
    }
    case "Cybriz": {
      let professions = ["Mago"];
      professions.forEach(option => {
        let opt = document.createElement("option");
        selectProfession.appendChild(opt);
        opt.innerHTML = option;
      });
      break;
    }
  }
}

function readImage() {
  if (this.files && this.files[0]) {
    let file = new FileReader();
    file.readAsDataURL(this.files[0]);
    file.onload = function(e) {
      imageContainer.style.backgroundImage = `url('${e.target.result}')`;
      console.log(file.result);
      imageBase64 = file.result;
    };
  }
  return imageBase64;
}

btnAddItem.addEventListener("click", function() {
  body.appendChild(createInputSpan("Adicionar Item: "));
});

inputFile.addEventListener("change", readImage);

selectRace.addEventListener("change", function() {
  handleProfessions(selectRace);
});

inputElement.forEach(element => {
  element.addEventListener("click", e => {
    inputElement.forEach(element => (element.style.backgroundColor = "white"));
    if (selectProfession.value == "Mago") {
      document
        .querySelectorAll(".elements input")
        .forEach(input => input.removeAttribute("disabled", ""));

      let elem = e.target.textContent;
      switch (elem) {
        case "Fogo":
          e.target.style.backgroundColor = "#ff440055";
          break;
        case "Água":
          e.target.style.backgroundColor = "#00bfff55";
          break;
        case "Ar":
          e.target.style.backgroundColor = "#a9a9a955";
          break;
        case "Terra":
          e.target.style.backgroundColor = "#d2691e55";
          break;
      }
    } else {
      document
        .querySelectorAll(".elements input")
        .forEach(input => input.setAttribute("disabled", ""));
    }
  });
});

btnCreateChar.addEventListener("click", () => {
  if (!document.querySelector("#inputName").value) {
    body.appendChild(
      createMessageSpan("Você esqueceu de inserir o NOME de seu Personagem")
    );
    return;
  } else if (!document.querySelector("#selectRace").value) {
    body.appendChild(
      createMessageSpan("Você esqueceu de inserir a RAÇA de seu Personagem")
    );
    return;
  } else if (!document.querySelector("#selectProfession").value) {
    body.appendChild(
      createMessageSpan("Você esqueceu de inserir a CLASSE de seu Personagem")
    );
    return;
  } else if (!document.querySelector("#selectRace").value) {
    body.appendChild(
      createMessageSpan("Você esqueceu de inserir a RAÇA de seu Personagem")
    );
    return;
  } else if (!document.querySelector("#selectTrend").value) {
    body.appendChild(
      createMessageSpan(
        "Você esqueceu de inserir a TENDÊNCIA de seu Personagem"
      )
    );
    return;
  }

  addCharInArray(createChar());
  renderChar(createChar());
  resetForm();
  document.querySelector("div.img").style.backgroundImage =
    "url(profile-pic.png)";
  inventory = ["Poção de Vida", "Poção de Vida", "Poção de Mana"];
  inventoryContainer.innerHTML = "";
  renderItems(inventory, inventoryContainer, inventoryButtons);
});

checkAttributes();
setItemsLocalStorage();
renderItems(allItems, allItemsContainer, allItemsButtons);
renderItems(inventory, inventoryContainer, inventoryButtons);
