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
})

export const mutations = {
  addSprint(state, name, duration) {
    this.sprints.push({ name, duration })
  },
  prettyMilliseconds(time) {
    return prettyMilliseconds(time)
  },
  startTimer(state, indexOfCurrentTimer) {
    this.currentSession.startTime = new Date().getTime()
    this.currentSession.isRunning = true
    this.timer = setInterval(() => {
      const currentTimer = this.sprints[indexOfCurrentTimer]
      currentTimer.progress += this.settings.timer.interval
      if (currentTimer.progress >= currentTimer.duration * 60 * 1000) {
        indexOfCurrentTimer += 1
        if (indexOfCurrentTimer === this.sprints.length) {
          this.endTimer()
          if (this.settings.timer.autoRestart) {
            this.clearTimers()
            this.startTimer(0)
          }
        }
      }
      console.log(prettyMilliseconds(currentTimer.progress))
    }, this.settings.timer.interval)
  },
  clearTimers() {
    this.sprints.forEach((sprint) => (sprint.progress = 0))
  },
  endTimer(state, indexOfCurrentTimer) {
    this.currentSession.isRunning = false
    this.currentSession.endTime = new Date().getTime()
    clearInterval(this.timer)
  },
}
