<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
     <router-link v-bind:to="{ name: 'Posts' }" class="btn_post">Lihat Post</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Selamat Datang!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn_post {
  background: grey;
  color:#fff;
  padding: 10px;
  text-decoration: none;
}
</style>
