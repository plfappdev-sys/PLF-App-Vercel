// Clear the module cache to ensure fresh imports
jest.resetModules();

// Mock the supabase module
jest.mock('../config/supabase', () => {
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

  return {
    supabase: mockClient,
    testSupabaseConnection: jest.fn().mockResolvedValue(true)
  };
});

// Mock MemberBalanceService
jest.mock('./MemberBalanceService', () => ({
  MemberBalanceService: {
    updateBalanceWithContribution: jest.fn().mockResolvedValue({})
  }
}));

// Now import the service after mocking
import { ContributionService, ContributionRecord } from './ContributionService';
import { MemberBalanceService } from './MemberBalanceService';

describe('ContributionService', () => {
  let mockSupabase: any;

  beforeEach(() => {
    // Get the mocked supabase instance
    mockSupabase = require('../config/supabase').supabase;
    jest.clearAllMocks();
    ContributionService.clearCache();
  });

  describe('getContributionById', () => {
    it('should return contribution when found', async () => {
      const mockContribution = {
        id: 'test-id',
        member_id: 1,
        member_number: 'M001',
        contribution_month: '2025-09-01',
        due_date: '2025-09-01',
        amount_due: '200.00',
        amount_paid: '0.00',
        status: 'pending',
        late_fee_applied: false,
        late_fee_amount: '0.00',
        late_fee_applied_date: null,
        payment_date: null,
        payment_reference: null,
        payment_method: null,
        created_at: '2025-09-19T10:00:00Z',
        updated_at: '2025-09-19T10:00:00Z'
      };

      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              data: mockContribution,
              error: null
            })
          })
        })
      }));

      const result = await ContributionService.getContributionById('test-id');

      expect(result).toEqual({
        id: 'test-id',
        member_id: 1,
        member_number: 'M001',
        contribution_month: new Date('2025-09-01'),
        due_date: new Date('2025-09-01'),
        amount_due: 200,
        amount_paid: 0,
        status: 'pending',
        late_fee_applied: false,
        late_fee_amount: 0,
        late_fee_applied_date: null,
        payment_date: null,
        payment_reference: null,
        payment_method: null,
        created_at: new Date('2025-09-19T10:00:00Z'),
        updated_at: new Date('2025-09-19T10:00:00Z')
      });
    });

    it('should return null when contribution not found', async () => {
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            single: () => ({
              data: null,
              error: { code: 'PGRST116' }
            })
          })
        })
      }));

      const result = await ContributionService.getContributionById('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('getContributionsByMemberId', () => {
    it('should return contributions for member', async () => {
      const mockContributions = [
        {
          id: 'test-id-1',
          member_id: 1,
          member_number: 'M001',
          contribution_month: '2025-09-01',
          due_date: '2025-09-01',
          amount_due: '200.00',
          amount_paid: '0.00',
          status: 'pending',
          created_at: '2025-09-19T10:00:00Z',
          updated_at: '2025-09-19T10:00:00Z'
        }
      ];

      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            order: () => ({
              limit: () => ({
                range: () => ({
                  data: mockContributions,
                  error: null
                })
              })
            })
          })
        })
      }));

      const result = await ContributionService.getContributionsByMemberId(1);

      expect(result).toHaveLength(1);
      expect(result[0].member_id).toBe(1);
    });
  });

  describe('getCurrentMonthContribution', () => {
    it('should create new contribution if none exists', async () => {
      const mockMemberData = {
        member_number: 'M001',
        monthly_contribution: 200.00
      };

      const mockNewContribution = {
        id: 'new-id',
        member_id: 1,
        member_number: 'M001',
        contribution_month: '2025-09-01',
        due_date: '2025-09-01',
        amount_due: '200.00',
        amount_paid: '0.00',
        status: 'pending',
        created_at: '2025-09-19T10:00:00Z',
        updated_at: '2025-09-19T10:00:00Z'
      };

      // Mock first call (get existing) - returns not found
      mockSupabase.from
        .mockImplementationOnce(() => ({
          select: () => ({
            eq: () => ({
              single: () => ({
                data: null,
                error: { code: 'PGRST116' }
              })
            })
          })
        }))
        // Mock member data fetch
        .mockImplementationOnce(() => ({
          select: () => ({
            eq: () => ({
              single: () => ({
                data: mockMemberData,
                error: null
              })
            })
          })
        }))
        // Mock contribution creation
        .mockImplementationOnce(() => ({
          insert: () => ({
            select: () => ({
              single: () => ({
                data: mockNewContribution,
                error: null
              })
            })
          })
        }));

      const result = await ContributionService.getCurrentMonthContribution(1);

      expect(result).toBeDefined();
      expect(result?.status).toBe('pending');
    });
  });

  describe('recordPayment', () => {
    it('should update contribution status to paid when full amount is paid', async () => {
      const mockContribution = {
        id: 'test-id',
        member_id: 1,
        amount_due: 200,
        amount_paid: 0,
        status: 'pending'
      } as any;

      const mockUpdatedContribution = {
        ...mockContribution,
        amount_paid: 200,
        status: 'paid',
        payment_date: new Date().toISOString()
      };

      jest.spyOn(ContributionService, 'getContributionById').mockResolvedValue(mockContribution);
      
      mockSupabase.from.mockImplementation(() => ({
        upsert: () => ({
          select: () => ({
            single: () => ({
              data: mockUpdatedContribution,
              error: null
            })
          })
        })
      }));

      const result = await ContributionService.recordPayment('test-id', 200, 'cash', 'REF123');

      expect(result.status).toBe('paid');
      expect(MemberBalanceService.updateBalanceWithContribution).toHaveBeenCalledWith(1, 200);
    });
  });

  describe('applyLateFee', () => {
    it('should apply late fee to overdue contribution', async () => {
      const mockContribution = {
        id: 'test-id',
        member_id: 1,
        amount_due: 200,
        status: 'overdue',
        late_fee_applied: false
      } as any;

      const mockUpdatedContribution = {
        ...mockContribution,
        late_fee_applied: true,
        late_fee_amount: 14, // 7% of 200
        amount_due: 214
      };

      jest.spyOn(ContributionService, 'getContributionById').mockResolvedValue(mockContribution);
      
      mockSupabase.from.mockImplementation(() => ({
        upsert: () => ({
          select: () => ({
            single: () => ({
              data: mockUpdatedContribution,
              error: null
            })
          })
        })
      }));

      const result = await ContributionService.applyLateFee('test-id');

      expect(result.late_fee_applied).toBe(true);
      expect(result.late_fee_amount).toBe(14);
      expect(result.amount_due).toBe(214);
    });
  });

  describe('waiveContribution', () => {
    it('should waive contribution', async () => {
      const mockUpdatedContribution = {
        id: 'test-id',
        status: 'waived',
        amount_paid: 0,
        payment_reference: 'Waived by admin'
      };

      mockSupabase.from.mockImplementation(() => ({
        upsert: () => ({
          select: () => ({
            single: () => ({
              data: mockUpdatedContribution,
              error: null
            })
          })
        })
      }));

      const result = await ContributionService.waiveContribution('test-id', 'Test waiver');

      expect(result.status).toBe('waived');
      expect(result.payment_reference).toBe('Waived by admin');
    });
  });

  describe('getMemberContributionStats', () => {
    it('should calculate correct statistics', async () => {
      const mockContributions = [
        {
          amount_due: '200.00',
          amount_paid: '200.00',
          status: 'paid',
          late_fee_amount: '0.00'
        },
        {
          amount_due: '200.00',
          amount_paid: '100.00',
          status: 'partial',
          late_fee_amount: '0.00'
        },
        {
          amount_due: '200.00',
          amount_paid: '0.00',
          status: 'overdue',
          late_fee_amount: '14.00'
        }
      ];

      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          eq: () => ({
            data: mockContributions,
            error: null
          })
        })
      }));

      const result = await ContributionService.getMemberContributionStats(1);

      expect(result.total_due).toBe(600);
      expect(result.total_paid).toBe(300);
      expect(result.total_outstanding).toBe(300);
      expect(result.total_late_fees).toBe(14);
      expect(result.paid_count).toBe(1);
      expect(result.partial_count).toBe(1);
      expect(result.overdue_count).toBe(1);
    });
  });

  describe('markOverdueContributions', () => {
    it('should mark overdue contributions', async () => {
      const mockOverdueContributions = [
        {
          id: 'test-id-1',
          status: 'pending'
        },
        {
          id: 'test-id-2', 
          status: 'partial'
        }
      ] as any[];

      jest.spyOn(ContributionService, 'getOverdueContributions').mockResolvedValue(mockOverdueContributions);
      
      mockSupabase.from.mockImplementation(() => ({
        update: () => ({
          eq: () => ({
            error: null
          })
        })
      }));

      const result = await ContributionService.markOverdueContributions();

      expect(result).toBe(2);
    });
  });

  describe('isDatabaseAvailable', () => {
    it('should return true when database is available', async () => {
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          limit: () => ({
            error: null
          })
        })
      }));

      const result = await ContributionService.isDatabaseAvailable();
      expect(result).toBe(true);
    });

    it('should return false when database is not available', async () => {
      mockSupabase.from.mockImplementation(() => ({
        select: () => ({
          limit: () => ({
            error: new Error('Database error')
          })
        })
      }));

      const result = await ContributionService.isDatabaseAvailable();
      expect(result).toBe(false);
    });
  });

  describe('clearCache', () => {
    it('should clear the cache', () => {
      // Set some cache state
      const mockContribution = {} as any;
      ContributionService['currentMonthContributions'].set(1, mockContribution);
      ContributionService['lastFetchTime'] = new Date();

      ContributionService.clearCache();

      expect(ContributionService['currentMonthContributions'].size).toBe(0);
      expect(ContributionService['lastFetchTime']).toBeNull();
    });
  });
});
