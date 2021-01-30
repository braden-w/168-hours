<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-actions>
        <v-btn color="success" @click="startTimer(0)">Start timer</v-btn>
        <v-btn color="primary" @click="addSprint('Hi', 10)"> Add Sprint </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <draggable
          :list="sprints"
          class="list-group"
          draggable=".item"
          @start="dragging = true"
          @end="dragging = false"
        >
          <v-container
            v-for="(sprint, index) in sprints"
            :key="index"
            class="item"
          >
            <v-card color="secondary" class="pa-3">
              <v-row>
                <v-col cols="9">
                  <v-text-field
                    v-model="sprint.name"
                    label="Name"
                    prepend-icon="mdi-drag"
                    @click:prepend="
                      currentSession.isRunning
                        ? endTimer(index)
                        : startTimer(index)
                    "
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="sprint.duration"
                    type="number"
                    label="Duration"
                  >
                  </v-text-field
                ></v-col>
              </v-row>
              <v-progress-linear
                :height="settings.height"
                :rounded="settings.rounded"
                :value="(sprint.progress / 1000 / 60 / sprint.duration) * 100"
              >
                <template #default="{ value }">
                  <strong>{{ prettyMilliseconds(sprint.progress) }}</strong>
                </template>
              </v-progress-linear>
            </v-card>
          </v-container>
        </draggable>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
const prettyMilliseconds = require('pretty-ms')
export default {
  components: {
    draggable,
  },
  data() {
    return {
      sprints: [
        // { name: 'Work', duration: 52, startTime: 0, progress: 0, end: 0 },
        // { name: 'Break', duration: 23, startTime: 0, progress: 0, end: 0 },

        { name: 'Work', duration: 0.05, progress: 0 },
        { name: 'Break', duration: 0.05, progress: 0 },
      ],
      settings: { height: 6, rounded: true, timer: { interval: 1000 } },
      currentSession: {
        isRunning: false,
        startTime: 0,
        endTime: 0,
      },
      sessions: [],
    }
  },
  methods: {
    addSprint(name, duration) {
      this.sprints.push({ name, duration })
    },
    prettyMilliseconds(time) {
      return prettyMilliseconds(time)
    },
    startTimer(indexOfCurrentTimer) {
      this.currentSession.startTime = new Date().getTime()
      this.currentSession.isRunning = true
      this.timer = setInterval(() => {
        const currentTimer = this.sprints[indexOfCurrentTimer]
        currentTimer.progress += this.settings.timer.interval
        if (currentTimer.progress >= currentTimer.duration * 60 * 1000) {
          indexOfCurrentTimer += 1
          if (indexOfCurrentTimer === this.sprints.length) {
            this.endTimer()
          }
        }
        console.log(prettyMilliseconds(currentTimer.progress))
      }, this.settings.timer.interval)
    },
    endTimer(indexOfCurrentTimer) {
      this.currentSession.isRunning = false
      this.currentSession.endTime = new Date().getTime()
      clearInterval(this.timer)
    },
  },
}
</script>

<style></style>
