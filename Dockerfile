FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
# Sin este COPY, nginx arranca con su configuracion de serie: cada URL sin
# barra final cuesta dos saltos (el primero por http:// en claro) y la pagina
# 404 del sitio no se sirve nunca. Ver nginx.conf.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
