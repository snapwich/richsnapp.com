
<script>
  export default {
    title: 'Building a small, but powerful, gaming machine',
    tags: ['pc', 'computers', 'gaming']
  }
</script>

<template lang="md">
  Have you ever wanted a computer that is fast and powerful but also small, sleek, and sexy?  Surely such a
  combination cannot exist!  Well, prepare to feast your eyes upon this beautiful build I recently completed.

  <figure class="images small right">
    <img v-img:images src="./IMG_4637.jpg" />
    <div>
      <img v-img:images src="./IMG_4641.jpg" />
      <img v-img:images src="./IMG_4540.jpg" />
    </div>
  </figure>

  About the size of an Xbox but with computing power to spare this sweet little package was born out of necessity.  I
  turned off my old desktop computer a few weeks ago when leaving for a business trip and arrived home only to find that
  it had given up the ghost never to be turned on again (bad motherboard).  I salvaged the parts I could while using the
  opportunity to upgrade some others and eventually ended up with the build we see here in its final form.

  Make no mistake, its creation was not without struggle.  Blood, sweat, tears, and possible a few curse words were
  included in the process of making everything fit in this small technological carapace.

  If you would like more details on what's included or details on how to make your own (and avoid some pitfalls and
  bloodshed), I documented some of the complications as well as included a build list with all the parts involved at
  [PCPartPicker.com](https://pcpartpicker.com/b/DV29TW).

  <figure class="pcpartpicker center scale">
    <a class="pcpartpicker-button" href="https://pcpartpicker.com/b/DV29TW" target="_blank">
      <img src="./pcpp.png" />
      <div>
        <h4 class="title">Small form factor gaming machine</h4>
        <p>by snapwich</p>
      </div>
    </a>
  </figure>
</template>

<style lang="less">
  @import '../../../../assets/variables';

  figure.images {
    div {
      display: flex;
      margin-top: 15px;
      @media (max-width: @screen-xs-max) {
        margin-left: 15px;
      }
      img {
        height: 100px;
        margin-right: 15px;
      }
    }
  }

  .pcpartpicker {
    a {
      @media (min-width: @screen-xs-min) {
        max-width: 350px !important;
      }
      padding: 10px;
      color: white;
      font-weight: bold;
      background: #F77C0C;
      border: 0;
      border-radius: 6px;
      text-align: left;
      img {
        float: left;
        margin: 0 20px 0 5px;
      }
      .title {
        margin-bottom: 10px;
        font-weight: bold;
      }
      p {
        font-family: 'Open Sans', sans-serif;
        text-indent: 0;
        text-align: right;
        margin: 5px 10px;
        font-weight: lighter;
        font-size: smaller;
      }
    }
  }
</style>
