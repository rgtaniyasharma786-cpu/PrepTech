import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-computer-networks',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './computer-networks.component.html',
  styleUrl: './computer-networks.component.css'
})
export class ComputerNetworksComponent {
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
    question: "1. Which of the following is not a type of network?",
    options: ["LAN", "MAN", "WAN", "SANITIZE"],
    correct: 3
  },
  {
    question: "2. Which device is used to connect different networks together?",
    options: ["Switch", "Router", "Hub", "Bridge"],
    correct: 1
  },
  {
    question: "3. Which topology has a central hub?",
    options: ["Ring", "Star", "Mesh", "Bus"],
    correct: 1
  },
  {
    question: "4. What does IP stand for?",
    options: ["Internet Process", "Internal Protocol", "Internet Protocol", "Interconnect Port"],
    correct: 2
  },
  {
    question: "5. Which protocol is used to send email?",
    options: ["FTP", "SMTP", "HTTP", "SNMP"],
    correct: 1
  },
  {
    question: "6. The maximum length of a cable in Ethernet (10Base-T) is:",
    options: ["10 meters", "100 meters", "500 meters", "1000 meters"],
    correct: 1
  },
  {
    question: "7. What layer of the OSI model is responsible for routing?",
    options: ["Data Link", "Physical", "Transport", "Network"],
    correct: 3
  },
  {
    question: "8. Which protocol is used to transfer files over the Internet?",
    options: ["FTP", "DNS", "SMTP", "POP3"],
    correct: 0
  },
  {
    question: "9. What is the default port number for HTTP?",
    options: ["21", "25", "80", "110"],
    correct: 2
  },
  {
    question: "10. Which device operates at the data link layer?",
    options: ["Switch", "Router", "Gateway", "Repeater"],
    correct: 0
  },
  {
    question: "11. The smallest unit of data in a computer network is:",
    options: ["Segment", "Packet", "Frame", "Bit"],
    correct: 1
  },
  {
    question: "12. Which protocol translates domain names to IP addresses?",
    options: ["FTP", "SMTP", "DNS", "DHCP"],
    correct: 2
  },
  {
    question: "13. Which one of the following is a connectionless protocol?",
    options: ["TCP", "UDP", "FTP", "SMTP"],
    correct: 1
  },
  {
    question: "14. In which layer of the OSI model is encryption typically implemented?",
    options: ["Application", "Presentation", "Session", "Network"],
    correct: 1
  },
  {
    question: "15. Which of the following is not a guided media?",
    options: ["Twisted pair", "Coaxial cable", "Optical fiber", "Radio waves"],
    correct: 3
  },
  {
    question: "16. What is the purpose of the ARP protocol?",
    options: ["To assign IP addresses", "To translate IP to MAC address", "To route packets", "To send emails"],
    correct: 1
  },
  {
    question: "17. Which one is a MAC address format?",
    options: ["192.168.0.1", "00:1B:44:11:3A:B7", "HTTP://example.com", "255.255.255.0"],
    correct: 1
  },
  {
    question: "18. How many layers are in the OSI model?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "19. Which device amplifies and retransmits signals to extend a network?",
    options: ["Switch", "Router", "Repeater", "Hub"],
    correct: 2
  },
  {
    question: "20. What is the full form of TCP?",
    options: ["Transmission Control Protocol", "Transfer Control Packet", "Total Control Protocol", "Transmission Channel Path"],
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
