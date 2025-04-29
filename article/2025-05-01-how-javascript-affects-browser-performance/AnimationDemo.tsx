import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Demo } from "./Demo.tsx";
import CircularProgress from "@mui/material/CircularProgress";

export function AnimationDemo() {
  const [progress, setProgress] = useState(0);
  const [cssTransition, setCssTransition] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  function resetAnimation() {
    setCssTransition(false);
    setProgress(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }

  function doAnimationFrameWork() {
    resetAnimation();
    const start = Date.now();
    function update() {
      const elapsed = Date.now() - start;
      if (elapsed < 3000) {
        setProgress((elapsed / 3000) * 100);
        animationFrameRef.current = requestAnimationFrame(update);
      } else {
        setProgress(100);
      }
    }
    update();
  }

  function doCssTransition() {
    resetAnimation();
    requestAnimationFrame(() => {
      setCssTransition(true);
      setProgress(100);
    });
  }

  const [isActive, setIsActive] = useState(false);
  const simulationActiveRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const TARGET_FPS = 10;
  const targetFrameDuration = 1000 / TARGET_FPS;
  const blockDuration = targetFrameDuration * 0.9;
  function noop() {}
  function chunk() {
    if (!simulationActiveRef.current) {
      return;
    }
    const blockStart = performance.now();
    while (performance.now() - blockStart < blockDuration) {
      noop();
    }
    animationFrameIdRef.current = requestAnimationFrame(chunk);
  }
  function work() {
    if (simulationActiveRef.current) {
      simulationActiveRef.current = false;
      setIsActive(false);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    } else {
      simulationActiveRef.current = true;
      setIsActive(true);
      animationFrameIdRef.current = requestAnimationFrame(chunk);
    }
  }

  useEffect(() => {
    return () => {
      simulationActiveRef.current = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }
    };
  }, []);

  return (
    <Demo>
      <CardContent>
        <Stack>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={
              !cssTransition
                ? {
                    "& .MuiLinearProgress-bar": {
                      transition: "none",
                    },
                  }
                : {
                    "& .MuiLinearProgress-bar": {
                      transitionDuration: "3s",
                    },
                  }
            }
          />
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          flexWrap: "wrap",
          gap: "8px",
          "& button": { marginLeft: "0 !important" },
        }}
      >
        <Button variant="contained" onClick={doAnimationFrameWork}>
          doAnimationFrameWork();
        </Button>
        <Button variant="contained" onClick={doCssTransition}>
          doCssTransition();
        </Button>
        <Button variant="contained" onClick={work}>
          {isActive ? (
            <>
              <CircularProgress
                size={20}
                sx={{ color: "white", marginRight: 1 }}
              />
              Stop work()
            </>
          ) : (
            "work()"
          )}
        </Button>
      </CardActions>
    </Demo>
  );
}
