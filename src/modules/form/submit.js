import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay, schedulesToday } from "../schedules/load.js"

const form = document.querySelector("form")
const closeForm = document.querySelector(".close-new-schedule")
const formDate = document.querySelector(".form-date")
const selectedDate = document.getElementById("form-date")
const selectedHour = document.getElementById("selected-hour")
const formHour = document.getElementById("form-hour")
const scheduleDate = document.getElementById("date")
const newScheduleButton = document.querySelector("#new-schedule button")
const newScheduleBar = document.querySelector("#new-schedule")
const optionsHours = document.getElementById("options")
const inputSelectedHour = document.getElementById("input-selected-hour")
const modalBg = document.querySelector(".modal-bg")
const modal = document.getElementById("modal")
const tutorName = document.getElementById("tutor-name")
const petName = document.getElementById("pet-name")
const contactPhone = document.getElementById("contact-phone")
const serviceDescription = document.getElementById("service-description")

// Data e hora para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Formata o input do telefone para permitir apenas números
contactPhone.addEventListener("input", () => {
  contactPhone.value = contactPhone.value.replace(/\D/g, "")
})

// Formata o número digitado para o formato padrão de telefone
contactPhone.addEventListener("blur", () => {
  let phoneInput = contactPhone.value
  phoneInput = phoneInput.replace(/(\d{2})?(\d{1})?(\d{4})?(\d{4})/, "($1) $2 $3-$4")
  contactPhone.value = phoneInput
})

// Carrega a data atual e define como data mínima como sendo a atual
selectedDate.value = inputToday
selectedDate.min = inputToday
scheduleDate.value = inputToday

formHour.addEventListener('click', () => {
  formHour.classList.toggle("input-selected")
  optionsHours.classList.toggle("hide")
}) 

document.addEventListener("click", (event) => {
  if (!formHour.contains(event.target) && !optionsHours.classList.contains("hide")) {
    optionsHours.classList.add("hide");
    formHour.classList.toggle("input-selected")

  }
  
  else if (!modal.classList.contains("hide") && !newScheduleButton.contains(event.target)) {
    if (!modal.contains(event.target)) {
      toggleScreen()
      resetInputs()
    }
  }
})

formDate.addEventListener("click", (e) => {
  e.preventDefault()

  selectedDate.showPicker()
  if (!selectedDate.showPicker) {
    selectedDate.click();
  }
})

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    // Recuperando o nome do cliente
    const name = tutorName.value.trim()
    if (!name) {
      return alert("Informe o nome do tutor.")
    }

    // Recuperando o nome do pet
    const pet = petName.value.trim()
    if (!pet) {
      return alert("Informe o nome do pet")
    }

    // Recuperando o telefone para contato
    const tel = contactPhone.value.trim()
    if (!tel) {
      return alert("Informe um telefone para contato")
    }

    // Recuperando a descrição de serviços
    const services = serviceDescription.value.trim()
    if (!services) {
      return alert("Descreva os serviços a serem prestados pela nossa equipe")
    }

    // Recuperando o horário selecionado
    const hour = selectedHour.textContent
    if (hour === "Selecione um horário") {
      return alert("Selecione o horário do agendamento.")
    }
    // Recupera somente a hora
    const [mainHour] = hour.split(":")

    // Insere a hora na data
    const when = dayjs(selectedDate.value).add(mainHour, "hour")
    
    // Gera um ID
    const id = new Date().getTime()

    // Faz o agendamento
    await scheduleNew({
      id, 
      name,
      pet,
      tel, 
      services,
      when,
    })

    // Recarrega os agendamentos
    await schedulesToday()
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }

  toggleScreen()
  resetInputs()
}

closeForm.onclick = () => {
  toggleScreen()
  resetInputs()
}

newScheduleButton.onclick = () => {
  toggleScreen()
}

optionsHours.addEventListener('click', event => {
  selectedHour.textContent = event.target.dataset.label

  const isMouseOrTouch = event.pointerType == "mouse" || event.pointerType == "touch"
  if (isMouseOrTouch) {
    if (inputSelectedHour) {
      inputSelectedHour.classList.add("hide")
    }
  }
})

function toggleScreen() {
  modal.classList.toggle("hide")
  modalBg.classList.toggle("hide")
  newScheduleBar.classList.toggle("hide")
  newScheduleButton.classList.toggle("hide")
  newScheduleBar.classList.toggle("flex")
}

function resetInputs() {
  selectedDate.value = inputToday
  schedulesDay()
  tutorName.value = ""
  petName.value = ""
  contactPhone.value = ""
  serviceDescription.value = ""
  selectedHour.textContent = "Selecione um horário"
}










// const currentHour = dayjs().format("HH:mm");

// // Iterar sobre as opções e desabilitar aquelas que já passaram
// for (let i = 0; i < selectedHour.options.length; i++) {
//   if (selectedHour.options[i].value < currentHour) {
//     selectedHour.options[i].disabled = true;
//   }
// }
