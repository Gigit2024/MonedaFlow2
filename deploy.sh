#!/bin/bash

# Script de despliegue para monedaflow usando Docker Compose y migraciones de base de datos

# Colores para mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    error "Docker no está instalado. Por favor instala Docker antes de continuar."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose no está instalado. Por favor instala Docker Compose antes de continuar."
    exit 1
fi

# Verificar si existe el script de migraciones
if [ ! -f "migrate.sh" ]; then
    error "No se encontró el script migrate.sh. Asegúrate de que esté en el directorio actual."
    exit 1
fi

# Dar permisos de ejecución a migrate.sh si no los tiene
if [ ! -x "migrate.sh" ]; then
    log "Dando permisos de ejecución a migrate.sh..."
    chmod +x migrate.sh
fi

# Preguntar al usuario qué entorno desea desplegar
echo "¿Qué entorno deseas desplegar?"
echo "1) Desarrollo"
echo "2) Producción"
read -p "Selecciona una opción [1-2]: " env_option

case $env_option in
    1)
        COMPOSE_FILE="docker-compose.dev.yml"
        log "Desplegando entorno de desarrollo..."
        ;;
    2)
        COMPOSE_FILE="docker-compose.prod.yml"
        log "Desplegando entorno de producción..."
        ;;
    *)
        error "Opción no válida. Saliendo..."
        exit 1
        ;;
esac

# Verificar si existe el archivo de docker-compose seleccionado
if [ ! -f "$COMPOSE_FILE" ]; then
    error "No se encontró el archivo $COMPOSE_FILE"
    exit 1
fi

# Preguntar si se desea ejecutar migraciones
read -p "¿Deseas ejecutar migraciones de base de datos? (s/n): " run_migrations
if [[ "$run_migrations" == "s" || "$run_migrations" == "S" ]]; then
    log "Generando script para ejecutar todas las migraciones pendientes..."
    ./migrate.sh 4
    
    if [ -f "migrations/run_all_migrations.sql" ]; then
        log "Script de migraciones generado. Debes ejecutarlo manualmente en DBeaver."
        warn "Por favor, ejecuta el script migrations/run_all_migrations.sql en DBeaver antes de continuar."
        read -p "Presiona Enter cuando hayas ejecutado las migraciones..."
    else
        warn "No se pudo generar el script de migraciones. Continuando sin ejecutar migraciones."
    fi
fi

# Detener contenedores existentes
log "Deteniendo contenedores existentes..."
docker-compose -f $COMPOSE_FILE down

# Construir imágenes
log "Construyendo imágenes Docker..."
docker-compose -f $COMPOSE_FILE build --no-cache

# Iniciar servicios
log "Iniciando servicios..."
docker-compose -f $COMPOSE_FILE up -d

# Verificar estado de los contenedores
log "Verificando estado de los contenedores..."
sleep 5
docker-compose -f $COMPOSE_FILE ps

# Mostrar información de acceso
if [ "$env_option" -eq 1 ]; then
    log "Entorno de desarrollo desplegado correctamente."
    log "La aplicación está disponible en: http://localhost:3000"
    log "Para ver los logs ejecuta: docker-compose -f $COMPOSE_FILE logs -f"
else
    log "Entorno de producción desplegado correctamente."
    log "La aplicación está disponible en: http://localhost"
    log "Para ver los logs ejecuta: docker-compose -f $COMPOSE_FILE logs -f"
fi

exit 0