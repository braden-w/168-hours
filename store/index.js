export const state = () => ({
  sprints: [
    { name: 'Work', duration: 0.05, progress: 0 },
    { name: 'Break', duration: 0.05, progress: 0 },
  ],
  settings: {
    height: 20,
    rounded: true,
    timer: { interval: 1000, autoRestart: true },
  },
  currentSession: {
    isRunning: false,
    startTime: 0,
    endTime: 0,
  },
  sessions: [],
})
