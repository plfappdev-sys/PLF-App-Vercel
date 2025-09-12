import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Title, 
  Card, 
  Text, 
  Button,
  List,
  Chip,
  ActivityIndicator
} from 'react-native-paper';
import { useAuth } from '../../AppSimple';
import MockMemberService from '../services/MockMemberService';

interface Report {
  id: string;
  title: string;
  type: 'financial' | 'member' | 'transaction' | 'analytics';
  description: string;
  icon: string;
  lastGenerated?: Date;
}

const ReportsScreen: React.FC = () => {
  const { currentUser } = useAuth();
  const [generating, setGenerating] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'financial' | 'member' | 'transaction' | 'analytics'>('all');

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
            <List.Item
              key={report.id}
              title={report.title}
              description={report.description}
              left={props => (
                <List.Icon 
                  {...props} 
                  icon={report.icon as any} 
                  color={getTypeColor(report.type)}
                />
              )}
              right={props => (
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
              )}
              style={[
                styles.reportItem,
                index < filteredReports.length - 1 && styles.reportItemBorder
              ]}
            />
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
});

export default ReportsScreen;
