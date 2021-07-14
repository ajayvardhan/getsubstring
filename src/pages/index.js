import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function GetSubstring() {
  const [language, setLanguage] = React.useState("javascript");
  const [initialString, setInitialString] = React.useState("");
  const [showCode, setShowCode] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [code, setCode] = React.useState("");

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "ruby", label: "Ruby" },
  ];

  const reset = () => {
    setShowError(false);
    setShowCode(false);
  };

  const handleLanguageChange = (event) => {
    reset();
    setLanguage(event.target.value);
  };

  const handleInitialStringChange = (event) => {
    reset();
    setInitialString(event.target.value);
  };

  const generateCode = (start, end) => {
    let substring = "";
    switch (language) {
      case "javascript":
        substring = `const text = "${initialString}";\nconst subString = text.substring(${start},${end});`;
        break;
      case "python":
        start = start === 0 ? "" : start;
        end = end === initialString.length - 1 ? "" : end;
        substring = `text = "${initialString}"\nsubString = text[${start}:${end}]`;
        break;
      case "java":
        end = end === initialString.length - 1 ? "" : end;
        substring = `String text = "${initialString}";\nString subString = text.substring(${start},${end});`;
        break;
      case "cpp":
        substring = `string text = "${initialString}";\nstring subString = text.substr(${start},${
          end - start
        });`;
        break;
      case "go":
        substring = `text := "${initialString}"\nsubString := text[${start}:${end}]`;
        break;
      case "ruby":
        substring = `text = "${initialString}"\nsubString = text[${start},${
          end - start
        }]`;
        break;
      default:
        break;
    }
    setCode(substring);
    setShowCode(true);
  };

  const handleSubmit = (event) => {
    reset();
    const selection = window.getSelection();
    const selectionStart = selection.anchorOffset;
    const selectionEnd = selection.extentOffset;
    if (selectionStart === selectionEnd) {
      setShowError(true);
    } else {
      generateCode(
        Math.min(selectionStart, selectionEnd),
        Math.max(selectionStart, selectionEnd)
      );
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      spacing={3}
    >
      <Grid item />
      <Grid item />
      <Grid item />
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          Get Substring
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          aria-label="language"
          name="language"
          value={language}
          onChange={handleLanguageChange}
          row
        >
          {languages.map((item) => (
            <FormControlLabel
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Grid container>
        <Grid item xs={2} lg={4} />
        <Grid item xs={8} lg={4}>
          <TextField
            id="initialString"
            label="Initial String"
            placeholder="Enter the Initial String"
            variant="outlined"
            value={initialString}
            onChange={handleInitialStringChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={2} lg={4} />
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={2} lg={4} />
        <Grid item xs={8} lg={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Select Substring
              </Typography>
              <Typography align="center" gutterBottom>
                {initialString}
              </Typography>
              {showError && (
                <Typography
                  variant="caption"
                  component="h2"
                  align="center"
                  color="error"
                >
                  Select the substring before you submit!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2} lg={4} />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          disabled={initialString === ""}
        >
          Submit
        </Button>
      </Grid>
      {showCode && (
        <Grid container>
          <Grid item xs={2} lg={4} />
          <Grid item xs={8} lg={4}>
            <SyntaxHighlighter language={language} wrapLongLines={true}>
              {code}
            </SyntaxHighlighter>
          </Grid>
          <Grid item xs={2} lg={4} />
        </Grid>
      )}
    </Grid>
  );
}
