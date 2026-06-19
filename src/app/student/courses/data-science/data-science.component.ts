import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-science',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './data-science.component.html',
  styleUrl: './data-science.component.css'
})
export class DataScienceComponent {
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
    question: "1. What is the primary goal of data science?",
    options: ["Building websites", "Creating databases", "Extracting knowledge from data", "Designing hardware"],
    correct: 2
  },
  {
    question: "2. Which of the following is a programming language commonly used in data science?",
    options: ["Java", "Python", "C", "PHP"],
    correct: 1
  },
  {
    question: "3. What is the full form of CSV in data science?",
    options: ["Comma Separated Values", "Character Separated Values", "Control Separated Vector", "Combined System Variables"],
    correct: 0
  },
  {
    question: "4. Which library is used for data manipulation in Python?",
    options: ["TensorFlow", "NumPy", "Pandas", "Keras"],
    correct: 2
  },
  {
    question: "5. What type of learning involves labeled data?",
    options: ["Unsupervised learning", "Reinforcement learning", "Supervised learning", "Semi-supervised learning"],
    correct: 2
  },
  {
    question: "6. What is overfitting in machine learning?",
    options: ["Model performs well on training and testing data", "Model fails on training data", "Model fits noise in training data", "Model ignores training data"],
    correct: 2
  },
  {
    question: "7. Which of the following is a classification algorithm?",
    options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"],
    correct: 2
  },
  {
    question: "8. What is the purpose of data preprocessing?",
    options: ["To create models", "To clean and prepare data", "To visualize data", "To train algorithms"],
    correct: 1
  },
  {
    question: "9. Which one is used for data visualization in Python?",
    options: ["Matplotlib", "Scikit-learn", "Pandas", "NLTK"],
    correct: 0
  },
  {
    question: "10. What does the term 'Big Data' refer to?",
    options: ["Data with large size and complexity", "Data stored in SQL", "Compressed data", "Data with small records"],
    correct: 0
  },
  {
    question: "11. What is the role of a data scientist?",
    options: ["Designing hardware", "Writing only SQL queries", "Analyzing and interpreting complex data", "Creating animations"],
    correct: 2
  },
  {
    question: "12. Which algorithm is commonly used for clustering?",
    options: ["K-Means", "Logistic Regression", "Decision Tree", "Random Forest"],
    correct: 0
  },
  {
    question: "13. What is feature selection?",
    options: ["Deleting data", "Choosing important variables", "Creating new datasets", "Encoding labels"],
    correct: 1
  },
  {
    question: "14. Which metric is used to evaluate classification models?",
    options: ["MSE", "Accuracy", "R-Squared", "MAE"],
    correct: 1
  },
  {
    question: "15. What is NLP in data science?",
    options: ["Natural Language Processing", "Numeric Logic Processor", "National Lab Project", "None of the above"],
    correct: 0
  },
  {
    question: "16. What is the full form of AI?",
    options: ["Artificial Innovation", "Automated Intelligence", "Artificial Intelligence", "Advanced Integration"],
    correct: 2
  },
  {
    question: "17. What is the use of cross-validation?",
    options: ["To test the model only", "To train the model faster", "To evaluate the model on different splits", "To clean data"],
    correct: 2
  },
  {
    question: "18. What does PCA stand for in data science?",
    options: ["Principal Component Analysis", "Primary Component Algorithm", "Partial Column Analysis", "Principal Classification Accuracy"],
    correct: 0
  },
  {
    question: "19. Which of the following is an evaluation metric for regression?",
    options: ["Confusion Matrix", "Accuracy", "Mean Squared Error", "Precision"],
    correct: 2
  },
  {
    question: "20. Which of the following best describes deep learning?",
    options: ["Shallow neural networks", "Decision trees", "Algorithms with multiple hidden layers", "Linear models only"],
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


