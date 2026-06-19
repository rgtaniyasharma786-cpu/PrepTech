import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-verbal-ability',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './verbal-ability.component.html',
  styleUrl: './verbal-ability.component.css'
})
export class VerbalAbilityComponent {
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
    question: "1. Choose the synonym of 'Rapid':",
    options: ["Slow", "Fast", "Lazy", "Dull"],
    correct: 1
  },
  {
    question: "2. Choose the antonym of 'Generous':",
    options: ["Kind", "Selfish", "Charitable", "Helpful"],
    correct: 1
  },
  {
    question: "3. Choose the correctly spelled word:",
    options: ["Recieve", "Receive", "Receeve", "Receve"],
    correct: 1
  },
  {
    question: "4. Fill in the blank: He is good ____ mathematics.",
    options: ["at", "on", "in", "with"],
    correct: 0
  },
  {
    question: "5. Identify the error: She do not like coffee.",
    options: ["She", "do", "not", "coffee"],
    correct: 1
  },
  {
    question: "6. Choose the synonym of 'Brief':",
    options: ["Short", "Long", "Wide", "Large"],
    correct: 0
  },
  {
    question: "7. Choose the antonym of 'Ancient':",
    options: ["Old", "Historic", "Modern", "Medieval"],
    correct: 2
  },
  {
    question: "8. Fill in the blank: The baby is afraid ____ dogs.",
    options: ["in", "of", "at", "with"],
    correct: 1
  },
  {
    question: "9. Choose the correct sentence:",
    options: [
      "He go to school daily.",
      "He going to school.",
      "He goes to school daily.",
      "He gone to school."
    ],
    correct: 2
  },
  {
    question: "10. What does the idiom 'Break the ice' mean?",
    options: [
      "To start a conversation",
      "To break something",
      "To become angry",
      "To slip on ice"
    ],
    correct: 0
  },
  {
    question: "11. Fill in the blank: He is taller ___ his brother.",
    options: ["then", "than", "that", "to"],
    correct: 1
  },
  {
    question: "12. Choose the synonym of 'Silent':",
    options: ["Talkative", "Quiet", "Noisy", "Loud"],
    correct: 1
  },
  {
    question: "13. Choose the antonym of 'Courage':",
    options: ["Bravery", "Strength", "Fear", "Confidence"],
    correct: 2
  },
  {
    question: "14. Fill in the blank: She prefers tea ___ coffee.",
    options: ["than", "over", "to", "in"],
    correct: 2
  },
  {
    question: "15. Choose the correct plural form:",
    options: ["Childs", "Childes", "Children", "Childrens"],
    correct: 2
  },
  {
    question: "16. Choose the synonym of 'Honest':",
    options: ["Cheater", "Truthful", "False", "Dishonest"],
    correct: 1
  },
  {
    question: "17. Choose the antonym of 'Victory':",
    options: ["Triumph", "Win", "Success", "Defeat"],
    correct: 3
  },
  {
    question: "18. What does the idiom 'Once in a blue moon' mean?",
    options: [
      "Very often",
      "Never",
      "Rarely",
      "Every day"
    ],
    correct: 2
  },
  {
    question: "19. Fill in the blank: The book is written ___ English.",
    options: ["on", "in", "with", "by"],
    correct: 1
  },
  {
    question: "20. Which sentence is grammatically correct?",
    options: [
      "She don't likes pizza.",
      "She doesn't like pizza.",
      "She not likes pizza.",
      "She doesn't likes pizza."
    ],
    correct: 1
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


