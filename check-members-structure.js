const { supabase } = require('./supabase.config.js');

async function checkMembersStructure() {
  console.log('🔍 Checking members table structure...');
  
  try {
    // Try to get the first member to see the structure
    const { data: members, error } = await supabase
      .from('members')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Error querying members table:', error.message);
      
      // Try to see what columns exist
      console.log('\n📋 Testing individual columns...');
      
      const testColumns = [
        'id', 'member_number', 'user_id', 'first_name', 'last_name', 
        'total_contributions', 'current_balance', 'created_at'
      ];
      
      for (const column of testColumns) {
        try {
          const { data: colData, error: colError } = await supabase
            .from('members')
            .select(column)
            .limit(1);

          if (colError) {
            console.log(`   ❌ ${column}: ${colError.message}`);
          } else {
            console.log(`   ✅ ${column}: Accessible`);
            if (colData && colData.length > 0) {
              console.log(`      Sample value: ${JSON.stringify(colData[0][column])}`);
            }
          }
        } catch (err) {
          console.log(`   ❌ ${column}: ${err.message}`);
        }
      }
      
      return;
    } else {
      console.log('✅ Members table query successful');
      
      if (members && members.length > 0) {
        console.log('\n📊 First member record structure:');
        const firstMember = members[0];
        
        // Show all keys and their types
        Object.keys(firstMember).forEach(key => {
          const value = firstMember[key];
          const type = typeof value;
          console.log(`   ${key}: ${type} = ${JSON.stringify(value)}`);
        });
        
        // Check the ID type specifically
        console.log(`\n🔍 ID field type: ${typeof firstMember.id}`);
        if (firstMember.id) {
          console.log(`   ID value: ${firstMember.id}`);
          console.log(`   Is UUID: ${/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(firstMember.id)}`);
          console.log(`   Is BigInt: ${typeof firstMember.id === 'number' && firstMember.id > 1000}`);
        }
      } else {
        console.log('📭 No members found in the table');
      }
    }

  } catch (error) {
    console.error('❌ Members structure check failed:', error.message);
  }
}

// Run the check
checkMembersStructure().catch(console.error);
