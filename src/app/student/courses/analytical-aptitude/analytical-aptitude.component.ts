import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-analytical-aptitude',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './analytical-aptitude.component.html',
  styleUrl: './analytical-aptitude.component.css'
})
export class AnalyticalAptitudeComponent {
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
    question: "1. What comes next in the series: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "20"],
    correct: 2
  },
  {
    question: "2. Find the odd one out: Apple, Banana, Carrot, Mango",
    options: ["Apple", "Banana", "Carrot", "Mango"],
    correct: 2
  },
  {
    question: "3. If 1 = 5, 2 = 25, 3 = 325, then 4 = ?",
    options: ["4325", "43210", "43215", "4321"],
    correct: 0
  },
  {
    question: "4. Which number replaces the question mark: 3, 6, 11, 18, 27, ?",
    options: ["30", "35", "38", "40"],
    correct: 2
  },
  {
    question: "5. What is the missing number in the pattern: 5, 10, 20, 40, ?",
    options: ["60", "80", "70", "100"],
    correct: 1
  },
  {
    question: "6. In a certain code, BEAR is written as YVZI. How is LION written?",
    options: ["ORLM", "OLMR", "OLRM", "OLRM"],
    correct: 2
  },
  {
    question: "7. Which word can be made from the letters: R, E, S, T?",
    options: ["Rest", "Tear", "Star", "Rent"],
    correct: 0
  },
  {
    question: "8. If 'FIRE' is coded as 'ERIF', how is 'WATER' coded?",
    options: ["RETWA", "RETAW", "TERAW", "WRETA"],
    correct: 1
  },
  {
    question: "9. Which number is missing: 7, 14, 28, ?, 112",
    options: ["56", "84", "42", "96"],
    correct: 0
  },
  {
    question: "10. Find the next term: Z, X, V, T, ?",
    options: ["R", "S", "U", "Q"],
    correct: 0
  },
  {
    question: "11. Which shape does not belong in the group?",
    options: ["Circle", "Triangle", "Cube", "Square"],
    correct: 2
  },
  {
    question: "12. If John's mother is Mary's daughter, how is John related to Mary?",
    options: ["Son", "Grandson", "Brother", "Nephew"],
    correct: 1
  },
  {
    question: "13. What number comes next: 121, 144, 169, ?",
    options: ["196", "186", "182", "190"],
    correct: 0
  },
  {
    question: "14. How many 9’s are there between 1 and 100?",
    options: ["18", "20", "19", "21"],
    correct: 2
  },
  {
    question: "15. If A = 1, B = 2, ..., Z = 26, then what is the value of DOG?",
    options: ["26", "34", "30", "32"],
    correct: 3  // D=4, O=15, G=7 => 4+15+7 = 26
  },
  {
    question: "16. Choose the next number: 1, 1, 2, 3, 5, 8, ?",
    options: ["12", "13", "11", "10"],
    correct: 1
  },
  {
    question: "17. If ALL = 36 and BALL = 38, then TALL = ?",
    options: ["40", "41", "39", "42"],
    correct: 0
  },
  {
    question: "18. Complete the analogy: Pen : Write :: Knife : ?",
    options: ["Cut", "Peel", "Draw", "Stab"],
    correct: 0
  },
  {
    question: "19. Which number is the square of a prime number?",
    options: ["27", "49", "51", "91"],
    correct: 1
  },
  {
    question: "20. A clock shows 3:15. What is the angle between the hour and minute hand?",
    options: ["7.5°", "0°", "30°", "45°"],
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

