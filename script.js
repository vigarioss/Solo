// Função para categorizar automaticamente as transações
  const categorizeTransaction = (description) => {
    const categories = {
      'supermercado': 'Alimentação',
      'salário': 'Receita',
      'energia': 'Utilities',
      'internet': 'Utilities',
      'restaurante': 'Alimentação',
      'transporte': 'Transporte',
      'lazer': 'Lazer',
    };
  
    const desc = description.toLowerCase();
  
    for (const keyword in categories) {
      if (desc.includes(keyword)) {
        return categories[keyword];
      }
    }
    return 'Outros'; // Categoria padrão
  };
  
  // Função para adicionar transações
  const addTransaction = (date, description, amount) => {
    const category = categorizeTransaction(description);
    const transaction = {
      date: date,
      description: description,
      amount: amount,
      category: category
    };
  
    const transactionsRef = database.ref('transacoes');
    transactionsRef.push(transaction);  // Adiciona no Firebase
  };
  
  // Função para recuperar e exibir transações
  const fetchTransactions = () => {
    const transactionsList = document.querySelector('.transactions-list');
    const transactionsRef = database.ref('transacoes'); 
  
    transactionsRef.on('value', (snapshot) => {
      transactionsList.innerHTML = ''; 
      const transactions = snapshot.val(); 
  
      if (transactions) {
        Object.keys(transactions).forEach(key => {
          const transaction = transactions[key];
          const transactionEl = document.createElement('div');
          transactionEl.className = 'transaction-item';
          transactionEl.innerHTML = `
            <span>${new Date(transaction.date).toLocaleDateString()}: ${transaction.description}</span>
            <span style="color: ${transaction.amount > 0 ? 'green' : 'red'}">
              R$ ${Math.abs(transaction.amount).toFixed(2)}
            </span>
          `;
          transactionsList.appendChild(transactionEl);
        });
      }
    });
  };
  
  // Função para monitorar o orçamento
  const monitorBudget = () => {
    const budgets = {
      'Alimentação': 1000,
      'Transporte': 300,
      'Lazer': 500,
      'Utilities': 200,
      'Outros': 100,
    };
  
    const transactionsRef = database.ref('transacoes');
    transactionsRef.on('value', (snapshot) => {
      const transactions = snapshot.val();
      const spending = { 'Alimentação': 0, 'Transporte': 0, 'Lazer': 0, 'Utilities': 0, 'Outros': 0 };
  
      if (transactions) {
        Object.keys(transactions).forEach(key => {
          const transaction = transactions[key];
          const category = transaction.category;
          if (spending[category] !== undefined) {
            spending[category] += transaction.amount;
          }
        });
      }
  
      for (const category in spending) {
        const budget = budgets[category];
        if (spending[category] > budget) {
          alert(`Você ultrapassou o orçamento de ${category}!`);
        }
      }
    });
  };
  
  monitorBudget();  // Inicia o monitoramento de orçamentos
  
  // Função para gerar relatório financeiro detalhado
  const generateReport = () => {
    const transactionsRef = database.ref('transacoes');
    transactionsRef.once('value', (snapshot) => {
      const transactions = snapshot.val();
      const report = { 'Alimentação': 0, 'Transporte': 0, 'Lazer': 0, 'Utilities': 0, 'Outros': 0 };
  
      if (transactions) {
        Object.keys(transactions).forEach(key => {
          const transaction = transactions[key];
          const category = transaction.category;
          if (report[category] !== undefined) {
            report[category] += transaction.amount;
          }
        });
      }
  
      console.log('Relatório de Gastos:');
      for (const category in report) {
        console.log(`${category}: R$ ${report[category].toFixed(2)}`);
      }
    });
  };
  
  generateReport();  // Gera o relatório ao carregar a página
  