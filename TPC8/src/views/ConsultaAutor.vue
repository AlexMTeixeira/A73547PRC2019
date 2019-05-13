<template>
  <v-container>
      <AtorFilmes :idAtor="$route.params.id"/>
      <v-layout>
          <v-btn color="info" @click="$router.go(-1)">
              Voltar à página anterior
          </v-btn>
      </v-layout>
  </v-container>
</template>

<script>
import AtorFilmes from '@/components/AtorFilmes'

export default {
  components: {
    AtorFilmes
  }
}
</script>
