<template>
  <v-container>
    <v-card>
      {{ this.$store.state.sprints }}
      <v-card-title>Settings</v-card-title>
      <v-card-actions>
        <v-btn color="success" @click="startTimer(0)">Start timer</v-btn>
        <v-btn color="primary" @click="addSprint('Hi', 10)"> Add Sprint </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <draggable
          :list="this.$store.state.sprints"
          class="list-group"
          draggable=".item"
          @start="dragging = true"
          @end="dragging = false"
        >
          <v-container
            v-for="(sprint, index) in this.$store.state.sprints"
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
                      this.$store.state.currentSession.isRunning
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
                :height="this.$store.state.settings.height"
                :rounded="this.$store.state.settings.rounded"
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
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'
const prettyMilliseconds = require('pretty-ms')

export default {
  components: {
    draggable,
  },
  methods: {
    prettyMilliseconds(time) {
      return prettyMilliseconds(time)
    },
    ...mapMutations([
      'endTimer',
      'startTimer',
      'addSprint',
      'clearTimers', // also supports payload `this.nameOfMutation(amount)`
    ]),
  },
}
</script>

<style></style>
