interface Sprint {
  name: string;
  duration: number;
  progress: number;
}

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
  addSprint({sprints }:{ sprints: Sprint[] }, payload: any) {
    sprints.push(payload)
  },
  startTimer(state: any, indexOfCurrentTimer: number) {
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
    }, state.settings.timer.interval)
  },
  endTimer(state: any) {
    state.currentSession.isRunning = false
    state.currentSession.endTime = new Date().getTime()
    clearInterval(state.timer)
  },

  clearTimers(state: any) {
    state.sprints.forEach((sprint) => (sprint.progress = 0))
  },
}

export const actions = {
  addSprint(
    { commit }: any,
    payload: Sprint
  ) {
    commit('addSprint', payload)
  },
  startTimer({ commit }: any, payload: number) {
    commit('startTimer', payload)
  },
  endTimer({ commit }: any, payload: any) {
    commit('endTimer', payload)
  },
  clearTimers({ commit }: any, payload: any) {
    commit('clearTimers', payload)
  },
}
