<template>
  <div class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>
<script>
import { AppMain, Sidebar } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Sidebar
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
    })
  }
}
</script>