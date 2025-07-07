# Remove ALL Docker containers, images, volumes, networks, and prune system
docker ps -aq | xargs -r docker stop
docker ps -aq | xargs -r docker rm
docker volume ls -q | xargs -r docker volume rm
docker network ls --filter "type=custom" -q | xargs -r docker network rm
docker images -aq | xargs -r docker rmi -f
rm -rf /data/coolify /var/lib/coolify /etc/coolify
docker builder prune -af
docker system prune -af --volumes

export app_name="miapp"
export coolify_email="yo@correo.com"
export coolify_password="#TestInfra123456"
export domain_name="sandboxdev.qzz.io"
export install_mail="true"
export cloudflare_tunnel_token="no-token-yet"
curl -fsSL https://raw.githubusercontent.com/Quickfra/quickfra/refs/heads/feature/terraform-infra/terraform/scripts/main.sh | bash


# curl -fsSL https://raw.githubusercontent.com/Quickfra/quickfra/refs/heads/feature/terraform-infra/terraform/scripts/test/init.sh | bash