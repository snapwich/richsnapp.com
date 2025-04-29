import React, { useState, useRef, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Demo } from "./Demo.tsx";

export function DraggableDemo() {
  const nodeRef = useRef<HTMLDivElement>(null!);
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
      <CardContent sx={{ height: "300px", position: "relative" }}>
        <Draggable nodeRef={nodeRef} bounds="parent">
          <Paper
            elevation={3}
            ref={nodeRef}
            sx={{
              cursor: "move",
              display: "inline-block",
              padding: 1,
              textAlign: "center",
              userSelect: "none",
            }}
          >
            Drag Me!
          </Paper>
        </Draggable>
      </CardContent>
      <CardActions>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button variant="contained" onClick={work}>
            {isActive ? (
              <>
                Stop work()
                <CircularProgress
                  size={20}
                  sx={{ color: "white", marginLeft: 1 }}
                />
              </>
            ) : (
              "work()"
            )}
          </Button>
        </Stack>
      </CardActions>
    </Demo>
  );
}
