
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

  Make no mistake, its creation was not without struggle.  Blood, sweat, tears, and possibly a few curse words were
  included in the process of making everything fit into this small technological carapace.

  If you would like more details on what's included or details on how to make your own (and possibly avoid some pitfalls
  and/or bloodshed), I documented some of the complications as well as included a build list with all the parts involved
  at [PCPartPicker.com](https://pcpartpicker.com/b/DV29TW).

  <figure class="pcpartpicker center scale">
    <a class="pcpartpicker-button" href="https://pcpartpicker.com/b/DV29TW" target="_blank">
      <img src="./pcpp.png" />
      <div>
        <h4 class="title">Small form factor gaming machine</h4>
        <p>by snapwich</p>
      </div>
      <i class="fa fa-external-link-square" />
    </a>
  </figure>

  <table class="table table-striped">
    <tbody>
      <tr>
        <td>CPU</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/Mr2rxr/intel-core-i5-8600k-36ghz-6-core-processor-bx80684i58600k">Intel - Core i5-8600K 3.6GHz 6-Core Processor</a></td>
      </tr>
      <tr>
        <td>CPU Cooler</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/TDdFf7/cooler-master-masterliquid-lite-120-667-cfm-liquid-cpu-cooler-mlw-d12m-a20pw-r1">Cooler Master - MasterLiquid Lite 120 66.7 CFM Liquid CPU Cooler</a></td>
      </tr>
      <tr>
        <td>Motherboard</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/VRjWGX/asus-rog-strix-z370-i-gaming-mini-itx-lga1151-motherboard-strix-z370-i-gaming">Asus - ROG Strix Z370-I Gaming Mini ITX LGA1151 Motherboard</a></td>
      </tr>
      <tr>
        <td>Memory</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/gWM323/corsair-vengeance-rgb-32gb-2-x-16gb-ddr4-3333-memory-cmr32gx4m2c3333c16">Corsair - Vengeance RGB 32GB (2 x 16GB) DDR4-3333 Memory</a></td>
      </tr>
      <tr>
        <td>Storage</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/FcGj4D/samsung-960-pro-20tb-m2-2280-solid-state-drive-mz-v6p2t0bw">Samsung - 960 Pro 2TB M.2-2280 Solid State Drive</a></td>
      </tr>
      <tr>
        <td>Video Card</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/CBjWGX/pny-geforce-gtx-1070-8gb-founders-edition-video-card-gf1070gtx8grpb">PNY - GeForce GTX 1070 8GB Founders Edition Video Card</a></td>
      </tr>
      <tr>
        <td>Case</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/RgVBD3/silverstone-rvz03b-mini-itx-desktop-case-rvz03b">Silverstone - RVZ03B Mini ITX Desktop Case</a></td>
      </tr>
      <tr>
        <td>Power Supply</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/yc38TW/seasonic-focus-plus-platinum-650w-80-platinum-certified-fully-modular-atx-power-supply-ssr-650px">SeaSonic - FOCUS Plus Platinum 650W 80+ Platinum Certified Fully-Modular ATX Power Supply</a></td>
      </tr>
      <tr>
        <td>Case Fan</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/4QzZxr/silverstone-case-fan-fw121">Silverstone - FW121 32.6 CFM  120mm Fan</a></td>
      </tr>
      <tr>
        <td>Monitor</td>
        <td><a target="_blank" href="https://pcpartpicker.com/product/rtJkcf/acer-monitor-xb270hubprz">Acer - XB270HU bprz 27.0" 2560x1440 144Hz Monitor</a></td>
      </tr>
    </tbody>
  </table>
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
      i {
        margin-left: 4px;
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
