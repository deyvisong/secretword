function simulateInvestmentWithDividendsAndGrowth(
  initialCapital,
  monthlyContribution,
  dividendYieldMin,
  dividendYieldMax,
  annualGrowthMin,
  annualGrowthMax,
  numCompanies,
  paymentsPerYear,
  years
) {
  let capital = initialCapital;
  const daysInYear = 365;
  const dailyGrowthRateMin = Math.pow(1 + annualGrowthMin, 1 / daysInYear) - 1;
  const dailyGrowthRateMax = Math.pow(1 + annualGrowthMax, 1 / daysInYear) - 1;

  let totalDividends = 0;
  let dividendYield = (dividendYieldMin + dividendYieldMax) / 2; // Média do Dividend Yield entre 5-7%

  // Calcular o dividendo diário médio considerando 20 empresas
  let dailyDividend =
    ((dividendYield / 100) * capital) / numCompanies / daysInYear;

  // A cada 4 meses (3 vezes ao ano), os dividendos são pagos
  const paymentInterval = daysInYear / paymentsPerYear;

  for (let day = 0; day < years * daysInYear; day++) {
    // Reinvestir dividendos diários
    capital += dailyDividend;
    totalDividends += dailyDividend;

    // Crescimento diário composto das ações (com base nas taxas mínimas e máximas)
    capital += (capital * (dailyGrowthRateMin + dailyGrowthRateMax)) / 2;

    // A cada 4 meses, um pagamento de dividendos ocorre, o capital é ajustado
    if (day % paymentInterval === 0) {
      capital += dailyDividend * paymentInterval; // Reinvestir todos os dividendos pagos
    }

    // Ajuste de dividendos, pois o capital aumenta com o tempo
    dailyDividend =
      ((capital / initialCapital) * (dividendYield / 100)) /
      numCompanies /
      daysInYear;

    // Adiciona aporte mensal de €200 a cada 30 dias
    if (day % 30 === 0) {
      capital += monthlyContribution;
    }
  }

  return {
    finalCapital: capital.toFixed(2),
    totalDividends: totalDividends.toFixed(2),
  };
}

// Configurações para o exemplo
const initialCapital = 1000; // Capital inicial (€)
const monthlyContribution = 200; // Aportes mensais (€)
const dividendYieldMin = 5; // Dividend Yield mínimo (5%)
const dividendYieldMax = 7; // Dividend Yield máximo (7%)
const annualGrowthMin = 0.1; // Crescimento anual mínimo (10%)
const annualGrowthMax = 0.15; // Crescimento anual máximo (15%)
const numCompanies = 20; // Número de empresas
const paymentsPerYear = 3; // Pagamento de dividendos 3x por ano
const years = 10; // Período de 10 anos

const results = simulateInvestmentWithDividendsAndGrowth(
  initialCapital,
  monthlyContribution,
  dividendYieldMin,
  dividendYieldMax,
  annualGrowthMin,
  annualGrowthMax,
  numCompanies,
  paymentsPerYear,
  years
);

console.log(`Capital Final após ${years} anos: €${results.finalCapital}`);
console.log(`Total de Dividendos Recebidos: €${results.totalDividends}`);
