FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN yarn
COPY tsconfig.json .
COPY ./src ./src
CMD ["yarn","build"]
COPY ./build ./build
RUN rm -rf ./src
EXPOSE 7001
CMD ["yarn","start"]
