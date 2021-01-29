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
        <v-card v-for="(sprint, index) in sprints" :key="index" class="item">
          {{ sprint.name }}
          <v-spacer> </v-spacer>
          {{ sprint.duration }}
        </v-card>
        <!-- <v-container fluid>
          <v-card v-for="sprint in sprints" :key="sprint" class="item">
            {{ sprint.name }}
          </v-card>
        </v-container> -->
        <v-btn slot="header" @click="addSprint">Add Sprint</v-btn>
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
    addSprint() {},
  },
}
</script>

<style></style>
