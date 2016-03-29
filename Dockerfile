FROM nodesource/node:4.0

# 1st adding dependencies (this way you don’t rebuild your modules each time you re-build your container)
ADD package.json package.json  
RUN npm install --production

# 2n adding app code to the container
ADD . .

EXPOSE 3000
CMD ["npm","start"]  