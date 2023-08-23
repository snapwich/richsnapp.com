<script lang="ts">
import { image } from "~/utils/meta";

export default {
  title: "Stuffing a RTX 4090 in an Dan Lian-li A4 H2O",
  tldr: [
    "The 4090 Founders Edition fits, but not without caveats.",
    "If you attempt this you might run into issues with riser cables, as I did.",
    "You'll need an angled 12VHPWR adapter to power the GPU."
  ],
  tags: ["blog", "computers", "gaming"],
  head: {
    meta: image(
      process.env.baseUrl + require("./IMG_8906.jpg"),
      "summary_large_image"
    )
  }
};
</script>

<template lang="md">
  In continuing with the evolution of my small form factor PC I recently took to upgrading the GPU to an
  RTX 4090. Given that it was a bit challenging compared to my 3080ti both size wise as well as highlighting some issues
  I didn't even realized I had with the included pci-e 4.0 riser cable I thought I'd share my experience.

  To begin with, does it fit? Yes it does.
  <figure class="center">
    <img src="./IMG_8906.jpg" alt="RTX 4090 in a4-h2o" />
    <figcaption>4090 in a4-h2o</figcaption>
  </figure>

  If you're familiar with this case one thing you might notice is that this is not the riser cable that comes with the
  case. When I first installed this video card into the computer I ended up with some interesting results. It ran
  well enough to get some good benchmark results; however, it had some consistent frame stuttering _and_ it would also
  black screen and/or crash somewhat infrequently. I already had some stuttering with my 3080 ti (which I considered
  normal) but it was much more pronounced with the 4090.

  Considering I couldn't get the PC to consistently crash and the stuttering was hard to quantify I decided I
  needed some software to objectively measure what was going on which led me to [CapFrameX](https://www.capframex.com/).
  The initial results made obvious what I was experiencing.
  <figure class="right small">
    <img v-img src="./capframe.png" alt="CapFrameX results" />
    <figcaption>CapFrameX results of 3080ti vs new 4090</figcaption>
  </figure>

  As you can see even though I was getting higher framerates with the 4090 the frametimes were much more erratic. This
  led me on a wild goose chase of trying to figure out what could be causing this issue. All said and done I ended up
  trying another 4090, two different PSUs (including a full-sized ATX PSU thinking maybe the SFX size was an issue),
  another motherboard, a new CPU, different ram, and eventually a new riser cable. FOUR different riser cables to be
  exact. The riser cable being an issue didn't even occur to me until I came across
  [this incredibly useful video](https://www.youtube.com/watch?v=KwfAF5XjXbM).

  I assumed that since the riser cable worked with my 3080 ti, upgrading to a new video card wouldn't make a difference.
  As it turns out not only did it make a difference, the riser cable actually had issues with my 3080 ti as well! it was
  just less noticeable... that is until I started capturing frametimes.

  <figure class="center">
    <img src="./3080ti-riser.png" alt="3080ti frametiming with and without riser cable" />
    <figcaption>3080ti with and without riser cable</figcaption>
  </figure>

  The four riser cables I tried were:
    - the one that came with the case: Lian Li PCI-E 4.0 Riser Cable
    - two different [LINKUP cables](https://www.amazon.com/gp/product/B092JSJ5NY/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1)
      (that specifically state compatibility with the 4090)
    - and eventually: the Louqe [COBALT Gen4+ PCI-e 4.0 Riser Cable](https://shop.louqe.com/products/cobalt-rc260-twinax-gen4-pci-e-4-0-riser-cable)

  The last is the only one that worked as well as using no riser cable at all. No more black screens, no more crashes,
  and no more easily perceivable stuttering.

  <figure class="right">
    <img src="./riser-no-riser.png" alt="lian li riser cable versus louqe riser cable" />
    <figcaption>4090 using Lian-Li riser cable vs Louqe riser cable</figcaption>
  </figure>

  An important thing to note that this was my experience with two different ASUS motherboards, but according to the
  video I linked above talking about pcie 4.0 riser cable issues this _may_ vary with different motherboard / riser
  cable combinations given that there are not really any standard specs around riser cables. However, even if
  you don't use the same motherboard as mine I do recommend running tests to compare your results with and without the
  riser cable.

  <figure>
    <img src="./debugging.jpg" alt="debugging the build on my test bench">
    <figcaption>Debugging the build on my test bench</figcaption>
  </figure>

  ## Final Caveats

  <figure class="smallest right">
    <img src="./a-close-shave.jpg" alt="a loque riser cable with corners shaved">
    <figcaption>Modified Louqe cable</figcaption>
  </figure>

  If you do end up switching to something like the Louqe riser cable you'll find that by default it may not fit in
  your case. It's possible it didn't quite fit in mine because of my 30mm thick radiator fans (as opposed to the
  regular 25mm), but it might not fit even with regular thickness fans due to some framing around the case it bumps
  into. I ended up having to shave off some of the PCB on the riser cable to get it to fit and the cable itself actually
  rests partially inside the fan cowl. It doesn't quite touch but only has a clearance of a few millimeters at best...
  Something to be aware of. However, I'm not too concerned about the wires migrating into the fan considering the wires
  are pretty stiff and installing the cable means screwing it to the midplane which clamps the wires firmly in place.

  Also you'll notice that this cable does not have a latch like most of the other riser cables; if you look at the
  pictures you'll notice that I actually used a zip tie to secure it in place. It felt pretty secure without the zip
  tie but I wasn't going to take any chances... especially with the weight of this giant GPU pulling against it.

  Another thing to consider, the 4090 will not fit with the regular 12VHPWR cable poking out the side, at least not
  without some significant bending (which you don't want to do). I ended up using
  [this angled adapter](https://www.amazon.com/dp/B0BWDVP4WN?psc=1&ref=ppx_yo2ov_dt_b_product_details) to allow myself
  to plug it in without any bending. You could also get some custom PSU cables made that are angled; you can see in one
  of the picture I actually have a custom cablemod cable that I ended up not using because I ended up switching to a
  different power supply altogether.

  I leave you with a build list and some more pictures of the build process. Enjoy!

  <div class="images">
    <img v-img:images src="./IMG_8899.jpg" />
    <img v-img:images src="./IMG_8904.jpg" />
    <img v-img:images src="./IMG_8901.jpg" />
    <img v-img:images src="./IMG_8902.jpg" />
    <img v-img:images src="./IMG_8905.jpg" />
    <img v-img:images src="./IMG_8908.jpg" />
  </div>

  ## Parts list

  Build list on [PCPartPicker.com](https://pcpartpicker.com/b/nbGqqs)

  <table class="table table-striped">
    <tbody>
      <tr>
        <td class="pcpp-part-list-type">CPU</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/CZ3gXL/amd-ryzen-7-5800x3d-34-ghz-8-core-processor-100-100000651wof">AMD Ryzen 7 5800X3D 3.4 GHz 8-Core</a></td>
      </tr>
      <tr>
        <td class="pcpp-part-list-type">CPU Cooler</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/jjytt6/ek-ek-aio-basic-240-77-cfm-liquid-cpu-cooler-ek-aio-basic-240">EK EK-AIO Basic 240 77 CFM Liquid CPU Cooler</a></td>
      </tr>
      <tr>
        <td class="pcpp-part-list-type">Motherboard</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/NqsnTW/asus-rog-strix-x570-i-gaming-mini-itx-am4-motherboard-rog-strix-x570-i-gaming">Asus ROG Strix X570-I Gaming Mini ITX AM4</a></td>
      </tr>
      <tr>
        <td class="pcpp-part-list-type">Memory</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/kmBhP6/gskill-ripjaws-v-64-gb-2-x-32-gb-ddr4-3600-memory-f4-3600c18d-64gvk">G.Skill Ripjaws V 64 GB (2 x 32 GB) DDR4-3600 CL18 Memory</a></td>
      </tr>
      <tr>
        <td class="pcpp-part-list-type">Storage</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/hFP8TW/western-digital-wd_black-sn850p-for-ps5-4-tb-m2-2280-pcie-40-x4-nvme-solid-state-drive-wdbbyv0040bnc-wrsn">Western Digital WD_BLACK SN850P for PS5 4 TB M.2-2280 PCIe 4.0 X4 NVME SSD</a></td>
      </tr>
      <tr>
        <td class="pcpp-part-list-type">Video Card</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/BCGbt6/nvidia-founders-edition-geforce-rtx-4090-24-gb-video-card-900-1g136-2530-000">NVIDIA Founders Edition GeForce RTX 4090 24 GB</a></td>
      </tr>
      <tr>
        <td class="pcpp-part-list-type">Case</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/BCcG3C/dan-cases-a4-h20-a4-mini-itx-desktop-case-a4-h20-a4">DAN Cases A4-H20 A4 Mini ITX Desktop Case</a></td>
      </tr>
    <tr>
      <td class="pcpp-part-list-type">Power Supply</td>
      <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/GMbRsY/corsair-sf1000l-1000-w-80-gold-certified-fully-modular-sfx-power-supply-cp-9020246-na">Corsair SF1000L 1000 W 80+ Gold Certified Fully Modular SFX</a></td>
    </tr>
      <tr>
        <td class="pcpp-part-list-type">Case Fans</td>
        <td class="pcpp-part-list-item"><a href="https://pcpartpicker.com/product/YwmmP6/phanteks-ph-f120t30-67-cfm-120-mm-fans-3-pack-ph-f120t30_bg_3p">Phanteks PH-F120T30 67 CFM 120 mm Fans 3-Pack</a></td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="less">
@import "../../../../assets/variables.less";

.images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-bottom: 20px;
  gap: 20px;
  img {
    height: 200px;
    margin-right: 15px;
  }
}
</style>
