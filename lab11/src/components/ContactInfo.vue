<script setup>
import { ref } from "vue";
import { Users } from "lucide-vue-next";

const props = defineProps({
  name: {
    required: true,
    type: String,
  },
  phoneNumber: {
    required: true,
    type: String,
  },
  emailAddress: {
    required: true,
    type: String,
  },
  friend: {
    required: true,
    type: Boolean,
  },
});

const showDetails = ref(false);
const isFriend = ref(props.friend);

function toggleShowDetails() {
  showDetails.value = !showDetails.value;
}

function toggleIsFriend() {
  isFriend.value = !isFriend.value;
}
</script>

<template>
  <li>
    <h2>
      {{ props.name }}
      <Users v-if="isFriend" color="white" style="margin-left: 10px;" :size="30" />
    </h2>

    <button @click="toggleIsFriend">
      {{ isFriend ? "Delete" : "Add" }} friend
    </button>

    <button @click="toggleShowDetails">
      {{ showDetails ? "Hide" : "Show" }} details
    </button>

    <ul v-if="showDetails">
      <li>
        <strong>phone:</strong>
        {{ props.phoneNumber }}
      </li>

      <li>
        <strong>e-mail:</strong>
        {{ props.emailAddress }}
      </li>
    </ul>
  </li>
</template>
