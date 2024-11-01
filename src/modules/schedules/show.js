import dayjs from "dayjs";

// Seleciona as seções manhã, tarde e noite
const PeriodMorning = document.getElementById("period-morning")
const PeriodAfternoon = document.getElementById("period-afternoon")
const PeriodNight = document.getElementById("period-night")

export function schedulesShow({ dailySchedules }) {
  try {
    // Limpa as listas
    PeriodMorning.innerHTML = ""
    PeriodAfternoon.innerHTML = ""
    PeriodNight.innerHTML = ""

    // Renderiza os agendamentos por período
    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li")
      const clientInfos = document.createElement("div")
      const time = document.createElement("span")
      const pet = document.createElement("span")
      const client = document.createElement("span")
      const service = document.createElement("p")

      // Adiciona o id do agendamento
      item.setAttribute("data-id", schedule.id)

      clientInfos.classList.add("client-infos")

      time.textContent = dayjs(schedule.when).format("HH:mm")

      pet.textContent = schedule.pet
      pet.classList.add("pet-name")

      client.textContent = "/ " + schedule.name;
      client.classList.add("client-name")

      service.textContent = schedule.services

      // Cria o botão de cancelar o agendamento
      const cancelIcon = document.createElement("span")

      cancelIcon.textContent = "Remover agendamento"
      cancelIcon.classList.add("schedule-cancel")

      // Adiciona tudo no item
      clientInfos.append(time, pet, client, service)
      item.append(clientInfos, cancelIcon)

      // Obtém somente a hora
      const hour = dayjs(schedule.when).hour()

      // Renderiza o agendamento na seção (manhã, tarde ou noite)
      if (hour <= 12) {
        PeriodMorning.appendChild(item)
      } else if (hour > 12 && hour <= 17) {
        PeriodAfternoon.appendChild(item)
      } else {
        PeriodNight.appendChild(item)
      }
    })
  } catch (error) {
    console.log(error)
    alert("Não foi possível exibir os agendamentos.")
  }
}