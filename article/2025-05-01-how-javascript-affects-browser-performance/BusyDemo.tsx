import React, { useState } from "react";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import { Demo } from "./Demo.tsx";

export function BusyDemo() {
  const [time, setTime] = useState(0);

  function work() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
      setTime(Date.now() - start);
    }
  }

  function doSetTimeoutWork() {
    const start = Date.now();
    function workChunk() {
      const elapsed = Date.now() - start;
      setTime(elapsed);
      if (elapsed < 3000) {
        setTimeout(workChunk, 0);
      }
    }
    workChunk();
  }

  const handleClear = () => {
    setTime(0);
  };

  return (
    <Demo>
      <CardContent>
        <Stack>
          <TextField
            label="Time"
            value={time}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="clear input"
                      onClick={handleClear}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          <Button variant="contained" onClick={work}>
            work();
          </Button>
          <Button variant="contained" onClick={doSetTimeoutWork}>
            doSetTimeoutWork();
          </Button>
        </Stack>
      </CardActions>
    </Demo>
  );
}
