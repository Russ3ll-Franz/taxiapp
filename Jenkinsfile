pipeline {
  agent any
    
  tools {nodejs "NodeJS 12.16.1"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/Russ3ll-Franz/taxiapp.git'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm run start'
      }
    }      
  }
}
