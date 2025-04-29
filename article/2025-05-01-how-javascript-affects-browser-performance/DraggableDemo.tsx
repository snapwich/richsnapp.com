import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import { Demo } from "./Demo.tsx";

export function DraggableDemo() {
  const [active, setActive] = useState(false);
  const simulationActiveRef = useRef(false);
  const nodeRef = useRef<HTMLDivElement>(null!);

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
            {active ? (
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
