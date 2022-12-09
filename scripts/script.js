const titleInput = document.getElementById("my-title")
const notesInput = document.getElementById("my-notes");
const addModal = document.getElementById("add-modal");
const btnAdd = document.querySelector("#btn-add");
const result = document.getElementById("result");
const btnModal = document.getElementById("btn-modal");
const searchInput = document.getElementById("search-navbar");
let exactText;

btnModal.addEventListener("click", () => {
  addModal.classList.remove("hidden");
  btnModal.parentElement.classList.remove("fixed");
  btnModal.parentElement.classList.add("absolute")

  const closeAddModal = document.querySelector(".close-add-modal");
  closeAddModal.addEventListener("click", () => {
    addModal.classList.add("hidden")
  })
})

let data_result = JSON.parse(localStorage.getItem("text")) || [];
data_result.sort((a, b) => {
  return new Date(a.updated) > new Date(b.updated) ? -1 : 1
})

btnAdd.addEventListener("click", () => {
  const notesValue = notesInput.value;
  const titleValue = titleInput.value;
  if (notesValue !== "" && titleValue !== "") {
    const textObject = {
      title: titleValue,
      text: notesValue,
      createAt: new Date().toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })
    }
    data_result.push(textObject)
    localStorage.setItem("text", JSON.stringify(data_result))

    displayNotes()
    notesInput.value = "";
    titleInput.value = "";
  } else {
    notesInput.focus()
  }

  btnModal.parentElement.classList.remove("absolute");
  btnModal.parentElement.classList.add("fixed");
  addModal.classList.add("hidden");
})


function displayNotes() {
  result.innerHTML = "";
  data_result.forEach(element => {
    // create Element
    const container = document.createElement("div");
    const content = document.createElement("div");
    const tools = document.createElement("div")
    const edit = document.createElement("button");
    const deleteButton = document.createElement('button');
    const fakeElement = document.createElement("div");
    const date = document.createElement("h3");
    const title = document.createElement("div");

    // styling
    content.classList.add("bg-glass", "rounded-md", "mt-2", "mb-4")
    container.classList.add("w-72", "p-5", "bg-glass", "m-4", "rounded-md", "notess", "border-l-2", "border-pink-600", "shadow-md")
    title.classList.add("text-xl", "word-break");
    tools.classList.add("flex", "justify-between");
    edit.classList.add('flex', 'items-center', "bg-pink-600", "px-2","py-1.5", "rounded-md", "float-right");
    date.classList.add("text-sm", "text-gray-200");

    // text
    deleteButton.innerHTML = `
    <button type="button"
    class="p-2.5 text-sm font-medium text-white rounded-md border border-gray-800  focus:ring-1 focus:outline-none  hover:bg-glass focus:ring-gray-800 delete-btn"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
    </button>`;

    // Edit Button
    edit.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>&nbsp;Edit
    `

    content.innerHTML = `<div class="bg-transparent text-white border-none outline-none w-full h-44 overflow-y-auto p-2" >
      ${element.text}
    </div>`;
    date.innerHTML = `${element.createAt}`;
    title.innerHTML = `<h2 class="text-2xl font-medium break-all">${element.title}</h2>`;

    // display Element
    tools.appendChild(fakeElement);
    tools.appendChild(deleteButton);
    container.appendChild(tools)
    container.appendChild(title);
    container.appendChild(date)
    container.appendChild(content)
    container.appendChild(edit)
    result.appendChild(container)

    // Function
    const btnDelete = tools.querySelector(".delete-btn");
    btnDelete.addEventListener("click", (index) => {
      data_result = data_result.filter(e => {
        if (e != element) {
          return index;
        }
      });
      localStorage.setItem('text', JSON.stringify(data_result));
      displayNotes()
    })

    edit.addEventListener("click", () => {
      // Modal
      const editModal = document.getElementById("edit-modal");
      const closeModal = editModal.querySelector(".close-btn");
      const modalTitle = document.getElementById("modal-title");
      const modalNotes = document.getElementById("modal-notes");
      const editBtn = document.getElementById("edit-btn");
      editModal.classList.remove('hidden');
      closeModal.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });

      // style button element
      const btnCont = document.querySelector(".actions");
      const btnAddCont = document.querySelector(".actions-add")
      const pasteTarget = btnCont.getAttribute("data-for");
      const pasteTargetAdd = btnAddCont.getAttribute("data-for");
      const commandButton = document.querySelectorAll("#btn-command");
      const commandAddButton = document.querySelectorAll("#btn-add-command");

      function styleText(button, target) {
        for (let i = 0; i < button.length; i++) {
          button[i].addEventListener("click", (e) => {
            const elementName = e.target.getAttribute("data")
            if (elementName === "ul") {
              insertText(`<${elementName} class="list-disc list-inside"></${elementName}>`, target)
            } else {
              insertText(`<${elementName}></${elementName}>`, target)
            }
          })
        };  
      }

      styleText(commandButton, pasteTarget);
      document.addEventListener("DOMContentLoaded", () => {
        styleText(commandAddButton, pasteTargetAdd);
      })

      modalNotes.addEventListener("keydown", function(e) {
        if (e.key == 'Tab') {
          e.preventDefault();
          var start = this.selectionStart;
          var end = this.selectionEnd;

          // set textarea value to: text before caret + tab + text after caret
          this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);

          // put caret at right position again
          this.selectionStart =
            this.selectionEnd = start + 1;
        }
      })

      function insertText(newText, selector) {
        const textarea = document.querySelector(selector);
        textarea.focus();

        let pasted = true;
        try {
          if (!document.execCommand("insertText", false, newText)) {
            pasted = false;
          }
        } catch (e) {
          console.error('error caught:', e);
          pasted = false;
        }

        if (!pasted) {
          console.error('paste unsuccessful, execCommand not supported');
        }
      }

      // Set Value Modal
      modalTitle.value = `${element.title}`
      modalNotes.value = `${element.text}`

      editBtn.addEventListener("click", () => {
        const reccValueTitle = modalTitle.value;
        const reccValueNotes = modalNotes.value;
        element.title = reccValueTitle;
        element.text = reccValueNotes;
        localStorage.setItem("text", JSON.stringify(data_result));

        editModal.classList.add("hidden")
        displayNotes()
      });

      // Window Selection Text 
      document.addEventListener("mouseup", event => {
        if (window.getSelection.toString().length) {
          exactText = window.getSelection().toString();
          console.log(exactText)
        }
      });
    })
  });

  // Search Filter
  const notesData = document.querySelectorAll(".notess");
  searchInput.addEventListener("keyup", function (event) {
    const keyword = event.target.value.toLowerCase();

    notesData.forEach((row) => {
      const title = row.querySelector("h2");
      const status = title.textContent.toLowerCase().startsWith(keyword);
      if (status) {
        row.style.display = "block";
      } else {
        row.style.display = "none"
      }
    })
  });
}

if (localStorage.getItem("text")) {
  displayNotes()
}