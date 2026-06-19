import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-structures',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './data-structures.component.html',
  styleUrl: './data-structures.component.css'
})
export class DataStructuresComponent {
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
    question: "1. Which data structure uses FIFO order?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1
  },
  {
    question: "2. What is the time complexity of inserting at the end in an array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correct: 0
  },
  {
    question: "3. Which data structure uses LIFO order?",
    options: ["Queue", "Stack", "Heap", "Graph"],
    correct: 1
  },
  {
    question: "4. Which of the following is a linear data structure?",
    options: ["Binary Tree", "Graph", "Stack", "Hash Table"],
    correct: 2
  },
  {
    question: "5. In a binary tree, each node has at most:",
    options: ["1 child", "2 children", "3 children", "No children"],
    correct: 1
  },
  {
    question: "6. Which traversal visits nodes in the order: left, root, right?",
    options: ["Preorder", "Inorder", "Postorder", "Level order"],
    correct: 1
  },
  {
    question: "7. What is the best case time complexity for linear search?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(log n)"],
    correct: 0
  },
  {
    question: "8. What data structure is used in recursion?",
    options: ["Queue", "Array", "Stack", "Tree"],
    correct: 2
  },
  {
    question: "9. Which data structure is used for BFS traversal?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1
  },
  {
    question: "10. What is the height of a balanced binary tree with n nodes?",
    options: ["log n", "n", "n/2", "√n"],
    correct: 0
  },
  {
    question: "11. What is a full binary tree?",
    options: [
      "Every node has 0 or 2 children",
      "Every node has 2 children",
      "Every level is full",
      "Only leaves at last level"
    ],
    correct: 0
  },
  {
    question: "12. Which data structure gives fast lookup by key?",
    options: ["Array", "Stack", "Hash Table", "Linked List"],
    correct: 2
  },
  {
    question: "13. Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    correct: 1
  },
  {
    question: "14. Which data structure is used in undo functionality?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    correct: 1
  },
  {
    question: "15. Which traversal is used to copy a binary tree?",
    options: ["Inorder", "Postorder", "Preorder", "Level order"],
    correct: 2
  },
  {
    question: "16. Which data structure allows inserting and deleting from both ends?",
    options: ["Queue", "Deque", "Stack", "Heap"],
    correct: 1
  },
  {
    question: "17. Which structure is best for priority processing?",
    options: ["Stack", "Priority Queue", "Deque", "Graph"],
    correct: 1
  },
  {
    question: "18. Which algorithm is used to find shortest path in a graph?",
    options: ["Prim's", "Kruskal's", "Dijkstra's", "DFS"],
    correct: 2
  },
  {
    question: "19. What is the maximum number of nodes in a binary tree of height h?",
    options: ["2^h - 1", "2h", "h^2", "h + 1"],
    correct: 0
  },
  {
    question: "20. Which of these is non-linear data structure?",
    options: ["Stack", "Queue", "Array", "Graph"],
    correct: 3
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


