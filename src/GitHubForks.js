import React from "react";
import Box from "@material-ui/core/Box";
import Card from '@material-ui/core/Card';
import Grid from "@material-ui/core/Grid";
import * as GitHubApi from './GitHubApi'
import GitHubUser from "./GitHubUser";
import GitHubCommitCount from "./GitHubCommitCount";
import GitHubBuildSummary from "./GitHubBuildSummary";

class GitHubForks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: new GitHubApi.GitHubApiResponse()
        };
    }

    componentDidMount() {
        GitHubApi.get(GitHubApi.forksUrl)
            .then(response => {
                this.setState({apiResponse: response});
            })
    }

    render() {
        const { statusOk, isLoaded, json, error } = this.state.apiResponse;
        if (error) {
            return <Box>Error: {error.message}</Box>;
        } else if (!isLoaded) {
            return <Box>Loading...</Box>;
        } else if (!statusOk) {
            return <Box>{json.message}</Box>;
        } else {
            return (
                <Grid container direction="row">
                    {json.map(fork => (
                        <Box width={400} m={0.5}>
                            <Card key={fork.owner.login} raised={true} square={true}>
                                <Box m={0.5} display="flex" alignItems="center">
                                    <GitHubUser url={fork.owner.url}/>
                                    <GitHubCommitCount url={fork.commits_url}/>
                                    <GitHubBuildSummary url={fork.url}/>
                                </Box>
                            </Card>
                        </Box>
                    ))}
                </Grid>
            );
        }
    }
}

export default GitHubForks;