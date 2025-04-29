import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./styles.module.less";

export function FPSCounter({
  onUpdate,
  className,
}: {
  onUpdate?: (fps: number) => void;
  className?: string;
}) {
  const [fps, setFps] = useState(0);
  const [strobe, setStrobe] = useState(false);

  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let animationFrameId: number;

    const updateFps = () => {
      const now = performance.now();
      frameCount++;
      const delta = now - lastFrameTime;

      if (delta >= 1000) {
        const newFps = Math.round((frameCount * 1000) / delta);
        setFps(newFps);
        setStrobe(true);
        if (onUpdate) {
          onUpdate(newFps);
        }
        frameCount = 0;
        lastFrameTime = now;

        setTimeout(() => setStrobe(false), 100);
      }

      animationFrameId = requestAnimationFrame(updateFps);
    };

    animationFrameId = requestAnimationFrame(updateFps);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <span className={classnames(className, strobe ? styles.strobe : "")}>
      {fps} fps
    </span>
  );
}
