const prettyMilliseconds = require('pretty-ms')
export const state = () => ({
  sprints: [
    { name: 'Work', duration: 0.05, progress: 0 },
    { name: 'Break', duration: 0.05, progress: 0 },
  ],
  currentSession: {
    isRunning: false,
    startTime: 0,
    endTime: 0,
  },
  sessions: [],
  settings: {
    height: 20,
    rounded: true,
    timer: { interval: 1000, autoRestart: true },
  },
})
export const mutations = {
  addSprint(state, name, duration) {
    state.sprints.push({ name, duration })
  },
  startTimer(state, indexOfCurrentTimer) {
    state.currentSession.startTime = new Date().getTime()
    state.currentSession.isRunning = true
    state.timer = setInterval(() => {
      const currentTimer = state.sprints[indexOfCurrentTimer]
      currentTimer.progress += state.settings.timer.interval
      if (currentTimer.progress >= currentTimer.duration * 60 * 1000) {
        indexOfCurrentTimer += 1
        if (indexOfCurrentTimer === state.sprints.length) {
          state.endTimer()
          if (state.settings.timer.autoRestart) {
            state.clearTimers()
            state.startTimer(0)
          }
        }
      }
      console.log(prettyMilliseconds(currentTimer.progress))
    }, state.settings.timer.interval)
  },
  endTimer(state, indexOfCurrentTimer) {
    state.currentSession.isRunning = false
    state.currentSession.endTime = new Date().getTime()
    clearInterval(state.timer)
  },
  clearTimers(state) {
    state.sprints.forEach((sprint) => (sprint.progress = 0))
  },
}
