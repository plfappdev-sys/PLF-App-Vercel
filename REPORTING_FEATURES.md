# PLF App - Reporting Features Documentation

## Overview

The PLF (Provident and Loan Fund) application now includes comprehensive reporting functionality that allows users to generate various financial reports in multiple formats.

## Available Reports

### 1. Fund Financial Summary
- **Type**: Financial
- **Description**: Comprehensive financial overview of the fund including total assets, liabilities, member contributions, and loan portfolio status
- **Export Formats**: HTML/PDF, CSV
- **Parameters**: None (system-wide report)

### 2. Member Standing Report  
- **Type**: Member
- **Description**: Detailed report on individual member financial standings including contributions, loans, and account balance
- **Export Formats**: HTML/PDF, CSV
- **Parameters**: Member selection

### 3. Transaction History
- **Type**: Transaction
- **Description**: Complete transaction audit trail with filtering capabilities
- **Export Formats**: HTML/PDF, CSV
- **Parameters**: Date range, transaction type (deposit/withdrawal/all)

### 4. Monthly Contributions
- **Type**: Financial
- **Description**: Monthly contribution analysis and trends
- **Export Formats**: HTML/PDF, CSV
- **Parameters**: Date range

### 5. Loan Portfolio
- **Type**: Financial
- **Description**: Loan disbursements and repayments analysis
- **Export Formats**: HTML/PDF, CSV
- **Parameters**: Date range

### 6. Member Analytics
- **Type**: Analytics
- **Description**: Member growth and engagement analytics
- **Export Formats**: HTML/PDF
- **Parameters**: None (system-wide report)

## Technical Implementation

### Key Components

1. **ReportService** (`src/services/ReportService.ts`)
   - Core service for generating report data
   - Supports multiple report types with mock data
   - CSV export functionality

2. **PDFReportGenerator** (`src/services/PDFReportGenerator.ts`)
   - Generates professional HTML reports that can be converted to PDF
   - Responsive design for both web and print

3. **File Download Utilities** (`src/utils/fileDownload.ts`)
   - Cross-platform file download functionality
   - Supports web and React Native environments
   - Automatic filename generation with timestamps

4. **ReportsScreen** (`src/screens/ReportsScreen.tsx`)
   - User interface for report selection and generation
   - Modal-based parameter selection
   - Date pickers and member selection

### Features

- **Date Range Selection**: Interactive date pickers for transaction-based reports
- **Member Selection**: Dropdown menu for member-specific reports
- **Transaction Type Filtering**: Filter by deposit, withdrawal, or all transactions
- **Multiple Export Formats**: PDF (HTML) and CSV formats
- **Professional Styling**: Clean, professional report formatting
- **Responsive Design**: Works on both mobile and web platforms

### Usage

1. Navigate to the "Reports & Analytics" screen
2. Select a report type from the available options
3. Configure report parameters (date range, member selection, etc.)
4. Choose export format (PDF or CSV)
5. Download the generated report

### File Naming Convention

Reports are automatically named using the pattern:
```
PLF_{report_type}_{YYYYMMDD}.{extension}
```

Example: `PLF_fund_status_20250913.html`

## Testing

A test script is available at `src/utils/testReporting.js` to verify all reporting functionality:

```bash
node src/utils/testReporting.js
```

## Dependencies

- `@react-native-community/datetimepicker`: For date selection UI
- `react-native-paper`: For UI components and theming
- Built-in React Native APIs for file handling

## Future Enhancements

- Real data integration with backend services
- Scheduled report generation
- Email report delivery
- Advanced filtering options
- Chart visualizations in reports
- Multi-format export (Excel, JSON)
- Report templates customization
