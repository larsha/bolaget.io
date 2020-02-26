#!/bin/bash

set -e

# Download and install Google Cloud SDK
curl -0 https://storage.googleapis.com/cloud-sdk-release/google-cloud-sdk-223.0.0-linux-x86_64.tar.gz | tar -zx -C ${HOME}
${HOME}/google-cloud-sdk/install.sh
source ${HOME}/google-cloud-sdk/path.bash.inc

gcloud auth configure-docker --quiet