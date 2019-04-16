import React, { Component } from 'react';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Total from '../components/Total';
import Increase from '../components/Increase';
import Decrease from '../components/Decrease';
import CurStart from '../components/CurStart';

import './style.css';

class Main extends Component {

  state = {
    // input fields
    desc: '',
    expenseAmt: '',
    beginningAmt: '',

    // all expenses
    allExpenses: [],

    // starting balance
    startingBalance: '0.00',

    // displayamt
    totalExpenseAmt: '0.00'
  }

  componentDidMount() {
    // load all expenses from the database
    // API.getExpenses()
    //   .then(res => console.log(res.data));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateExpense = expense => {
    if (!isNaN(Number(expense))) {
      return true;
    }
    else {
      return false;
    }
  };

  getDecimal = expense => {
    let stringValue = expense.toString();

    // check that the decimal exists
    if (stringValue.split('.').length > 1) {
      let decimalLength = stringValue.split('.')[1].length;

      // shorten the decimal 
      if (decimalLength >= 2) {
        let dollars = stringValue.split('.')[0];
        let decimal = stringValue.split('.')[1];
        let newDecimal = decimal.slice(0, 2);

        console.log(newDecimal[0], newDecimal[1]);

        if (newDecimal[0] === '0') {
          expense = Number(dollars) + '.0' + Number(newDecimal);
        }
        else if (newDecimal[1] === '0') {
          expense = Number(dollars) + '.' + Number(newDecimal);
        }
        else {
          expense = Number(dollars) + '.' + Number(newDecimal);
        }

      }
    }

    return expense;

  };

  getDate = () => {
    let date = '';

    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    if (minutes < 10) {
      minutes = '0' + Number(minutes);
    }

    if (hours >= 13) {
      hours = hours - 12;
      if (hours === 12) {
        date = `${hours}:${minutes}AM ${month}/${day}/${year}`;
      }
      date = `${hours}:${minutes}PM ${month}/${day}/${year}`;
    }
    else {
      if (hours === 12) {
        date = `${hours}:${minutes}PM ${month}/${day}/${year}`;
      }
      date = `${hours}:${minutes}AM ${month}/${day}/${year}`;
    }

    return date;
  };

  validateTotal = (total) => {
    console.log(`total: ${total}`);
    let newTotal = total.toString().split('.')
    console.log(`new total: ${newTotal}`);

    if (newTotal.length > 1) {

      if (newTotal[1].length === 1) {
        return total = total + '0';
      }
      else if (newTotal[1].length > 2) {
        console.log(newTotal[1]);
        let num = newTotal[0];
        let decimal = newTotal[1];

        console.log(`num: ${num}\ndecimal: ${decimal}`);

        let splitDec = decimal.split('');
        if (splitDec[2] >= 5) {
          console.log(`3rd dec num: ${splitDec[2]}`)
          if (splitDec[1] === 9) {
            console.log(`2nd dec num: ${splitDec[1]}`)
            splitDec[1] = 0;
            console.log(`2nd dec num: ${splitDec[1]}`)
            if (splitDec[0] === 9) {
              console.log(`1st dec num: ${splitDec[0]}`)
              splitDec[0] = 0;
              console.log(`1st dec num: ${splitDec[0]}`)
              num = Number(num) + 1;
            }
            else {
              console.log(`1st dec num: ${splitDec[0]}`)
              splitDec[0] = Number(splitDec[0] + 1);
              console.log(`1st dec num: ${splitDec[0]}`)
            }
          }
          else {
            console.log(`2nd dec num: ${splitDec[1]}`)
            splitDec[1] = Number(splitDec[1]) + 1;
            console.log(`2nd dec num: ${splitDec[1]}`)
          }
          console.log(splitDec)
          decimal = splitDec.slice(0, 2);
          decimal = decimal[0] + decimal[1];
          return total = num + "." + decimal;
        }
        else {
          decimal = decimal.slice(0, 2);
          return total = num + "." + decimal;
        }
      }
    }
    else {
      return total = total + ".00";
    }

    return total;

  }

  handlePlusClick = () => {
    let desc = this.state.desc;
    let expense = this.state.expenseAmt;

    if (expense === '') {
      return;
    }

    // check that the expense is a real number
    if (!this.validateExpense(expense)) {
      this.setState({ expenseAmt: '' });
      return;
    }

    // check if there is a decimal
    expense = this.getDecimal(expense);
    // console.log(`Success! \nDesc: ${desc}\nExpense Amt: ${expense}`);

    // get the date
    const date = this.getDate();

    // create the expense object
    const newExpense = {
      id: Math.random(),
      desc,
      increase: true,
      decrease: false,
      amount: expense,
      date
    }

    // push the expense into an array
    this.state.allExpenses.push(newExpense);
    console.log(this.state.allExpenses);

    // clear the inputs
    this.setState({ desc: '' });
    this.setState({ expenseAmt: '' });

    // calculate the new total
    let currentTotal = this.state.totalExpenseAmt;
    currentTotal = Number(currentTotal) + Number(expense);

    currentTotal = this.validateTotal(currentTotal);

    this.setState({ totalExpenseAmt: currentTotal });
  };

  handleMinusClick = () => {
    let desc = this.state.desc;
    let expense = this.state.expenseAmt;

    if (expense === '') {
      return;
    }

    // check that the expense is a real number
    if (!this.validateExpense(expense)) {
      this.setState({ expenseAmt: '' });
      return;
    }

    // check if there is a decimal
    expense = this.getDecimal(expense);
    // console.log(`Success! \nDesc: ${desc}\nExpense Amt: ${expense}`);

    // get the date
    const date = this.getDate();

    // create the expense object
    const newExpense = {
      id: Math.random(),
      desc,
      increase: false,
      decrease: true,
      amount: expense,
      date
    }

    // push the expense into an array
    this.state.allExpenses.push(newExpense);
    console.log(this.state.allExpenses);

    // clear the inputs
    this.setState({ desc: '' });
    this.setState({ expenseAmt: '' });

    // calculate the new total
    let currentTotal = this.state.totalExpenseAmt;
    currentTotal = Number(currentTotal) - Number(expense);

    currentTotal = this.validateTotal(currentTotal);

    this.setState({ totalExpenseAmt: currentTotal });
  };

  setStartingBalance = () => {

    let startingBalance = this.state.beginningAmt;
    let expenses = this.state.allExpenses;
    if (startingBalance === '' || startingBalance < 0) {
      return;
    }

    // validate a number was submitted
    if (!this.validateExpense(startingBalance)) {
      this.setState({ beginningAmt: '' });
      return;
    }

    // check if there is a decimal
    startingBalance = this.getDecimal(startingBalance);

    let wholeNum = startingBalance.split('.');
    if (wholeNum.length === 1) {
      startingBalance += '.00';
    }

    this.setState({ startingBalance, beginningAmt: '' });

    this.calculateCurrentTotal(startingBalance, expenses);

  };

  resetStartingBalance = () => {
    let startingBalance = '0.00';
    let expenses = this.state.allExpenses;
    if (startingBalance === '') {
      return;
    }

    this.setState({ startingBalance, beginningAmt: '' });

    this.calculateCurrentTotal(startingBalance, expenses);
  }

  calculateCurrentTotal = (startingBalance, expenses) => {

    console.log(`currentExpenses: ${expenses}\nstartingBalance: ${startingBalance}`);

    let total = 0;

    expenses.forEach(expense => {
      if (expense.increase) {
        total = Number(total) + Number(expense.amount);
        console.log(total)
      }
      else {
        total = Number(total) - Number(expense.amount);
        console.log(total)
      }

    })

    total = Number(total) + Number(startingBalance);

    total = this.getDecimal(total);
    total = this.validateTotal(total);

    console.log(`total: ${total}`);

    this.setState({ totalExpenseAmt: total });


  }

  deleteExpense = (id) => {
    console.log(`delete expense id: ${id}`);
    let startingBalance = this.state.startingBalance;
    let expenses = [];

    this.state.allExpenses.map(expense => expenses.push(expense));

    console.log(`currentExpenses: ${expenses}\nstartingBalance: ${startingBalance}`);

    let newExpenses = expenses.filter(expense => expense.id !== id);

    console.log(`newExpenses: ${newExpenses}`);

    this.setState({ allExpenses: newExpenses });

    this.calculateCurrentTotal(startingBalance, newExpenses);

  }

  editExpense = (id) => {
    console.log(`edit expense id: ${id}`);
    let startingBalance = this.state.startingBalance;
    let expenses = [];

    this.state.allExpenses.map(expense => expenses.push(expense));

    let editExpense = expenses.filter(expense => expense.id === id);
    let newExpenses = expenses.filter(expense => expense.id !== id);


    this.setState({ allExpenses: newExpenses });
    this.setState({ desc: `${editExpense[0].desc}` });
    this.setState({ expenseAmt: `${editExpense[0].amount}` });

    this.calculateCurrentTotal(startingBalance, newExpenses);
  }



  render() {
    return (
      <div>
        <div className='container center'>
          <div className='row center' style={{ marginTop: 20, marginBottom: 0 }}>
            <div className='input-field col l4 m4 s6'>
              <input
                id="startingAmt"
                type='text'
                className='validate'
                value={this.state.beginningAmt}
                name='beginningAmt'
                onChange={this.handleInputChange}
                style={{ color: 'white', textShadow: '0px 0px 3px black', paddingLeft: 10 }}
              />
              <label htmlFor='startingAmt' style={{ color: 'white', paddingLeft: 10, textShadow: '0px 0px 15px black' }}>Starting amount</label>
            </div>
            <div className='col l4 m4 s6' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CurStart
                currentStart={this.state.startingBalance} />
            </div>
            <div className='col l4 m4 s12' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 15 }}>
              <Button
                class='waves-effect waves-light btn'
                onClick={this.setStartingBalance}
                text="set"
                icon={false}
                style={{ background: "#319e31" }}
              />
              <Button
                class='waves-effect waves-light btn'
                onClick={this.resetStartingBalance}
                text="reset"
                icon={false}
                style={{ background: "#319e31" }}
              />
            </div>
          </div>
        </div>


        <Total
          balance={this.state.totalExpenseAmt}
        />

        <div className='container' style={{ marginTop: '20px' }}>
          <div className='row'>
            <div className='input-field col l4 m4 s6'>
              <input
                id="description"
                type='text'
                className='validate'
                name='desc'
                value={this.state.desc}
                onChange={this.handleInputChange}
                style={{ color: 'white', textShadow: '0px 0px 3px black', paddingLeft: 10 }}
              />
              <label htmlFor='description' style={{ color: 'white', paddingLeft: 10, textShadow: '0px 0px 15px black' }}>Description</label>
            </div>
            <div className='input-field col l4 m4 s6'>
              <input
                id='moneyAmount'
                type='text'
                className='validate'
                name='expenseAmt'
                value={this.state.expenseAmt}
                onChange={this.handleInputChange}
                style={{ color: 'white', textShadow: '0px 0px 3px black', paddingLeft: 10 }}
              />
              <label htmlFor='moneyAmount' style={{ color: 'white', paddingLeft: 10, textShadow: '0px 0px 15px black' }}>Amount</label>
            </div>
            <div className='col l4 m4 s12' style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 15 }}>
              <IconButton
                class=' waves-effect waves-light btn'
                onClick={this.handlePlusClick}
                text="fas fa-plus"
                style={{ background: "#319e31" }}
              />
              <IconButton
                class=' waves-effect waves-light btn red'
                onClick={this.handleMinusClick}
                text="fas fa-minus"
              />
            </div>
          </div>
        </div>

        <div>
          <ul className="collection" style={{ marginLeft: 50, marginRight: 50 }}>
            {this.state.allExpenses.map(expense => {
              if (expense.desc === '') {
                expense.desc = 'No Description';
              }
              if (expense.increase) {
                return <Increase
                  key={expense.id}
                  delete={this.deleteExpense}
                  edit={this.editExpense}
                  id={expense.id}
                  desc={expense.desc}
                  amount={expense.amount}
                  date={expense.date}
                />
              }
              else {
                return <Decrease
                  key={expense.id}
                  delete={this.deleteExpense}
                  edit={this.editExpense}
                  id={expense.id}
                  desc={expense.desc}
                  amount={expense.amount}
                  date={expense.date}
                />
              }
            })}
          </ul>
        </div>

      </div>
    )
  }
}

export default Main;