FROM node:slim  
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 9900
CMD node server.js


