"""
Supabase Service Configuration
This file contains the service role key for administrative operations.
You need to add your Supabase service role key here.

To get your service role key:
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "service_role" key (not the "anon" key)
4. Replace "your-service-role-key-here" with your actual key
"""

SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbnloemFzdmlmcnNrYm9zdGduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODAyNDQ4NCwiZXhwIjoyMDczNjAwNDg0fQ.kOpqoycVNdJXC-fqqxwHPVof6e8JlJ60_J7WWF-1AHU"

# Supabase project URL (already configured)
SUPABASE_URL = "https://zdnyhzasvifrskbostgn.supabase.co"

# Database table names
MEMBERS_TABLE = "members"
USERS_TABLE = "users"
TRANSACTIONS_TABLE = "transactions"

def validate_service_key(key):
    """Basic validation for Supabase service key"""
    if key == "your-service-role-key-here" or not key:
        return False
    # JWT tokens typically start with eyJhbGciOiJ
    if key.startswith("eyJhbGciOiJ"):
        return True
    return False

def get_supabase_config():
    """Get Supabase configuration with validation"""
    if not validate_service_key(SUPABASE_SERVICE_KEY):
        raise ValueError(
            "❌ Invalid Supabase service role key. "
            "Please update supabase_service_config.py with your actual service key. "
            "Get it from Supabase Dashboard > Settings > API > service_role"
        )
    
    return {
        "url": SUPABASE_URL,
        "key": SUPABASE_SERVICE_KEY,
        "tables": {
            "members": MEMBERS_TABLE,
            "users": USERS_TABLE,
            "transactions": TRANSACTIONS_TABLE
        }
    }
