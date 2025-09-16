import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Modal, TouchableOpacity, Platform } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  List,
  Chip,
  ActivityIndicator,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  Menu,
  Divider
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMockAuth } from '../contexts/MockAuthContext';
import { ReportService } from '../services/ReportService';
import { PDFReportGenerator } from '../services/PDFReportGenerator';
import { downloadHTMLReport, downloadCSVReport, generateReportFilename } from '../utils/fileDownload';
import RealMemberService from '../services/RealMemberService';

interface Report {
  id: string;
  title: string;
  type: 'financial' | 'member' | 'transaction' | 'analytics';
  description: string;
  icon: string;
  lastGenerated?: Date;
}

const ReportsScreen: React.FC = () => {
  const { currentUser } = useMockAuth();
  const [generating, setGenerating] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'financial' | 'member' | 'transaction' | 'analytics'>('all');
  
  // Report generation state
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');
  const [transactionType, setTransactionType] = useState<string>('all');
  const [availableMembers, setAvailableMembers] = useState<Array<{memberNumber: string, name: string}>>([]);

  // Available reports
  const reports: Report[] = [
    {
      id: '1',
      title: 'Fund Financial Summary',
      type: 'financial',
      description: 'Comprehensive financial overview of the fund',
      icon: 'chart-pie',
      lastGenerated: new Date('2025-09-10')
    },
    {
      id: '2',
      title: 'Member Standing Report',
      type: 'member',
      description: 'Detailed report on member financial standings',
      icon: 'account-group',
      lastGenerated: new Date('2025-09-11')
    },
    {
      id: '3',
      title: 'Transaction History',
      type: 'transaction',
      description: 'Complete transaction audit trail',
      icon: 'history',
      lastGenerated: new Date('2025-09-12')
    },
    {
      id: '4',
      title: 'Monthly Contributions',
      type: 'financial',
      description: 'Monthly contribution analysis and trends',
      icon: 'cash-multiple',
      lastGenerated: new Date('2025-09-05')
    },
    {
      id: '5',
      title: 'Loan Portfolio',
      type: 'financial',
      description: 'Loan disbursements and repayments analysis',
      icon: 'bank-transfer',
      lastGenerated: new Date('2025-09-08')
    },
    {
      id: '6',
      title: 'Member Analytics',
      type: 'analytics',
      description: 'Member growth and engagement analytics',
      icon: 'chart-line',
      lastGenerated: new Date('2025-09-09')
    },
    {
      id: '7',
      title: 'Interest Earned Report',
      type: 'financial',
      description: 'Detailed report on interest earned by members',
      icon: 'trending-up',
      lastGenerated: new Date('2025-09-14')
    },
    {
      id: '8',
      title: 'Interest Charged Report',
      type: 'financial',
      description: 'Detailed report on interest charged on loans',
      icon: 'trending-down',
      lastGenerated: new Date('2025-09-14')
    },
    {
      id: '9',
      title: 'Interest Statement',
      type: 'member',
      description: 'Individual member interest statement',
      icon: 'file-document',
      lastGenerated: new Date('2025-09-14')
    },
    {
      id: '10',
      title: 'Fund Interest Summary',
      type: 'financial',
      description: 'Comprehensive fund-wide interest analysis',
      icon: 'chart-pie',
      lastGenerated: new Date('2025-09-14')
    }
  ];

  const filteredReports = selectedType === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedType);

  const generateReport = async (reportId: string) => {
    setGenerating(reportId);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would generate and download the report
      console.log(`Generated report: ${reportId}`);
      
      // Show success message (in real app, this would download the file)
      alert('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGenerating(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return '#2196F3';
      case 'member': return '#4CAF50';
      case 'transaction': return '#FF9800';
      case 'analytics': return '#9C27B0';
      default: return '#666';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'financial': return 'Financial';
      case 'member': return 'Member';
      case 'transaction': return 'Transaction';
      case 'analytics': return 'Analytics';
      default: return type;
    }
  };

  // Handle report selection
  const handleReportSelection = (report: Report) => {
    setSelectedReport(report);
    setShowReportModal(true);
    
    // Reset parameters
    setStartDate(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    setEndDate(new Date());
    setSelectedMember('');
    setTransactionType('all');
    
    // Load available members for member reports
    if (report.type === 'member') {
      loadAvailableMembers();
    }
  };

  // State for member menu visibility
  const [showMemberMenu, setShowMemberMenu] = useState(false);

  // Load available members for selection
  const loadAvailableMembers = async () => {
    try {
      // Get real member data from RealMemberService
      const members = await RealMemberService.getAllMembers();
      const availableMembersList = members.map(member => ({
        memberNumber: member.memberNumber,
        name: member.personalInfo?.fullName || `Member ${member.memberNumber}`
      }));
      setAvailableMembers(availableMembersList);
    } catch (error) {
      console.error('Error loading members:', error);
      // Fallback to mock data if real data fails - use actual member numbers from real data
      const members = [
        { memberNumber: 'Member 6', name: 'Christopher Naude (Mock)' },
        { memberNumber: 'Member 24', name: 'Jeffrey Matlou (Mock)' },
        { memberNumber: 'Member 25', name: 'Jonas Letlhaku (Mock)' },
        { memberNumber: 'Member 54', name: 'Naomi Mokhine (Mock)' },
        { memberNumber: 'Member 55', name: 'Nicholas Molale (Mock)' },
        { memberNumber: 'Member 66', name: 'Refilwe Lentswe (Mock)' },
      ];
      setAvailableMembers(members);
    }
  };

  // Generate report with parameters
  const generateReportWithParams = async () => {
    if (!selectedReport) return;
    
    setGenerating(selectedReport.id);
    try {
      let reportData;
      const generatedBy = currentUser?.email || 'Unknown User';
      
      switch (selectedReport.id) {
        case '1': // Fund Status Report
          reportData = await ReportService.generateFundStatusReport(generatedBy);
          break;
        
        case '2': // Member Statement Report
          if (!selectedMember) {
            alert('Please select a member for this report.');
            return;
          }
          reportData = await ReportService.generateMemberStatementReport(selectedMember, generatedBy);
          break;
        
        case '3': // Transaction Report
          reportData = await ReportService.generateTransactionReport(
            startDate,
            endDate,
            transactionType === 'all' ? undefined : transactionType as any,
            generatedBy
          );
          break;
        
        case '6': // Standing Analysis Report
          reportData = await ReportService.generateStandingAnalysisReport(generatedBy);
          break;
        
        case '7': // Interest Earned Report
          reportData = await ReportService.generateInterestEarnedReport(
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        case '8': // Interest Charged Report
          reportData = await ReportService.generateInterestChargedReport(
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        case '9': // Member Interest Statement
          if (!selectedMember) {
            alert('Please select a member for this report.');
            return;
          }
          reportData = await ReportService.generateMemberInterestStatement(
            selectedMember,
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        case '10': // Fund Interest Summary Report
          reportData = await ReportService.generateFundInterestSummaryReport(
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        default:
          alert('This report type is not yet implemented.');
          return;
      }

      // Generate and download PDF based on report type
      let htmlContent: string;
      switch (reportData.reportType) {
        case 'fund_status':
          htmlContent = PDFReportGenerator.generateFundStatusHTML(reportData);
          break;
        case 'member_statement':
          htmlContent = PDFReportGenerator.generateMemberStatementHTML(reportData);
          break;
        case 'transaction_report':
          htmlContent = PDFReportGenerator.generateTransactionReportHTML(reportData);
          break;
        case 'standing_analysis':
          // For standing analysis, use fund status template as fallback
          htmlContent = PDFReportGenerator.generateFundStatusHTML(reportData);
          break;
        case 'interest_earned':
          htmlContent = PDFReportGenerator.generateInterestEarnedHTML(reportData);
          break;
        case 'interest_charged':
          htmlContent = PDFReportGenerator.generateInterestChargedHTML(reportData);
          break;
        case 'member_interest_statement':
          htmlContent = PDFReportGenerator.generateMemberInterestStatementHTML(reportData);
          break;
        case 'fund_interest_summary':
          // Use interest earned template as fallback for fund interest summary
          htmlContent = PDFReportGenerator.generateInterestEarnedHTML(reportData);
          break;
        default:
          throw new Error(`Unsupported report type: ${reportData.reportType}`);
      }
      const filename = generateReportFilename(reportData.reportType, '.html');
      await downloadHTMLReport(htmlContent, filename);
      
      // Update last generated date
      const updatedReports = reports.map(r => 
        r.id === selectedReport.id ? { ...r, lastGenerated: new Date() } : r
      );
      // In a real app, you would update state with updatedReports
      
      setShowReportModal(false);
      alert(`${selectedReport.title} has been generated and downloaded successfully!`);
      
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGenerating(null);
    }
  };

  // Export to CSV
  const exportToCSV = async () => {
    if (!selectedReport) return;
    
    setGenerating(`${selectedReport.id}-csv`);
    try {
      let reportData;
      const generatedBy = currentUser?.email || 'Unknown User';
      
      switch (selectedReport.id) {
        case '1': // Fund Status Report
          reportData = await ReportService.generateFundStatusReport(generatedBy);
          break;
        
        case '2': // Member Statement Report
          if (!selectedMember) {
            alert('Please select a member for this report.');
            return;
          }
          reportData = await ReportService.generateMemberStatementReport(selectedMember, generatedBy);
          break;
        
        case '3': // Transaction Report
          reportData = await ReportService.generateTransactionReport(
            startDate,
            endDate,
            transactionType === 'all' ? undefined : transactionType as any,
            generatedBy
          );
          break;
        
        case '6': // Standing Analysis Report
          reportData = await ReportService.generateStandingAnalysisReport(generatedBy);
          break;
        
        case '7': // Interest Earned Report
          reportData = await ReportService.generateInterestEarnedReport(
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        case '8': // Interest Charged Report
          reportData = await ReportService.generateInterestChargedReport(
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        case '9': // Member Interest Statement
          if (!selectedMember) {
            alert('Please select a member for this report.');
            return;
          }
          reportData = await ReportService.generateMemberInterestStatement(
            selectedMember,
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        case '10': // Fund Interest Summary Report
          reportData = await ReportService.generateFundInterestSummaryReport(
            startDate,
            endDate,
            generatedBy
          );
          break;
        
        default:
          alert('CSV export not available for this report type.');
          return;
      }

      const csvContent = ReportService.exportToCSV(reportData);
      const filename = generateReportFilename(reportData.reportType, '.csv');
      await downloadCSVReport(csvContent, filename);
      
      alert(`${selectedReport.title} has been exported to CSV successfully!`);
      
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export to CSV. Please try again.');
    } finally {
      setGenerating(null);
    }
  };

  // Date picker handlers
  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>Reports & Analytics</Title>
          <Text style={styles.headerSubtitle}>
            Generate and download comprehensive reports
          </Text>
        </Card.Content>
      </Card>

      {/* Report Type Filters */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Report Types</Title>
          <View style={styles.filterContainer}>
            <Chip
              selected={selectedType === 'all'}
              onPress={() => setSelectedType('all')}
              style={styles.filterChip}
              selectedColor={selectedType === 'all' ? 'white' : '#228B22'}
            >
              All Reports
            </Chip>
            <Chip
              selected={selectedType === 'financial'}
              onPress={() => setSelectedType('financial')}
              style={styles.filterChip}
              selectedColor={selectedType === 'financial' ? 'white' : '#228B22'}
            >
              Financial
            </Chip>
            <Chip
              selected={selectedType === 'member'}
              onPress={() => setSelectedType('member')}
              style={styles.filterChip}
              selectedColor={selectedType === 'member' ? 'white' : '#228B22'}
            >
              Member
            </Chip>
            <Chip
              selected={selectedType === 'transaction'}
              onPress={() => setSelectedType('transaction')}
              style={styles.filterChip}
              selectedColor={selectedType === 'transaction' ? 'white' : '#228B22'}
            >
              Transaction
            </Chip>
          </View>
        </Card.Content>
      </Card>

      {/* Available Reports */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>
            Available Reports ({filteredReports.length})
          </Title>
          
          {filteredReports.map((report, index) => (
            <TouchableOpacity 
              key={report.id}
              onPress={() => handleReportSelection(report)}
              style={[
                styles.reportItem,
                index < filteredReports.length - 1 && styles.reportItemBorder
              ]}
            >
              <View style={styles.reportItemContent}>
                <List.Icon 
                  icon={report.icon as any} 
                  color={getTypeColor(report.type)}
                  style={styles.reportIcon}
                />
                <View style={styles.reportTextContainer}>
                  <Text style={styles.reportTitle}>{report.title}</Text>
                  <Text style={styles.reportDescription}>{report.description}</Text>
                </View>
                <View style={styles.reportRight}>
                  <Chip 
                    style={[styles.typeChip, { backgroundColor: getTypeColor(report.type) }]}
                    textStyle={styles.typeChipText}
                  >
                    {getTypeText(report.type)}
                  </Chip>
                  {report.lastGenerated && (
                    <Text style={styles.lastGenerated}>
                      Last: {formatDate(report.lastGenerated)}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Card.Content>
      </Card>

      {/* Report Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Quick Report Generation</Title>
          
          <Button 
            mode="contained" 
            style={styles.actionButton}
            icon="file-pdf-box"
            onPress={() => generateReport('financial-summary')}
            loading={generating === 'financial-summary'}
            disabled={!!generating}
          >
            Generate Financial Summary
          </Button>
          
          <Button 
            mode="outlined" 
            style={styles.actionButton}
            icon="chart-bar"
            onPress={() => generateReport('member-analytics')}
            loading={generating === 'member-analytics'}
            disabled={!!generating}
          >
            Generate Member Analytics
          </Button>
          
          <Button 
            mode="outlined" 
            style={styles.actionButton}
            icon="file-excel"
            onPress={() => generateReport('transaction-export')}
            loading={generating === 'transaction-export'}
            disabled={!!generating}
          >
            Export Transaction Data
          </Button>
        </Card.Content>
      </Card>

      {/* Report Features */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Report Features</Title>
          <List.Item
            title="PDF Export"
            description="Generate professional PDF reports"
            left={props => <List.Icon {...props} icon="file-document" color="#F44336" />}
          />
          <List.Item
            title="Excel Export"
            description="Export data to Excel spreadsheets"
            left={props => <List.Icon {...props} icon="file-table" color="#4CAF50" />}
          />
          <List.Item
            title="Data Analytics"
            description="Advanced data analysis and visualization"
            left={props => <List.Icon {...props} icon="chart-bar" color="#2196F3" />}
          />
          <List.Item
            title="Scheduled Reports"
            description="Automated report generation"
            left={props => <List.Icon {...props} icon="calendar" color="#FF9800" />}
          />
        </Card.Content>
      </Card>

      {/* Report Generation Modal */}
      <Portal>
        <Dialog 
          visible={showReportModal} 
          onDismiss={() => setShowReportModal(false)}
          style={styles.modal}
        >
          <Dialog.Title style={styles.modalTitle}>
            {selectedReport?.title}
          </Dialog.Title>
          
          <Dialog.Content>
            <Paragraph style={styles.modalDescription}>
              {selectedReport?.description}
            </Paragraph>

            {/* Date Range Selector */}
            {(selectedReport?.type === 'transaction' || selectedReport?.type === 'financial') && (
              <>
                <Text style={styles.modalLabel}>Date Range</Text>
                <View style={styles.dateContainer}>
                  <TouchableOpacity 
                    style={styles.dateInput}
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      From: {formatDate(startDate)}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.dateInput}
                    onPress={() => setShowEndDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      To: {formatDate(endDate)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleStartDateChange}
                  />
                )}

                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleEndDateChange}
                  />
                )}
              </>
            )}

            {/* Member Selection */}
            {selectedReport?.type === 'member' && (
              <>
                <Text style={styles.modalLabel}>Select Member</Text>
                <TouchableOpacity 
                  style={styles.memberSelector}
                  onPress={() => setShowMemberMenu(true)}
                >
                  <Text style={styles.memberSelectorText}>
                    {selectedMember 
                      ? availableMembers.find(m => m.memberNumber === selectedMember)?.name || selectedMember
                      : 'Select a member...'
                    }
                  </Text>
                </TouchableOpacity>
                
                <Menu
                  visible={showMemberMenu}
                  onDismiss={() => setShowMemberMenu(false)}
                  anchor={{ x: 0, y: 0 }} // Position will be handled by the TouchableOpacity
                >
                  {availableMembers.map(member => (
                    <Menu.Item
                      key={member.memberNumber}
                      onPress={() => {
                        setSelectedMember(member.memberNumber);
                        setShowMemberMenu(false);
                      }}
                      title={member.name}
                      titleStyle={styles.memberItem}
                    />
                  ))}
                </Menu>
              </>
            )}

            {/* Transaction Type Filter */}
            {selectedReport?.type === 'transaction' && (
              <>
                <Text style={styles.modalLabel}>Transaction Type</Text>
                <View style={styles.filterContainer}>
                  <Chip
                    selected={transactionType === 'all'}
                    onPress={() => setTransactionType('all')}
                    style={styles.filterChip}
                  >
                    All Types
                  </Chip>
                  <Chip
                    selected={transactionType === 'deposit'}
                    onPress={() => setTransactionType('deposit')}
                    style={styles.filterChip}
                  >
                    Deposits
                  </Chip>
                  <Chip
                    selected={transactionType === 'withdrawal'}
                    onPress={() => setTransactionType('withdrawal')}
                    style={styles.filterChip}
                  >
                    Withdrawals
                  </Chip>
                </View>
              </>
            )}
          </Dialog.Content>

          <Dialog.Actions>
            <Button 
              onPress={() => setShowReportModal(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button 
              onPress={exportToCSV}
              loading={generating?.includes('-csv')}
              disabled={!!generating}
              style={styles.modalButton}
              icon="file-excel"
            >
              Export CSV
            </Button>
            <Button 
              onPress={generateReportWithParams}
              loading={generating === selectedReport?.id}
              disabled={!!generating}
              style={styles.modalButton}
              mode="contained"
              icon="file-pdf-box"
            >
              Generate PDF
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    margin: 20,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  card: {
    margin: 20,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
  },
  reportItem: {
    paddingVertical: 12,
  },
  reportItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reportItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reportIcon: {
    margin: 0,
  },
  reportTextContainer: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  reportDescription: {
    fontSize: 12,
    color: '#666',
  },
  reportRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  typeChip: {
    height: 24,
  },
  typeChipText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  lastGenerated: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  actionButton: {
    marginBottom: 10,
  },
  // Modal styles
  modal: {
    maxWidth: 500,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  memberSelector: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  memberSelectorText: {
    fontSize: 14,
    color: '#333',
  },
  memberItem: {
    fontSize: 14,
  },
  modalButton: {
    marginHorizontal: 4,
  },
});

export default ReportsScreen;
