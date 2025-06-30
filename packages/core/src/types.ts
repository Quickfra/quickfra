// Cloud providers
export type CloudProvider = 'aws' | 'oci' | 'digitalocean' | 'hetzner';

// Available services
export type Service = 'webmail' | 'mail' | 'status' | 'n8n' | 'postgres' | 'redis';

// Service domain mappings
export const SERVICE_SUBDOMAINS: Record<Service, string> = {
  webmail: 'webmail',
  mail: 'mail', 
  status: 'status',
  n8n: 'n8n',
  postgres: 'postgres',
  redis: 'redis'
};

// Service Docker Compose configurations
export const SERVICE_DOCKER_CONFIGS: Record<Service, string> = {
  webmail: `services:
  snappymail:
    image: djmaze/snappymail:latest
    container_name: snappymail
    restart: unless-stopped
    ports:
      - "8888:8888"
    volumes:
      - ./snappymail:/var/lib/snappymail
    environment:
      - TZ=Europe/Madrid`,
  
  mail: `services:
  stalwart-mail:
    image: stalwartlabs/mail-server:latest
    container_name: stalwart-mail
    restart: unless-stopped
    ports:
      - "25:25"
      - "587:587"
      - "993:993"
      - "995:995"
    volumes:
      - ./stalwart:/opt/stalwart-mail
    environment:
      - TZ=Europe/Madrid`,
  
  status: `services:
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: uptime-kuma
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - ./uptime-kuma:/app/data
    environment:
      - TZ=Europe/Madrid`,
  
  n8n: `services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    volumes:
      - ./n8n:/home/node/.n8n
    environment:
      - TZ=Europe/Madrid
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
      - WEBHOOK_URL=https://n8n.example.com`,
  
  postgres: `services:
  postgres:
    image: postgres:15
    container_name: postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    volumes:
      - ./postgres:/var/lib/postgresql/data
    environment:
      - POSTGRES_DB=quickfra
      - POSTGRES_USER=quickfra
      - POSTGRES_PASSWORD=changeme
      - TZ=Europe/Madrid`,
  
  redis: `services:
  redis:
    image: redis:7
    container_name: redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - ./redis:/data
    environment:
      - TZ=Europe/Madrid`
};

// Deployment config
export interface DeploymentConfig {
  cloud: CloudProvider;
  services: Service[];
  domain: string;
  region?: string;
  customSubdomains?: Partial<Record<Service, string>>;
  adminSubdomain?: string; // Default: 'admin'
}

// Deployment result
export interface DeploymentResult {
  id: string;
  status: 'pending' | 'running' | 'error';
  urls?: Record<string, string>;
  error?: string;
}
