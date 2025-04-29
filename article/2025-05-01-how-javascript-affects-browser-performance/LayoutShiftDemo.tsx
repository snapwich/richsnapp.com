import React, {
  useState,
  useEffect,
  use,
  useCallback,
  Suspense,
  createContext,
  useContext,
} from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemText from "@mui/material/ListItemText";
import { Demo } from "./Demo.tsx";
import { FormControl } from "@mui/material";

type SuspenseStrategy = "list" | "item" | "body";
type LoadingStrategy = "useEffect" | "suspense";

interface DemoSettings {
  loadingStrategy: LoadingStrategy;
  suspenseStrategies: SuspenseStrategy[];
  skeletons: boolean;
  fixedHeight: boolean;
  noWaterfall: boolean;
}

const DemoSettingsContext = createContext<DemoSettings | undefined>(undefined);

function useDemoSettings() {
  const context = useContext(DemoSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useDemoSettings must be used within a DemoSettingsProvider",
    );
  }
  return context;
}

type WordType = {
  word: string;
  type: string;
};

type Definition = WordType & {
  meaning: string;
};

const definitions: Definition[] = [
  {
    word: "be·nev·o·lent",
    type: "adjective",
    meaning: "well meaning and kindly.",
  },
  {
    word: "be·ne·dic·tion",
    type: "noun",
    meaning:
      "the utterance or bestowing of a blessing, especially at the end of a religious service.",
  },
  {
    word: "lu·cid",
    type: "adjective",
    meaning: "expressed clearly; easy to understand.",
  },
  {
    word: "e·phem·er·al",
    type: "adjective",
    meaning: "lasting for a very short time.",
  },
  {
    word: "ser·en·dip·i·ty",
    type: "noun",
    meaning:
      "the occurrence and development of events by chance in a happy or beneficial way.",
  },
  {
    word: "u·biq·ui·tous",
    type: "adjective",
    meaning: "present, appearing, or found everywhere.",
  },
  {
    word: "mel·lif·lu·ous",
    type: "adjective",
    meaning: "(of a voice or words) sweet or musical; pleasant to hear.",
  },
  {
    word: "re·sil·ient",
    type: "adjective",
    meaning: "able to withstand or recover quickly from difficult conditions.",
  },
  {
    word: "in·ef·fa·ble",
    type: "adjective",
    meaning: "too great or extreme to be expressed or described in words.",
  },
];

const PAGE_SIZE = 3;
const totalPages = Math.ceil(definitions.length / PAGE_SIZE);

const wordCache = new Map<number, Promise<WordType[]>>();
const meaningCache = new Map<string, Promise<string>>();

function fetchWords(
  page: number,
  withDetails: boolean,
): Promise<Definition[]> | Promise<WordType[]> {
  if (wordCache.has(page)) {
    return wordCache.get(page)!;
  }
  const promise = new Promise<WordType[]>((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      let wordPage = definitions.slice(start, end);
      if (!withDetails) {
        resolve(wordPage.map(({ word, type }) => ({ word, type })));
      } else {
        resolve(wordPage);
      }
    }, 1000);
  });
  wordCache.set(page, promise);
  promise.catch(() => wordCache.delete(page));
  return promise;
}

const fetchMeaning = (word: string): Promise<string> => {
  if (meaningCache.has(word)) {
    return meaningCache.get(word)!;
  }
  const promise = new Promise<string>((resolve, reject) => {
    setTimeout(
      () => {
        const definition = definitions.find((def) => def.word === word);
        if (definition) {
          resolve(definition.meaning);
        } else {
          reject(new Error(`Meaning not found for ${word}`));
        }
      },
      500 + Math.random() * 1500,
    );
  });
  meaningCache.set(word, promise);
  promise.catch(() => meaningCache.delete(word));
  return promise;
};

function useData<T>(
  fetcher: () => Promise<T>,
  dependencies: unknown[] = [],
  defaultValue: T,
): T {
  let [data, setData] = useState<T>(defaultValue);
  useEffect(() => {
    setData(defaultValue);
    fetcher().then((result) => {
      setData(result);
    });
  }, dependencies);
  return data;
}

function CardDemo({
  word,
}: {
  word: WordType & {
    meaning?: string;
  };
}) {
  const { suspenseStrategies } = useDemoSettings();
  return (
    <Card sx={{ minWidth: 275, width: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {word.word}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {word.type}
        </Typography>
        {suspenseStrategyEnabled(suspenseStrategies, "body") ? (
          <Suspense fallback={<Skeleton variant="text" width={100} />}>
            <CardBody word={word.word} meaning={word.meaning} />
          </Suspense>
        ) : (
          <CardBody word={word.word} meaning={word.meaning} />
        )}
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ textTransform: "uppercase" }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

function CardBody({
  word,
  meaning: initialMeaning,
}: {
  word: string;
  meaning?: string;
}) {
  const { loadingStrategy, skeletons } = useDemoSettings();
  let meaning = initialMeaning;

  if (!meaning) {
    meaning =
      loadingStrategy === "useEffect"
        ? useData(() => fetchMeaning(word), [word], undefined)
        : use(fetchMeaning(word));
  }

  return meaning ? (
    <Typography variant="body2">{meaning}</Typography>
  ) : skeletons ? (
    <Skeleton variant="text" width={100} />
  ) : null;
}

function suspenseStrategyEnabled(
  strategies: SuspenseStrategy | SuspenseStrategy[],
  test: SuspenseStrategy,
) {
  if (Array.isArray(strategies)) {
    return strategies.includes(test);
  }
  return test === strategies;
}

function CardsDemo({ page }: { page: number }) {
  const { loadingStrategy, suspenseStrategies, skeletons, noWaterfall } =
    useDemoSettings();

  const wordInfoList =
    loadingStrategy === "useEffect"
      ? useData(() => fetchWords(page, noWaterfall), [page], [])
      : use(fetchWords(page, noWaterfall));

  const renderCards = () =>
    wordInfoList.map((info) =>
      suspenseStrategyEnabled(suspenseStrategies, "item") ? (
        <Suspense key={info.word} fallback={skeletons ? CardSkeleton() : null}>
          <CardDemo word={info} />
        </Suspense>
      ) : (
        <CardDemo key={info.word} word={info} />
      ),
    );

  return (
    <Stack
      gap={2}
      sx={{
        maxWidth: 400,
        width: "100%",
      }}
    >
      {wordInfoList.length > 0
        ? renderCards()
        : skeletons
          ? renderSkeletons()
          : null}
    </Stack>
  );
}

function CardSkeleton() {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        height: "172px",
        width: "100%",
        maxWidth: "400px",
        borderRadius: 1,
      }}
    />
  );
}

function renderSkeletons() {
  return Array.from({ length: 3 }).map((_, index) => (
    <CardSkeleton key={index} />
  ));
}

export function LayoutShiftDemo() {
  const [loadingStrategy, setLoadingStrategy] =
    useState<LoadingStrategy>("useEffect");
  const [suspenseStrategies, setSuspenseStrategies] = React.useState<
    SuspenseStrategy[]
  >(["list"]);
  const [show, setShow] = useState(true);
  const [skeletons, setSkeletons] = React.useState(false);
  const [fixedHeight, setFixedHeight] = React.useState(false);
  const [noWaterfall, setNoWaterfall] = React.useState(false);

  const [page, setPage] = useState(1);

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    },
    [],
  );

  function handleLoadingStrategyChange(event: SelectChangeEvent) {
    reload();
    setLoadingStrategy(event.target.value as LoadingStrategy);
  }

  function handleSuspenseStrategyChange(
    event: SelectChangeEvent<typeof suspenseStrategies>,
  ) {
    reload();
    setSuspenseStrategies(event.target.value as unknown as SuspenseStrategy[]);
  }

  const reload = () => {
    setShow(false);
    setTimeout(() => {
      wordCache.clear();
      meaningCache.clear();
      setShow(true);
    });
  };

  const demoSettingsValue = {
    loadingStrategy,
    suspenseStrategies,
    skeletons,
    fixedHeight,
    noWaterfall,
  };

  return (
    <Demo>
      <CardActions>
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel>Loading Strategy</InputLabel>
          <Select
            value={loadingStrategy}
            onChange={handleLoadingStrategyChange}
          >
            <MenuItem value={"useEffect"}>useEffect</MenuItem>
            <MenuItem value={"suspense"}>use w/ Suspense</MenuItem>
          </Select>
        </FormControl>

        {loadingStrategy !== "useEffect" && (
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel>Suspense Wrapping</InputLabel>
            <Select
              value={suspenseStrategies}
              onChange={handleSuspenseStrategyChange}
              multiple
              renderValue={(selected) => {
                const order: SuspenseStrategy[] = ["list", "item", "body"];
                const displayMap: Record<SuspenseStrategy, string> = {
                  list: "Whole List",
                  item: "Card",
                  body: "Card Body",
                };
                return order
                  .filter((strategy) => selected.includes(strategy))
                  .map((strategy) => displayMap[strategy])
                  .join(", ");
              }}
            >
              <MenuItem value="list">
                <Checkbox checked={suspenseStrategies.includes("list")} />
                <ListItemText primary={"Whole List"} />
              </MenuItem>
              <MenuItem value="item">
                <Checkbox checked={suspenseStrategies.includes("item")} />
                <ListItemText primary={"Card"} />
              </MenuItem>
              <MenuItem value="body">
                <Checkbox checked={suspenseStrategies.includes("body")} />
                <ListItemText primary={"Card Body"} />
              </MenuItem>
            </Select>
          </FormControl>
        )}
      </CardActions>
      <CardContent>
        <DemoSettingsContext.Provider value={demoSettingsValue}>
          <Stack
            gap={2}
            sx={{
              alignItems: "center",
              marginTop: 2,
              height: fixedHeight ? "665px" : "auto",
            }}
          >
            {show &&
              (suspenseStrategyEnabled(suspenseStrategies, "list") ? (
                <Suspense fallback={skeletons ? renderSkeletons() : null}>
                  <CardsDemo page={page} />
                </Suspense>
              ) : (
                <CardsDemo page={page} />
              ))}
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages}
              sx={{ alignSelf: "center", mt: "auto" }}
            />
          </Stack>
        </DemoSettingsContext.Provider>
      </CardContent>
      <CardActions sx={{ paddingLeft: 3, paddingRight: 3 }}>
        <Stack>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={skeletons}
                onChange={(e) => setSkeletons(e.target.checked)}
              />
            }
            label="Skeletons"
          ></FormControlLabel>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={fixedHeight}
                onChange={(e) => setFixedHeight(e.target.checked)}
              />
            }
            label="Fixed Height"
            sx={{ whiteSpace: "nowrap" }}
          ></FormControlLabel>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={noWaterfall}
                onChange={(e) => setNoWaterfall(e.target.checked)}
              />
            }
            label="No Waterfall"
            sx={{ whiteSpace: "nowrap" }}
          ></FormControlLabel>
        </Stack>
        <div style={{ marginLeft: "auto " }}>
          <Button variant="contained" onClick={reload}>
            Clear Cache & Reload
          </Button>
        </div>
      </CardActions>
    </Demo>
  );
}
