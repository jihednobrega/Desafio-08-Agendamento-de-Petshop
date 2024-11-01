import { schedulesDay, schedulesToday } from "../schedules/load.js"

// Seleciona o input de data
const selectedDate = document.getElementById("form-date")

// Recarrega a lista de horários quando o input de data mudar
selectedDate.onchange = () => {
  const selectedHour = document.getElementById("selected-hour")

  schedulesDay()
  selectedHour.textContent = "Selecione um horário"
}

// Seleciona o input de data na página de horários agendados
const scheduleSelectedDate = document.getElementById("date")

// Recarrega a lista de horários quando o input de data mudar
scheduleSelectedDate.onchange = () => {
  schedulesToday()
}