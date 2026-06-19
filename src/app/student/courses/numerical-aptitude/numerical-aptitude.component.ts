import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-numerical-aptitude',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './numerical-aptitude.component.html',
  styleUrl: './numerical-aptitude.component.css'
})
export class NumericalAptitudeComponent {
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
    question: "1. What is 25% of 200?",
    options: ["25", "50", "75", "100"],
    correct: 1
  },
  {
    question: "2. If 12 pencils cost ₹60, what is the cost of 1 pencil?",
    options: ["₹4", "₹5", "₹6", "₹7"],
    correct: 2
  },
  {
    question: "3. The ratio 2:3 is equivalent to:",
    options: ["4:5", "6:9", "8:10", "10:15"],
    correct: 3
  },
  {
    question: "4. What is the simple interest on ₹1000 at 5% for 2 years?",
    options: ["₹50", "₹100", "₹150", "₹200"],
    correct: 1
  },
  {
    question: "5. If a car travels 60 km in 1.5 hours, what is its speed?",
    options: ["30 km/h", "40 km/h", "45 km/h", "60 km/h"],
    correct: 2
  },
  {
    question: "6. What is 15% of 80?",
    options: ["10", "12", "15", "18"],
    correct: 1
  },
  {
    question: "7. A man buys a chair for ₹500 and sells it for ₹650. What is the profit percentage?",
    options: ["25%", "30%", "35%", "20%"],
    correct: 0
  },
  {
    question: "8. Find the average of 10, 20, 30, 40 and 50.",
    options: ["30", "25", "35", "40"],
    correct: 0
  },
  {
    question: "9. If 3 workers can complete a task in 12 days, how long will it take 6 workers?",
    options: ["6 days", "8 days", "9 days", "10 days"],
    correct: 0
  },
  {
    question: "10. A train 120m long crosses a pole in 10 seconds. What is its speed?",
    options: ["10 m/s", "12 m/s", "14 m/s", "15 m/s"],
    correct: 1
  },
  {
    question: "11. What is the square root of 625?",
    options: ["20", "25", "30", "35"],
    correct: 1
  },
  {
    question: "12. If x + 2 = 10, what is the value of x?",
    options: ["6", "7", "8", "9"],
    correct: 2
  },
  {
    question: "13. What is the next number in the series: 2, 4, 8, 16, __?",
    options: ["18", "20", "32", "24"],
    correct: 2
  },
  {
    question: "14. A man spends 60% of his income. If he earns ₹20,000, how much does he save?",
    options: ["₹8,000", "₹10,000", "₹12,000", "₹6,000"],
    correct: 0
  },
  {
    question: "15. What is 3/4 of 100?",
    options: ["25", "50", "75", "80"],
    correct: 2
  },
  {
    question: "16. A shopkeeper sells an item for ₹240 at a loss of 20%. What was the cost price?",
    options: ["₹300", "₹280", "₹260", "₹250"],
    correct: 0
  },
  {
    question: "17. If 5x = 60, what is the value of x?",
    options: ["10", "12", "15", "20"],
    correct: 1
  },
  {
    question: "18. What is the value of (5² + 3²)?",
    options: ["25", "34", "50", "64"],
    correct: 1
  },
  {
    question: "19. A person walks 12 km in 3 hours. What is the speed in km/hr?",
    options: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "20. If a box contains 20 red and 30 blue balls, what is the ratio of red to total balls?",
    options: ["2:5", "2:3", "1:2", "1:3"],
    correct: 0
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
