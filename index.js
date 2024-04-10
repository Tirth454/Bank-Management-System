class BankDetails {
    constructor() {
      this.accno = "";
      this.name = "";
      this.acc_type = "";
      this.balance = 0;
    }
  
    openAccount() {
      this.accno = prompt("Enter Account No: ");
      this.acc_type = prompt("Enter Account type: ");
      this.name = prompt("Enter Name: ");
      this.balance = parseFloat(prompt("Enter Balance: "));
    }
  
    showAccount() {
      const output = `Name of account holder: ${this.name}<br>
                        Account no.: ${this.accno}<br>
                        Account type: ${this.acc_type}<br>
                        Balance: ${this.balance}`;
      return output;
    }
  
    deposit() {
      let amt = parseFloat(prompt("Enter the amount you want to deposit: "));
      if (!isNaN(amt) && amt > 0) {
        this.balance += amt;
      } else {
        alert("Please enter a valid amount.");
      }
    }
  
    withdrawal() {
      let amt = parseFloat(prompt("Enter the amount you want to withdraw: "));
      if (!isNaN(amt) && amt > 0) {
        if (this.balance >= amt) {
          this.balance -= amt;
          alert(`Balance after withdrawal: ${this.balance}`);
        } else {
          alert(`Your balance is less than ${amt}\nTransaction failed...!!`);
        }
      } else {
        alert("Please enter a valid amount.");
      }
    }
  
    search(ac_no) {
      if (this.accno === ac_no) {
        return this.showAccount();
      }
      return false;
    }
  }
  
  const openBtn = document.getElementById("openBtn");
  const displayBtn = document.getElementById("displayBtn");
  const searchBtn = document.getElementById("searchBtn");
  const depositBtn = document.getElementById("depositBtn");
  const withdrawBtn = document.getElementById("withdrawBtn");
  const exitBtn = document.getElementById("exitBtn");
  const transferBtn = document.getElementById("transferBtn");
  const closeAccountBtn = document.getElementById("closeAccountBtn");
  const interestBtn = document.getElementById("interestBtn");
  const changeDetailsBtn = document.getElementById("changeDetailsBtn");
  const outputDiv = document.getElementById("output");
  
  const C = [];
  
  openBtn.addEventListener("click", () => {
    const n = parseInt(
      prompt("How many number of customers do you want to input?")
    );
    for (let i = 0; i < n; i++) {
      C[i] = new BankDetails();
      C[i].openAccount();
    }
  });
  
  displayBtn.addEventListener("click", () => {
    let output = "";
    for (let i = 0; i < C.length; i++) {
      output += C[i].showAccount() + "<br><br>";
    }
    outputDiv.innerHTML = output;
  });
  
  searchBtn.addEventListener("click", () => {
    const ac_no = prompt("Enter account no. you want to search: ");
    let found = false;
    for (let i = 0; i < C.length; i++) {
      const accountDetails = C[i].search(ac_no);
      if (accountDetails) {
        outputDiv.innerHTML = accountDetails;
        found = true;
        break;
      }
    }
    if (!found) {
      alert("Search failed! Account doesn't exist..!!");
    }
  });
  
  depositBtn.addEventListener("click", () => {
    const ac_no = prompt("Enter Account no.: ");
    let found = false;
    for (let i = 0; i < C.length; i++) {
      const accountDetails = C[i].search(ac_no);
      if (accountDetails) {
        C[i].deposit();
        outputDiv.innerHTML = accountDetails;
        found = true;
        break;
      }
    }
    if (!found) {
      alert("Search failed! Account doesn't exist..!!");
    }
  });
  
  withdrawBtn.addEventListener("click", () => {
    const ac_no = prompt("Enter Account no.: ");
    let found = false;
    for (let i = 0; i < C.length; i++) {
      const accountDetails = C[i].search(ac_no);
      if (accountDetails) {
        C[i].withdrawal();
        outputDiv.innerHTML = accountDetails;
        found = true;
        break;
      }
    }
    if (!found) {
      alert("Search failed! Account doesn't exist..!!");
    }
  });
  
  exitBtn.addEventListener("click", () => {
    outputDiv.textContent = "See you soon...";
  });
  
  transferBtn.addEventListener("click", () => {
    const senderAccNo = prompt("Enter your Account No.: ");
    const receiverAccNo = prompt("Enter the receiver's Account No.: ");
    const transferAmount = parseFloat(prompt("Enter the amount to transfer: "));
  
    let senderFound = false;
    let receiverFound = false;
  
    for (let i = 0; i < C.length; i++) {
      if (C[i].accno === senderAccNo) {
        // Sender account found
        if (C[i].balance >= transferAmount) {
          // Sufficient balance to transfer
          for (let j = 0; j < C.length; j++) {
            if (C[j].accno === receiverAccNo) {
              C[i].balance -= transferAmount;
              C[j].balance += transferAmount;
              alert("Money transfer successful!");
              senderFound = true;
              receiverFound = true;
              break;
            }
          }
        } else {
          alert("Insufficient balance for the transfer.");
          senderFound = true;
        }
      }
  
      if (senderFound && receiverFound) {
        break;
      }
    }
  
    if (!senderFound) {
      alert("Sender account not found.");
    }
  
    if (!receiverFound) {
      alert("Receiver account not found.");
    }
  });
  
  closeAccountBtn.addEventListener("click", () => {
    const accountNoToClose = prompt("Enter your Account No. to close: ");
    let accountIndexToRemove = -1;
  
    for (let i = 0; i < C.length; i++) {
      if (C[i].accno === accountNoToClose) {
        if (
          confirm(
            "Are you sure you want to close your account? This action cannot be undone."
          )
        ) {
          // Remove the account from the array
          C.splice(i, 1);
          alert("Account closed successfully!");
          accountIndexToRemove = i;
          break;
        }
      }
    }
  
    if (accountIndexToRemove === -1) {
      alert("Account not found or account closure canceled.");
    }
  });
  
  interestBtn.addEventListener("click", () => {
    const accountNumber = prompt("Enter your account number: ");
    const rate = parseFloat(prompt("Enter the annual interest rate (in percentage): "));
    let accountFound = false;
  
    for (let i = 0; i < C.length; i++) {
      if (C[i].accno === accountNumber) {
        accountFound = true;
        const interest = (rate / 100) * C[i].balance;
        // C[i].balance += interest;
        // alert(Interest calculated and added to your account. New balance: ${C[i].balance});
        alert(`Interest calculated: ${interest}`);
        break;
      }
    }
  
    if (!accountFound) {
      alert("Account not found.");
    }
  });
  
  changeDetailsBtn.addEventListener("click", () => {
    const accountNumber = prompt("Enter your account number: ");
    let accountFound = false;
  
    for (let i = 0; i < C.length; i++) {
      if (C[i].accno === accountNumber) {
        accountFound = true;
        const newName = prompt("Enter new name: ");
        const newAccountType = prompt("Enter new account type: ");
  
        if (newName && newAccountType) {
          C[i].name = newName;
          C[i].acc_type = newAccountType;
          alert("Account details updated successfully.");
        } else {
          alert("Invalid input. Name and account type cannot be empty.");
        }
        break;
      }
    }
  
    if (!accountFound) {
      alert("Account not found.");
    }
  });