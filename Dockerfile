# Utiliza una imagen base de Node.js para construir la app
FROM node:18-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Ejecuta el build de producción de Vite
RUN npm run build

# Utiliza una imagen más ligera para ejecutar la app
FROM nginx:alpine

# Copia la build de Vite a la ubicación de los archivos estáticos de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto en el que Nginx escuchará
EXPOSE 80

# Ejecuta Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
