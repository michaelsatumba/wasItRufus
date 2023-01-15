const child_process = require('child_process');

// function to run a git command and return the output
const runGitCommand = (command, gitDir) => {
	return child_process
		.execSync(`git -C ${gitDir} ${command}`)
		.toString()
		.trim();
};

// function to check if the repository has an active branch
const checkActiveBranch = (gitDir) => {
	const branch = runGitCommand('branch', gitDir);
	return branch.indexOf('*') !== -1;
};

// function to check if there are modified files in the repository
const checkModifiedFiles = (gitDir) => {
	const status = runGitCommand('status --porcelain', gitDir);
	return status !== '';
};

// function to check if the current head commit was authored in the last week
const checkRecentCommit = (gitDir) => {
	const commitTime = runGitCommand('log -1 --format=%at', gitDir);
	const oneWeekAgo = Date.now() / 1000 - 604800;
	return commitTime > oneWeekAgo;
};

// function to check if the current head commit was authored by Rufus
const checkBlameRufus = (gitDir) => {
	const author = runGitCommand("log -1 --format='%an'", gitDir);
	return author === 'Rufus';
};

// main function
const gitInfo = (gitDir) => {
	console.log(`active branch: ${checkActiveBranch(gitDir)}`);
	console.log(`local changes: ${checkModifiedFiles(gitDir)}`);
	console.log(`recent commit: ${checkRecentCommit(gitDir)}`);
	console.log(`blame Rufus: ${checkBlameRufus(gitDir)}`);
};

// example usage
gitInfo('path/to/local/repo');
