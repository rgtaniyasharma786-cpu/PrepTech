import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-machine-learning',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './machine-learning.component.html',
  styleUrl: './machine-learning.component.css'
})
export class MachineLearningComponent {
   quizForm: FormGroup;
      currentQuestionIndex = 0;
      score = 0;
      showResult = false;
    
      userAnswers: number[] = [];
    
      timer: number = 20 * 60; // 20 minutes in seconds
      displayTime: string = '';
      timerInterval: any;
    
      quizData = [
      
  {
    question: "1. What is Machine Learning?",
    options: [
      "Writing programs manually",
      "Learning from books",
      "Making computers learn from data",
      "Installing software on machines"
    ],
    correct: 2
  },
  {
    question: "2. Which of the following is a type of machine learning?",
    options: ["Supervised Learning", "Mechanical Learning", "Network Learning", "Neural Switching"],
    correct: 0
  },
  {
    question: "3. In supervised learning, what is provided to the model?",
    options: ["Only inputs", "Only outputs", "Labeled data", "Unlabeled data"],
    correct: 2
  },
  {
    question: "4. Which algorithm is used for classification?",
    options: ["K-Means", "Linear Regression", "Decision Tree", "Apriori"],
    correct: 2
  },
  {
    question: "5. What is overfitting?",
    options: [
      "Model performs poorly on training data",
      "Model generalizes well",
      "Model performs well on training data but poorly on test data",
      "Model doesn’t learn"
    ],
    correct: 2
  },
  {
    question: "6. Which algorithm is used for clustering?",
    options: ["Linear Regression", "K-Means", "Logistic Regression", "Naive Bayes"],
    correct: 1
  },
  {
    question: "7. What does a confusion matrix represent?",
    options: [
      "Algorithm runtime",
      "Training time",
      "Performance of classification model",
      "Loss function"
    ],
    correct: 2
  },
  {
    question: "8. Which of the following is NOT a machine learning library in Python?",
    options: ["NumPy", "TensorFlow", "Scikit-learn", "Laravel"],
    correct: 3
  },
  {
    question: "9. What is the output of a regression model?",
    options: ["A category", "A class", "A continuous value", "A cluster"],
    correct: 2
  },
  {
    question: "10. Which method is used for reducing the number of features?",
    options: ["KNN", "PCA", "Naive Bayes", "SVM"],
    correct: 1
  },
  {
    question: "11. What is the purpose of training data?",
    options: [
      "To test the model",
      "To monitor CPU usage",
      "To train the model",
      "To format output"
    ],
    correct: 2
  },
  {
    question: "12. Which model is used for spam detection?",
    options: ["Linear Regression", "Clustering", "Naive Bayes", "K-Means"],
    correct: 2
  },
  {
    question: "13. Which term refers to the ability of a model to perform well on unseen data?",
    options: ["Training", "Underfitting", "Generalization", "Batching"],
    correct: 2
  },
  {
    question: "14. What is underfitting?",
    options: [
      "Model performs well on training but not on testing data",
      "Model fails to capture patterns in data",
      "Model is too complex",
      "Model fits data exactly"
    ],
    correct: 1
  },
  {
    question: "15. Which technique is used to prevent overfitting?",
    options: ["Early stopping", "Random initialization", "Batch processing", "Low learning rate"],
    correct: 0
  },
  {
    question: "16. In which type of ML is feedback used to improve learning?",
    options: ["Supervised", "Unsupervised", "Reinforcement", "Batch"],
    correct: 2
  },
  {
    question: "17. Which of the following is an evaluation metric for regression?",
    options: ["Accuracy", "F1 Score", "Confusion Matrix", "Mean Squared Error"],
    correct: 3
  },
  {
    question: "18. Which algorithm is a type of ensemble method?",
    options: ["KNN", "Decision Tree", "Random Forest", "PCA"],
    correct: 2
  },
  {
    question: "19. What does SVM stand for?",
    options: [
      "Simple Vector Method",
      "Support Vector Machine",
      "Supervised Variance Model",
      "System Verification Model"
    ],
    correct: 1
  },
  {
    question: "20. What is the full form of KNN?",
    options: [
      "K-Nearest Network",
      "Knowledge Node Network",
      "K-Nearest Neighbors",
      "Kernel Normal Network"
    ],
    correct: 2
  }
];

      
    
      constructor(private fb: FormBuilder) {
        this.quizForm = this.fb.group({
          answer: [null]
        });
      }
    
      ngOnInit(): void {
        this.updateDisplayTime();
        this.startTimer();
      }
    
      ngOnDestroy(): void {
        clearInterval(this.timerInterval);
      }
    
      startTimer(): void {
        this.timerInterval = setInterval(() => {
          if (this.timer > 0) {
            this.timer--;
            this.updateDisplayTime();
          } else {
            this.autoSubmit();
          }
        }, 1000);
      }
    
      updateDisplayTime(): void {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        this.displayTime = `${this.pad(minutes)}:${this.pad(seconds)}`;
      }
    
      pad(num: number): string {
        return num < 10 ? '0' + num : num.toString();
      }
    
      get currentQuestion() {
        return this.quizData[this.currentQuestionIndex];
      }
    
      nextQuestion(): void {
        const selected = this.quizForm.value.answer;
        this.userAnswers[this.currentQuestionIndex] = selected;
    
        if (selected === this.currentQuestion.correct) {
          this.score++;
        }
    
        this.quizForm.reset();
        this.currentQuestionIndex++;
    
        if (this.currentQuestionIndex >= this.quizData.length) {
          this.showResult = true;
          clearInterval(this.timerInterval);
        }
      }
    
      autoSubmit(): void {
        this.userAnswers[this.currentQuestionIndex] = this.quizForm.value.answer;
    
        // Final check if answer was correct
        if (this.quizForm.value.answer === this.currentQuestion.correct) {
          this.score++;
        }
    
        this.showResult = true;
        clearInterval(this.timerInterval);
      }
    
      restartQuiz(): void {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.showResult = false;
        this.userAnswers = [];
        this.quizForm.reset();
        this.timer = 20 * 60;
        this.updateDisplayTime();
        this.startTimer();
      }

}
