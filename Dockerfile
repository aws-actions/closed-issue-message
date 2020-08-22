FROM mhart/alpine-node:12

ADD package.json package-lock.json /
RUN npm install --frozen-lockfile
COPY src /src/
ENTRYPOINT ["node", "/src/entrypoint.js"]