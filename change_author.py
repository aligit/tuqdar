#!/usr/bin/env python3

import subprocess
import sys
from git_filter_repo import Blob, Commit, FilteringOptions, RepoFilter

def get_head_1_author():
  result = subprocess.run(['git', 'show', '-s', '--format=%an <%ae>', 'HEAD~1'],
                          capture_output=True, text=True)
  return result.stdout.strip()

def main():
  head_1_author = get_head_1_author()
  new_name, new_email = head_1_author.split('<')
  new_name = new_name.strip()
  new_email = new_email.strip('>')

  head_1_id = subprocess.run(['git', 'rev-parse', 'HEAD~1'],
                             capture_output=True, text=True).stdout.strip()

  args = FilteringOptions.parse_args(['--force'])

  def update_author(commit, metadata):
      if commit.original_id == head_1_id:
          return
      commit.author_name = new_name.encode()
      commit.author_email = new_email.encode()
      commit.committer_name = new_name.encode()
      commit.committer_email = new_email.encode()

  filter = RepoFilter(args, commit_callback=update_author)
  filter.run()

if __name__ == '__main__':
  main()
