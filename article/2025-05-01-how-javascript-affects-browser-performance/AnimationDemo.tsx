import React, { useState, useRef } from "react";
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
  const [active, setActive] = useState(false);
  const simulationActiveRef = useRef(false);

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

  function noop() {}

  function work() {
    if (!simulationActiveRef.current) {
      simulationActiveRef.current = true;
      setActive(true);
      const blockDuration = 150;
      const pauseDuration = 50;

      function doBlock() {
        if (!simulationActiveRef.current) return;
        const startBlock = Date.now();
        // do nothing for blockDuration
        while (Date.now() - startBlock < blockDuration) {
          noop();
        }
        if (simulationActiveRef.current) {
          setTimeout(doBlock, pauseDuration);
        } else {
          simulationActiveRef.current = false;
          setActive(false);
        }
      }
      doBlock();
    } else {
      simulationActiveRef.current = false;
      setActive(false);
    }
  }

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
          {active ? (
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
