def envMap = [
  master: [
    NEXT_PUBLIC_API_URL: "https://api.staging.rillion.finance",
    NEXT_PUBLIC_BASE_URL: "https://wallet.platform.brillantfi.com",
    NEXT_PUBLIC_HOSTNAME: "wallet.platform.brillantfi.com",
    NEXT_PUBLIC_USE_SDK: true,
    env: "dev",
  ],
  sandbox: [
    NEXT_PUBLIC_API_URL: "https://api.sandbox.brillion.finance",
    NEXT_PUBLIC_BASE_URL: "https://wallet.platform.billionfin.com",
    NEXT_PUBLIC_HOSTNAME: "wallet.platform.billionfin.com",
    NEXT_PUBLIC_USE_SDK: true,
    env: "staging",
  ],
  prod: [
    NEXT_PUBLIC_API_URL: "https://api.platform.brillion.finance",
    NEXT_PUBLIC_BASE_URL: "https://wallet.platform.brillion.finance",
    NEXT_PUBLIC_HOSTNAME: "wallet.platform.brillion.finance",
    NEXT_PUBLIC_USE_SDK: true,
    env: "prod",
  ],
]
pipeline {
  agent {
    label "docker"
  }
  options {
    buildDiscarder(logRotator(numToKeepStr: '50'))
    //disableConcurrentBuilds()
  }
  environment {
    REGION = "eu-west-1"
    SHORT_SHA = """${sh(
      returnStdout: true,
      script: 'git rev-parse --short=8 HEAD'
    )}""".trim()
    BUILD_TIME = """${sh(
      returnStdout: true,
      script: 'date +"%H%M%S"'
    )}""".trim()
    REGISTRY        = "182840061781.dkr.ecr.eu-west-1.amazonaws.com"
    REPO            = "waas-simple-wallet"
    ACCOUNT_ID      = "905418305525"
    DOCKER_BUILDKIT = 1
  }
  stages {
    stage('Build') {
      steps {
        script {
          sh "docker build --build-arg NEXT_PUBLIC_USE_SDK=${envMap[BRANCH_NAME]['NEXT_PUBLIC_USE_SDK']} --build-arg NEXT_PUBLIC_HOSTNAME=${envMap[BRANCH_NAME]['NEXT_PUBLIC_HOSTNAME']} --build-arg NEXT_PUBLIC_API_URL=${envMap[BRANCH_NAME]['NEXT_PUBLIC_API_URL']} --build-arg NEXT_PUBLIC_BASE_URL=${envMap[BRANCH_NAME]['NEXT_PUBLIC_BASE_URL']} --build-arg NEXT_PUBLIC_WALLE_URL=${envMap[BRANCH_NAME]['NEXT_PUBLIC_WALLE_URL']} -t ${REGISTRY}/${REPO}:${BRANCH_NAME} -f docker/build.dockerfile ."
          sh "aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin ${REGISTRY}"
          sh "docker push ${REGISTRY}/${REPO}:${BRANCH_NAME}"
        }
      }
    }
  }
  post {
        success {
            script {
                build job: 'WaaS/simple-wallet/deploy/main', parameters: [string(name: 'ENVIRONMENT', value: "${envMap[BRANCH_NAME]['env']}")]
            }
        }
  }
  // post {
  //   success {
  //     buildName "#${BUILD_NUMBER} ${BRANCH_NAME}"
  //     slackSend channel: "#cts-infra", color: "good", message: "${currentBuild.fullDisplayName} completed successfully. \n  Image tag: ${BRANCH_NAME}\n ${env.BUILD_URL}"
  //   }
  //   failure {
  //     buildName "#${BUILD_NUMBER} ${BRANCH_NAME}"
  //     slackSend channel: "#cts-infra", color: "danger", message: "${currentBuild.fullDisplayName} failed. ${env.BUILD_URL}"
  //   }
  // }
}
