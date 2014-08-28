FROM dockerfile/ubuntu

# Install node.js and forever

RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get -y install nodejs
RUN npm -g update npm
RUN npm install -g forever

# Install npm package

ADD code/package.json /code/package.json
RUN npm install --prefix /code

# Add run script
ADD ./start.sh /start.sh
RUN chmod 755 /start.sh

ADD code /code

EXPOSE 3000

CMD ["/bin/bash", "/start.sh"]
