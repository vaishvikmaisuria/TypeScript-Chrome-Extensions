import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
// import "@fontsource/roboto";
import "./options.css";
import {
    getStoredOptions,
    LocalStorageOptions,
    setStoredOptions,
} from "../utils/storage";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [formState, setFormState] = useState<FormState>("ready");

    useEffect(() => {
        getStoredOptions().then((options) => {
            setOptions(options);
        });
    }, []);

    const handleHomeCityChange = (homeCity: string) => {
        console.log(homeCity);
        setOptions({
            ...options,
            homeCity,
        });
    };

    const handleSaveButtonClick = () => {
        setFormState("saving");
        setStoredOptions(options).then(() => {
            setTimeout(() => {
                setFormState("ready");
            }, 400);
        });
    };

    if (!options) {
        return null;
    }

    const isFieldsDisabled = formState === "saving";

    return (
        <Box mx="5%" my="2%">
            <Card>
                <CardContent>
                    <Grid container spacing={3} direction="column">
                        <Grid item xs={10}>
                            <Typography variant="h4">
                                Weather Extension options
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="body1">
                                Home city name
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter a home city name"
                                value={options.homeCity}
                                onChange={(event) =>
                                    handleHomeCityChange(event.target.value)
                                }
                                disabled={isFieldsDisabled}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveButtonClick}
                                disabled={isFieldsDisabled}
                            >
                                {formState === "ready" ? "Save" : "Saving..."}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};
const root = document.createElement("div");
document.body.appendChild(root);

render(<App />, root);
