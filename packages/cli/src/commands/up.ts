import { Args, Command, Flags } from '@oclif/core'
import chalk from 'chalk'
import ora from 'ora'
import { CloudService } from '../services/cloud.service.js'
import { DeploymentService } from '../services/deployment.service.js'
import { validateServices, validateCloudProvider } from '../lib/validators.js'
import { logger } from '@quickfra/logger'

export default class Up extends Command {
  static override description = 'Deploy platform with Coolify and selected services'

  static override examples = [
    '<%= config.bin %> <%= command.id %> --cloud oci --services webmail,mail,status,n8n,postgres',
    '<%= config.bin %> <%= command.id %> --cloud aws --services coolify,mail,status',
    '<%= config.bin %> <%= command.id %> --cloud digitalocean --services webmail,n8n,postgres,redis',
  ]

  static override flags = {
    cloud: Flags.string({
      char: 'c',
      description: 'Cloud provider to deploy to',
      required: true,
      options: ['aws', 'oci', 'digitalocean', 'hetzner', 'vultr', 'linode'],
    }),
    services: Flags.string({
      char: 's',
      description: 'Comma-separated list of services to deploy',
      required: true,
    }),
    region: Flags.string({
      char: 'r',
      description: 'Cloud region to deploy to',
    }),
    'dry-run': Flags.boolean({
      description: 'Show what would be deployed without actually deploying',
      default: false,
    }),
    config: Flags.string({
      description: 'Path to custom configuration file',
    }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Up)
    
    const spinner = ora('Initializing deployment...').start()

    try {
      // Validate inputs
      const cloudProvider = validateCloudProvider(flags.cloud)
      const services = validateServices(flags.services.split(',').map(s => s.trim()))

      spinner.text = 'Validating configuration...'
      
      if (flags['dry-run']) {
        spinner.succeed(chalk.blue('Dry run mode - showing deployment plan'))
        this.showDeploymentPlan(cloudProvider, services, flags.region)
        return
      }

      // Initialize services
      const cloudService = new CloudService(cloudProvider)
      const deploymentService = new DeploymentService()

      // Step 1: Provision cloud infrastructure
      spinner.text = 'Provisioning cloud infrastructure...'
      const infrastructure = await cloudService.provisionInfrastructure({
        region: flags.region,
        services,
      })

      // Step 2: Install Coolify
      spinner.text = 'Installing Coolify...'
      await deploymentService.installCoolify(infrastructure)

      // Step 3: Deploy services to Coolify
      spinner.text = 'Deploying services to Coolify...'
      const deployedServices = await deploymentService.deployServices(infrastructure, services)

      // Step 4: Configure networking and SSL
      spinner.text = 'Configuring networking and SSL...'
      await deploymentService.configureNetworking(infrastructure, deployedServices)

      spinner.succeed(chalk.green('Platform deployed successfully!'))

      // Show deployment summary
      this.showDeploymentSummary(infrastructure, deployedServices)

    } catch (error) {
      spinner.fail(chalk.red('Deployment failed'))
      logger.error('Deployment error:', error)
      this.error(error instanceof Error ? error.message : 'Unknown deployment error')
    }
  }

  private showDeploymentPlan(cloudProvider: string, services: string[], region?: string): void {
    console.log('')
    console.log(chalk.cyan('🚀 Deployment Plan'))
    console.log(chalk.gray('=' .repeat(50)))
    console.log(`${chalk.bold('Cloud Provider:')} ${cloudProvider}`)
    if (region) console.log(`${chalk.bold('Region:')} ${region}`)
    console.log(`${chalk.bold('Services:')} ${services.join(', ')}`)
    console.log('')
    console.log(chalk.yellow('📋 What will be deployed:'))
    console.log(`${chalk.gray('1.')} Virtual machine on ${cloudProvider}`)
    console.log(`${chalk.gray('2.')} Coolify platform installation`)
    console.log(`${chalk.gray('3.')} Services: ${services.join(', ')}`)
    console.log(`${chalk.gray('4.')} SSL certificates and networking`)
    console.log('')
    console.log(chalk.blue('ℹ️  Run without --dry-run to execute deployment'))
  }

  private showDeploymentSummary(infrastructure: any, services: any[]): void {
    console.log('')
    console.log(chalk.cyan('🎉 Deployment Complete'))
    console.log(chalk.gray('=' .repeat(50)))
    console.log(`${chalk.bold('Server IP:')} ${infrastructure.publicIp}`)
    console.log(`${chalk.bold('Coolify URL:')} https://${infrastructure.domain || infrastructure.publicIp}:8000`)
    console.log('')
    console.log(chalk.yellow('📚 Access your services:'))
    
    services.forEach((service, index) => {
      console.log(`${chalk.gray(`${index + 1}.`)} ${service.name}: ${service.url}`)
    })

    console.log('')
    console.log(chalk.blue('ℹ️  All services are managed through Coolify'))
    console.log(chalk.blue('ℹ️  Check your email for login credentials'))
  }
}
