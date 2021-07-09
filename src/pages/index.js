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
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import copy from "copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function GetSubstring() {
  const [language, setLanguage] = React.useState("javascript");
  const [initialString, setInitialString] = React.useState("");
  const [initialize, setInitialize] = React.useState("");
  const [substringCode, setSubstringCode] = React.useState("");
  const [showCode, setShowCode] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [showCopy, setShowCopy] = React.useState(false);
  const [showCopied, setShowCopied] = React.useState(false);
  const [showCopiedIcon, setShowCopiedIcon] = React.useState(false);

  const reset = () => {
    setShowCopied(false);
    setShowError(false);
    setShowCode(false);
    setShowCopiedIcon(false);
  };

  const handleTooltipClose = () => {
    setShowCopied(false);
  };

  const handleTooltipOpen = () => {
    setShowCopied(true);
    setShowCopiedIcon(true);
    copy(`${initialize}${substringCode}`);
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
    setInitialize(`const text = "${initialString}"\n`);
    setSubstringCode(`const subString = text.substring(${start},${end})`);
    setShowCode(true);
  };

  const handleSubmit = (event) => {
    reset();
    if (window.getSelection) {
      const selection = window.getSelection();
      const selectionStart = selection.anchorOffset;
      const selectionEnd = selection.extentOffset;
      if (selectionStart === selectionEnd) {
        setShowError(true);
      } else {
        generateCode(selectionStart, selectionEnd);
      }
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
          <FormControlLabel
            value="javascript"
            control={<Radio />}
            label="Javascript"
          />
          <FormControlLabel value="python" control={<Radio />} label="Python" />
        </RadioGroup>
      </Grid>
      <Grid container>
        <Grid item xs={2} lg={4}></Grid>
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
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item xs={2} lg={4}></Grid>
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
        <Grid item xs={2} lg={4}></Grid>
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
          <Grid item xs={2} lg={4}></Grid>
          <Grid item xs={8} lg={4}>
            <Card
              variant="outlined"
              onMouseEnter={() => setShowCopy(true)}
              onMouseLeave={() => {
                setShowCopy(false);
                setShowCopied(false);
              }}
            >
              <CardContent>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography align="center" variant="caption">
                      {initialize}
                    </Typography>
                    <br />
                    <Typography align="center" variant="caption">
                      {substringCode}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    {showCopy && (
                      <ClickAwayListener onClickAway={handleTooltipClose}>
                        <div>
                          <Tooltip
                            PopperProps={{
                              disablePortal: true,
                            }}
                            onClose={handleTooltipClose}
                            open={showCopied}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copied!"
                          >
                            <IconButton
                              size="small"
                              onClick={handleTooltipOpen}
                            >
                              {showCopiedIcon ? (
                                <FileCopyIcon />
                              ) : (
                                <FileCopyOutlinedIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        </div>
                      </ClickAwayListener>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={2} lg={4}></Grid>
        </Grid>
      )}
    </Grid>
  );
}
