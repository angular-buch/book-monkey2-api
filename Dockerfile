FROM nodesource/node:6.6.0

# 1st adding dependencies (this way you don't rebuild your modules each time you re-build your container)
ADD package.json package.json
RUN npm install

# 2n adding app code to the container
ADD . .

EXPOSE 3000
CMD ["npm", "run", "startForever"]
