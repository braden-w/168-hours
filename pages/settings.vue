<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <draggable v-model="sprints" draggable=".item">
        <v-card v-for="sprint in sprints" :key="sprint">
          {{ sprint.name }}
        </v-card>
        <v-btn slot="header" @click="addSprint">Add Sprint</v-btn>
      </draggable>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sprints: [{ name: 'Work' }],
    }
  },
  methods: {
    addSprint() {},
  },
}
</script>

<style></style>
