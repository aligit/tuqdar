#!/bin/bash

# Get the author info from HEAD~1
NEW_AUTHOR=$(git show -s --format='%an <%ae>' HEAD~1)

# Define the Git filter branch command
git filter-branch --env-filter '
if [ $GIT_COMMIT != $(git rev-parse HEAD) ]
then
    export GIT_AUTHOR_NAME="$(echo $NEW_AUTHOR | sed -e "s/^$.*$ <.*$/\1/")"
    export GIT_AUTHOR_EMAIL="$(echo $NEW_AUTHOR | sed -e "s/^.* <$.*$>$/\1/")"
    export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
    export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
fi
' --tag-name-filter cat -- --all
