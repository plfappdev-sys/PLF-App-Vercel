// Manual mock for supabase client that matches the real Supabase client structure
const mockClient = {
  from: jest.fn(() => mockClient),
  select: jest.fn(() => mockClient),
  eq: jest.fn(() => mockClient),
  single: jest.fn(() => Promise.resolve({ data: null, error: null })),
  order: jest.fn(() => mockClient),
  limit: jest.fn(() => mockClient),
  range: jest.fn(() => Promise.resolve({ data: [], error: null })),
  lte: jest.fn(() => mockClient),
  neq: jest.fn(() => mockClient),
  upsert: jest.fn(() => Promise.resolve({ data: null, error: null })),
  insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
  update: jest.fn(() => mockClient)
};

export const supabase = mockClient;

// Mock the test connection function
export const testSupabaseConnection = jest.fn().mockResolvedValue(true);
