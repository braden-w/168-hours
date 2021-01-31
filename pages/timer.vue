<template>
  <v-container>
    <v-card>
      {{ sprints }}
      <v-card-title>Settings</v-card-title>
      <v-card-actions>
        <v-btn color="success" @click="startTimer(0)"><span v-if="currentSession.isRunning">End Timer</span> <span v-else>Start Timer</span></span></v-btn>
        <v-btn
          color="primary"
          @click="addSprint({ name: 'Hi', duration: 10, progress: 0 })"
        >
          Add Sprint
        </v-btn>
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
import { mapActions, mapState } from 'vuex'

import draggable from 'vuedraggable'
const prettyMilliseconds = require('pretty-ms')

export default {
  components: {
    draggable,
  },
  computed: {
    ...mapState(['sprints', 'currentSession', 'settings']),
  },
  methods: {
    prettyMilliseconds(time) {
      return prettyMilliseconds(time)
    },
    ...mapActions(['startTimer', 'endTimer', 'addSprint', 'clearTimers']),
  },
}
</script>

<style></style>
