<template>
  <div id="modal-template">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <p class="text-center">Welcome {{ userName }}</p>
            </div>
          <div class="modal-footer">
            <button
              class="btn btn-sm btn-primary big"
              @click="$emit('name-modal')"
            >
              Add name
            </button>
            <button class="btn btn-sm btn-primary big" @click="$emit('close')">
              Ok
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["userName"],
  methods:{
    saveName() {
      localStorage.setItem("userName", this.userName);
    },
  },

};
</script>

<style scoped>
.modal-container {
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -4rem;
  margin-bottom: 30px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}


.modal-default-button {
  float: right;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active{
  text-align: center;
  margin-top: 20px;

  animation: fadeIn;
  animation-duration: 1s;
  }
.modal-leave-active{
  text-align: center;
  margin-top: 20px;

  animation: fadeOut; 
  animation-duration: 1s;
}

@media only screen and (min-width: 768px) {
 .modal-container{
   width: 500px;
 }
 p {
   font-size: 25px;
 }
 .big{
   font-size: large;
 }
 
}
</style>
