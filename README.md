# Kapelle - Music Platform

Aplicación web de música construida con Next.js que permite gestionar canciones, artistas, playlists y biblioteca personal.

## 🚀 Tecnologías

- **Next.js 16** - Framework de React
- **React 19** - Biblioteca de UI
- **Spotify API** - Integración de datos musicales

## 📋 Requisitos previos

- Node.js 18+
- npm o yarn
- Cuenta de Spotify Developer (para API keys)

## 🔧 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/MatiasVarasOrt/PNT2-TrabajoPractico.git
cd PNT2-TrabajoPractico
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:
   Crear un archivo `.env.local` en la raíz con:

```env
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
```

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/           # Rutas de autenticación
│   ├── (dashboard)/      # Rutas protegidas (general, artists, library, etc)
│   ├── api/              # API routes
│   └── contexts/         # Contextos de React
├── components/           # Componentes organizados por dominio
│   ├── auth/
│   ├── layout/
│   ├── profile/
│   ├── playlist/
│   ├── artists/
│   └── shared/
├── services/
│   ├── api/              # Servicios internos
│   └── external/         # Servicios externos (Spotify)
├── config/               # Configuración
├── hooks/                # Custom hooks
└── utils/                # Utilidades
```

## 🎯 Características

- 🎵 Explorar canciones y artistas
- 📚 Biblioteca personal
- 🎼 Crear y gestionar playlists
- 👤 Gestión de perfil de usuario
- 🔐 Autenticación y rutas protegidas
- 🎨 Interfaz moderna y responsiva

## 📜 Scripts disponibles

```bash
npm run dev      # Ejecutar en desarrollo
npm run build    # Construir para producción
npm start        # Iniciar servidor de producción
npm run lint     # Ejecutar linter
```

## 👥 Autor

Matias Varas Ort

## 📄 Licencia

Este proyecto es de carácter académico.
