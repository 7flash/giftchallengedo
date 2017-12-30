FROM ubuntu:xenial

RUN apt-get update
RUN apt-get upgrade -q -y
RUN apt-get dist-upgrade -q -y

RUN apt-get install -y apt-utils
RUN apt-get install -y sudo
RUN apt-get install -y figlet
RUN apt-get install -y strace
RUN apt-get install -y curl
RUN apt-get install -y vim
RUN apt-get install -y git
RUN apt-get install -y unzip

RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN apt-get install -y python
RUN apt-get install -y python-pip
RUN apt-get install -y python-dev
RUN apt-get install -y libssl-dev

WORKDIR /tmp

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm install -g github:7flash/truffle

WORKDIR /src
COPY . /src
RUN npm install

RUN truffle compile
RUN npm run transpile
RUN truffle migrate --network mainnet

ENTRYPOINT /bin/bash