interface Sprint {
  name: string
  duration: number
  progress: number
}

export const state = () => ({
  sprints: [
    { name: 'Work', duration: 0.05, progress: 0 },
    { name: 'Break', duration: 0.05, progress: 0 },
  ],
  currentSession: {
    isRunning: false,
    range: [],
  },
  sessions: [],
  settings: {
    height: 20,
    rounded: true,
    timer: { interval: 1000, autoRestart: true },
  },
})

export const mutations = {
  addSprint({ sprints }: { sprints: Sprint[] }, payload: any) {
    sprints.push(payload)
  },
  startTimer(state: any, indexOfCurrentSprint: number) {
    state.timer = setInterval(() => {
      const currentSprint = state.sprints[indexOfCurrentSprint]
      currentSprint.progress += state.settings.timer.interval
      if (currentSprint.progress >= currentSprint.duration * 60 * 1000) {
        indexOfCurrentSprint += 1
        if (indexOfCurrentSprint === state.sprints.length) {
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
    clearInterval(state.timer)
  },

  toggleIsRunning({ currentSession }: any) {
    currentSession.isRunning = !currentSession.isRunning
  },
  logCurrentSession(state: any) {
    state.currentSession.range.push(new Date().getTime())
  },
  clearTimers(state: any) {
    state.sprints.forEach((sprint: Sprint) => (sprint.progress = 0))
  },
}

export const actions = {
  addSprint(
    { commit }: any,
    payload: { name: string; duration: number; progress: number }
  ) {
    commit('addSprint', payload)
  },

  startOrEndTimer({ state, dispatch }: any, payload: number) {
    if (state.currentSession.isRunning) {
      dispatch('endTimer')
    } else {
      dispatch('startTimer', payload)
    }
  },
  startTimer({ commit }: any, payload: number) {
    commit('toggleIsRunning')
    commit('logCurrentSession')
    commit('startTimer', payload)
  },
  endTimer({ commit }: any, payload: any) {
    commit('toggleIsRunning')
    commit('logCurrentSession')
    commit('endTimer', payload)
  },
  clearTimers({ commit }: any, payload: any) {
    commit('clearTimers', payload)
  },
}
