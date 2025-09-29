pipeline {
    agent any

    environment {
        DOCKER_IMAGE   = "todo-backend"
        DOCKERHUB_REPO = "adkurnwn/todo-backend"
        BUILD_TAG      = "build-${env.BUILD_NUMBER}"  // unique per Jenkins build
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kurww/Nest-Todo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t $DOCKER_IMAGE:latest -t $DOCKER_IMAGE:$BUILD_TAG .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        
                        docker tag $DOCKER_IMAGE:$BUILD_TAG $DOCKERHUB_REPO:$BUILD_TAG

                        docker push $DOCKERHUB_REPO:$BUILD_TAG
                    '''
                }
            }
        }
    }
}
