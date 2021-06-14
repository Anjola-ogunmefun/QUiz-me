<template>
  <main>
    {{userName}}
    <h5>
       You attempted
    </h5>
    {{ attemptedQuestions }}
    <h5>question(s) of</h5>
    {{ length }}
    <h5>questions</h5>

    <br />

    <h2>Your Score</h2>
    {{ score }} / {{ length }}
    <slot></slot>
  </main>
</template>

<script>
export default {
  props: ["attemptedQuestions", "length", "score", "userName"],
};
</script>

<style scoped>
main {
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  list-style: numeric;
}
</style>
