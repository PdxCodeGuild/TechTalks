<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h1>Book Browser</h1>
    </v-app-bar>

    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
