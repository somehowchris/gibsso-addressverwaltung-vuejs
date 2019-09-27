<template>
  <div class="home">
    <template>
      <div class="container" style="margin-top:32px">
        <div class="row" id="form">
          <div class="col-3">Country(*)</div>
          <div class="col-9">
            <div
              class="form-group"
              :class="validInput(1) || query === undefined ? '' : 'has-danger'"
            >
              <input
                type="text"
                class="form-control form-control-alternative"
                :class="validInput(1) || query === undefined ? '' : 'is-invalid'"
                id="exampleFormControlInput1"
                placeholder="Country Name"
                v-model="query"
              />
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
        <div class="row">
          <button
            class="btn btn-1 btn-outline-primary"
            type="button"
            @click.prevent="unset"
          >Reset Form</button>
          <button
            class="btn btn-1 btn-outline-success"
            type="button"
            :disabled="validInput(0) ? false : true"
            @click="save()"
          >{{this.selectedCountry ? 'Save' : 'Create'}}</button>
          <button
            class="btn btn-1 btn-outline-danger"
            type="button"
            :disabled="!this.selectedCountry"
            @click.prevent="deleteCountry(selectedCountry)"
          >Delete</button>
        </div>
        <hr />
        <div class="row">
          <div class="col-12">
            <table
              class="table"
              v-if="countries && countries instanceof Array && countries.length > 0"
            >
              <thead>
                <tr>
                  <th scope="col">Land</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="country in getCountries" :key="country.id">
                  <td
                    @click="select(country)"
                    :class="country.selected ? 'table-active' : ''"
                  >{{ country.name }}</td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <p style="text-align:center;">No countries found</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script src="./Countries.js"></script>
<style src="./Countries.scss" lang="scss" scoped></style>
