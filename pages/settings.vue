<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
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
                <v-text-field v-model="sprint.name" label="Name">
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
          </v-card>
        </v-container>
        <v-btn slot="footer" color="primary" @click="addSprint('Hi', 10)">
          Add Sprint
        </v-btn>
      </draggable>
    </v-card>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  data() {
    return {
      sprints: [
        { name: 'Work', duration: '10' },
        { name: 'Work2', duration: '10' },
        { name: 'Work3', duration: '10' },
      ],
    }
  },
  methods: {
    addSprint(name, duration) {
      this.sprints.push({ name, duration })
    },
  },
}
</script>

<style></style>
