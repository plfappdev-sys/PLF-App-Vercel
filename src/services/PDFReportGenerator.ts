import { ReportData } from './ReportService';

export class PDFReportGenerator {
  // Generate HTML content for Fund Status Report
  static generateFundStatusHTML(reportData: ReportData): string {
    const data = reportData.data;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.title}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #6200EE;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #6200EE;
            margin: 0;
            font-size: 28px;
        }
        .header .subtitle {
            color: #666;
            margin: 10px 0;
            font-size: 16px;
        }
        .report-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .report-info table {
            width: 100%;
            border-collapse: collapse;
        }
        .report-info td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        .report-info td:first-child {
            font-weight: bold;
            width: 150px;
        }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #6200EE;
            border-bottom: 2px solid #6200EE;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .metric-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
            color: #6200EE;
            margin-bottom: 5px;
        }
        .metric-label {
            color: #666;
            font-size: 14px;
        }
        .standing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .standing-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        .standing-card.good { border-left: 4px solid #4CAF50; }
        .standing-card.owing-10 { border-left: 4px solid #FF9800; }
        .standing-card.owing-20 { border-left: 4px solid #FF5722; }
        .standing-card.owing-30 { border-left: 4px solid #F44336; }
        .standing-card.owing-50 { border-left: 4px solid #9C27B0; }
        .standing-card.owing-65 { border-left: 4px solid #673AB7; }
        .standing-card.owing-65-plus { border-left: 4px solid #000; }
        .transaction-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .transaction-table th,
        .transaction-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .transaction-table th {
            background: #6200EE;
            color: white;
            font-weight: bold;
        }
        .transaction-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        .amount {
            font-weight: bold;
            text-align: right;
        }
        .amount.positive { color: #4CAF50; }
        .amount.negative { color: #F44336; }
        .status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status.approved { background: #4CAF50; color: white; }
        .status.pending { background: #FF9800; color: white; }
        .status.rejected { background: #F44336; color: white; }
        .trends-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
        @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${reportData.title}</h1>
        <div class="subtitle">Comprehensive Fund Status and Financial Overview</div>
    </div>

    <div class="report-info">
        <table>
            <tr>
                <td>Report Generated:</td>
                <td>${reportData.generatedDate.toLocaleDateString('en-ZA', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</td>
            </tr>
            <tr>
                <td>Generated By:</td>
                <td>${reportData.generatedBy}</td>
            </tr>
            <tr>
                <td>Report Type:</td>
                <td>Fund Status Report</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h2>Fund Overview</h2>
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-value">R ${data.fundOverview.totalFundValue.toLocaleString('en-ZA')}</div>
                <div class="metric-label">Total Fund Value</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${data.fundOverview.totalMembers}</div>
                <div class="metric-label">Total Members</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${data.fundOverview.activeMembers}</div>
                <div class="metric-label">Active Members</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">R ${data.fundOverview.totalContributions.toLocaleString('en-ZA')}</div>
                <div class="metric-label">Total Contributions</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">R ${data.fundOverview.totalDisbursements.toLocaleString('en-ZA')}</div>
                <div class="metric-label">Total Disbursements</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">R ${data.fundOverview.availableFunds.toLocaleString('en-ZA')}</div>
                <div class="metric-label">Available Funds</div>
            </div>
            <div class="metric-card">
                <div class="metric-value ${data.fundOverview.netCashFlow >= 0 ? 'positive' : 'negative'}">
                    R ${data.fundOverview.netCashFlow.toLocaleString('en-ZA')}
                </div>
                <div class="metric-label">Net Cash Flow</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Member Standing Breakdown</h2>
        <div class="standing-grid">
            <div class="standing-card good">
                <div class="metric-value">${data.memberBreakdown.goodStanding}</div>
                <div class="metric-label">Good Standing</div>
            </div>
            <div class="standing-card owing-10">
                <div class="metric-value">${data.memberBreakdown.owing10Percent}</div>
                <div class="metric-label">Owing 10%</div>
            </div>
            <div class="standing-card owing-20">
                <div class="metric-value">${data.memberBreakdown.owing20Percent}</div>
                <div class="metric-label">Owing 20%</div>
            </div>
            <div class="standing-card owing-30">
                <div class="metric-value">${data.memberBreakdown.owing30Percent}</div>
                <div class="metric-label">Owing 30%</div>
            </div>
            <div class="standing-card owing-50">
                <div class="metric-value">${data.memberBreakdown.owing50Percent}</div>
                <div class="metric-label">Owing 50%</div>
            </div>
            <div class="standing-card owing-65">
                <div class="metric-value">${data.memberBreakdown.owing65Percent}</div>
                <div class="metric-label">Owing 65%</div>
            </div>
            <div class="standing-card owing-65-plus">
                <div class="metric-value">${data.memberBreakdown.owing65Plus}</div>
                <div class="metric-label">Owing 65%+</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Recent Deposit Activity</h2>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Member</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.recentActivity.recentDeposits.slice(0, 10).map((t: any) => `
                    <tr>
                        <td>${new Date(t.date).toLocaleDateString('en-ZA')}</td>
                        <td>${t.memberNumber}</td>
                        <td class="amount positive">R ${t.amount.toLocaleString('en-ZA')}</td>
                        <td><span class="status ${t.status}">${t.status.toUpperCase()}</span></td>
                        <td>${t.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    ${data.recentActivity.recentDisbursements.length > 0 ? `
    <div class="section">
        <h2>Recent Disbursement Activity</h2>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Member</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.recentActivity.recentDisbursements.slice(0, 10).map((t: any) => `
                    <tr>
                        <td>${new Date(t.date).toLocaleDateString('en-ZA')}</td>
                        <td>${t.memberNumber}</td>
                        <td class="amount negative">R ${t.amount.toLocaleString('en-ZA')}</td>
                        <td><span class="status ${t.status}">${t.status.toUpperCase()}</span></td>
                        <td>${t.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    ` : ''}

    ${data.recentActivity.pendingTransactions.length > 0 ? `
    <div class="section">
        <h2>Pending Transactions (${data.recentActivity.pendingTransactions.length})</h2>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Member</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.recentActivity.pendingTransactions.slice(0, 15).map((t: any) => `
                    <tr>
                        <td>${new Date(t.date).toLocaleDateString('en-ZA')}</td>
                        <td>${t.memberNumber}</td>
                        <td>${t.type.toUpperCase()}</td>
                        <td class="amount">R ${t.amount.toLocaleString('en-ZA')}</td>
                        <td>${t.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>
    ` : ''}

    <div class="section">
        <h2>Financial Trends (Last 6 Months)</h2>
        <div class="trends-section">
            <h3>Monthly Contributions</h3>
            <table class="transaction-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.financialTrends.monthlyContributions.map((m: any) => `
                        <tr>
                            <td>${m.month}</td>
                            <td class="amount positive">R ${m.amount.toLocaleString('en-ZA')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h3>Member Growth</h3>
            <table class="transaction-table">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Total Members</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.financialTrends.memberGrowth.map((m: any) => `
                        <tr>
                            <td>${m.month}</td>
                            <td class="amount">${m.count}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>

    <div class="footer">
        <p>This report was generated automatically by the People's Liberator Fund Management System.</p>
        <p>For questions or concerns, please contact the fund administrators.</p>
        <p>Generated on ${reportData.generatedDate.toLocaleDateString('en-ZA')} at ${reportData.generatedDate.toLocaleTimeString('en-ZA')}</p>
    </div>
</body>
</html>`;
  }

  // Generate HTML content for Member Statement Report
  static generateMemberStatementHTML(reportData: ReportData): string {
    const data = reportData.data;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.title}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #6200EE;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #6200EE;
            margin: 0;
            font-size: 28px;
        }
        .header .subtitle {
            color: #666;
            margin: 10px 0;
            font-size: 16px;
        }
        .member-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .info-section h3 {
            color: #6200EE;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
        }
        .info-table td {
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
        }
        .info-table td:first-child {
            font-weight: bold;
            width: 40%;
        }
        .financial-summary {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .financial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .financial-card {
            text-align: center;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #f8f9fa;
        }
        .financial-value {
            font-size: 20px;
            font-weight: bold;
            color: #6200EE;
            margin-bottom: 5px;
        }
        .financial-label {
            color: #666;
            font-size: 14px;
        }
        .standing-indicator {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            margin-top: 10px;
        }
        .standing-good { background: #4CAF50; color: white; }
        .standing-owing { background: #FF9800; color: white; }
        .standing-risk { background: #F44336; color: white; }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #6200EE;
            border-bottom: 2px solid #6200EE;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .transaction-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .transaction-table th,
        .transaction-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .transaction-table th {
            background: #6200EE;
            color: white;
            font-weight: bold;
        }
        .transaction-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        .amount {
            font-weight: bold;
            text-align: right;
        }
        .amount.deposit { color: #4CAF50; }
        .amount.disbursement { color: #F44336; }
        .status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status.approved { background: #4CAF50; color: white; }
        .status.pending { background: #FF9800; color: white; }
        .status.rejected { background: #F44336; color: white; }
        .contribution-chart {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
        @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${reportData.title}</h1>
        <div class="subtitle">Personal Financial Statement and Transaction History</div>
    </div>

    <div class="member-info">
        <div class="info-section">
            <h3>Personal Information</h3>
            <table class="info-table">
                <tr>
                    <td>Full Name:</td>
                    <td>${data.personalInfo.fullName}</td>
                </tr>
                <tr>
                    <td>Member Number:</td>
                    <td>${data.personalInfo.memberNumber}</td>
                </tr>
                <tr>
                    <td>Contact:</td>
                    <td>${data.personalInfo.contactInfo}</td>
                </tr>
                <tr>
                    <td>Join Date:</td>
                    <td>${new Date(data.personalInfo.joinDate).toLocaleDateString('en-ZA')}</td>
                </tr>
            </table>
        </div>
        
        <div class="info-section">
            <h3>Report Information</h3>
            <table class="info-table">
                <tr>
                    <td>Generated:</td>
                    <td>${reportData.generatedDate.toLocaleDateString('en-ZA')}</td>
                </tr>
                <tr>
                    <td>Generated By:</td>
                    <td>${reportData.generatedBy}</td>
                </tr>
                <tr>
                    <td>Report Type:</td>
                    <td>Member Statement</td>
                </tr>
                <tr>
                    <td>Standing:</td>
                    <td>
                        <span class="standing-indicator ${data.financialSummary.standingCategory === 'good' ? 'standing-good' : 
                            data.financialSummary.standingCategory.includes('owing') ? 'standing-owing' : 'standing-risk'}">
                            ${data.financialSummary.standingCategory.replace('_', ' ').toUpperCase()}
                        </span>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div class="section">
        <h2>Financial Summary</h2>
        <div class="financial-summary">
            <div class="financial-grid">
                <div class="financial-card">
                    <div class="financial-value">R ${data.financialSummary.currentBalance.toLocaleString('en-ZA')}</div>
                    <div class="financial-label">Current Balance</div>
                </div>
                <div class="financial-card">
                    <div class="financial-value">R ${data.financialSummary.totalContributions.toLocaleString('en-ZA')}</div>
                    <div class="financial-label">Total Contributions</div>
                </div>
                <div class="financial-card">
                    <div class="financial-value">R ${data.financialSummary.totalDisbursements.toLocaleString('en-ZA')}</div>
                    <div class="financial-label">Total Disbursements</div>
                </div>
                <div class="financial-card">
                    <div class="financial-value">R ${data.financialSummary.outstandingAmount.toLocaleString('en-ZA')}</div>
                    <div class="financial-label">Outstanding Amount</div>
                </div>
                <div class="financial-card">
                    <div class="financial-value">${data.financialSummary.percentageOutstanding.toFixed(1)}%</div>
                    <div class="financial-label">Percentage Outstanding</div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Transaction History</h2>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.transactionHistory.map((t: any) => `
                    <tr>
                        <td>${new Date(t.date).toLocaleDateString('en-ZA')}</td>
                        <td>${t.type.toUpperCase()}</td>
                        <td class="amount ${t.type}">R ${t.amount.toLocaleString('en-ZA')}</td>
                        <td><span class="status ${t.status}">${t.status.toUpperCase()}</span></td>
                        <td>${t.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Contribution History</h2>
        <div class="contribution-chart">
            <table class="transaction-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Contribution Amount</th>
                        <th>Cumulative Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.contributionHistory.map((c: any) => `
                        <tr>
                            <td>${new Date(c.date).toLocaleDateString('en-ZA')}</td>
                            <td class="amount deposit">R ${c.amount.toLocaleString('en-ZA')}</td>
                            <td class="amount">R ${c.cumulativeTotal.toLocaleString('en-ZA')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>

    <div class="section">
        <h2>Standing History</h2>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Standing</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                ${data.standingHistory.map((s: any) => `
                    <tr>
                        <td>${new Date(s.date).toLocaleDateString('en-ZA')}</td>
                        <td>
                            <span class="standing-indicator ${s.standing === 'good' ? 'standing-good' : 
                                s.standing.includes('owing') ? 'standing-owing' : 'standing-risk'}">
                                ${s.standing.replace('_', ' ').toUpperCase()}
                            </span>
                        </td>
                        <td>${s.notes}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p><strong>Important Notice:</strong> This statement reflects your account status as of ${reportData.generatedDate.toLocaleDateString('en-ZA')}.</p>
        <p>For any discrepancies or questions regarding this statement, please contact the fund administrators immediately.</p>
        <p>This is an official document of the People's Liberator Fund.</p>
        <p>Generated on ${reportData.generatedDate.toLocaleDateString('en-ZA')} at ${reportData.generatedDate.toLocaleTimeString('en-ZA')}</p>
    </div>
</body>
</html>`;
  }

  // Generate HTML content for Transaction Report
  static generateTransactionReportHTML(reportData: ReportData): string {
    const data = reportData.data;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${reportData.title}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #6200EE;
            padding: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #6200EE;
            margin: 0;
            font-size: 24px;
        }
        .header .subtitle {
            color: #666;
            margin: 10px 0;
            font-size: 16px;
        }
        .report-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .summary-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
        }
        .summary-value {
            font-size: 20px;
            font-weight: bold;
            color: #6200EE;
            margin-bottom: 5px;
        }
        .summary-label {
            color: #666;
            font-size: 14px;
        }
        .transaction-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .transaction-table th,
        .transaction-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        .transaction-table th {
            background: #6200EE;
            color: white;
            font-weight: bold;
        }
        .transaction-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        .amount {
            font-weight: bold;
            text-align: right;
        }
        .amount.deposit { color: #4CAF50; }
        .amount.loan_repayment { color: #F44336; }
        .status {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status.approved { background: #4CAF50; color: white; }
        .status.pending { background: #FF9800; color: white; }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${reportData.title}</h1>
        <div class="subtitle">Transaction Analysis Report</div>
    </div>

    <div class="report-info">
        <p><strong>Date Range:</strong> ${new Date(data.dateRange.startDate).toLocaleDateString('en-ZA')} to ${new Date(data.dateRange.endDate).toLocaleDateString('en-ZA')}</p>
        <p><strong>Transaction Type:</strong> ${data.transactionType || 'All Types'}</p>
        <p><strong>Generated:</strong> ${reportData.generatedDate.toLocaleDateString('en-ZA')}</p>
        <p><strong>Generated By:</strong> ${reportData.generatedBy}</p>
    </div>

    <div class="summary-grid">
        <div class="summary-card">
            <div class="summary-value">${data.summary.totalTransactions}</div>
            <div class="summary-label">Total Transactions</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">R ${data.summary.totalAmount.toLocaleString('en-ZA')}</div>
            <div class="summary-label">Total Amount</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${data.summary.approvedTransactions}</div>
            <div class="summary-label">Approved</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">R ${data.summary.approvedAmount.toLocaleString('en-ZA')}</div>
            <div class="summary-label">Approved Amount</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${data.summary.pendingTransactions}</div>
            <div class="summary-label">Pending</div>
        </div>
    </div>

    <div class="section">
        <h2>Transaction Details</h2>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Member</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${data.transactions.map((t: any) => `
                    <tr>
                        <td>${new Date(t.date).toLocaleDateString('en-ZA')}</td>
                        <td>${t.memberNumber}</td>
                        <td>${t.type.toUpperCase()}</td>
                        <td class="amount ${t.type}">R ${t.amount.toLocaleString('en-ZA')}</td>
                        <td><span class="status ${t.status}">${t.status.toUpperCase()}</span></td>
                        <td>${t.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="footer">
        <p>This report contains ${data.transactions.length} transactions for the specified period.</p>
        <p>Generated by the People's Liberator Fund Management System.</p>
    </div>
</body>
</html>`;
  }

  // Convert HTML to PDF (placeholder - would use a library like Puppeteer in real implementation)
  static async generatePDF(htmlContent: string, filename: string): Promise<string> {
    // In a real implementation, this would use a library like Puppeteer or jsPDF
    // For now, we'll return the HTML content and suggest using browser print functionality
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // This would typically save to device storage or trigger download
    console.log(`PDF would be generated for: ${filename}`);
    console.log(`HTML content length: ${htmlContent.length} characters`);
    
    return url;
  }
}
