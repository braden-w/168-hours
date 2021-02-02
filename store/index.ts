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
  startTimer(state: any, timer: any) {
    state.timer = timer
  },
  increaseSprintByInterval(
    { sprints }: { sprints: Sprint[] },
    {
      indexOfCurrentSprint,
      interval,
    }: { indexOfCurrentSprint: number; interval: number }
  ) {
    sprints[indexOfCurrentSprint].progress += interval
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

  notify(state: any, { name }: { name: string }) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification#Parameters
    const notification = new Notification(`${name} has finished!`, {
      body: '168 Hours',
    })
    const audio = new Audio(
      'https://www.myinstants.com/media/sounds/preview_4.mp3'
    )
    audio.play()
  },
}

export const actions = {
  addSprint(
    { commit }: any,
    payload: { name: string; duration: number; progress: number }
  ) {
    commit('addSprint', payload)
  },

  startOrEndTimer({ state, dispatch }: any, indexOfCurrentSprint: number) {
    if (state.currentSession.isRunning) {
      dispatch('endTimer')
    } else {
      dispatch('startTimer', indexOfCurrentSprint)
    }
  },
  startTimer(
    { state: { sprints, settings }, commit, dispatch }: any,
    indexOfCurrentSprint: number
  ) {
    commit('toggleIsRunning')
    commit('logCurrentSession')
    commit(
      'startTimer',
      setInterval(async () => {
        const currentSprint = sprints[indexOfCurrentSprint]
        if (currentSprint.progress >= currentSprint.duration * 60 * 1000) {
          indexOfCurrentSprint += 1
          const requestPermission = await Notification.requestPermission()
          console.log(requestPermission)
          commit('notify', currentSprint)
          if (indexOfCurrentSprint === sprints.length) {
            commit('endTimer')
            if (settings.timer.autoRestart) {
              commit('clearTimers')
              dispatch('startTimer', 0)
            }
          }
        } else {
          commit('increaseSprintByInterval', {
            indexOfCurrentSprint,
            interval: settings.timer.interval,
          })
        }
      }, settings.timer.interval)
    )
  },
  endTimer({ commit }: any) {
    commit('toggleIsRunning')
    commit('logCurrentSession')
    commit('endTimer')
  },

  clearTimers({ commit }: any) {
    commit('clearTimers')
  },
}
