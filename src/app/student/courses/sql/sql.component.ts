import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sql',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sql.component.html',
  styleUrl: './sql.component.css'
})
export class SqlComponent {

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
    "question": "1. What does SQL stand for?",
    "options": ["Structured Query Language", "Simple Query List", "System Query Logic", "Sequential Question Language"],
    "correct": 0
  },
  {
    "question": "2. Which SQL keyword is used to retrieve data?",
    "options": ["GET", "FETCH", "SELECT", "RETRIEVE"],
    "correct": 2
  },
  {
    "question": "3. What symbol is used to end a SQL statement?",
    "options": ["#", ".", ";", ":"],
    "correct": 2
  },
  {
    "question": "4. Which clause is used to filter records?",
    "options": ["ORDER BY", "WHERE", "GROUP BY", "HAVING"],
    "correct": 1
  },
  {
    "question": "5. What function returns the total number of rows?",
    "options": ["SUM()", "COUNT()", "TOTAL()", "ROWS()"],
    "correct": 1
  },
  {
    "question": "6. Which SQL statement is used to update data?",
    "options": ["CHANGE", "MODIFY", "UPDATE", "ALTER"],
    "correct": 2
  },
  {
    "question": "7. What does the DISTINCT keyword do?",
    "options": ["Deletes duplicates", "Sorts data", "Returns unique values", "Groups data"],
    "correct": 2
  },
  {
    "question": "8. Which JOIN returns only matching rows from both tables?",
    "options": ["LEFT JOIN", "RIGHT JOIN", "FULL JOIN", "INNER JOIN"],
    "correct": 3
  },
  {
    "question": "9. What keyword is used to sort results?",
    "options": ["SORT BY", "ORDER BY", "GROUP BY", "RANK"],
    "correct": 1
  },
  {
    "question": "10. How do you select all columns from a table?",
    "options": ["SELECT ALL", "SELECT *", "SELECT COLUMNS", "SELECT ALL_COLUMNS"],
    "correct": 1
  },
  {
    "question": "11. Which function gives the average of values?",
    "options": ["SUM()", "MEAN()", "AVG()", "TOTAL()"],
    "correct": 2
  },
  {
    "question": "12. Which clause is used with GROUP BY to filter grouped data?",
    "options": ["HAVING", "WHERE", "FILTER", "CONDITION"],
    "correct": 0
  },
  {
    "question": "13. Which constraint prevents duplicate values in a column?",
    "options": ["NOT NULL", "DEFAULT", "UNIQUE", "PRIMARY"],
    "correct": 2
  },
  {
    "question": "14. What does the LIKE operator do?",
    "options": ["Compares exact strings", "Finds NULL values", "Matches patterns", "Deletes records"],
    "correct": 2
  },
  {
    "question": "15. Which SQL clause is used to limit the number of returned rows?",
    "options": ["LIMIT", "TOP", "ROWCOUNT", "OFFSET"],
    "correct": 0
  },
  {
    "question": "16. What does the UNION operator do?",
    "options": ["Merges data from two tables with duplicates", "Combines results of two queries and removes duplicates", "Links tables permanently", "Joins two tables on common keys"],
    "correct": 1
  },
  {
    "question": "17. What happens if a foreign key constraint is violated?",
    "options": ["Row is ignored", "Default value is used", "Error is thrown", "NULL is inserted"],
    "correct": 2
  },
  {
    "question": "18. Which keyword is used to create a view?",
    "options": ["MAKE VIEW", "CREATE VIEW", "DEFINE VIEW", "INIT VIEW"],
    "correct": 1
  },
  {
    "question": "19. What does the TRUNCATE command do?",
    "options": ["Deletes selected rows", "Removes all rows without logging each deletion", "Drops the table", "Resets the table structure"],
    "correct": 1
  },
  {
    "question": "20. Which function returns the current timestamp?",
    "options": ["GETDATE()", "NOW()", "TIME()", "SYSDATE()"],
    "correct": 0
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
