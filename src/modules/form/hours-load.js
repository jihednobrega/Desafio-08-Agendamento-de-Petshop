import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js"

const optionsHours = document.getElementById("options")

export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista de horários
  optionsHours.innerHTML = ""

  // Obtém a lista de horários ocupados
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))

  // Criação dos horários dinâmicos
  const opening = openingHours.map((hour) => {
    // Recupera somente a hora
    const [scheduleHour] = hour.split(":")

    // Adiciona a hora na data e verifica se está no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

    const available = !unavailableHours.includes(hour) && !isHourPast
    
    return {
      hour,
      available,
    }
  })

  // Verifica se há horários disponíveis
  const hasAvailableHours = opening.some(slot => slot.available);

  // Se não houver horários disponíveis, carregar o próximo dia
  if (!hasAvailableHours) {
    loadNextDay();
    return; // Retorna para evitar a renderização dos horários vazios
  }

  // Renderiza os horários
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li")
    const span = document.createElement("span")
    const input = document.createElement("input")

    li.classList.add("option")

    input.setAttribute("id", "input-selected-hour")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "hour")
    input.setAttribute("value", hour)
    input.setAttribute("data-label", hour)
    input.disabled = (available ? false : true)

    span.textContent = hour

    li.appendChild(input)
    li.appendChild(span)

    optionsHours.append(li)
  })

  // Função que carrega o próximo dia
  function loadNextDay() {
    const selectedDate = document.getElementById("form-date");
    const currentDay = dayjs(selectedDate.value);
    const nextDay = currentDay.add(1, "day");
    selectedDate.value = nextDay.format("YYYY-MM-DD");

    // Chama hoursLoad novamente com a nova data
    hoursLoad({ date: selectedDate.value });
  }
}