<template>
  <div>
    <Vuetable ref="vuetable" @vuetable:pagination-data="onPaginationData"></Vuetable>
    <vuetable-pagination ref="pagination"></vuetable-pagination>
  </div>
</template>

<script src="./Towns.js"></script>
<style lang="scss" src="./Towns.scss" scoped></style>
