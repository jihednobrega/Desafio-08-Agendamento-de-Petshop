import { schedulesDay, schedulesToday } from "./schedules/load.js"

document.addEventListener("DOMContentLoaded", function(){
  schedulesDay()
  schedulesToday()
})