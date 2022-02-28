<template lang="md">
  In [episode 54](https://www.youtube.com/watch?v=ejW4f6liOS8) of the All-In podcast, Chamath brought up the idea of
  initiating a spread trade within big tech stocks as a way of protecting against a market downturn. It has been three
  months since the episode aired and we've already had a pretty good market correction with the possibility of some more
  to go. So, how did the spread trade do? If you had entered the trade when the episode aired would you have made money?
  Let's take a look.

  <figure class="center">
  <iframe width="560" height="400" src="https://www.youtube.com/embed/ejW4f6liOS8?start=473"
  title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
  gyroscope; picture-in-picture" allowfullscreen></iframe>
  </figure>

  ### What is a spread trade?

  The idea behind a spread trade is essentially to capture the changing difference between a pair of correlated
  positions. If you're long a stock (you bought shares and are holding) you're betting on the price of those shares
  going up. If you're [short a stock](https://www.investopedia.com/terms/s/shortselling.asp) you're betting on the the
  price of those shares going down. If you've entered a spread trade you're betting that the price of the shares on the
  two sides of your position will, depending on how you setup your position, either converge or diverge.

  <figure class="smallest right">
    <div class="spread-example">
      <div class="down">
        <div>QQQ</div>
        <div>-10%</div>
      </div>
      <div class="down">
        <div>MSFT</div>
        <div>-9%</div>
      </div>
      <div class="down">
        <div>FB</div>
        <div>-11%</div>
      </div>
      <div class="up" style="margin-top: 20px;">
        <div>MSFT-FB</div>
        <div>+2%</div>
      </div>
    </div>
  </figure>

  Why would you want to trade a spread? Well, let's consider the QQQ which is an
  [index fund](https://www.investopedia.com/terms/i/indexfund.asp) of the top-100 largest non-financial companies
  on the Nasdaq which includes both MSFT and FB among others. If the market as a whole experiences a major adjustment from
  something like a change in the [price multiples](https://www.investopedia.com/terms/p/pricemultiples.asp) that
  investors are willing to pay or a shift away from risky growth stocks towards
  [defensive](https://www.investopedia.com/terms/d/defensivestock.asp) stocks due to changing
  economic conditions, MSFT and FB (both being large technology companies) will most likely be similarly impacted.
  However, due to the individual circumstances that apply to each company they will most likely not be impacted
  _equally_. While the QQQ is falling as a whole you could potentially still see a profit if, against your long MSFT
  position, you had an equally short FB position. That is, as long as the overall negative impact to MSFT is
  _relatively better_ than the negative impact to FB you would come out ahead.

  ### So what exactly was Chamath's spread trade?

  In the podcast Chamath sets up the two sides of the trade as the following: long MSFT and GOOG; short AAPL, FB, AMZN,
  and NFLX. Unfortunately that's all the information that we were given so how to setup the actual allocations for the
  individual long and short positions is up to us to figure out.

  The funds probably should be split 50-50 between long and short but the allocation among each company is a little
  less straightforward. The allocation that makes the most sense to _me_ would be market cap weighted so that you own
  _an equal portion of each company_. This also makes sense given QQQ is market cap weighted which means inflows into the
  index fund would be allocated similarly to the position we're setting up. [Equal weighting](https://www.investopedia.com/articles/exchangetradedfunds/08/market-equal-weight.asp)
  is another option although using this kind of weighting would mean that you own a larger portion of the smaller
  companies and smaller portion of the larger companies.

  <figure class="right spreadsheet">
    <iframe height="350" width="100%" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSw5LU4vm5-1ypTzYqMga-JUEq0OTckJtCdmlmxS65fz5r1lZT9KxOMaZUlYXn_IoR4baaVVEhW81H2/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
    <figcaption>Doing the math</figcaption>
  </figure>

  The `mcap stock ratio` column shows how many shares you would have needed to buy (or sell for the short side) in each
  company on Nov 8th to have a market cap weighted position. From the sheet we can see that if you opened this position
  on on Nov 8th of last year with any amount of funds (using the provided stock ratio) your entire portfolio would be
  **down 2.42%** as of Feb 12th (today).

  <figure>
    <img src="./spread-market-cap.png" />
    <figcaption>The market cap weighted spread trade's performance since inception</figcaption>
  </figure>

  As you can see from the chart, this position has never been positive but _has_ been performing better as of late after
  less-than-stellar earnings reports from FB and NFLX.

  <figure class="small right">
    <img src="./spread-equal.png" />
    <figcaption>The equal-weighted spread trade's performance since inception</figcaption>
  </figure>

  The equal weighted spread trade faired better (_up_ 3.73%), but that's primarily because it was less exposed to the
  major driver that blew up this trade: shorting AAPL. Since the start of this trade AAPL has seen [upward
  movement as much as 20% over it's early November prices](https://www.google.com/finance/quote/AAPL:NASDAQ?window=5Y).

  It turns out that one of the original reasons cited for having AAPL and AMZN on the short side of this trade,
  disruptions in global supply chains, turned out not to big that big of a deal after all. The latest all-in podcast
  had some [opinions as to why that may be](https://youtu.be/uSUM1mvw17w?t=773) (in short, larger companies having more
  control over their supply chains).

  ### So, was this trade a flop?

  You wouldn't think this trade was a flop by the self-praise it's been getting in the latest episodes from the all-in
  podcast.

  <figure class="center no-shadow">
    <blockquote class="twitter-tweet"><p lang="en" dir="ltr">.<a href="https://twitter.com/chamath?ref_src=twsrc%5Etfw">@chamath</a> called this spread trade in early november:<br><br>long <a href="https://twitter.com/search?q=%24GOOG&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$GOOG</a>, <a href="https://twitter.com/search?q=%24MSFT&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$MSFT</a><br>short <a href="https://twitter.com/search?q=%24FB&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$FB</a>, <a href="https://twitter.com/search?q=%24NFLX&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$NFLX</a>, <a href="https://twitter.com/search?q=%24AAPL&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$AAPL</a>, <a href="https://twitter.com/search?q=%24AMZN&amp;src=ctag&amp;ref_src=twsrc%5Etfw">$AMZN</a><br><br>check out his explanation in this clip from e54... wow <a href="https://t.co/BuvXBHdqfa">pic.twitter.com/BuvXBHdqfa</a></p>&mdash; The All-In Podcast 💧🐦 (@theallinpod) <a href="https://twitter.com/theallinpod/status/1489019433834192897?ref_src=twsrc%5Etfw">February 2, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <figcaption>"The best trade on the internet"</figcaption>
  </figure>

  Yet if you were to have entered this trade Nov 8th (using my reasonable assumptions) you would be down 2.42%... so
  what gives? Was this a bad trade for Chamath? [A quote from the latest episode](https://www.youtube.com/watch?v=uSUM1mvw17w&t=2843s)
  signals to me why this trade would probably have been considered successful _for Chamath_ (but not for you):

  > "I sold some of that high-growth tech, but then I also wanted to figure out a way where I could be less exposed to
    some of that volatility _by continuing to hold what I had_; and the best way that I figured out how to do that was
    to do the spread trade." [emphasis added]

  It's important to notice that Chamath mentions he was already holding these tech companies that most likely comprised
  the long portion of his spread trade; and, after one of the biggest tech rallies in history, was almost certainly
  sitting on a significant amount of capital gains. So while _we_ could have held cash to beat this trade (albeit lose to
  inflation) he has to _sell his stocks_ to get to a cash position which requires him to pay somewhere between 20-40%
  on his significant chunk of capital gains. It's almost a certainty that a 2.42% loss pales in comparison to the amount
  of taxes he would have paid to completely divest himself from his stock position.

  From that we gather the moral of the story: don't shadow trade billionaires.

</template>


<script>
  export default {
    tags: ['investing'],
    title: "Was the \"all-in\" spread trade a success?",
    tldr: [
      "If you were a listener copying the trade when you heard about it on the all-in podcast, probably no",
      "If you were Chamath and avoiding taxes on your capital gains, probably yes"
    ],
  }
</script>

<style lang="less" scoped>
  @import "../../../../assets/variables.less";

  .spread-example {
    background: #282828;
    font-family: @font-family-serif;
    font-weight: bold;
    font-size: 35px;
    white-space: nowrap;
    & > div {
      display: flex;
      text-align: left;
      margin: 0 20px;
      div:last-child {
        margin-left: auto;
      }
    }
    .down {
      color: red;
    }
    .up {
      color: green;
    }
  }

  @media (min-width: @screen-lg-min) {
    .spreadsheet {
      width: 1000px;
    }
  }
</style>
