/* eslint-disable */
<template>
  <div class="container" style="margin-top:32px">
    <div v-if="edit">
      <div id="form">
        <div class="row">
          <div class="col-3">Plz</div>
          <div class="col-9">
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-alternative"
                id="exampleFormControlInput1"
                placeholder="Town postal code"
                v-model="form.postalCode"
              />
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
        <div class="row">
          <div class="col-3">Name(*)</div>
          <div class="col-9">
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-alternative"
                id="exampleFormControlInput1"
                placeholder="Twon Name"
                v-model="form.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3"></div>
      <div class="row">
        <button class="btn btn-1 btn-outline-primary" type="button" @click="edit = false">Cancel</button>
        <button
          class="btn btn-1 btn-outline-success"
          type="button"
          :disabled="false"
          @click="saveTown"
        >{{$route.params.id ? 'Save' : 'Create'}}</button>
        <button
          class="btn btn-1 btn-outline-danger"
          type="button"
          :disabled="!$route.params.id"
          @click="deleteById($route.params.id)"
        >Delete</button>
      </div>
      <div class="mb-4"></div>
    </div>
    <div class="row" v-if="!edit">
      <div class="col-12">
        <div class="row">
          <button
            class="btn btn-1 btn-outline-primary align-left col-1"
            type="button"
            @click="editNewTown()"
          >Neu</button>
          <div class="col"></div>
          <input
            type="text"
            class="form-control form-control-alternative col-3"
            id="exampleFormControlInput1"
            placeholder="Search"
            v-model="search"
          />
        </div>
        <hr />
        <div class="row">
          <data-tables-server
            :data="townData"
            :pagination-props="{ pageSizes }"
            :total="total"
            :current-page.sync="page"
            :page-size.sync="size"
            @current-change="handleRowClick"
            @current-page-change="updateData"
            class="col-12"
          >
            <el-table-column
              v-for="title in headers"
              :prop="title.prop"
              :label="title.name"
              :key="title.name"
            ></el-table-column>
          </data-tables-server>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Towns.js"></script>
<style lang="scss" src="./Towns.scss" scoped></style>
