import pandas as pd
import numpy as np
import os
from datetime import datetime, date
from supabase import create_client, Client
from dotenv import load_dotenv
import json
from dateutil.relativedelta import relativedelta

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def calculate_expected_contribution(join_date_str):
    """
    Calculate expected contribution based on join date
    
    Rules:
    - R200 per month from June 2018 to June 2024 (72 months)
    - R250 per month from July 2024 to June 2025 (12 months)
    - Calculate based on member's join date
    """
    
    # Parse join date
    try:
        if isinstance(join_date_str, str):
            # Try different date formats
            for fmt in ['%Y-%m-%d', '%d/%m/%Y', '%m/%d/%Y', '%Y/%m/%d']:
                try:
                    join_date = datetime.strptime(join_date_str, fmt).date()
                    break
                except ValueError:
                    continue
            else:
                # If no format works, use today's date
                join_date = date.today()
        else:
            # If it's already a date object
            join_date = join_date_str
    except Exception as e:
        print(f"Error parsing join date {join_date_str}: {e}")
        join_date = date.today()
    
    # Define contribution periods
    period1_start = date(2018, 6, 1)  # June 2018
    period1_end = date(2024, 6, 30)   # June 2024
    period2_start = date(2024, 7, 1)  # July 2024
    period2_end = date(2025, 6, 30)   # June 2025
    
    # If join date is after period2_end, no expected contribution
    if join_date > period2_end:
        return 0, {"period1_months": 0, "period2_months": 0, "total_months": 0}
    
    # Calculate months in each period
    period1_months = 0
    period2_months = 0
    
    # Period 1: R200 per month (June 2018 - June 2024)
    if join_date <= period1_end:
        # Start from join date or period1_start, whichever is later
        start_date = max(join_date, period1_start)
        
        # Calculate months between start_date and period1_end
        # Add 1 day to include the end month
        end_date = min(period1_end, period2_end)
        
        # Calculate months difference
        period1_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month)
        
        # If end day is earlier in month than start day, subtract 1
        if end_date.day < start_date.day:
            period1_months -= 1
        
        # Ensure at least 0 months
        period1_months = max(0, period1_months)
    
    # Period 2: R250 per month (July 2024 - June 2025)
    if join_date <= period2_end:
        # Start from join date or period2_start, whichever is later
        start_date = max(join_date, period2_start)
        
        # Calculate months between start_date and period2_end
        # Add 1 day to include the end month
        end_date = period2_end
        
        # Calculate months difference
        period2_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month)
        
        # If end day is earlier in month than start day, subtract 1
        if end_date.day < start_date.day:
            period2_months -= 1
        
        # Ensure at least 0 months
        period2_months = max(0, period2_months)
    
    # Calculate total expected contribution
    total_expected = (period1_months * 200) + (period2_months * 250)
    
    return total_expected, {
        "period1_months": period1_months,
        "period2_months": period2_months,
        "total_months": period1_months + period2_months,
        "period1_rate": 200,
        "period2_rate": 250,
        "join_date": join_date.isoformat() if hasattr(join_date, 'isoformat') else str(join_date)
    }

def update_expected_contributions():
    """Calculate and update expected contributions for all members"""
    print("Calculating expected contributions for all members...")
    
    try:
        # Initialize Supabase client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        # Get all members from database
        print("\n=== FETCHING ALL MEMBERS FROM DATABASE ===")
        response = supabase.table('members').select('*').execute()
        
        if not hasattr(response, 'data') or not response.data:
            print("No members found in database")
            return
        
        members = response.data
        print(f"Found {len(members)} members in database")
        
        # Track results
        updated_count = 0
        error_count = 0
        sql_updates = []
        
        print("\n=== CALCULATING EXPECTED CONTRIBUTIONS ===")
        
        for member in members:
            member_name = member.get('name', '').strip()
            member_number = member.get('member_number')
            member_id = member.get('id')
            
            if not member_name or not member_id:
                continue
            
            # Get join date
            join_date = member.get('join_date')
            if not join_date:
                # Try to get from financial_info
                financial_info = member.get('financial_info', {})
                if isinstance(financial_info, str):
                    try:
                        financial_info = json.loads(financial_info)
                    except:
                        financial_info = {}
                
                join_date = financial_info.get('join_date')
            
            # Calculate expected contribution
            expected_contribution, calculation_details = calculate_expected_contribution(join_date)
            
            # Get current financial_info
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            # Update financial_info with expected contribution
            financial_info['expected_contribution'] = expected_contribution
            financial_info['expected_contribution_details'] = calculation_details
            financial_info['last_expected_contribution_update'] = datetime.now().isoformat()
            
            # Update member in database
            try:
                update_response = supabase.table('members').update({
                    'financial_info': financial_info
                }).eq('id', member_id).execute()
                
                if hasattr(update_response, 'data'):
                    updated_count += 1
                    print(f"✅ Updated {member_name} ({member_number}): R{expected_contribution:,.2f}")
                    
                    # Generate SQL for audit trail
                    sql_updates.append(f"-- {member_name} ({member_number}): R{expected_contribution:,.2f}")
                    sql_updates.append(f"UPDATE members SET financial_info = '{json.dumps(financial_info)}' WHERE id = '{member_id}';")
                    sql_updates.append("")
                else:
                    error_count += 1
                    print(f"❌ Failed to update {member_name} ({member_number})")
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error updating {member_name} ({member_number}): {e}")
        
        # Print summary
        print(f"\n=== SUMMARY ===")
        print(f"Total members processed: {len(members)}")
        print(f"✅ Successfully updated: {updated_count}")
        print(f"❌ Errors: {error_count}")
        
        # Save SQL script
        if sql_updates:
            sql_content = f"""-- Expected Contributions Update Script
-- Generated: {datetime.now().isoformat()}
-- Total members: {len(members)}
-- Successfully updated: {updated_count}
-- Errors: {error_count}

{sql_updates[0]}
{sql_updates[1]}
{sql_updates[2]}

-- ... and {len(sql_updates) // 3 - 1} more members
"""
            
            with open('update_expected_contributions.sql', 'w') as f:
                f.write(sql_content)
            
            print(f"\n📝 SQL script saved to: update_expected_contributions.sql")
        
        # Also update member_balances table
        print(f"\n=== UPDATING MEMBER_BALANCES TABLE ===")
        
        balance_updated = 0
        balance_errors = 0
        
        for member in members:
            member_id = member.get('id')
            member_number = member.get('member_number')
            member_name = member.get('name', '').strip()
            
            if not member_id:
                continue
            
            # Get expected contribution from updated financial_info
            financial_info = member.get('financial_info', {})
            if isinstance(financial_info, str):
                try:
                    financial_info = json.loads(financial_info)
                except:
                    financial_info = {}
            
            expected_contribution = financial_info.get('expected_contribution', 0)
            
            # Update member_balances
            try:
                # Check if member_balance exists
                balance_response = supabase.table('member_balances').select('*').eq('member_id', member_id).execute()
                
                if hasattr(balance_response, 'data') and balance_response.data:
                    # Update existing record
                    update_response = supabase.table('member_balances').update({
                        'expected_contributions': expected_contribution
                    }).eq('member_id', member_id).execute()
                    
                    if hasattr(update_response, 'data'):
                        balance_updated += 1
                    else:
                        balance_errors += 1
                else:
                    # Create new record
                    insert_response = supabase.table('member_balances').insert({
                        'member_id': member_id,
                        'member_number': member_number,
                        'expected_contributions': expected_contribution,
                        'total_contributions': financial_info.get('total_contributions', 0),
                        'current_balance': financial_info.get('current_balance', 0),
                        'created_at': datetime.now().isoformat(),
                        'updated_at': datetime.now().isoformat()
                    }).execute()
                    
                    if hasattr(insert_response, 'data'):
                        balance_updated += 1
                    else:
                        balance_errors += 1
                        
            except Exception as e:
                balance_errors += 1
                print(f"❌ Error updating member_balances for {member_name}: {e}")
        
        print(f"✅ Member_balances updated: {balance_updated}")
        print(f"❌ Member_balances errors: {balance_errors}")
        
        return updated_count, error_count, balance_updated, balance_errors
        
    except Exception as e:
        print(f"Error calculating expected contributions: {e}")
        import traceback
        traceback.print_exc()

def test_calculation():
    """Test the expected contribution calculation with sample dates"""
    print("\n=== TEST CALCULATIONS ===")
    
    test_cases = [
        ("2018-06-01", "Joined at start of period 1"),
        ("2019-01-15", "Joined mid-period 1"),
        ("2024-06-15", "Joined at end of period 1"),
        ("2024-07-01", "Joined at start of period 2"),
        ("2024-12-15", "Joined mid-period 2"),
        ("2025-01-15", "Joined late in period 2"),
        ("2025-07-01", "Joined after all periods"),
        ("2020-03-15", "Joined in middle of period 1"),
    ]
    
    for join_date_str, description in test_cases:
        expected, details = calculate_expected_contribution(join_date_str)
        print(f"\n{description}")
        print(f"Join date: {join_date_str}")
        print(f"Expected contribution: R{expected:,.2f}")
        print(f"Details: {details}")

if __name__ == "__main__":
    print("=" * 80)
    print("EXPECTED CONTRIBUTIONS CALCULATION")
    print("=" * 80)
    
    # Run test calculations
    test_calculation()
    
    print("\n" + "=" * 80)
    print("UPDATING DATABASE")
    print("=" * 80)
    
    # Update database
    updated, errors, balance_updated, balance_errors = update_expected_contributions()
    
    print("\n" + "=" * 80)
    print("COMPLETION SUMMARY")
    print("=" * 80)
    
    if errors == 0 and balance_errors == 0:
        print("\n✅ SUCCESS! All expected contributions have been calculated and updated.")
        print(f"   • {updated} members updated in members table")
        print(f"   • {balance_updated} members updated in member_balances table")
        print("\nThe app will now show 'Expected Contribution' in the Financial Summary section.")
    else:
        print(f"\n⚠️  Completed with some issues:")
        if errors > 0:
            print(f"   • {errors} errors in members table updates")
        if balance_errors > 0:
            print(f"   • {balance_errors} errors in member_balances table updates")
        
        print(f"\n✅ Successful updates:")
        print(f"   • {updated} members updated in members table")
        print(f"   • {balance_updated} members updated in member_balances table")
    
    print("\nWhat the app will now show:")
    print("  • 'Expected Contribution' in Financial Summary section")
    print("  • Calculated based on join date and contribution rates")
    print("  • R200/month from June 2018 to June 2024")
    print("  • R250/month from July 2024 to June 2025")