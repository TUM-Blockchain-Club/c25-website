# Preview Deployments

This project now supports automatic preview deployments for pull requests, allowing you to see how changes will affect the website before merging.

## How It Works

When you create or update a pull request targeting the `development` or `main` branches:

1. **Automatic Deployment**: A preview deployment is automatically created on Vercel
2. **PR Comment**: A bot comment is added to the pull request with the preview URL
3. **Live Updates**: The preview is updated automatically when you push new commits
4. **Cleanup**: Preview deployments are cleaned up when the PR is closed or merged

## Features

### 🚀 Preview Deployment Workflow

- **Triggers**: Runs on PR open, synchronize, and reopen events
- **Environments**: Works for PRs targeting `development` and `main` branches
- **Framework**: Optimized for Next.js applications
- **Dependencies**: Automatically installs npm packages

### 💬 PR Comments

The GitHub bot will automatically comment on your pull request with:

- ✅ Direct link to the preview deployment
- 🔄 Updates when new commits are pushed
- 📝 Clear status messaging

### 🗑️ Automatic Cleanup

- Preview deployments are cleaned up when PRs are closed
- Informational comments are added explaining the cleanup process
- Merged PRs get a success message with information about where changes are now live

## Setup Requirements

### GitHub Secrets

Ensure these secrets are configured in your repository settings:

- `VERCEL_TOKEN`: Your Vercel personal access token
- `VERCEL_ORG_ID`: Your Vercel organization ID  
- `VERCEL_PROJECT_ID`: Your Vercel project ID

### Vercel Configuration

The `vercel.json` file is configured to:

- Use Next.js framework detection
- Handle client-side routing properly
- Disable Vercel's automatic GitHub integration (since we use custom workflows)

## Usage

1. **Create a Pull Request**: Open a PR against `development` or `main`
2. **Wait for Deployment**: The workflow will automatically start
3. **Check the Comment**: Look for the bot comment with your preview URL
4. **Test Your Changes**: Visit the preview URL to see your changes live
5. **Update as Needed**: Push new commits to update the preview automatically

## Workflow Files

- `.github/workflows/preview.yml`: Main preview deployment workflow
- `.github/workflows/cleanup-preview.yml`: Cleanup workflow for closed PRs
- `vercel.json`: Vercel configuration for optimal deployments

## Benefits

- **Faster Review Process**: Reviewers can see changes visually before approving
- **Catch Issues Early**: Spot visual bugs or deployment issues before they reach production
- **Improved Collaboration**: Share working versions of features with stakeholders
- **No Manual Steps**: Everything happens automatically with your existing workflow

## Troubleshooting

### Preview Deployment Failed

1. Check the Actions tab in GitHub for error details
2. Ensure all required secrets are properly set
3. Verify your Vercel account has sufficient resources
4. Check that the build command works locally (`npm run build`)

### Missing Preview Comment

1. Verify the workflow completed successfully
2. Check that the repository has proper permissions for GitHub Actions
3. Ensure the workflow file is on the target branch (development/main)

### Preview URL Not Working

1. Check if the deployment succeeded in Vercel dashboard
2. Verify the Next.js application builds correctly
3. Review Vercel function logs for runtime errors

---

For more information about Vercel deployments, visit the [Vercel Documentation](https://vercel.com/docs).