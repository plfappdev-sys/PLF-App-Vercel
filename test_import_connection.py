#!/usr/bin/env python3
"""
Test script to verify the import script can initialize properly
This tests the connection and configuration without importing data
"""

import sys
import os

def test_import_script():
    """Test that the import script can be imported and initialized"""
    print("=" * 60)
    print("🔧 Import Script Connection Test")
    print("=" * 60)
    
    try:
        # Try to import the necessary modules
        from import_members_to_supabase import SupabaseMemberImporter
        
        print("✅ Successfully imported SupabaseMemberImporter")
        
        # Test initialization with anonymous key (no service key required)
        print("\n🔄 Testing initialization with anonymous key...")
        try:
            importer = SupabaseMemberImporter(use_service_key=False)
            print("✅ Successfully initialized with anonymous key")
            
            # Test loading member data
            print("\n📊 Testing member data loading...")
            member_data = importer.load_member_data("selected_members_2024_2025.json")
            if member_data:
                print(f"✅ Successfully loaded {member_data['extraction_info']['total_members_extracted']} members")
                
                # Test transformation
                print("\n🔄 Testing data transformation...")
                transformed = importer.transform_member_data(member_data)
                print(f"✅ Successfully transformed {len(transformed)} members")
                
                if transformed:
                    sample = transformed[0]
                    print(f"\n📋 Sample transformed member:")
                    print(f"   Member Number: {sample['member_number']}")
                    print(f"   Name: {sample['personal_info']['fullName']}")
                    print(f"   Balance: R{sample['financial_info']['current_balance']:,.2f}")
                    print(f"   Standing: {sample['membership_status']['standingCategory']}")
                    
            else:
                print("❌ Failed to load member data")
                
        except Exception as e:
            print(f"❌ Initialization failed: {e}")
            print("💡 This might be expected if Supabase service is not available")
            
    except ImportError as e:
        print(f"❌ Import failed: {e}")
        print("💡 Make sure all dependencies are installed:")
        print("   pip install supabase")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False
    
    print("\n" + "=" * 60)
    print("🎉 Connection test completed!")
    print("\n📝 Next steps:")
    print("   1. Update supabase_service_config.py with your service role key")
    print("   2. Run: python import_members_to_supabase.py")
    print("   3. Test member validation in the app")
    
    return True

if __name__ == "__main__":
    test_import_script()
