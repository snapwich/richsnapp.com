
<script>
  export default {
    title: 'CenturyLink is blocking its customer\'s internet while saying Utah legislators told them to',
    tags: ['Net Neutrality', 'Networking'],
    tldr: [
      'CenturyLink is blocking its customer\'s internet until they confirm they\'ve seen notification for paid security offering',
      'Notification is injected into customer\'s browsing sessions using ethically questionable DNS Hijacking',
      'CenturyLink claims this is required due to Utah S.B. 134 but bill sponsor says "not like this"',
      'Those using streaming devices (FireTV, Chromecast, etc) or their own DNS offering (OpenDNS/GoogleDNS) don\'t receive notification to unblock their internet and are effectively SOL'
    ]
  }
</script>

<template lang="md">
  We've all experienced frustration with the internet going down.  Now imagine how frustrated you'd be if you found out
  that your ISP _intentionally_ blocked your internet access for the purpose of advertising their software; and better
  yet, your ISP claimed that state legislators required them to do it! Well that's exactly what is happening to
  CenturyLink customers in Utah right now.

  <figure class="center">
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Just had <a href="https://twitter.com/CenturyLink?ref_src=twsrc%5Etfw">@CenturyLink</a> block my internet and then inject this page into my browser (dns spoofing I think) to advertise their paid filtering software to me.  Clicking OK on the notice then restored my internet...  this is NOT okay! <a href="https://t.co/NtCZUeJF8I">pic.twitter.com/NtCZUeJF8I</a></p>&mdash; Rich Snapp (@Snapwich) <a href="https://twitter.com/Snapwich/status/1071915296250712064?ref_src=twsrc%5Etfw">December 9, 2018</a></blockquote>
  </figure>

  A few days ago while watching TV through my FireTV the stream unexpectedly went black.  After trying to debug the
  issue for a bit with no success I went to my computer, which was still connected to my ISP, but was also experiencing
  a strange lack of internet. Eventually I turned to a Google search on my phone only to be immediately greeted with
  an official looking notice.

  <figure class="smallest right">
    <img src="./century-link-notice.jpg" />
  </figure>

  At first glance I was worried that I had somehow been redirected to a malicious website and that this was some kind of
  phishing attempt...  After all, I didn't navigate here. I attempted to do another search but still ended up at
  this same notice. I considered the idea that maybe my ISP had detected some kind of threat coming from my network and
  that's why I was seeing this official looking page.  Eventually, after reading over the page several times, I
  clicked "OK" and my internet was back.

  > Your Internet service has been fully restored ... Thanks for your business. _CenturyLink High-Speed Internet_

  What...?  I went to [the page CenturyLink referred to in the notice](https://www.centurylink.com/home/ease/) so I
  could see what was so important that it necessitated blocking me from the internet.

  >  Centurylink @Ease puts the best names in computer security to work for you – industry leaders like Norton for
  AntiVirus protection and Identity Guard to help protect your identity. <br /><br /> $5 off per month for the first two months!

  It was an _advertisement_ for security products! ...and not very good ones...

  I went to Twitter to see if I was the only one having this very bizarre experience, and it turns out I was not alone.
  Fellow Utahns were also expressing their discontent with CenturyLink's behavior.

  <figure class="center">
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">It’s always a fun day when <a href="https://twitter.com/CenturyLink?ref_src=twsrc%5Etfw">@centurylink</a> blocks your internet access until you go to troubleshoot the problem and are forced to read a letter about filtering services they offer before they will restore your internet. Wow what a cool way to hold us hostage! Total bullshit.</p>&mdash; Chryshele Cottle (@Maccagirl1) <a href="https://twitter.com/Maccagirl1/status/1071880457803857920?ref_src=twsrc%5Etfw">December 9, 2018</a></blockquote>
  </figure>

  <figure class="center">
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/CenturyLink?ref_src=twsrc%5Etfw">@CenturyLink</a> dont disable my damn internet to send me a message about software to block my kid from harmful sites. You know what blocks my kid from harmful sites? Me! Not some bloatware.</p>&mdash; 🎃XxCrispxX🎃 (@XxCrispXzero5xX) <a href="https://twitter.com/XxCrispXzero5xX/status/1071885034892681216?ref_src=twsrc%5Etfw">December 9, 2018</a></blockquote>
  </figure>

  Eventually I stumbled upon a reddit thread, [_"Any century link customers lose internet until you read the filter
  message?"_](https://www.reddit.com/r/SaltLakeCity/comments/a4csu8/any_century_link_customers_lose_internet_until/),
  and discovered this behavior has been going on for quite some time with users mentioning it had also happened to them
  in the previous weeks. One of the reddit users specifically pointed out that this was most likely a "ham-fisted"
  approach by CenturyLink to comply with the provisions in [S.B. 134](https://le.utah.gov/~2018/bills/static/SB0134.html).

  <figure class="right">
    <div>

    ```
    (b) (i) A service provider shall, before December 30, 2018, notify in a conspicuous
     manner all of the service provider's consumers with a Utah residential address that the
     consumer may request material harmful to minors be blocked under Subsection (1)(a).
    (ii) A service provider may provide the notice described in Subsection (2)(b)(i):
     (A) by electronic communication;
     (B) with a consumer's bill; or
     (C) in another conspicuous manner.
    ```

    </div>
    <figcaption>Relevant excerpt from Utah S.B. 134</figcaption>
  </figure>

  Now I finally realized what was going on. CenturyLink was using the unethical practice of
  [DNS Hijacking](https://en.wikipedia.org/wiki/DNS_hijacking) to push notifications (or in this case, advertisements)
  of products to customers and using Utah law as justification.  For the lucky customers, they'll only have their
  internet browsing session interrupted for no reason, acknowledge they saw the ad, and move on.  If they're using a
  streaming device, such as a FireTV or Chromecast, they'll have their video stop and receive no notification. If
  you're browsing the internet on a device not using CenturyLink's DNS (maybe using GoogleDNS or OpenDNS), your
  internet will stop working, you'll see no notice, and you'll either waste time debugging the issue (like me) or
  give up and waste hours talking to CenturyLink support.

  Curious if this is really what Utah legislators were intending, I reached out to the listed sponsor of the bill on
  twitter.

  <figure class="center">
    <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I have yet to see an internet response that appreciates them doing this, but I see a lot of angry and upset people on twitter and reddit.  This is such a terribly dumb idea, was this the intent of your bill?</p>&mdash; Rich Snapp (@Snapwich) <a href="https://twitter.com/Snapwich/status/1071931301068865536?ref_src=twsrc%5Etfw">December 10, 2018</a></blockquote>
  </figure>
  <figure class="center">
    <blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">I’m sorry you are having problems. SB134 did not require that — and no other ISP has done that to comply with the law. They were only required to notify customers of options via email or with an invoice.</p>&mdash; Todd Weiler (@gopTODD) <a href="https://twitter.com/gopTODD/status/1072189463252488192?ref_src=twsrc%5Etfw">December 10, 2018</a></blockquote>
  </figure>

  CenturyLink is much less helpful on twitter, replying to any comments on this shady behavior with what is most likely
  their contextually unaware automated customer service bots.

  Where I go from here, I'm not sure.  I would switch ISPs but I have no other options where I live. Hopefully making
  this issue more public will help CenturyLink make better decisions, but when you consider our administration's
  recent successful [repeal of net neutrality earlier this year](https://www.nytimes.com/2017/12/14/technology/net-neutrality-repeal-vote.html),
  we'll probably just need to start accepting this kind of behavior as the new norm.

  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</template>

