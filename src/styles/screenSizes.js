import { throttle } from "lodash-es";

export let sizes = {
  "screen-xs-min": 480,
  "screen-sm-min": 768,
  "screen-md-min": 992,
  "screen-lg-min": 1200,
  "screen-xl-min": 1649,
};

sizes["screen-xs-max"] = sizes["screen-sm-min"] - 1;
sizes["screen-sm-max"] = sizes["screen-md-min"] - 1;
sizes["screen-md-max"] = sizes["screen-lg-min"] - 1;
sizes["screen-lg-max"] = sizes["screen-xl-min"] - 1;

export let breakpoints = update({});

if (typeof window !== "undefined" && window.addEventListener) {
  window.addEventListener(
    "resize",
    throttle(update.bind(null, breakpoints), 100),
  );
}

function matchMedia() {
  return typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia
    : () => ({
        matches: false,
      });
}

function update(obj) {
  let test = matchMedia();
  obj.xs = test(`(max-width: ${sizes["screen-xs-max"]}px`).matches;
  obj.sm = test(
    `(min-width: ${sizes["screen-sm-min"]}px) and (max-width: ${sizes["screen-sm-max"]}px`,
  ).matches;
  obj.md = test(
    `(min-width: ${sizes["screen-md-min"]}px) and (max-width: ${sizes["screen-md-max"]}px`,
  ).matches;
  obj.lg = test(
    `(min-width: ${sizes["screen-lg-min"]}px) and (max-width: ${sizes["screen-lg-max"]}px`,
  ).matches;
  obj.xl = test(
    `(min-width: ${sizes["screen-xl-min"]}px) and (max-width: ${sizes["screen-xl-max"]}px`,
  ).matches;

  obj.xsOnly = obj.xs;
  obj.smOnly = obj.sm;
  obj.smAndDown = (obj.xs || obj.sm) && !(obj.md || obj.lg || obj.xl);
  obj.smAndUp = !obj.xs && (obj.sm || obj.md || obj.lg || obj.xl);
  obj.mdOnly = obj.md;
  obj.mdAndDown = (obj.xs || obj.sm || obj.md) && !(obj.lg || obj.xl);
  obj.mdAndUp = !(obj.xs || obj.sm) && (obj.md || obj.lg || obj.xl);
  obj.lgOnly = obj.lg;
  obj.lgAndDown = (obj.xs || obj.sm || obj.md || obj.lg) && !obj.xl;
  obj.lgAndUp = !(obj.xs || obj.sm || obj.md) && (obj.lg || obj.xl);
  obj.xlOnly = obj.xl;

  switch (true) {
    case obj.xs:
      obj.name = "xs";
      break;
    case obj.sm:
      obj.name = "sm";
      break;
    case obj.md:
      obj.name = "md";
      break;
    case obj.lg:
      obj.name = "lg";
      break;
    default:
      obj.name = "xl";
      break;
  }

  return obj;
}
