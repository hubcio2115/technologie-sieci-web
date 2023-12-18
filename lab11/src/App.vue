<script setup>
import { reactive } from "vue";
import ContactInfo from "./components/ContactInfo.vue";

const contacts = reactive([
  {
    id: "item01",
    name: "Chava Avila",
    phone: "(504) 324-5554",
    email: "justo.nec@hotmail.net",
    friend: true,
  },
  {
    id: "item02",
    name: "Garth Banks",
    phone: "(921) 768-4863",
    email: "non@yahoo.net",
    friend: false,
  },
  {
    id: "item03",
    name: "Dolan Valdez",
    phone: "(501) 395-5218",
    email: "phasellus.vitae@aol.ca",
    friend: true,
  },
  {
    id: "item04",
    name: "Stephanie Cardenas",
    phone: "(741) 465-7252",
    email: "ornare.sagittis.felis@icloud.com",
    friend: false,
  },
  {
    id: "item05",
    name: "Fletcher Mcbride",
    phone: "(255) 723-7718",
    email: "parturient.montes@hotmail.ca",
    friend: false,
  },
  {
    id: "item06",
    name: "Sydnee Morse",
    phone: "(233) 588-1681",
    email: "integer@protonmail.net",
    friend: false,
  },
  {
    id: "item07",
    name: "Damon Santana",
    phone: "1-847-762-8728",
    email: "nascetur.ridiculus@hotmail.edu",
    friend: true,
  },
  {
    id: "item08",
    name: "Zeus Blackwell",
    phone: "(576) 949-0717",
    email: "nec.euismod@icloud.net",
    friend: false,
  },
  {
    id: "item09",
    name: "Rhona Cain",
    phone: "(727) 106-4022",
    email: "elit.pellentesque@protonmail.org",
    friend: false,
  },
  {
    id: "item10",
    name: "Shad Stephens",
    phone: "1-464-218-9616",
    email: "accumsan.laoreet@outlook.com",
    friend: true,
  },
]);
</script>

<template>
  <section>
    <h1>Contacts List</h1>

    <ul id="contacts" style="list-style-type: none;">
      <ContactInfo
        v-for="{ id, name, phone, email, friend } in contacts"
        :key="id"
        :name="name"
        :phoneNumber="phone"
        :emailAddress="email"
        :friend="friend"
      />
    </ul>
  </section>
</template>
