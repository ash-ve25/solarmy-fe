FROM node:17.3-stretch AS BUILD_STAGE

WORKDIR /usr/app

COPY . .

RUN yarn install && \
    rm -rf $(yarn cache dir) && \
    yarn run build

FROM nginx:1.17.3

WORKDIR /usr/share/nginx/html/

# copy from build stage
COPY --from=BUILD_STAGE /usr/app/build .
