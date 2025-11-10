pipeline {
    agent any

    parameters {
        string(name: 'DOCKERHUB_NAMESPACE', defaultValue: 'your-dockerhub-username', description: 'Docker Hub user or organisation to push images to')
        string(name: 'BACKEND_IMAGE_NAME', defaultValue: 'food-recipe-backend', description: 'Docker image name for backend (without namespace)')
        string(name: 'FRONTEND_IMAGE_NAME', defaultValue: 'food-recipe-frontend', description: 'Docker image name for frontend (without namespace)')
    }

    environment {
        IMAGE_TAG = "latest"
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set image tag') {
            steps {
                script {
                    if (env.GIT_COMMIT) {
                        env.IMAGE_TAG = env.GIT_COMMIT.substring(0, 7)
                    } else {
                        env.IMAGE_TAG = env.BUILD_NUMBER
                    }
                }
            }
        }

        stage('Install backend dependencies') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Install frontend dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build backend Docker image') {
            steps {
                sh """
                    docker build \
                      -t ${params.DOCKERHUB_NAMESPACE}/${params.BACKEND_IMAGE_NAME}:${env.IMAGE_TAG} \
                      -t ${params.DOCKERHUB_NAMESPACE}/${params.BACKEND_IMAGE_NAME}:latest \
                      -f backend/Dockerfile backend
                """
            }
        }

        stage('Build frontend Docker image') {
            steps {
                sh """
                    docker build \
                      -t ${params.DOCKERHUB_NAMESPACE}/${params.FRONTEND_IMAGE_NAME}:${env.IMAGE_TAG} \
                      -t ${params.DOCKERHUB_NAMESPACE}/${params.FRONTEND_IMAGE_NAME}:latest \
                      -f frontend/Dockerfile frontend
                """
            }
        }

        stage('Push images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh """
                        echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin
                        docker push ${params.DOCKERHUB_NAMESPACE}/${params.BACKEND_IMAGE_NAME}:${env.IMAGE_TAG}
                        docker push ${params.DOCKERHUB_NAMESPACE}/${params.BACKEND_IMAGE_NAME}:latest
                        docker push ${params.DOCKERHUB_NAMESPACE}/${params.FRONTEND_IMAGE_NAME}:${env.IMAGE_TAG}
                        docker push ${params.DOCKERHUB_NAMESPACE}/${params.FRONTEND_IMAGE_NAME}:latest
                        docker logout
                    """
                }
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
        }
    }
}
