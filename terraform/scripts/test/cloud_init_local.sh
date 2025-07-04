# Remove old Coolify installations
docker stop coolify coolify-redis coolify-realtime coolify-db coolify-sentinel coolify-proxy
docker rm coolify coolify-redis coolify-realtime coolify-db coolify-sentinel coolify-proxy
docker volume ls -q | grep -E 'coolify' | xargs -r docker volume rm
docker network ls -q | xargs -r docker network rm
docker images -a | grep -E 'coollabsio|traefik|postgres|redis' | awk '{print $3}' | xargs -r docker rmi
rm -rf /data/coolify /var/lib/coolify /etc/coolify

export app_name="miapp"
export coolify_email="yo@correo.com"
export coolify_password="#TestInfra123456"
curl -fsSL https://raw.githubusercontent.com/Quickfra/quickfra/refs/heads/feature/terraform-infra/terraform/scripts/cloud_init.sh | bash

