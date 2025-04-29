import React, { useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FPSCounter } from "./FPSCounter.tsx";
import styles from "./styles.module.less";

// import Box from "@mui/material/Box";

export function FpsGraph() {
  const FPS_POINTS = 50;
  const [fpsSparkline, setFpsSparkline] = useState<number[]>(
    Array(FPS_POINTS).fill(0),
  );
  return (
    <div className={styles.graph}>
      <Sparklines data={fpsSparkline} min={0} margin={0} width={5000}>
        <SparklinesLine color="teal" />
      </Sparklines>
      <FPSCounter
        className={styles.fps}
        onUpdate={(fps) => {
          setFpsSparkline((prevFps) => [...prevFps, fps].slice(-FPS_POINTS));
        }}
      />
    </div>
  );
}
