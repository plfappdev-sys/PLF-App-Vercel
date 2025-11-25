#!/usr/bin/env python3
"""
Simple Python test to verify Supabase connection
"""

import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://zdnyhzasvifrskbostgn.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SERVICE_ROLE_KEY', '')

print("🧪 Testing Python Supabase connection...")
print(f"📋 Connection details:")
print(f"   URL: {SUPABASE_URL}")
print(f"   API Key: {'Connected successfully' if SUPABASE_SERVICE_ROLE_KEY else 'MISSING'}")

try:
    # Initialize Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    print("✅ Supabase client initialized successfully!")
    
    # Test connection by fetching a small amount of data
    response = supabase.table('members').select('id').limit(1).execute()
    print(f"✅ Connection to Supabase established! Found {len(response.data)} members")
    
except Exception as e:
    print(f"❌ Error connecting to Supabase: {e}")
    print("📋 Troubleshooting steps:")
    print("   1. Check internet connection")
    print("   2. Verify SUPABASE_URL and SERVICE_ROLE_KEY in .env file")
    print("   3. Check if Supabase project is active")
