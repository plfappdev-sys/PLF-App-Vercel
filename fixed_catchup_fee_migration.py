#!/usr/bin/env python3
"""
PLF Fixed Catch-up Fee Migration Script
Purpose: Correctly calculate catch-up fees based on member join dates
Created: November 24, 2025
"""

import os
import json
from datetime import datetime, timedelta
import math
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

class PLFCatchUpFeeFixer:
    def __init__(self):
        self.members_data = []
        
    def load_member_data(self):
        """Load existing member data from Supabase"""
        try:
            print("Loading member data from Supabase...")
            response = supabase.table('members').select('*').execute()
            self.members_data = response.data
            print(f"Loaded {len(self.members_data)} members")
            return True
        except Exception as e:
            print(f"Error loading member data: {e}")
            return False
    
    def calculate_correct_catch_up_fees(self):
        """Calculate catch-up fees correctly based on PLF Constitution"""
        print("Calculating correct catch-up fees based on PLF Constitution...")
        
        # PLF inception date (July 2018)
        inception_date = datetime(2018, 7, 1)
        
        # Current monthly contribution (R200, increased to R250 from July 2024)
        monthly_contribution = 200.00
        
        for member in self.members_data:
            try:
                # Get member join date - use created_at as fallback if date_joined is not available
                join_date = None
                
                if member.get('date_joined'):
                    # Parse date_joined if available
                    join_date_str = member['date_joined']
                    if isinstance(join_date_str, str):
                        join_date = datetime.fromisoformat(join_date_str.replace('Z', '+00:00'))
                elif member.get('created_at'):
                    # Use created_at as fallback
                    join_date_str = member['created_at']
                    if isinstance(join_date_str, str):
                        join_date = datetime.fromisoformat(join_date_str.replace('Z', '+00:00'))
                
                if join_date:
                    # Calculate months missed from July 2018 to join date
                    months_missed = self.calculate_months_missed(join_date, inception_date)
                    
                    # Calculate catch-up fee: R200 per missed month
                    catch_up_fee = months_missed * monthly_contribution
                    
                    # Update member record
                    try:
                        supabase.table('members').update({
                            'catch_up_fee': catch_up_fee,
                            'monthly_contribution': monthly_contribution
                        }).eq('id', member['id']).execute()
                        
                        print(f"Member {member['member_number']}. {member['name']}: Joined {join_date.strftime('%Y-%m-%d')}, {months_missed} months missed, catch-up fee: R{catch_up_fee}")
                        
                    except Exception as e:
                        print(f"Error updating member {member['id']}: {e}")
                else:
                    print(f"Member {member['member_number']}. {member['name']}: No join date available, using default catch-up fee")
                    
                    # Set default catch-up fee for members without join dates
                    try:
                        supabase.table('members').update({
                            'catch_up_fee': 0,  # No catch-up fee if no join date
                            'monthly_contribution': monthly_contribution
                        }).eq('id', member['id']).execute()
                    except Exception as e:
                        print(f"Error updating member {member['id']}: {e}")
                        
            except Exception as e:
                print(f"Error processing member {member['id']}: {e}")
    
    def calculate_months_missed(self, join_date, inception_date):
        """Calculate number of months missed from inception date to join date"""
        # Calculate total months difference
        total_months = (join_date.year - inception_date.year) * 12 + (join_date.month - inception_date.month)
        
        # If join date is after the 15th, count that month as missed
        if join_date.day > 15:
            total_months += 1
            
        return max(0, total_months)
    
    def run_fix(self):
        """Run the catch-up fee fix process"""
        print("Starting PLF Catch-up Fee Fix...")
        print("=" * 50)
        print("PLF CONSTITUTION RULES:")
        print("- Stokvel inception: July 2018")
        print("- Monthly contribution: R200 (R250 from July 2024)")
        print("- Catch-up fee: R200 × months missed from July 2018 to join date")
        print("=" * 50)
        
        # Load existing data
        if not self.load_member_data():
            print("Failed to load member data. Exiting.")
            return False
        
        # Fix catch-up fees
        print("\nFixing catch-up fees...")
        self.calculate_correct_catch_up_fees()
        
        print("\n" + "=" * 50)
        print("Catch-up fee fix completed!")
        print("Please verify the data in the members table:")
        print("- catch_up_fee (correctly calculated based on join dates)")
        print("- monthly_contribution (set to R200)")
        
        return True

def main():
    """Main function"""
    # Check if Supabase credentials are available
    if not SUPABASE_SERVICE_ROLE_KEY:
        print("Error: SUPABASE_SERVICE_ROLE_KEY environment variable is required")
        print("Please set it before running this script:")
        print("export SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'")
        return
    
    # Create fixer instance
    fixer = PLFCatchUpFeeFixer()
    
    # Run fix
    success = fixer.run_fix()
    
    if success:
        print("\nCatch-up fee fix completed successfully!")
    else:
        print("\nCatch-up fee fix failed. Please check the errors above.")

if __name__ == "__main__":
    main()
