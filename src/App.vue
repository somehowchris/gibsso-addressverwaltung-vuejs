<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-success" style="height: 60px">
      <div class="container">
        <a class="navbar-brand" href="#">Adressverwaltung</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-default"
          aria-controls="navbar-default"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-default">
          <div class="navbar-collapse-header">
            <div class="row">
              <div class="col-6 collapse-brand"></div>
              <div class="col-6 collapse-close">
                <button
                  type="button"
                  class="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbar-default"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>

          <ul class="navbar-nav ml-lg-auto">
            <li class="nav-item">
              <router-link to="/people" tag="a" class="nav-link">Personenverwaltung</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/towns" tag="a" class="nav-link" href="#">Ortsverwaltung</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/countries" tag="a" class="nav-link" href="#">Landverwaltung</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
