<template>
  <div id="app">
    <VoicesList />
  </div>
</template>

<script>
import VoicesList from "./views/VoicesList";

export default {
  name: 'App',

  components: {
    VoicesList,
  },
}
</script>

<style lang="scss">
@import "styles/index";
$black: #1b1b1b;
$silver-main: #858585;

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $silver-main;
  background-color: $black;
  min-height: 100vh;
}
</style>
