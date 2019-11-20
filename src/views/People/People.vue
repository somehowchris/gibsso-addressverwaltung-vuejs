<template>
  <div>
    <div class="container" style="margin-top:32px">
      <div class="row">
        <div class="col-2">Name (*)</div>
        <div class="col-10">
          <div class="form-group">
            <input
              type="text"
              class="form-control form-control-alternative"
              placeholder="Last Name"
              v-model="person.lastName"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">Vorname</div>
        <div class="col-10">
          <div class="form-group">
            <input
              type="text"
              class="form-control form-control-alternative"
              placeholder="First name"
              v-model="person.firstName"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">Street</div>
        <div class="col-10">
          <div class="form-group">
            <input
              type="text"
              class="form-control form-control-alternative"
              placeholder="Street"
              v-model="person.street"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">Town</div>
        <div class="col-10">
          <base-dropdown style="width: 100%;">
            <base-button
              slot="title"
              type="secondary"
              class="dropdown-toggle"
              style="width: 100%;"
            >{{userTown && userTown.name ? `${userTown.postalCode} ${userTown.name}` : 'Please choose a country'}}</base-button>
            <a
              class="dropdown-item"
              href="#"
              style="width: 100%;"
              v-for="town in towns"
              :key="town.id"
              @click="setTown(town)"
            >{{town.postalCode}} {{town.name}}</a>
          </base-dropdown>
        </div>
      </div>
      <div class="row" style="margin-top:12px">
        <div class="col-2">Private Phone</div>
        <div class="col-10">
          <div class="form-group">
            <input
              type="text"
              class="form-control form-control-alternative"
              placeholder="Private phone number"
              v-model="person.privatePhone"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">Company Phone</div>
        <div class="col-10">
          <div class="form-group">
            <input
              type="text"
              class="form-control form-control-alternative"
              placeholder="Company phone number"
              v-model="person.companyPhone"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">Country</div>
        <div class="col-10">
          <base-dropdown style="width: 100%;">
            <base-button
              slot="title"
              type="secondary"
              class="dropdown-toggle"
              style="width: 100%;"
            >{{userCountry && userCountry.name ? userCountry.name : 'Please choose a country'}}</base-button>
            <a
              class="dropdown-item"
              href="#"
              style="width: 100%;"
              v-for="country in countries"
              :key="country.id"
              @click="setCountry(country)"
            >{{country.name}}</a>
          </base-dropdown>
        </div>
      </div>
      <div class="row" style="margin-top:12px">
        <div class="col-md-9">
          <button
            class="btn btn-1 btn-outline-primary"
            type="button"
            style="float:left;"
            @click="setSearch()"
          >Search</button>
          <button
            class="btn btn-1 btn-outline-primary"
            type="button"
            style="float:left;"
            @click="checkoutNew()"
          >New</button>
          <button
            class="btn btn-1 btn-outline-success"
            type="button"
            style="float:left;"
            @click.prevent="savePerson()"
          >{{person.id ? 'Save' : 'Create'}}</button>
          <button
            class="btn btn-1 btn-outline-danger"
            type="button"
            style="float:left;"
            :disabled="!person.id"
            @click="deletePerson()"
          >Delete</button>
        </div>
        <div class="col-md-3 row">
          <button
            class="btn btn-1 btn-outline-primary"
            type="button"
            style="float:right;"
            @click="setPerson(previous)"
            :disabled="!previous"
          >Previous</button>
          <button
            class="btn btn-1 btn-outline-primary"
            type="button"
            style="float:right;"
            @click="setPerson(next)"
            :disabled="!next"
          >Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./People.scss" scoped></style>
<script src="./People.js"></script>
