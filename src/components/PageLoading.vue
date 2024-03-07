<template>
  <VueLoading
    :active="true"
    :background-color="'#fbfaf4'"
    :is-full-page="true"
    :color="'#52504B'"
    :opacity="1"
  >
    <img class="p-1" src="/glow-logo.png" alt="glow-logo" width="50" />
    <div class="d-flex align-items-center justify-content-center">
      <div class="dot me-1 first-dot"></div>
      <div class="dot me-1 second-dot"></div>
      <div class="dot third-dot"></div>
    </div>
  </VueLoading>
</template>
<style>
.dot {
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 100%;
}
.first-dot {
  animation-duration: 1s;
  animation-name: first-dot;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.second-dot {
  animation-duration: 1s;
  animation-name: second-dot;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.third-dot {
  animation-duration: 1s;
  animation-name: third-dot;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes first-dot {
  0% {
    background-color: #fff;
  }
  25% {
    background-color: #fff;
  }
  50% {
    background-color: #984b4b;
  }
  75% {
    background-color: #984b4b;
  }
  100% {
    background-color: #984b4b;
  }
}
@keyframes second-dot {
  0% {
    background-color: #fff;
  }
  25% {
    background-color: #fff;
  }
  50% {
    background-color: #fff;
  }
  75% {
    background-color: #984b4b;
  }
  100% {
    background-color: #984b4b;
  }
}
@keyframes third-dot {
  0% {
    background-color: #fff;
  }
  25% {
    background-color: #fff;
  }
  50% {
    background-color: #fff;
  }
  75% {
    background-color: #fff;
  }
  100% {
    background-color: #984b4b;
  }
}
</style>
