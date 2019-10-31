<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
  </div>
</template>
<script>
import { AppMain, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain
  }
}
</script>