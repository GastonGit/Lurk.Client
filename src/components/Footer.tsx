import React from 'react';
import '../styles/Footer.css';
import { Grid } from '@mui/material';

export default class Footer extends React.Component<unknown, unknown> {
    constructor(props: unknown) {
        super(props);
        this.state = {};
    }

    render(): JSX.Element {
        return (
            <div className="footer">
                <div className="footer__content">
                    <Grid container>
                        <Grid item xs={4} sm={3} md={2}>
                            <a href="https://github.com/GastonGit/Lurk.Client">
                                About
                            </a>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
