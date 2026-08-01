# Pokeapi Project
Proyecto Tecnico

## Iniciar Proyecto

# Instalar bun si es necesario 
curl -fsSL https://bun.com/install | bash  <- macos
powershell -c "irm bun.sh/install.ps1|iex" <- windows 

# Instalar dependencias
bun install
# Iniciar el proyecto
bun run dev


## Tecnologias usadas

- Vite
- Axios
- React
- TypeScript
- shadcn/ui
- Tailwind CSS
- React Router Dom
- Tanstack Query

# React + TypeScript + Vite + shadcn/ui

Este proyecto se creo usando el template de shadcn para facilitar el manejo de componentes.

## API

Dentro de la carpeta api se encuentran las rutas a consumir donde se hace una conexion usando axios para un mejor sintaxis al momento de hacer las peticiones a la api .

## Types

Dentro de la carpeta type se encuentran los tipos de los datos obtenidos de la api para un mejor tipado de los datos obtenidos de la api.

## Services

Luego dentro de la carpeta services se encuentran las funciones para obtener los datos de la api, estas funciones hacen uso de tasntack query para gestionar el estado de la aplicacion y cachear los datos obtenidos de la api para mejorar la experiencia de usuario. Admas usando los tipos de la carpeta type  para un mejor tipado de los datos obtenidos de la api.


## hooks

Dentro de la carpeta hooks se encuentran los hooks personalizados donde se gestiona el estado de los datos de la api como de la paginacion y filtros en general para mantener un mejor orden y no sobrecargar componentes netamente idos para la UI UX. 

## UI
Se implemento shadcn/ui para facilitar el manejo de componentes ademas de dark mode para mejorar la experiencia de usuario y la responsividad de la aplicacion.

## Componentes
Dentro de la carpeta components se encuentran los componentes reutilizables que se utilizan en toda la aplicacion, estos componentes mantienen un orden para mantener un mejor orden y no sobrecargar componentes netamente idos para la UI UX.

## Store
Dentro de la carpeta store se encuentran los store donde se gestiona el estado de la aplicacion y que permite mantener un mejor orden y no sobrecargar componentes netamente idos para la UI UX.

## App
Esta el layaout principal de la aplicacion donde se encuentra la barra de navegacion y el contenido de la aplicacion que se gestiona mediante Outlet, que le dice a React Router: "Inyecta aquí la página que corresponda a la ruta actual".
## Main
La aplicacion se envuelve en el proveedor de Tantstack Query para el manejo de la cache y el estado de la aplicacion, ademas de que tambien se envuelve el ThemeProvider que permite cambiar entre modo claro y oscuro.
# Pokedex
