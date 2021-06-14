<template>
  <div v-if="open" class="backdrop" @click="$emit('close')"></div>

    <transition name="modal">
  <dialog open v-if="open">
    <slot></slot>
  </dialog>
    </transition>
</template>

<script>
export default {
  props:['open'],
  emits: ['close'],
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}

dialog {
  position: fixed;
  top: 30vh;
  width: 20rem;
  left: calc(50% - 10rem);
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  padding: 1rem;
  background-color: white;
  z-index: 100;
  border: none;
}

@keyframes slide-fade {
  0% {
    transform: translateX(0) scale(1);
  }
  70% {
    transform: translateX(-50px) scale(1.1);
  }
  100% {
    transform: translateX(-80px) scale(1);
  }
}

.modal-enter-active {
    animation: slide-fade 0.5s ease-out;
}
.modal-leave-active {
    animation: slide-fade 0s ease-in reverse;

}


</style>