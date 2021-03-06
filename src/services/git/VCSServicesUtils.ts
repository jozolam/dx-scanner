import { PullRequestState } from '../../inspectors/ICollaborationInspector';
import { GitHubIssueState } from './IGitHubService';
import { IssueState } from '../../inspectors';
import { BitbucketIssueState, BitbucketPullRequestState } from '../bitbucket/IBitbucketService';
import { GitHubPullRequestState } from './IGitHubService';
import qs from 'qs';
import _ from 'lodash';
import { GitLabPullRequestState, GitLabIssueState } from '../gitlab/IGitLabService';

export class VCSServicesUtils {
  static getGithubPRState = (state: PullRequestState | undefined) => {
    switch (state) {
      case PullRequestState.open:
        return GitHubPullRequestState.open;
      case PullRequestState.closed:
        return GitHubPullRequestState.closed;
      case PullRequestState.all:
        return GitHubPullRequestState.all;
      default:
        return undefined;
    }
  };

  static getBitbucketPRState = (state: PullRequestState | undefined) => {
    switch (state) {
      case PullRequestState.open:
        return BitbucketPullRequestState.open;
      case PullRequestState.closed:
        return BitbucketPullRequestState.closed;
      case PullRequestState.all:
        return [BitbucketPullRequestState.open, BitbucketPullRequestState.closed, BitbucketPullRequestState.declined];
      default:
        return undefined;
    }
  };

  static getGitLabPRState = (state: PullRequestState | undefined) => {
    switch (state) {
      case PullRequestState.open:
        return GitLabPullRequestState.open;
      case PullRequestState.closed:
        return [GitLabPullRequestState.closed, GitLabPullRequestState.merged];
      case PullRequestState.all:
        return GitLabPullRequestState.all;
      default:
        return undefined;
    }
  };

  static getGitLabIssueState = (state: IssueState | undefined) => {
    switch (state) {
      case IssueState.open:
        return GitLabIssueState.open;
      case IssueState.closed:
        return GitLabIssueState.closed;
      case IssueState.all:
        return GitLabIssueState.all;
      default:
        return undefined;
    }
  };

  static getGithubIssueState = (state: IssueState | undefined) => {
    switch (state) {
      case IssueState.open:
        return GitHubIssueState.open;
      case IssueState.closed:
        return GitHubIssueState.closed;
      case IssueState.all:
        return GitHubIssueState.all;
      default:
        return undefined;
    }
  };

  static getBitbucketIssueState = (state: IssueState | undefined) => {
    switch (state) {
      case IssueState.open:
        return BitbucketIssueState.new;
      case IssueState.closed:
        return BitbucketIssueState.resolved;
      case IssueState.all:
        return [BitbucketIssueState.new, BitbucketIssueState.resolved, BitbucketIssueState.closed];
      default:
        return undefined;
    }
  };

  static getBitbucketStateQueryParam = (state: BitbucketIssueState | BitbucketIssueState[] | undefined) => {
    if (!state) {
      return;
    }
    // put state in quotation marks because of Bitbucket API https://developer.atlassian.com/bitbucket/api/2/reference/meta/filtering#query-issues
    let quotedState: string | string[] = `"${state}"`;
    if (_.isArray(state)) {
      quotedState = state.map((state) => {
        return `"${state}"`;
      });
    }

    // get q parameter
    return qs.stringify(
      { state: quotedState },
      {
        addQueryPrefix: false,
        encode: false,
        arrayFormat: 'repeat',
        delimiter: '+OR+',
      },
    );
  };
}
