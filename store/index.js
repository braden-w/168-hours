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
