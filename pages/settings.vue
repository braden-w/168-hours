<template>
  <v-container>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <draggable v-model="sprints" draggable=".item">
        <v-card v-for="sprint in sprints" :key="sprint">
          {{ sprint.name }}
        </v-card>
      </draggable>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      intervals: {},
    }
  },
}
</script>

<style></style>
