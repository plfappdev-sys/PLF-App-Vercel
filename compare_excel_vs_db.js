const { createClient } = require('@supabase/supabase-js');

async function compareExcelVsDB() {
  console.log('Comparing Excel data vs Database data...');
  
  const supabaseUrl = 'https://zdnyhzasvifrskbostgn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU';
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Get all members with their financial info
    const { data: members, error } = await supabase
      .from('members')
      .select('member_number, name, financial_info');
    
    if (error) {
      console.error('Error fetching members:', error);
      return;
    }
    
    console.log(`\nFound ${members.length} members in database`);
    
    // Sample data from Excel (from the check_excel_detailed.py output)
    // Let's compare a few members
    const excelData = {
      'wellington  galogakwe': { bk: 0.0, bl: 5100.0 }, // Excel shows BL=5100
      'Christopher Naude': { bk: 0.0, bl: 5600.0 }, // Excel shows BL=5600
      'Tryphina  Kelly': { bk: 0.0, bl: 11000.0 }, // Excel shows BL=11000
      'Belinda  Kelly': { bk: 0.0, bl: 8700.0 }, // Excel shows BL=8700
      'Dumisane  Mtotoba': { bk: 0.0, bl: 2400.0 } // Excel shows BL=2400 (matches DB)
    };
    
    console.log('\n' + '='.repeat(80));
    console.log('COMPARING EXCEL VS DATABASE FOR SAMPLE MEMBERS:');
    console.log('='.repeat(80));
    
    let totalExcelBL = 0;
    let totalExcelBK = 0;
    let totalDB = 0;
    
    for (const member of members) {
      const memberName = member.name?.trim();
      if (!memberName || !excelData[memberName]) continue;
      
      let financialInfo;
      if (typeof member.financial_info === 'string') {
        try {
          financialInfo = JSON.parse(member.financial_info);
        } catch (e) {
          financialInfo = {};
        }
      } else {
        financialInfo = member.financial_info || {};
      }
      
      const excelMember = excelData[memberName];
      const dbContributions = financialInfo.total_contributions || 0;
      const excelBL = excelMember.bl;
      const excelBK = excelMember.bk;
      const excelTotal = excelBL + excelBK;
      
      console.log(`\n${member.member_number}: ${memberName}`);
      console.log(`  Database: R ${dbContributions.toFixed(2)}`);
      console.log(`  Excel BL: R ${excelBL.toFixed(2)} (Column BL - Total Contribution for 7 Years)`);
      console.log(`  Excel BK: R ${excelBK.toFixed(2)} (Column BK - Total Contribution for Current Year)`);
      console.log(`  Excel Total (BL + BK): R ${excelTotal.toFixed(2)}`);
      
      if (Math.abs(dbContributions - excelBL) < 0.01) {
        console.log(`  ✓ Database matches Excel Column BL`);
      } else if (Math.abs(dbContributions - excelTotal) < 0.01) {
        console.log(`  ✓ Database matches Excel Total (BL + BK)`);
      } else {
        console.log(`  ✗ Database does NOT match Excel`);
        console.log(`    Difference from Excel BL: R ${(dbContributions - excelBL).toFixed(2)}`);
        console.log(`    Difference from Excel Total: R ${(dbContributions - excelTotal).toFixed(2)}`);
      }
      
      totalExcelBL += excelBL;
      totalExcelBK += excelBK;
      totalDB += dbContributions;
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('TOTALS FOR SAMPLE MEMBERS:');
    console.log(`Database total: R ${totalDB.toFixed(2)}`);
    console.log(`Excel Column BL total: R ${totalExcelBL.toFixed(2)}`);
    console.log(`Excel Column BK total: R ${totalExcelBK.toFixed(2)}`);
    console.log(`Excel Total (BL + BK): R ${(totalExcelBL + totalExcelBK).toFixed(2)}`);
    
    // Now let's check what the actual issue is
    console.log('\n' + '='.repeat(80));
    console.log('ANALYSIS OF THE PROBLEM:');
    console.log('='.repeat(80));
    
    // From the Excel analysis earlier:
    // Excel Column BL (rows 1-66): R 525,338.89
    // Excel Column BK (rows 1-66): R 54,750.00
    // Excel Total (BL + BK): R 580,088.89
    
    // Database shows: R 242,440.00
    
    console.log('\nThe database has R 242,440.00 in total_contributions');
    console.log('But Excel shows:');
    console.log('  - Column BL (7 Years 2018-24): R 525,338.89');
    console.log('  - Column BK (Current Year): R 54,750.00');
    console.log('  - TOTAL (BL + BK): R 580,088.89');
    
    console.log('\nPROBLEM: Database is missing R 337,648.89!');
    console.log('(580,088.89 - 242,440.00 = 337,648.89)');
    
    console.log('\nPOSSIBLE ISSUES:');
    console.log('1. Only Column BL was imported, not Column BK');
    console.log('2. Some members have incorrect values in the database');
    console.log('3. The Excel data was not fully imported');
    
    // Let's check if database has only Column BL values
    console.log('\n' + '='.repeat(80));
    console.log('CHECKING IF DATABASE HAS ONLY COLUMN BL VALUES:');
    
    // From the sample, Wellington galogakwe:
    // Excel: BL=5100, BK=0, Total=5100
    // Database: 3800 (not 5100!)
    
    // Christopher Naude:
    // Excel: BL=5600, BK=0, Total=5600  
    // Database: 2500 (not 5600!)
    
    console.log('\nThe database values are NOT even matching Column BL!');
    console.log('Example: Christopher Naude');
    console.log('  - Excel Column BL: R 5,600.00');
    console.log('  - Database: R 2,500.00');
    console.log('  - Difference: R 3,100.00');
    
    console.log('\nCONCLUSION:');
    console.log('The database has completely wrong contribution values!');
    console.log('They are neither Column BL nor Column BK nor the total.');
    console.log('The application is showing R 242,440.00 because that\'s what\'s in the database.');
    console.log('But the correct value should be R 580,088.89 (Excel BL + BK).');
    
  } catch (error) {
    console.error('Exception:', error);
  }
}

compareExcelVsDB();