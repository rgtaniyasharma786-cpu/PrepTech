import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dbms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dbms.component.html',
  styleUrl: './dbms.component.css'
})
export class DbmsComponent {
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
      question: "1. What does DBMS stand for?",
      options: ["Database Management System", "Data Backup Management System", "Data Block Management Server", "Digital Base Management System"],
      correct: 0
    },
    {
      question: "2. Which of the following is not a type of database model?",
      options: ["Relational", "Hierarchical", "Network", "Decisional"],
      correct: 3
    },
    {
      question: "3. Which language is used to define the structure of a database?",
      options: ["DML", "DCL", "DDL", "TCL"],
      correct: 2
    },
    {
      question: "4. Which SQL command is used to remove a table from the database?",
      options: ["DELETE", "REMOVE", "DROP", "ERASE"],
      correct: 2
    },
    {
      question: "5. In a relational model, what is a tuple?",
      options: ["A row", "A column", "A table", "A schema"],
      correct: 0
    },
    {
      question: "6. What does the PRIMARY KEY do?",
      options: ["Increases speed", "Prevents NULL values", "Ensures uniqueness", "All of the above"],
      correct: 3
    },
    {
      question: "7. Which SQL clause is used to filter records?",
      options: ["WHERE", "ORDER BY", "GROUP BY", "SELECT"],
      correct: 0
    },
    {
      question: "8. What does ACID stand for in DBMS?",
      options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Integrity, Durability", "Audit, Commit, Isolation, Database", "Atomicity, Consistency, Indexing, Durability"],
      correct: 0
    },
    {
      question: "9. Which of the following is a DML command?",
      options: ["CREATE", "ALTER", "INSERT", "DROP"],
      correct: 2
    },
    {
      question: "10. Which key is used to uniquely identify a record in a table?",
      options: ["Candidate key", "Foreign key", "Super key", "Primary key"],
      correct: 3
    },
    {
      question: "11. Which normal form eliminates transitive dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 2
    },
    {
      question: "12. What is a foreign key?",
      options: ["A key from another table", "A primary key", "A unique key", "A duplicate key"],
      correct: 0
    },
    {
      question: "13. Which of the following is not a constraint in SQL?",
      options: ["NOT NULL", "UNIQUE", "DEFAULT", "REPEAT"],
      correct: 3
    },
    {
      question: "14. What is the purpose of the JOIN operation in SQL?",
      options: ["To combine rows from two or more tables", "To delete a table", "To update data", "To filter rows"],
      correct: 0
    },
    {
      question: "15. Which of these is a transaction control command?",
      options: ["UPDATE", "COMMIT", "SELECT", "DELETE"],
      correct: 1
    },
    {
      question: "16. What is the full form of SQL?",
      options: ["Structured Query Language", "Sequential Query Language", "Standard Query Language", "Simple Query Language"],
      correct: 0
    },
    {
      question: "17. What does the ROLLBACK statement do?",
      options: ["Saves a transaction", "Undoes changes", "Deletes table", "Closes connection"],
      correct: 1
    },
    {
      question: "18. Which indexing technique uses balanced trees?",
      options: ["Hash index", "Bitmap index", "B-tree index", "Flat index"],
      correct: 2
    },
    {
      question: "19. Which command is used to change data in a table?",
      options: ["UPDATE", "SELECT", "GRANT", "REVOKE"],
      correct: 0
    },
    {
      question: "20. Which of the following is not part of ACID properties?",
      options: ["Atomicity", "Consistency", "Isolation", "Duplication"],
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
