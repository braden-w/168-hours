<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-actions>
        <v-btn color="success" @click="startTimer">Start timer</v-btn>
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
                    @click:prepend="startTimer(index)"
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
              ></v-progress-linear>
              {{ sprint.progress / 1000 }}
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
        { name: 'Work', duration: 52, startTime: 0, progress: 0, end: 0 },
        { name: 'Break', duration: 23, startTime: 0, progress: 0, end: 0 },
      ],
      settings: { height: 6, rounded: true },
      sessions: [],
    }
  },
  methods: {
    addSprint(name, duration) {
      this.sprints.push({ name, duration })
    },
    startTimer(indexOfCurrentSession) {
      const currentSession = this.sprints[indexOfCurrentSession]
      currentSession.Time = new Date().getTime()
      const timer = setInterval(() => {
        const now = new Date().getTime()

        currentSession.progress = now - currentSession.Time
        console.log(prettyMilliseconds(currentSession.progress))
      }, 1000)
    },
    endTimer() {
      this.currentSession.end = new Date().getTime()
    },
  },
}
</script>

<style></style>
