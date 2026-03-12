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
            position: relative;
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
        .plf-logo {
            position: absolute;
            top: 10px;
            left: 20px;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #6200EE 0%, #3700B3 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 24px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .plf-logo-text {
            font-size: 14px;
            margin-top: 5px;
            color: #666;
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
        <div class="plf-logo">PLF</div>
        <h1>${reportData.title}</h1>
        <div class="subtitle">Comprehensive Fund Status and Financial Overview</div>
        <div class="plf-logo-text">People's Liberator Fund</div>
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
            position: relative;
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
        .plf-logo {
            position: absolute;
            top: 10px;
            left: 20px;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #6200EE 0%, #3700B3 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 24px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .plf-logo-text {
            font-size: 14px;
            margin-top: 5px;
            color: #666;
        }
        .member-info {
            background: #