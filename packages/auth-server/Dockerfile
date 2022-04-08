FROM node:17.3-alpine3.14 AS BUILD_STAGE

# install node-prune https://github.com/tj/node-prune
RUN apk --no-cache add curl && \
    curl -sf https://gobinaries.com/tj/node-prune | sh

WORKDIR /usr/app

COPY . .

ARG token

ENV CODEARTIFACT_AUTH_TOKEN ${token}

RUN yarn install && \
    rm -rf $(yarn cache dir) && \
    yarn run build && \
    # optimization of node_modules
    npm prune --production && \
    node-prune

FROM node:17.3-alpine3.14

WORKDIR /usr/app

# copy from build stage
COPY --from=BUILD_STAGE /usr/app/dist ./dist
COPY --from=BUILD_STAGE /usr/app/node_modules ./node_modules

EXPOSE 80 1001

CMD [ "node", "dist/main.js" ]
