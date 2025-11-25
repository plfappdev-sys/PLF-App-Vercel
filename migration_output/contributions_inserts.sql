-- Contribution data migration SQL
-- Generated: 2025-09-21T19:45:27.489448


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '242964bc-cfcc-4945-90e7-9aca18931b6d',
                'PLF-001',
                '2019-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1e39430f-e9cc-468c-b210-16ba224f0a50',
                'PLF-001',
                '2019-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c38d974b-fc71-4bac-bf24-c88facda0045',
                'PLF-001',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'da93116d-99cd-4588-a994-adc320570d58',
                'PLF-001',
                '2020-03-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '468f78b9-e62a-4e10-b2d4-6ba99015674b',
                'PLF-002',
                '2020-05-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4f18e595-0312-48b0-9f47-c9ef1c5b325e',
                'PLF-005',
                '2019-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4603d446-9309-4f25-bdfe-dbd9ba4f6d3b',
                'PLF-005',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3a5c8a46-d91b-4d10-9eb6-30ef005f0cde',
                'PLF-005',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fb88c9e1-b954-4b7e-8888-14e7b2b06e8b',
                'PLF-005',
                '2020-01-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e9a4ba04-5ab6-48ac-ace4-3838fdebb87a',
                'PLF-005',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f0383935-a7f0-467a-ae09-826d3738731b',
                'PLF-005',
                '2020-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '931baf91-fae8-4d1a-b14e-72911bd4f8db',
                'PLF-005',
                '2020-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ea1c71c1-3916-486f-ab3e-52965702717f',
                'PLF-008',
                '2019-08-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '18a7d37d-564c-43c4-84ac-0c36172d5f00',
                'PLF-009',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9c5f0f63-64df-4e33-b454-a4bd9307a449',
                'PLF-009',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '339014dc-0a0a-4a4c-b3e6-528dfb7ed134',
                'PLF-009',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '64ff06e5-9e2e-44c5-9b3d-dc98a1296344',
                'PLF-009',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '87197327-3202-4434-a928-250e8ad205ed',
                'PLF-009',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'feb1dfb7-0faa-48dc-ab5d-e8f3db8ada01',
                'PLF-009',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7749ba8b-1f88-4c33-8029-6a964cfec92b',
                'PLF-009',
                '2020-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0f2a88c5-5466-410a-8145-dcd6c90ac56c',
                'PLF-009',
                '2020-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f7d32e08-e2c8-4a2f-a6ac-c26e02053d67',
                'PLF-011',
                '2019-09-01'::date,
                900.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2feec956-0b13-4add-92f2-6ae165acfc0f',
                'PLF-011',
                '2019-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2bb3d87f-58eb-4c2f-8b02-70463af3abd1',
                'PLF-011',
                '2020-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '53441a2e-e5c4-4df7-950d-c08363717a24',
                'PLF-011',
                '2020-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1a8b413b-237d-4491-aa0b-631bac44ef06',
                'PLF-011',
                '2020-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6e41ec31-d1cd-4c12-82ac-11a26e9e2a9b',
                'PLF-011',
                '2020-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '53c36056-9d86-40be-a3d2-892bf329fa42',
                'PLF-012',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f9e65169-e62e-46fd-9a48-881405d0ef88',
                'PLF-012',
                '2019-10-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4c8fe507-9e76-4b9d-8211-820151ca1eb5',
                'PLF-012',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8b530f31-06c6-42fb-92ff-93e652b78210',
                'PLF-012',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0a43953b-0ef1-488a-85c1-9fca415cc21a',
                'PLF-012',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9a47ca90-8b33-4a4d-b456-c493c20b1e81',
                'PLF-012',
                '2020-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e4d9381b-1d62-43e3-8bb1-14d992938920',
                'PLF-012',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '069b6dd6-9896-4d14-838c-8245057203a1',
                'PLF-012',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c7472677-a94e-4416-8f20-4f6652703755',
                'PLF-012',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c6b1080b-7a27-406a-915f-4740be79f8cd',
                'PLF-013',
                '2019-08-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f79e3f96-c9d3-433e-8413-7ea14b04aa26',
                'PLF-013',
                '2019-12-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '387fc664-94dc-4f91-8824-e7c0d3d64b24',
                'PLF-013',
                '2020-06-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd5803e0f-379f-475a-9aad-37cd9aa303ab',
                'PLF-015',
                '2019-09-01'::date,
                2100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '17c5b0bf-5875-4691-98b8-ad98bbccdb05',
                'PLF-017',
                '2019-07-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '78383f43-e95d-414e-ba5a-c7a5eb89b352',
                'PLF-017',
                '2019-10-01'::date,
                1150.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '39050ee9-2746-4503-94d1-99df2220baf3',
                'PLF-017',
                '2019-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5410b584-0677-4fd6-b426-b9edd83ff217',
                'PLF-018',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5083a4ef-af65-482a-94d1-b7f48cd75469',
                'PLF-018',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2e8b7d40-7b7b-42b0-98d9-58e7c01a5021',
                'PLF-018',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5a03964b-6ffe-4664-a1d4-ff21bba8b573',
                'PLF-018',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8c4147ce-af80-4562-9b48-39eb4b9d911b',
                'PLF-018',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '34e2dc99-0d46-46fe-9d00-a0dc3cb6d440',
                'PLF-018',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'acdd7892-91da-4b15-9a18-078f87aee17a',
                'PLF-018',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f8aaa06a-6ba4-4651-9a1d-f0a5081ffa8f',
                'PLF-018',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bb8b1e2c-bc35-4b3b-a103-9529a9c3a46f',
                'PLF-018',
                '2020-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '00b9bf27-2a46-4a4f-a484-e3029e524593',
                'PLF-018',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '440ee340-5f7a-494f-a093-85bab34866c4',
                'PLF-018',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5916e433-7630-4e9b-9b3e-0077a089f0ad',
                'PLF-018',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '885c518e-94c9-41b7-8076-0e6b9cc5e5cd',
                'PLF-019',
                '2019-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '18b4ec2e-92aa-497c-b366-10f3758856b9',
                'PLF-019',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd741bbbf-fe9f-4b5e-a90e-e339af4058c4',
                'PLF-020',
                '2019-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '16e0b395-56de-4777-a6d6-f9d2c459478c',
                'PLF-020',
                '2020-04-01'::date,
                1470.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fca7ded2-f039-4393-8636-3574b16026a8',
                'PLF-020',
                '2020-06-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8dff0c9f-8e55-4976-aa06-cdf01e840558',
                'PLF-022',
                '2019-07-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e307555f-75fe-43db-b1d4-edfbc3ba805d',
                'PLF-022',
                '2019-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9d2a2ebb-317c-4011-a785-1e34ac1885f0',
                'PLF-022',
                '2020-01-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4618a419-043a-476e-a4f0-e77d33359f54',
                'PLF-024',
                '2019-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '103b996c-d3d1-4ab7-bf03-95132562a6ac',
                'PLF-024',
                '2019-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '757dec3b-49a8-470f-9049-c2a13769fb6d',
                'PLF-024',
                '2019-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8362f3c6-a5d1-4ed6-aac9-77fb617dbaa1',
                'PLF-024',
                '2019-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '50929d5b-2902-49e6-b9d8-012cda69fb06',
                'PLF-024',
                '2020-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8063f8df-7112-46ad-aa44-31593c57d66a',
                'PLF-024',
                '2020-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '16b468a4-f8ea-4317-ba99-48e2b556ebb6',
                'PLF-024',
                '2020-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd9ccd59e-95a4-4c90-8a19-4dbfa8bc6184',
                'PLF-024',
                '2020-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd882267c-b738-42f8-94d4-7d8ea5c66870',
                'PLF-024',
                '2020-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '20b5d5b5-7a1b-4c80-89be-c87cc94072ff',
                'PLF-024',
                '2020-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c99cf29e-747e-4452-9eda-e36e182720ef',
                'PLF-025',
                '2019-07-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a1173c5f-f553-498b-9079-51b9a4a21109',
                'PLF-026',
                '2019-07-01'::date,
                1400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b962c033-b638-4dce-bc29-be745d6282a3',
                'PLF-027',
                '2019-07-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1ee41694-93ba-4fdf-8d8c-b5683e353830',
                'PLF-027',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5da6d33d-ddf9-4bac-ae3e-2cc3f379309b',
                'PLF-029',
                '2019-09-01'::date,
                1300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8bdd6a90-8adb-4040-84e9-1b6cadd4f0b0',
                'PLF-030',
                '2019-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2d51ce18-7bd1-4bfc-89cb-8ad76df8112a',
                'PLF-030',
                '2019-08-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0ee3b1c-b292-41fa-8655-bc1ef9921153',
                'PLF-030',
                '2020-01-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f93958aa-0505-4570-b52b-f80669176f52',
                'PLF-036',
                '2019-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1bd50695-bea3-4a47-af02-39978d635ea6',
                'PLF-036',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8042e8ec-232f-421e-a381-940d5c2c08d2',
                'PLF-036',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd193877d-a412-4550-b5c9-fc129b4ae3e2',
                'PLF-036',
                '2020-03-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2192c375-0ecf-4cd7-837f-f57eeed5d9fc',
                'PLF-036',
                '2020-05-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4a023f42-3b68-44b9-a884-be1c1e06e2f9',
                'PLF-036',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '68d8b6cf-b4c9-4f23-bd3f-5b4b50ffdb51',
                'PLF-037',
                '2019-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '92d18c8e-372e-4328-b4a4-be5e76682bb0',
                'PLF-037',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f94f3b36-1b01-4706-bf53-333c29c254f8',
                'PLF-037',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd6dfc8d4-3a30-45b1-ba9f-0f2216de9e8f',
                'PLF-038',
                '2019-09-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6d731902-cb09-4fa2-b97e-eed5e5d7de8c',
                'PLF-041',
                '2019-12-01'::date,
                3100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f4706095-2704-4d0e-a4fa-c4d7559c09f4',
                'PLF-042',
                '2019-07-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd9c1d785-e668-442c-8b09-a305028c08fd',
                'PLF-042',
                '2019-09-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd0b11ef0-b46e-4d9c-be30-719e74e59d5d',
                'PLF-042',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '72741f5a-5a8c-4a83-805b-d9b8859e68ea',
                'PLF-042',
                '2019-11-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '211c7a26-ec69-4791-a3f0-2893d55f4962',
                'PLF-042',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e3a04c6f-779e-49b5-88e4-cc73f7af4af3',
                'PLF-042',
                '2020-01-01'::date,
                238.89,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f95f8731-24eb-4268-90e0-8bffc095bbfa',
                'PLF-042',
                '2020-03-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e4c6f9ef-4b86-4b51-82b4-1e8d9770a962',
                'PLF-042',
                '2020-04-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '85d4196c-fe67-4da8-a1a5-514854f05254',
                'PLF-042',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'eb15db41-d97f-4b61-a672-09e6413cb947',
                'PLF-043',
                '2019-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3fb9a9a8-a27d-49cd-8cd7-0b7a5b687911',
                'PLF-043',
                '2019-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '32577575-68f9-4202-ab74-2ee0bbfc3aa9',
                'PLF-043',
                '2019-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '17f0900f-ea3e-4987-b576-261d2e951b7e',
                'PLF-043',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b1b365a5-5479-4bc7-8990-bb8d4c26dbbc',
                'PLF-043',
                '2019-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fc560956-47e2-4ba8-9800-b09c79968dcf',
                'PLF-043',
                '2020-03-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4417db1b-6d7c-425d-9e6e-4789222c347c',
                'PLF-043',
                '2020-05-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7b18a97a-07c6-4e56-a7be-d504a8277c05',
                'PLF-043',
                '2020-06-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '740d93db-0ae0-4b16-add0-dec99b8a8660',
                'PLF-044',
                '2019-08-01'::date,
                2200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8c9060c9-3476-4ab5-9f52-eec4c8d4c25a',
                'PLF-044',
                '2019-12-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '67c4503b-4cdf-4974-b3fe-7d6e040c293d',
                'PLF-044',
                '2020-05-01'::date,
                2200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e824b289-ce1f-4b07-96a0-c4caef7f1c79',
                'PLF-045',
                '2019-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '76b18add-b8f6-4c5b-859c-5dc883bb595b',
                'PLF-045',
                '2019-11-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '19d250e2-ea56-426b-ab09-22121c277ee4',
                'PLF-045',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a1bb9a32-4b73-4b69-a1de-6562578d9e9e',
                'PLF-047',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6fe15196-394e-41d0-9b04-6ee57b2600dc',
                'PLF-047',
                '2019-08-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7b4fc063-9aa9-4b44-a0d1-46eaa79c0c8f',
                'PLF-047',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '381dbdb7-cbc2-40f4-b7a9-e4f72d24cb77',
                'PLF-047',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9b377bfc-410a-46fb-9156-c336ccbc8c05',
                'PLF-047',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3e4d76c1-5df5-42e2-a559-6a69d952e502',
                'PLF-047',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f0c30af3-4299-46a6-bf1f-c556eb497188',
                'PLF-047',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f3a348eb-997c-4e6b-a26c-3394707623ff',
                'PLF-047',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f2ad4df3-29ae-42d0-a363-b638ea17829d',
                'PLF-047',
                '2020-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8170e108-6425-4e24-bfc3-d80bc6f120c8',
                'PLF-047',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '94954beb-07d3-4d5a-b627-2d53d44e6e7d',
                'PLF-047',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd5dcb9d3-5c90-49c4-8d1f-306605591c85',
                'PLF-047',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9082aa25-33cb-4a3f-a560-8347c8273756',
                'PLF-048',
                '2019-08-01'::date,
                210.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fbf15a62-80d1-4bbd-aecd-ce34b354fe15',
                'PLF-048',
                '2019-09-01'::date,
                210.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b13679f6-2889-46b8-a736-c1982eef004b',
                'PLF-048',
                '2020-02-01'::date,
                1010.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '519e3c51-6a0d-4a62-ace2-35ad425eba7a',
                'PLF-051',
                '2019-07-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fb663eb9-6a28-45f7-8bc6-f0f17e854b63',
                'PLF-052',
                '2020-03-01'::date,
                4000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b45f904f-bbca-4946-a4a9-366d057bdc12',
                'PLF-052',
                '2020-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6fc420da-7883-4782-9e04-75b231e2fa04',
                'PLF-052',
                '2020-05-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9785bf4b-5e4a-4745-a38e-192d0aa23a44',
                'PLF-053',
                '2019-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '901739b3-e7f5-4e8d-bd09-2a241d085226',
                'PLF-053',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9363b529-37ea-4301-a3b2-00bb842d5a36',
                'PLF-053',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd49053ed-08da-4ac6-ae0f-73ef5c2649fc',
                'PLF-053',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1bfd2723-af62-4f1f-a0bc-d1febf9e753b',
                'PLF-053',
                '2019-11-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f70c5fb4-ee43-42c9-9a44-2f75010408fc',
                'PLF-053',
                '2020-02-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1b4b54cf-bc16-4124-a1ca-d96ce78127fa',
                'PLF-053',
                '2020-03-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cdacb1df-f85f-422b-9d03-81bab189d100',
                'PLF-053',
                '2020-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '552398e6-a890-4026-92d6-d0f23d42a12e',
                'PLF-053',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd559ef2f-118e-4a57-8307-d8128fec2393',
                'PLF-053',
                '2020-06-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd3cb660d-932d-4357-9ae4-f47576a50804',
                'PLF-054',
                '2020-03-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4bd37a3a-a41d-416d-91f7-8a52114c34d8',
                'PLF-054',
                '2020-04-01'::date,
                1200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '228bb65f-6608-40da-b4b3-dc0dbc26586d',
                'PLF-055',
                '2019-07-01'::date,
                50.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0361a6e6-2b93-4876-b949-f7fc7a622ffc',
                'PLF-055',
                '2019-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f8bbaadd-f62b-466f-85e8-235e3a2f5a1f',
                'PLF-055',
                '2019-12-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '01a3a564-db93-4960-8e4b-8d2d472a260a',
                'PLF-055',
                '2020-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2091b08e-2002-4f5c-a001-7a3aa52d7b2e',
                'PLF-056',
                '2019-12-01'::date,
                1800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '377b63f1-a570-483c-bbad-11543211684c',
                'PLF-057',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '18a4a972-c210-4246-85f9-72b16a7160e6',
                'PLF-057',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '146a9dc1-b4aa-46e9-b329-24c451f302e4',
                'PLF-057',
                '2020-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7e88784e-6d73-45ad-aef0-730c811935fb',
                'PLF-057',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0b8d9389-8d2d-4439-bd65-cea068e8893c',
                'PLF-058',
                '2020-05-01'::date,
                700.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7641671a-d791-49d9-b5de-f08a24b2a962',
                'PLF-059',
                '2019-07-01'::date,
                1100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '319c77ff-ac89-480c-984d-f11b78965faf',
                'PLF-059',
                '2019-12-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dfec7254-585e-4d07-91c5-4d86ef8cfcd3',
                'PLF-060',
                '2019-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '227afb91-0e1d-4f7f-a88b-a842363ce4ea',
                'PLF-062',
                '2019-08-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8f32eb2f-5067-4cc5-ac84-e6de4f3d905c',
                'PLF-062',
                '2020-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8f4ae6ef-c744-467d-8278-2a501de6bd7f',
                'PLF-065',
                '2019-08-01'::date,
                1500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd80625e3-8705-42db-89ea-c490cf629c8c',
                'PLF-066',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '90ede030-f5a1-4869-95c2-e64819ca5322',
                'PLF-067',
                '2019-07-01'::date,
                700.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '447867ea-e67b-4666-be93-9c9730025f1c',
                'PLF-067',
                '2020-06-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'beab6d44-eefd-42a8-b8ee-17c1f71e8fa3',
                'PLF-068',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'df52b893-4ef5-4e35-9acc-02689dddcc10',
                'PLF-068',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '37fbeff8-49a3-4ab1-8ea5-66692d72af43',
                'PLF-068',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '557e1b0a-7d2c-48b0-bee2-52f7593a2806',
                'PLF-068',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '96d4e6fa-bba3-492f-a740-44fdc3ca3fbb',
                'PLF-068',
                '2019-11-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd0c465a2-c3eb-4347-926c-91d0aaf8ae14',
                'PLF-068',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a2e1eba2-9294-4b34-8d34-97547429a9a7',
                'PLF-068',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fd736be0-f732-40d3-95e1-7634216d634d',
                'PLF-068',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd5187494-c855-4d8b-a1fc-70e757342fd7',
                'PLF-068',
                '2020-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '08bcf257-e74d-4fe9-b3b3-7721c108c2ca',
                'PLF-068',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ce4a7424-4eb5-47f0-a2c6-5bf2a4972d6f',
                'PLF-068',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '72fdd083-4c64-47a4-9e2f-4b0398161ff5',
                'PLF-069',
                '2019-07-01'::date,
                50.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ae75ea1e-a534-422a-bd4a-cac560e953a9',
                'PLF-069',
                '2019-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4b50fa4e-e389-4e7e-a8d0-3f2db97a57a3',
                'PLF-069',
                '2019-12-01'::date,
                850.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8c9c08eb-0727-4059-a81b-bcda35847f12',
                'PLF-069',
                '2020-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dabf73e3-5f6d-4767-80e2-4b8d18e13cda',
                'PLF-070',
                '2019-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fcebbbd0-663c-4372-bde2-75057f9697f6',
                'PLF-070',
                '2019-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0cd9e6f9-5000-4707-b60c-16ff828a8aa5',
                'PLF-070',
                '2019-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0e00b4b0-8dfe-4be0-9821-c6d03119fdc8',
                'PLF-070',
                '2019-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '886f12c5-cff0-4733-bcb4-d68bb9122cad',
                'PLF-070',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '584d02b5-5c79-41de-9dec-42293deb2b22',
                'PLF-070',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c5f84b3d-157f-46f7-961f-e1d0fff84077',
                'PLF-070',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7d1da6ea-90ac-477b-ad14-c4325a8ee122',
                'PLF-070',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e5ffc8ea-9867-4b07-8e19-e5566088b794',
                'PLF-071',
                '2019-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '321cf5cd-1e21-45ac-b7bd-6722ac3c1c7e',
                'PLF-072',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '378957a7-328f-40e6-8c52-1a352621430e',
                'PLF-072',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '483c6ad8-e251-4420-9406-c54023bad659',
                'PLF-072',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '725d6111-4569-4ec2-86a3-e569bdcec3ad',
                'PLF-072',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ec98dd3a-dce1-494e-9bf3-d553af398213',
                'PLF-072',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8ac5bbde-d7a7-4940-a03b-d17e000d965b',
                'PLF-072',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bfd2ec67-0279-475f-b748-93d07af80936',
                'PLF-072',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2ed3fe2c-7717-4c73-8a9e-9f117f19f3e0',
                'PLF-072',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fe219ac5-683d-4acb-b044-fd9d1b729750',
                'PLF-072',
                '2020-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dc3b86a6-f502-41a1-83ee-b33864b3a2eb',
                'PLF-072',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b97ef4ee-6dea-424c-9958-fddc591db7bf',
                'PLF-072',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fbbcc03f-b704-4ecc-b03d-b41f1dffa136',
                'PLF-072',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '73c60f96-032b-4561-870b-418108896141',
                'PLF-073',
                '2019-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3432a955-623c-45c4-a5b0-243bba01cdda',
                'PLF-073',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '36c12e0e-1a03-4b6a-aab3-f84f6fadf896',
                'PLF-073',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0616c477-426c-4af2-932a-e7f014ae3476',
                'PLF-073',
                '2020-01-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4bfb1bac-0df8-4b5b-b331-38f9408d9fcf',
                'PLF-073',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '353abdb2-0705-4d5c-bcd3-9f066838cbef',
                'PLF-073',
                '2020-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b07fad7f-71d3-472d-8001-540ac84b039a',
                'PLF-074',
                '2019-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ab1e49e0-cb89-437c-bafc-23d7ab685b52',
                'PLF-074',
                '2019-11-01'::date,
                1100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'de12901a-3db0-4a9e-a937-ed524e4186f0',
                'PLF-074',
                '2020-02-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '14853f7b-215e-4553-a047-159c72633940',
                'PLF-074',
                '2020-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '98689b28-28c3-46bb-a49a-e6ebfe3c8523',
                'PLF-074',
                '2020-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0abd437d-44a8-4a4a-af7f-768aece89130',
                'PLF-074',
                '2020-05-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '09b7550d-4e24-4174-be51-49bb9f71ebe5',
                'PLF-075',
                '2019-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '69028e77-2cda-4406-9670-42ffbc4bdbd0',
                'PLF-077',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3061f6c4-7ae4-466e-aa81-d5e0a79543b2',
                'PLF-077',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c3f8582d-0452-4ca1-9c24-4f5bece6333c',
                'PLF-077',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c7bc29c9-656b-4cb6-84cd-dfe826e329df',
                'PLF-077',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '629f1362-ea91-4dbd-877a-478511099893',
                'PLF-077',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bae6ae2d-d177-4ab4-9e05-abfc6fa49000',
                'PLF-077',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd81b250d-1756-4f11-bbe9-50e441bc4fff',
                'PLF-077',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '021e126c-648b-4cbe-9a69-8fd899f7add1',
                'PLF-077',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8b20f517-013e-4bb6-a82f-358a596c92cf',
                'PLF-080',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e163e902-4d59-4bc7-a535-049389cada09',
                'PLF-080',
                '2020-05-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f274c516-63ea-4a8b-9d0f-c7404b347165',
                'PLF-081',
                '2019-08-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b192f180-a35e-41ec-a42b-88ea21977db2',
                'PLF-081',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2b4d3eb5-8955-4986-a937-beb1929321ef',
                'PLF-082',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c73afeed-1810-46b8-863d-8b431dc98bd4',
                'PLF-082',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '48d280c7-4013-4f34-b415-e758efb8cf82',
                'PLF-082',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '12caaf42-17f3-4923-b339-f85a3e201b97',
                'PLF-082',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a069699f-e113-4912-89e4-1510e70ae645',
                'PLF-082',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd430dbc3-7526-4773-87db-2f049cc93118',
                'PLF-082',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '35bc9932-4822-44dd-8701-12461e8c9d0f',
                'PLF-082',
                '2020-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f0d5e9f5-d5c2-4725-9905-220ff5aa8886',
                'PLF-082',
                '2020-03-01'::date,
                700.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bd04ecd4-f7f2-4b67-bca4-8531e1cf09ef',
                'PLF-082',
                '2020-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0f016d51-ec9a-483f-9717-803f3fd8c0e6',
                'PLF-082',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'da853979-2d6b-4da9-9a00-32f7e3180d77',
                'PLF-082',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0827ca6-e888-427f-9baa-9395f4d59def',
                'PLF-084',
                '2019-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5ec28bc5-9505-46e3-a576-4e99f334ce26',
                'PLF-084',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9e0046eb-e5ab-4ff9-91de-d9d09b53a778',
                'PLF-084',
                '2019-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9c8ac1aa-9fef-4458-93bb-260a29ee4c73',
                'PLF-084',
                '2019-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7bb7d2c0-426e-4465-bd5f-007acb483972',
                'PLF-084',
                '2019-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0d829029-97b9-4fb0-b5bb-51abf0e52f11',
                'PLF-084',
                '2019-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4b30ce0f-be80-4b9d-86fd-bb3914ce12a7',
                'PLF-084',
                '2020-04-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8fa086cf-c94e-4650-8e68-39a454151fe0',
                'PLF-084',
                '2020-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9f0fd7e8-e990-4f34-bbe6-fd103eccffb1',
                'PLF-084',
                '2020-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0d5551a-3031-4958-a2c9-2765fa59d975',
                'PLF-085',
                '2019-07-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0a01e986-b689-417d-9e18-09516e33fa0d',
                'PLF-085',
                '2019-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c35b2034-9bdf-4709-97ab-29141942f8d2',
                'PLF-085',
                '2019-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '74e9264f-fd2c-489f-930f-adc9f3b9f598',
                'PLF-085',
                '2019-11-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e0c02b9f-3fae-4c37-a4bf-2937105e5cff',
                'PLF-085',
                '2020-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e56dd532-68d0-4191-b788-20cf1379fa00',
                'PLF-086',
                '2019-12-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '365f21c6-3c06-4165-8d3f-679e968fb4c2',
                'PLF-089',
                '2019-08-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a2231ccc-5017-4e22-942a-bcda153581a4',
                'PLF-089',
                '2019-12-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8ffc58da-bb79-47bf-bce1-41cf6931930a',
                'PLF-089',
                '2020-02-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bb324d40-a687-4077-a1b1-4439ba5883f4',
                'PLF-001',
                '2020-07-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a74cecef-9c9b-410e-aca7-4cd41e700eeb',
                'PLF-001',
                '2020-12-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3cc84bb0-dfa3-4958-9292-e987da628a7c',
                'PLF-001',
                '2021-02-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f6c9d065-a868-4e8e-b6b3-282580f8497c',
                'PLF-001',
                '2021-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'eca5766a-8a61-49e1-ab85-aeed1021c793',
                'PLF-002',
                '2021-03-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '93cc6df8-86f7-4af7-9327-29ba6ace300a',
                'PLF-002',
                '2021-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'deb1835a-fe5f-424b-9692-aac480b69cc7',
                'PLF-002',
                '2021-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '016bd5da-39ce-4e15-a99b-7f89cb2d0638',
                'PLF-002',
                '2021-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0f26f3a6-919e-47d1-925f-3ead77f1fbee',
                'PLF-005',
                '2020-08-01'::date,
                1088.67,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ec67f808-4848-4a7b-b665-3421062847dd',
                'PLF-006',
                '2021-05-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '48fa90e6-902a-47f1-a387-9fb69683e748',
                'PLF-008',
                '2020-10-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8049f225-1714-42e7-910c-d85671fbe803',
                'PLF-008',
                '2021-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '59875285-8612-4ce9-9fdd-2626a00448fd',
                'PLF-009',
                '2020-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '31b6c97a-e654-4b61-826f-2459c639dc8e',
                'PLF-009',
                '2021-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0339a557-fc87-4451-bf80-f27bd16fb444',
                'PLF-009',
                '2021-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd18f1a4b-9816-4128-9dfc-6fc9be146b59',
                'PLF-010',
                '2020-09-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0b65f7e7-f7d5-4bc8-9830-57901106e84a',
                'PLF-011',
                '2020-08-01'::date,
                950.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '55178702-6468-4835-b9ba-cc971767902b',
                'PLF-012',
                '2020-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c45d5918-deaf-431a-9753-d31673833169',
                'PLF-012',
                '2020-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e5099767-03e4-4a8b-bd45-cb16ef936be1',
                'PLF-012',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7ade7346-9e70-43fe-a1bf-3e7a955a54b3',
                'PLF-012',
                '2020-10-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '674ef488-79a0-4424-93d4-7435b0ce9766',
                'PLF-012',
                '2020-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e1fb06bb-0c4d-42d4-8594-0d54181b1428',
                'PLF-012',
                '2020-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '64d4ef44-77b0-42c5-a74c-a5b53ffe1f5b',
                'PLF-012',
                '2021-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2af19476-ed24-4603-8513-1f0244aa8f9c',
                'PLF-012',
                '2021-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '95cf1110-2e14-4734-a239-7175552195d9',
                'PLF-012',
                '2021-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '737eabf1-7838-4708-b04c-b1eb8674720a',
                'PLF-012',
                '2021-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd474a1e3-73f1-44f7-98f0-39c0be91a337',
                'PLF-013',
                '2020-10-01'::date,
                1200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '838774bb-5253-4b98-a8ee-ba81f8460a33',
                'PLF-013',
                '2020-12-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bd2508f6-62e3-4d29-a4b3-6351c65fa982',
                'PLF-017',
                '2020-07-01'::date,
                1500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8e825dad-c1d5-488e-9aa1-e6eadbdcd75c',
                'PLF-017',
                '2020-08-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e5b985b5-6bc5-4bf5-877a-a65032f13e30',
                'PLF-017',
                '2020-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '343bd3b3-983b-4036-9873-4b546f584942',
                'PLF-017',
                '2020-10-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1c7efd26-a62e-4934-99a8-f851ae2cabd3',
                'PLF-017',
                '2021-01-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e8084df7-0f73-4e47-bbaa-cd02b52d354f',
                'PLF-018',
                '2020-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e7a75182-da9f-4747-9f1a-305b555993d6',
                'PLF-018',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '614db3af-8b6d-403f-b39d-e3064a36ad55',
                'PLF-018',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a9c081ef-2e65-4c22-827a-f2b00b2cc7f5',
                'PLF-018',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e4d3fcd1-9070-4194-a99d-4c0e5df244c6',
                'PLF-018',
                '2020-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'baaa3984-3a03-4570-83ec-daf6db9a4c53',
                'PLF-018',
                '2020-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1b448afa-a110-4423-aa3b-bdcd2b00984a',
                'PLF-018',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2be972ec-b236-4efc-a04d-c93367fbe7f4',
                'PLF-018',
                '2021-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b4e57b18-1706-41d8-ad3f-7aa26e5b82c9',
                'PLF-018',
                '2021-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd3811310-c69a-4740-aea4-d504f3f13eb4',
                'PLF-018',
                '2021-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '80ee1431-4646-4692-8b35-cbb796c9569f',
                'PLF-018',
                '2021-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0087a83f-be05-4cc1-a424-7e554f89546c',
                'PLF-018',
                '2021-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dcfcc071-5b9d-4d0d-b10f-b585239ff303',
                'PLF-020',
                '2020-07-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bd075237-4053-4276-a2cc-5da5e1296621',
                'PLF-020',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '03b33310-9d7e-4d82-bb92-33d4449e934a',
                'PLF-020',
                '2020-09-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '97c57ad0-74b4-4b8d-a8ee-d0851183e153',
                'PLF-020',
                '2021-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7327a7de-4150-4334-8e78-24b584c37d05',
                'PLF-022',
                '2020-07-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c5d99b82-0e6e-4799-8efc-c279215162a2',
                'PLF-024',
                '2020-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b47a3443-ce87-407c-afdf-232a5fa26fbb',
                'PLF-024',
                '2020-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '002aa6b9-f008-4773-bf31-2b4575fae7ca',
                'PLF-024',
                '2020-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '62e8a24f-5e26-4f79-baed-4d5326bb6cd3',
                'PLF-024',
                '2020-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5eede9ad-859f-4a08-b3c6-6595efd998c1',
                'PLF-024',
                '2020-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ad34b419-3ccd-498e-8c36-cea0749687bd',
                'PLF-024',
                '2020-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '513efe22-d609-4c40-b36c-66596e94388f',
                'PLF-024',
                '2021-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6e42e56b-6dd5-46e7-80f8-2ca4f1c798b6',
                'PLF-024',
                '2021-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ed78d844-89a7-4592-a76f-006f738850a9',
                'PLF-024',
                '2021-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a1072cda-ef90-4c06-861f-7bd2477d4967',
                'PLF-024',
                '2021-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e2cf0dd5-5525-4299-8550-7e05dc9af607',
                'PLF-024',
                '2021-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '170b524b-6ec0-486b-b947-b00e00dd98b5',
                'PLF-024',
                '2021-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4e84c2eb-988f-4eb8-9092-9789aa7ae615',
                'PLF-025',
                '2020-11-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a9cf82d2-4e45-49e8-837c-386117a4d4fd',
                'PLF-027',
                '2021-05-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8c3907d5-a9f0-4010-8ed2-6229ef153ccc',
                'PLF-029',
                '2020-07-01'::date,
                2200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1f0f3989-290f-4556-a5bc-33640d3d27c7',
                'PLF-030',
                '2020-07-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '64ea1506-4ded-44a2-aeff-0b7b0eb884de',
                'PLF-030',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4fe70dce-a651-4852-8de8-8766021bc4cd',
                'PLF-030',
                '2020-11-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '305295b9-d5cd-43b2-9339-c241fda70d75',
                'PLF-030',
                '2021-01-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3ee930de-ba30-427e-9ca6-d7f311eb4f94',
                'PLF-030',
                '2021-03-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f66a53f8-1c5b-4b6f-8d9e-5f9b634063fa',
                'PLF-031',
                '2021-01-01'::date,
                6000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5677aea2-1ab6-450a-86df-7ee8a51746ec',
                'PLF-031',
                '2021-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '75b9895a-b748-4c0a-9cb2-7ec41c48f1ad',
                'PLF-036',
                '2020-12-01'::date,
                1600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f8e3a82d-de4a-4971-9c70-53a8838d3276',
                'PLF-037',
                '2020-08-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'add68b9d-bcfe-4230-9c91-9aa7ece0d406',
                'PLF-040',
                '2020-07-01'::date,
                4000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5b1303ea-7867-405d-96de-6521e3882c43',
                'PLF-040',
                '2021-06-01'::date,
                2200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '227d19ef-c1e7-4ee3-a4eb-243d04a24896',
                'PLF-042',
                '2020-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '38628928-a760-4748-8187-c423cd4f4e0f',
                'PLF-042',
                '2020-08-01'::date,
                100.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'df9af577-8bae-4a67-81c4-9765c8c033a5',
                'PLF-042',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '594a021c-04c9-4644-ace4-74344d3dc0cc',
                'PLF-042',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2584a58a-dbf0-468b-85c3-5d72b340cad4',
                'PLF-042',
                '2020-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0f7741fe-cc23-46e5-8cbe-ac6798a90006',
                'PLF-042',
                '2021-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c959cd89-8933-432a-9f5c-b7c1281fdb44',
                'PLF-043',
                '2020-08-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'eac45852-8e8f-477f-8cfa-6425cbc5ac94',
                'PLF-043',
                '2020-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c1a3699b-b973-4b5e-a547-84d7afad4d4a',
                'PLF-043',
                '2020-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '29a60577-0f00-4c30-8e3f-8ebd5e9167aa',
                'PLF-043',
                '2020-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '690a8ddd-668c-4c1a-828c-a165cac4cc8f',
                'PLF-043',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7cc463bb-6a88-491b-80d3-34faea512d76',
                'PLF-043',
                '2021-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ae2d7f87-74eb-41ce-9796-e1f790ca092a',
                'PLF-043',
                '2021-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9d77e36e-75f1-47b7-ba76-9ab38eaf9a15',
                'PLF-043',
                '2021-06-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9e501927-ac80-40a6-9a35-b44a4d0ee068',
                'PLF-045',
                '2020-07-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '366e760c-2acf-4e6d-ba02-6e02873c162b',
                'PLF-045',
                '2020-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5aebc303-ce37-4b24-a12a-9238a5a8f0a6',
                'PLF-045',
                '2020-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ad68586a-cbde-40e4-999d-25d035ef3cc3',
                'PLF-045',
                '2020-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '77c8f11d-0cd2-4228-a766-0dcc27ac2f8f',
                'PLF-045',
                '2020-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1fc65dd2-d7b7-45b0-afd9-70bb14f45e7e',
                'PLF-045',
                '2020-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b1f21ce5-6df2-4474-b41f-4b3ebaed8909',
                'PLF-045',
                '2021-03-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6a8213db-53df-4712-8da6-6b58fc775324',
                'PLF-045',
                '2021-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f2a4617d-b5b4-43d6-8342-921572c2226c',
                'PLF-045',
                '2021-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '01de377a-d19a-4111-9483-6a31d61e16c4',
                'PLF-047',
                '2020-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cf3752a9-ed36-49cf-8ff9-f9e40c0ce2f3',
                'PLF-047',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '60dd6af7-b57b-41a2-8f41-8221c692496a',
                'PLF-047',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ed2c57b9-e6bf-4ce9-8835-02aba9e8cdd6',
                'PLF-047',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '10bf2d95-4303-4e66-aa14-4b6a90f71a7e',
                'PLF-047',
                '2020-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '51937216-fe3e-4d5b-a49f-e952f448ac3b',
                'PLF-047',
                '2020-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8708fe1c-4524-4f84-8b67-f19885c696f8',
                'PLF-047',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7d6d7043-a284-466a-b2bd-4f9e0e714966',
                'PLF-047',
                '2021-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '581be9be-4396-4fb2-a539-bfd90e0de5de',
                'PLF-047',
                '2021-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '68b2eabc-42f6-48d1-b8f2-96fc92c55bfb',
                'PLF-047',
                '2021-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '06cfee0c-67a4-4801-abf3-878cf2787309',
                'PLF-047',
                '2021-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c593d298-153f-43f4-8cfd-9f2cd7fc08d5',
                'PLF-047',
                '2021-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f72af2f5-1ce5-49c7-b46b-288fbcbcd16c',
                'PLF-048',
                '2020-11-01'::date,
                1130.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0279d678-b5d6-47db-abf8-1cfd57de3d59',
                'PLF-052',
                '2021-05-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f264b1ae-9084-4ab3-82e8-0cde57e4313e',
                'PLF-053',
                '2020-08-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c3357437-d986-443e-853e-a07754716e18',
                'PLF-053',
                '2020-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '76873fa7-fe42-4563-95ba-1dc6be5b344d',
                'PLF-053',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '35f5215d-20f6-48ff-881a-b714ba9dc539',
                'PLF-053',
                '2020-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6fd83370-bc2f-46dc-8674-bcde71bb885c',
                'PLF-053',
                '2020-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2cb22ef5-0b91-42ce-82d3-a5cb3ff79213',
                'PLF-053',
                '2021-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2640df7c-c700-4f01-8a93-9602102be41c',
                'PLF-053',
                '2021-05-01'::date,
                420.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6b818e56-b426-453a-b6da-feb218fbd60f',
                'PLF-053',
                '2021-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e3705895-a53b-43cc-a409-a8b548ee5155',
                'PLF-054',
                '2020-07-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e1f3db11-1359-4e50-8ac9-623243cc34cd',
                'PLF-054',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '89b7697a-0788-4901-afd4-d0293fe2636b',
                'PLF-054',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2b0aeab3-4430-49b0-8cd1-d0bb3e63a52e',
                'PLF-054',
                '2020-11-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2518400c-9f37-48ec-9d9e-aae4c689c2b0',
                'PLF-055',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '80063f8e-ba9d-4a83-b1c5-63251201d3fa',
                'PLF-055',
                '2020-10-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6103f89e-ec37-467a-9d7b-c8f2ca4efa33',
                'PLF-055',
                '2021-01-01'::date,
                410.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd89b327e-2761-43d0-bbe5-f5a306a73dec',
                'PLF-055',
                '2021-03-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dcd1dd8f-2dc7-4435-982a-9c0551ed9306',
                'PLF-056',
                '2020-09-01'::date,
                1300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '18a3d589-01a0-4c74-bf66-d4d605b5c1e5',
                'PLF-059',
                '2020-07-01'::date,
                1500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '04932710-a61c-4df9-9bc9-d5e8d896d415',
                'PLF-061',
                '2021-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '867536e5-89ce-4b6b-acd3-28688991872b',
                'PLF-062',
                '2021-05-01'::date,
                1500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3c3f2442-da29-487f-8f7f-0e0fb15a62db',
                'PLF-062',
                '2021-06-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e392351e-4cc1-4b6a-8463-449adb06fabf',
                'PLF-066',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c4a07a13-438c-49dd-bdce-0e3575c3d629',
                'PLF-066',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '344284f1-bb31-46cf-95d0-0a996d60001c',
                'PLF-066',
                '2020-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fe3fbbee-2c66-4d54-87d9-15dfd86012ea',
                'PLF-066',
                '2020-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dd58d5e2-cc73-45ec-9686-4f13b5fe08fe',
                'PLF-066',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '94cc7f3f-ac5a-4473-bed1-00f8138c2637',
                'PLF-066',
                '2021-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a2bf8393-25ad-48ee-89d6-64f356c82ea4',
                'PLF-066',
                '2021-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bae13ad0-32ef-4aa8-8fd3-718903eb3168',
                'PLF-067',
                '2020-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1be75937-1005-4f1d-b77a-87026c691b39',
                'PLF-067',
                '2020-11-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ba5d7322-8d0d-4528-a9bb-fec1f173c69e',
                'PLF-068',
                '2021-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a60e90f3-db02-46c7-a15b-bada83993ae2',
                'PLF-068',
                '2021-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9eced81c-fa45-492e-9a22-cc58e9754a21',
                'PLF-069',
                '2020-08-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0ea379c5-cf91-41e5-9f80-891ff3663c3d',
                'PLF-069',
                '2021-02-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '27dac640-862a-48b9-89ed-023bff2b392f',
                'PLF-069',
                '2021-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '48c20cbc-31e9-47fc-b107-bc737510b853',
                'PLF-069',
                '2021-06-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bac196c1-2159-44ba-bda2-3ba53a1d8090',
                'PLF-070',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0cdf23c3-7029-4f79-84ae-981354d9c063',
                'PLF-070',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fa8c24ea-62c1-42cf-b4f0-4aa901daabc6',
                'PLF-070',
                '2021-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fb265692-5939-414b-8dca-bff9b40da411',
                'PLF-072',
                '2020-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bc449660-72ea-4f90-bd82-a0e29b6ad719',
                'PLF-072',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd81a0e7c-efc7-49e2-b315-33de3af8ebc2',
                'PLF-072',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8fbc04a7-73fb-4ea4-9aea-b9cc2d835d12',
                'PLF-072',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1deaccd4-71f4-4e27-9b55-d1c1114d00f4',
                'PLF-072',
                '2020-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ac521eed-8502-4655-9546-ac08b9af5cc7',
                'PLF-072',
                '2020-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a3d04240-e800-4ed3-b7cc-901a7d1e12de',
                'PLF-072',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '34535e65-8f08-4b4e-99c2-71f41a3dbb96',
                'PLF-072',
                '2021-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '83c18aaf-0477-4a1f-867f-9d0630f523cf',
                'PLF-072',
                '2021-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8aa5070a-2dca-4f98-b1e8-31a06566d994',
                'PLF-072',
                '2021-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ffa39d79-973c-46f5-b400-4e4c1ec6b133',
                'PLF-072',
                '2021-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '14fde45a-7d62-44df-ba3e-36f23cf03ea2',
                'PLF-072',
                '2021-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a56da775-ca20-49f6-bd05-12f58fbe2b8d',
                'PLF-073',
                '2020-09-01'::date,
                1415.15,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '72e581b2-ea69-40dc-8c05-3abcdcf770a1',
                'PLF-074',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '70680251-4198-4520-be29-f1a509ab6bed',
                'PLF-077',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5a582927-f430-498d-9f6d-037ce2756545',
                'PLF-077',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '66034b7f-32ed-4c2b-8d2d-e5f0f28120de',
                'PLF-077',
                '2021-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4b3cb812-ff97-40c1-84ba-ed99d4b8d84f',
                'PLF-080',
                '2020-07-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8d9b3543-38a9-4c5c-969e-c8b2bb01f5ee',
                'PLF-080',
                '2020-08-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9f15a4d4-dc0a-400f-bb47-60b910b376c2',
                'PLF-080',
                '2020-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ff5d9829-715e-411e-99dd-91997c12c84d',
                'PLF-080',
                '2020-11-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6efe054b-ec83-435c-92b2-3c4af794c9ed',
                'PLF-082',
                '2020-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dafd6911-b67d-4914-923f-768aa5fdb25a',
                'PLF-082',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '436fea77-3f58-42b1-8e9a-d186128a0b6f',
                'PLF-082',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '45aa5825-5ced-435e-b615-5e9f8b4aa886',
                'PLF-082',
                '2020-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bcd889ca-2437-4a46-a1c2-7e287a4a837e',
                'PLF-082',
                '2020-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dbf33daf-739e-4a68-9d40-167b2e4163e2',
                'PLF-082',
                '2020-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1496cf26-9ca2-46ac-84fe-bcab5d9ea516',
                'PLF-082',
                '2021-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ccce171a-d55a-4bc5-94b1-4fbdb16fa65b',
                'PLF-084',
                '2020-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'de5f5bc3-96c7-4f3b-8a55-9e497a70e0d3',
                'PLF-084',
                '2020-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0c68f9e7-9ccf-4bfe-8a5a-c386e2701f4f',
                'PLF-084',
                '2020-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e76204b8-78e2-4100-8acb-c18884a40e0c',
                'PLF-085',
                '2020-07-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '144625e8-eece-43d7-b277-1482bdf88209',
                'PLF-001',
                '2021-07-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd3d87c34-f1bd-4853-bf17-26f20b943ee1',
                'PLF-001',
                '2021-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ce4a61f7-24f2-4a47-8dbc-587b49136955',
                'PLF-001',
                '2021-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'addcc37e-5599-4c25-835f-961e8d0d7270',
                'PLF-002',
                '2021-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0923cfa-f929-40e3-a055-5fab182c3cb7',
                'PLF-002',
                '2021-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd5c7a2c2-b1c6-4a5c-8475-dcc673607602',
                'PLF-006',
                '2021-08-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '156584ac-029b-42c7-9b2c-be5ac52a3871',
                'PLF-009',
                '2021-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8efbc934-98cc-4e9f-afa1-95c0e26968c9',
                'PLF-010',
                '2021-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9758a90e-00e7-4769-ade0-d1e953438935',
                'PLF-010',
                '2021-09-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6fcbd85c-dc91-4560-bc6f-d006159aaebc',
                'PLF-012',
                '2021-07-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '38693f67-207c-42b6-a68a-bd31a8a05ed2',
                'PLF-012',
                '2021-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '32725bcd-7811-4914-8052-3cd96a8dfa8f',
                'PLF-024',
                '2021-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8b647fa5-4428-4158-b07b-b57dffe30ca6',
                'PLF-024',
                '2021-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2fc67b91-9913-4611-8953-22a3e6554236',
                'PLF-024',
                '2021-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '04a2e397-d77b-4575-bc6d-b7a2c789e4f0',
                'PLF-024',
                '2021-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'acdee31e-2d32-4864-9a78-11afc097160e',
                'PLF-025',
                '2021-08-01'::date,
                1200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0a22241f-f40a-498b-8799-82d2b2d48b3a',
                'PLF-025',
                '2021-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '701c40f6-e0ad-486d-8d03-0da3e1e2708b',
                'PLF-025',
                '2021-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0f4b0c09-7d72-4ccd-8e3c-2b022ed0cfad',
                'PLF-030',
                '2021-07-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '555677a2-9415-4975-b943-9b5ccb33fa40',
                'PLF-030',
                '2021-10-01'::date,
                1400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '16406c92-8444-4512-aec2-84829692099b',
                'PLF-031',
                '2021-08-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd4c9deed-b2d3-4dab-8de6-4fb63c90e63a',
                'PLF-031',
                '2021-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cb34f788-f470-47a1-afa6-7247e1fdff4f',
                'PLF-031',
                '2021-10-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '66fbf1a4-c322-4b52-aab1-e5d724f1ed1c',
                'PLF-033',
                '2021-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '386c1b11-1d78-4b75-8556-22217243f258',
                'PLF-042',
                '2021-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '06df6b39-c86a-4701-ab76-1ccb836a7a80',
                'PLF-043',
                '2021-08-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f3671112-7bed-4111-a985-5ad2823103a0',
                'PLF-043',
                '2021-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a702e76f-e0a1-4629-aedb-bc0a2a60c006',
                'PLF-045',
                '2021-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '75ed74a7-60fa-40ac-8ca8-458d4fc55a69',
                'PLF-045',
                '2021-10-01'::date,
                1400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '947e3268-2ee0-4a48-9a17-4729084afbd8',
                'PLF-047',
                '2021-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0dd43a4d-eb2b-4823-b929-7ba521b941d3',
                'PLF-047',
                '2021-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6cc7c977-a697-4f84-8718-01d766c21020',
                'PLF-047',
                '2021-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e53e1eaa-1a13-4ae0-a892-73f22dca61a8',
                'PLF-047',
                '2021-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a2da185d-3e1f-46ff-a30f-6e8e1c6bdd59',
                'PLF-048',
                '2021-09-01'::date,
                1200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2f0ebbd5-8e31-40a9-ac38-c09a921cdc4e',
                'PLF-052',
                '2021-08-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd4fa0e29-f112-4f1f-a23f-47bc45d85b3d',
                'PLF-053',
                '2021-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ab8d8f34-85cc-46f7-bece-2aa98fc26609',
                'PLF-053',
                '2021-09-01'::date,
                750.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd284509b-115a-4b8d-aa64-7e8cf2507899',
                'PLF-053',
                '2021-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cd213e1e-bf2c-46cd-962c-937b1dabbcd7',
                'PLF-054',
                '2021-09-01'::date,
                1200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '062cc78f-c5cb-465a-a96b-b48916ce50bb',
                'PLF-055',
                '2021-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '929e68fd-d39d-43bf-ba6b-620c91c4eaec',
                'PLF-055',
                '2021-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8a669d89-bfbc-419d-9a3e-fd9df38f1d14',
                'PLF-055',
                '2021-10-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6272e03c-e14a-46a5-8840-2c391c49a787',
                'PLF-061',
                '2021-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'eb3fb6f7-a961-47d3-9bcc-883883a236c6',
                'PLF-067',
                '2021-08-01'::date,
                1200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b6b41da5-7364-46d4-b552-64e2a3c23801',
                'PLF-067',
                '2021-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f4613014-7f9e-489b-a0cb-e19b52cce31a',
                'PLF-067',
                '2021-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '974f92f4-67ee-4dfe-bb7d-55ce4e3781a4',
                'PLF-069',
                '2021-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bbf9f015-43cd-4d5a-8331-4a7ebf38c50d',
                'PLF-070',
                '2021-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '97834daa-2d1f-4c70-8924-82a84fc262d3',
                'PLF-072',
                '2021-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '104bd3dc-af55-4c57-808f-00b04c71c57e',
                'PLF-072',
                '2021-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4a2eb678-5872-4a18-bd19-941dc0bc86a3',
                'PLF-072',
                '2021-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'caf79f9d-67ec-4d8a-b91b-635e6128cf9d',
                'PLF-072',
                '2021-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '77f08c43-4814-409d-af94-629185b5f1bf',
                'PLF-074',
                '2021-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'abc805ce-47a5-47c9-9f5b-7fbe7a07be5f',
                'PLF-077',
                '2021-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '89288da6-f758-4157-b31c-4308ae067eff',
                'PLF-081',
                '2021-07-01'::date,
                3000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '60a51116-7f52-4e51-81d8-b4a10c0d43e2',
                'PLF-081',
                '2021-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b7a117b5-a08b-4bfa-ab0f-f15b21fda539',
                'PLF-001',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5a7665fd-1ff3-4c52-af78-5281bdaed4f7',
                'PLF-001',
                '2022-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '51561a4c-9c4c-493e-9f9f-034f6e9b2fcc',
                'PLF-001',
                '2022-02-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '07cb32a3-d94f-47fc-aed1-5cae1d2bf9cf',
                'PLF-001',
                '2022-04-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cbbd0c07-d316-4daf-ada7-cfff8939b505',
                'PLF-002',
                '2021-12-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cd946518-8af2-4001-afeb-88ea9faebbcc',
                'PLF-002',
                '2022-01-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b086acbf-b933-4eea-ab20-fad206cdf5f2',
                'PLF-002',
                '2022-02-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e2c06190-cc41-4890-94c3-306a59baef67',
                'PLF-002',
                '2022-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '349b037a-eafb-47f6-86a1-fa0976388591',
                'PLF-002',
                '2022-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '30def36c-a4f2-4ccb-81cf-7528c4c143d3',
                'PLF-006',
                '2021-12-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b9c20376-1757-4dcb-9639-87ebd138bc57',
                'PLF-008',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fefacdd3-0ade-4c5e-9201-49931f68419c',
                'PLF-010',
                '2021-11-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b04781f3-81ec-48e8-8624-8fd739d3f892',
                'PLF-012',
                '2022-01-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '22620d7e-9337-4524-bd4b-11d17970c99d',
                'PLF-012',
                '2022-02-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '18aea221-a5e0-4d7d-bbe8-e74fb94c8444',
                'PLF-012',
                '2022-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '69b1a185-7896-4e4e-8a94-3c48ba717391',
                'PLF-012',
                '2022-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5cf20480-4606-4ec8-a0b9-804d4bc26d5c',
                'PLF-014',
                '2022-04-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a53f68ed-e955-40fd-8062-fc139f0ba63e',
                'PLF-014',
                '2022-05-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '26aa8c38-b793-4137-862c-c1f4166b89ee',
                'PLF-017',
                '2022-03-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '20c56620-5698-41a6-9622-27f3d7e3722f',
                'PLF-017',
                '2022-05-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '943bb1eb-ca72-44c3-9f10-97e41b890ab5',
                'PLF-017',
                '2022-06-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9e5758ae-3ba1-491e-9148-1cde761868b1',
                'PLF-018',
                '2021-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '28b19d0e-232a-4af1-abf3-335e892e3300',
                'PLF-018',
                '2021-12-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dff19614-02bb-4a93-91b5-27af8abd8454',
                'PLF-018',
                '2022-03-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5e8c02d5-4ba2-4722-bcb8-501c35029286',
                'PLF-020',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6e05970b-b501-40f4-9295-c4c272d3fc41',
                'PLF-024',
                '2021-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ab7d69c2-512c-4c5d-9ff4-ebb81e60fec6',
                'PLF-024',
                '2021-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e0e0a8f0-d838-47cc-b023-a37c44ca42f6',
                'PLF-024',
                '2022-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '43f0ccd3-6b81-4654-9983-dd10ba81d050',
                'PLF-024',
                '2022-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ff39f4b7-dcfd-4c21-be0c-33247a2a2fea',
                'PLF-024',
                '2022-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '13796975-6f3d-4fee-8ae8-8069ee5dc267',
                'PLF-024',
                '2022-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1944b7ca-37b5-45d6-8a96-fed119eb9061',
                'PLF-024',
                '2022-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ede82b43-475b-4102-bb27-97d15ddd617c',
                'PLF-024',
                '2022-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fd40c406-1382-40f5-b107-d242714f5865',
                'PLF-025',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f087ff6c-c6cb-4973-bf83-2bb946df3304',
                'PLF-025',
                '2021-12-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4760c0b6-3468-41f4-abb7-ff82c2da0fe4',
                'PLF-025',
                '2022-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c91a546f-e603-4738-b8a0-db82b1435ea5',
                'PLF-025',
                '2022-04-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '89558043-f9e3-47ba-bc5d-9ac8788da85e',
                'PLF-030',
                '2021-12-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3ae174dd-eaca-4bde-b87e-70762885696d',
                'PLF-030',
                '2022-03-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6a078d96-453c-47bd-a44d-a96cb89cb46f',
                'PLF-030',
                '2022-04-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c7e4ed3d-a66a-46fe-88d3-9ee2823005d4',
                'PLF-031',
                '2021-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '23aabbf0-fe23-473b-8569-97d8c2db4e4e',
                'PLF-031',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '160d361a-a574-4ee0-9e1c-52d2906bd5f0',
                'PLF-031',
                '2022-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '178e3b29-df50-47e6-ac8b-52b9ad2de57d',
                'PLF-031',
                '2022-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '356a7b59-cbdc-4e35-a3a5-1ad9b9538b9b',
                'PLF-031',
                '2022-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2a51ecfa-0db9-4f56-be82-82991fca10e3',
                'PLF-031',
                '2022-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '52561749-00f9-4d0b-ba99-3315c137462d',
                'PLF-031',
                '2022-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd5dc7c62-05a5-467f-a67f-6b583eec3b07',
                'PLF-033',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b7da5241-9fd1-4b93-88d9-123661a2960a',
                'PLF-035',
                '2021-12-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '544eb2bf-3d77-401c-8966-33c343ab6c7d',
                'PLF-035',
                '2022-01-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '978359b1-4ea3-4ab2-9a66-a92c436cfb5a',
                'PLF-035',
                '2022-05-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9339b442-1246-4940-8b74-c7edf6840180',
                'PLF-035',
                '2022-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8ae29757-b045-4ad8-99ea-2955465cb183',
                'PLF-037',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '016806de-e5aa-4e7f-a523-6f312ffa6728',
                'PLF-037',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '37f0c315-0340-4fa5-aae3-760a33c6bc1c',
                'PLF-039',
                '2021-11-01'::date,
                390.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8f1b2114-75ec-4ec6-9f94-ef1b7f14512a',
                'PLF-039',
                '2022-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a3a3a4d8-0aa6-4d4c-9641-a17bfcdaeab3',
                'PLF-042',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e1e29f44-6f32-434b-a47d-dd970d4cd8e4',
                'PLF-042',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a00aba59-5178-41ce-9798-ec8284b61d1a',
                'PLF-042',
                '2022-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd21464dd-57dc-4196-a10d-452bb2e9fec8',
                'PLF-042',
                '2022-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '35e544fe-d012-4a60-aac3-7857c4bd9827',
                'PLF-043',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c3c9874f-3ca0-4a81-b4a8-572ed89a5de8',
                'PLF-043',
                '2021-12-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '281b9634-1719-46a3-840e-506f66402810',
                'PLF-043',
                '2022-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ad64cceb-dfe8-4f24-8456-dd3d472ee2bb',
                'PLF-043',
                '2022-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '21117de9-2f93-4569-98f2-d2461291a3fa',
                'PLF-043',
                '2022-04-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c4b4bb41-a951-449f-9c38-bd063c5c7cb2',
                'PLF-043',
                '2022-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c552f840-59f4-4ffa-9eaa-f86ee6443716',
                'PLF-043',
                '2022-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bc7a0b76-0db0-4e14-a967-0f8dafec4045',
                'PLF-045',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2b82afa3-5d41-4a3a-b4a5-696f95fe6e55',
                'PLF-045',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2039afe0-a697-41dc-bb71-ea7dbd7d620e',
                'PLF-045',
                '2022-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b325deb0-bb9f-4760-97c1-4730a1f0fda3',
                'PLF-045',
                '2022-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '27df9d16-5158-49c2-b839-8cd7e56bf60a',
                'PLF-045',
                '2022-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c2173c97-994b-4c78-a69b-ccfc5839b17a',
                'PLF-045',
                '2022-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9b3b1302-7f16-4d48-a521-520bc817f6fa',
                'PLF-045',
                '2022-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f7159e76-16d6-4787-80a6-5f4d723bc8cf',
                'PLF-045',
                '2022-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '94c6df27-a28e-4b43-8bcb-6ed20d9649d6',
                'PLF-047',
                '2021-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '748636ac-c4c4-4880-90ae-d928478ea902',
                'PLF-047',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a200d4aa-5c11-4919-9f14-95b24fc2f441',
                'PLF-047',
                '2022-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'da45fad8-a220-4cf5-8042-9581f3f155e1',
                'PLF-047',
                '2022-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '756416df-d9db-46dd-b9a5-058cfcf83f53',
                'PLF-047',
                '2022-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '52903c83-39a4-4a94-a18c-6b253ef153d3',
                'PLF-047',
                '2022-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd0b800b7-33a6-4e3e-9ef2-bd56ec1580e7',
                'PLF-047',
                '2022-06-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '07e9adb6-a001-4e5c-9e17-eae1043df2e8',
                'PLF-048',
                '2021-11-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '208f9fb5-4026-41b7-8017-63e8843f226a',
                'PLF-048',
                '2022-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ebae66ca-4fe3-4ec0-8bf7-376324e4b375',
                'PLF-048',
                '2022-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'de0f6efe-e702-477c-9dc8-f8da974fc279',
                'PLF-048',
                '2022-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '88233cb0-246d-4773-816d-d53aa9e3525f',
                'PLF-048',
                '2022-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7e283b9f-7e01-42cb-90fd-08a32fecde64',
                'PLF-053',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9867b70f-a04c-4a53-822a-7ee1af826c43',
                'PLF-054',
                '2021-11-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cd4bdea6-2e71-404d-8148-f1792bb86c01',
                'PLF-054',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '16eca20c-b1e3-498a-94ca-12af42123787',
                'PLF-054',
                '2022-02-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0a72b68-0bdb-4440-b10d-efef91acf224',
                'PLF-054',
                '2022-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '69f36633-d101-4d08-ae28-64b05bd16512',
                'PLF-054',
                '2022-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1250efc9-7775-4502-a6fa-813e3847d202',
                'PLF-054',
                '2022-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4befa8a2-f8f4-4b24-b430-c6f667595cbf',
                'PLF-054',
                '2022-06-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0fa66e16-6ff9-4580-a79f-7350d9386c4a',
                'PLF-055',
                '2021-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a92f8fb6-0db3-4487-a541-776d04b19d72',
                'PLF-055',
                '2021-12-01'::date,
                650.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8809ef82-eb39-42a2-8fed-7f896278009a',
                'PLF-055',
                '2022-01-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f0d0eaef-dc91-4efb-9253-879760a835f1',
                'PLF-055',
                '2022-02-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '590ca4d5-e988-4c3a-998c-35007fcc56fa',
                'PLF-055',
                '2022-03-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '93207ea5-804c-45df-bef7-227a59b6b647',
                'PLF-055',
                '2022-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5405cceb-e0e7-4a8e-af04-31362f0e6e70',
                'PLF-055',
                '2022-05-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '12122bc3-0cd0-432d-ac0f-699980036f94',
                'PLF-055',
                '2022-06-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c7dd0670-b56e-4bc3-b250-a13bf060bf75',
                'PLF-059',
                '2021-11-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ebabcdee-1222-4fc0-a462-d7d43f7bd764',
                'PLF-059',
                '2021-12-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '89388e16-ec9c-4fe9-88a5-1af71d8647e3',
                'PLF-059',
                '2022-01-01'::date,
                2250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ebbfe41b-5e94-4aec-b460-26cc96debc3b',
                'PLF-059',
                '2022-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a88f471c-c463-4cab-a59c-53ac3e477b1b',
                'PLF-066',
                '2021-12-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0afe4f38-88c5-4214-95c1-ae3305a60f45',
                'PLF-066',
                '2022-01-01'::date,
                700.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '772619ac-9dd4-461e-ba2b-05e8f42ed488',
                'PLF-067',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a273c49e-efb1-44cc-aa61-12fb1a60895b',
                'PLF-067',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4b037aa3-7639-4338-ae51-524884599e08',
                'PLF-067',
                '2022-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ef3034d6-9354-4de7-8791-50c9feaf03f2',
                'PLF-067',
                '2022-04-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f7e4c824-320b-4d1c-a433-02e59e9c6cd9',
                'PLF-069',
                '2022-01-01'::date,
                900.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5ee8d102-854d-4d3c-a533-1f568bcb4f55',
                'PLF-069',
                '2022-04-01'::date,
                1500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '153510d4-91e1-40cf-90a9-76dae17e7055',
                'PLF-072',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '319184ef-ec4b-4143-aa7d-d25a21b3cfa7',
                'PLF-072',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '27df691a-e826-450d-9520-18cfbaa614af',
                'PLF-072',
                '2022-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ec70df70-7724-45ca-a16e-46b5310ce5c8',
                'PLF-072',
                '2022-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '47e23014-88e9-44a6-b42a-18fab7f4b511',
                'PLF-072',
                '2022-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dbd57ff6-d3e0-45bd-ad11-056010a18c18',
                'PLF-072',
                '2022-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3c6c9256-9b16-46a0-9745-43e40a983cd1',
                'PLF-072',
                '2022-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c572318b-8ab9-4767-a9d0-9a2e7e3ccd42',
                'PLF-072',
                '2022-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c1fe46d7-13bb-4238-94e4-68895c57d84a',
                'PLF-074',
                '2022-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e910992e-a38d-4076-b42f-0f5c383e322f',
                'PLF-080',
                '2022-01-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a0a84322-b9b1-4cc2-a746-73021b472774',
                'PLF-080',
                '2022-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'da2a4338-b415-4911-ace6-c72347b723d4',
                'PLF-085',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'deed3428-c82d-4744-be2d-4aaaa4569e17',
                'PLF-085',
                '2021-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e1960ca2-d741-47ef-bf8a-a02ed3d8563f',
                'PLF-085',
                '2022-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a16883be-1101-4d1e-b069-0a1b83a5b4d3',
                'PLF-085',
                '2022-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bc5bb1ec-e374-44ca-b197-d91d45af42a6',
                'PLF-085',
                '2022-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '866cde94-6b40-46b8-b489-cb13648d7793',
                'PLF-085',
                '2022-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '201c27d5-c58a-4964-8d96-38da3c654d9d',
                'PLF-085',
                '2022-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '83b2f054-7353-40f8-bd22-8a937f746257',
                'PLF-087',
                '2021-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c9e23e0a-2578-4937-9d39-49ed1e2a3a2b',
                'PLF-087',
                '2021-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd27eb678-7c89-4cf3-816e-2ffe109134fc',
                'PLF-087',
                '2022-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd88dd184-1559-4f46-8267-1281a5d05a39',
                'PLF-087',
                '2022-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '62f0f69a-db4e-4d2b-a792-ad3b36e1be28',
                'PLF-087',
                '2022-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0dbc1882-8c2d-40da-ad27-a4e4553cd027',
                'PLF-087',
                '2022-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd9a85f8a-0234-4287-b34d-12a3b07a0af0',
                'PLF-087',
                '2022-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '06959e01-72a7-44c0-90d7-0930d755bd8f',
                'PLF-087',
                '2022-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0d9d8ab8-6d0c-4875-a9ef-f1ce2d9f7c28',
                'PLF-089',
                '2021-11-01'::date,
                1200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '04252324-9da2-42a5-9ff4-80c51e30a632',
                'PLF-001',
                '2022-07-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4fc43457-dc69-4800-8fef-c165888bf6ef',
                'PLF-001',
                '2022-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd5bcca04-84da-4242-93c4-5171429c47a5',
                'PLF-001',
                '2022-11-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '27b31944-550c-4335-b4ed-ae5c67a5c908',
                'PLF-001',
                '2023-02-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '76c6e03f-26a7-4023-b115-e41e9e7b3222',
                'PLF-002',
                '2022-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8c3c668c-039e-4561-a31a-42f765ef03c8',
                'PLF-010',
                '2022-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0483e4e-0d6c-459b-b9b9-c1a7fdad433b',
                'PLF-010',
                '2022-08-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cd10a136-3e0e-40ae-b06c-cfdb0285bcc8',
                'PLF-012',
                '2022-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a3a6b9e4-3582-4f77-ace1-7aa68dada865',
                'PLF-012',
                '2022-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5a0c8ef5-04a1-4b7b-b4c5-b21c403d69c8',
                'PLF-014',
                '2022-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5785ebb1-c1bc-4bcd-8806-dfc5a4a78a3a',
                'PLF-014',
                '2022-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '84a4ba8e-0fd7-4788-9e11-e125a9cfef6c',
                'PLF-014',
                '2023-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '47e9c0e0-0fe8-47fa-86d6-4fc621da2371',
                'PLF-017',
                '2022-10-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f8dfa32c-5952-4749-b1e7-8becbaffbe93',
                'PLF-017',
                '2022-11-01'::date,
                1500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '36970e97-3d0d-435d-b8de-29dd937a2fdf',
                'PLF-018',
                '2022-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c275ad7a-787a-4309-a0bc-a2b5deef1d6d',
                'PLF-018',
                '2023-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5e8bd764-fdf1-4c26-91de-1acf76d0f6d6',
                'PLF-018',
                '2023-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd56a8733-ac7b-47f5-a11e-a4b1c7a7e705',
                'PLF-019',
                '2022-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ef8b36d5-9891-4e3c-aa1b-4424a992a974',
                'PLF-019',
                '2022-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '459d3063-a199-491f-90be-0f1de4b445e8',
                'PLF-019',
                '2022-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '60a18b97-1f28-49f7-869f-7ca2142e89c6',
                'PLF-019',
                '2023-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '382d9a7f-85d9-45fa-911b-b246c7b94d34',
                'PLF-019',
                '2023-06-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a3fed2fa-57e1-4dc1-93d8-5fe98f9172b9',
                'PLF-024',
                '2022-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1fd3463b-8193-4f7e-8221-d7b8d34867bd',
                'PLF-024',
                '2022-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '21380eb7-e2ed-4ea3-acc7-70ef0208d40c',
                'PLF-024',
                '2022-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '69b03441-8ab8-4956-b183-57b243c8d068',
                'PLF-024',
                '2022-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '443fbaeb-841c-43d2-9c25-999c08e14241',
                'PLF-024',
                '2022-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd9e6555c-6f69-429b-86b3-b9c779588b48',
                'PLF-024',
                '2022-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '14a800a5-d9f1-4c65-816b-825d49bb5fe4',
                'PLF-024',
                '2023-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '314d77c2-fd81-4798-a7b8-4452b2f53609',
                'PLF-024',
                '2023-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2de7ca7c-4f6d-4421-a90c-15079beff9e5',
                'PLF-024',
                '2023-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7962b13c-d6d2-4391-895e-c0ccdb0863f5',
                'PLF-024',
                '2023-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '301c0d84-e480-4fad-9197-5298757cc5f0',
                'PLF-024',
                '2023-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '701e0582-a332-4913-b620-57f4d23606d4',
                'PLF-024',
                '2023-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ca9241f0-7154-448f-b43b-d026b9347c1d',
                'PLF-025',
                '2022-09-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3f0a9fda-7eea-4f1e-8b53-f4790069de65',
                'PLF-026',
                '2022-07-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b9de7575-f629-42cd-a00d-337b635024ab',
                'PLF-030',
                '2022-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '72ff5144-b952-4d3d-a92b-1cbd81997723',
                'PLF-030',
                '2023-01-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '406844e3-bb75-417f-b2df-2f6917390eda',
                'PLF-030',
                '2023-03-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9570ed52-99a5-4828-a99b-c303baf49c85',
                'PLF-030',
                '2023-06-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd38115e7-4cc8-4288-bec8-c95751c7d0fb',
                'PLF-031',
                '2022-07-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'de071706-3f2d-474e-a8b6-e7ebc63b3e8c',
                'PLF-031',
                '2022-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'debdc232-5009-42f4-8b21-c68f6b86eff3',
                'PLF-031',
                '2022-09-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '941ef9c8-b3ba-4a4b-aa55-92ff0d231f4d',
                'PLF-031',
                '2022-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '66ca6e0d-2c6b-4873-b1f2-4e79dde737c0',
                'PLF-031',
                '2022-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3bae5ebf-5b09-49ba-a9b1-0c41aeaa8233',
                'PLF-031',
                '2022-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'df926cf9-0909-4534-8948-dba9d0227f20',
                'PLF-031',
                '2023-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3518f247-29b8-4fd3-b4ab-bbbc718de87f',
                'PLF-031',
                '2023-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5ea84538-7ab7-447a-87a8-8d2e5acdfe58',
                'PLF-031',
                '2023-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '95eacce2-be12-45be-88d9-39c5505bcd50',
                'PLF-031',
                '2023-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4d2e51df-ff23-42c0-992c-27e204258457',
                'PLF-031',
                '2023-06-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '84d2f348-6a15-4791-9870-edfd012392f7',
                'PLF-035',
                '2022-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '194d09c3-87ed-4e46-8080-009bcade122d',
                'PLF-035',
                '2022-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2abe3e39-d7ea-4ede-8b39-5880e61ef317',
                'PLF-035',
                '2022-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6da23b4a-6cf3-4410-ba69-c199428e2568',
                'PLF-035',
                '2023-01-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '10fd4a7c-873c-41c7-abde-23bc051b146d',
                'PLF-042',
                '2022-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f1da510f-e072-41fb-877b-3a695dbd86b4',
                'PLF-042',
                '2023-03-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '70bc60ba-3e02-4a65-ae14-77b7ab44fd26',
                'PLF-043',
                '2022-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1f44e4cf-feef-440d-b5c7-c49ac4c50220',
                'PLF-043',
                '2022-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd5665d59-86e0-4db7-b77e-ffaf5b96da7c',
                'PLF-043',
                '2022-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd311161a-a2d4-4efb-9004-05c9333f6a9c',
                'PLF-043',
                '2022-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'af4ec8d3-f005-4f57-8286-b052af1c80f4',
                'PLF-043',
                '2022-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1c85d077-512f-4368-a6b8-425d4b887f78',
                'PLF-043',
                '2022-12-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ccbfb8d2-1236-4478-a618-42ce512e5a8c',
                'PLF-043',
                '2023-02-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f7aad5d4-9a5f-40be-bffb-f9d921c32aef',
                'PLF-043',
                '2023-03-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fdde9604-8d57-41f8-a0e4-9a4360ed3a6c',
                'PLF-043',
                '2023-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bc4d934f-898e-4e53-85d1-61896baf8c95',
                'PLF-043',
                '2023-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '123727e4-f28b-4aef-bc36-bade14d6e6b5',
                'PLF-043',
                '2023-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bd150977-8c41-421f-a411-ea69e6b59ffe',
                'PLF-045',
                '2022-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '443c4aed-5dc2-42c0-b830-2cb917e17d05',
                'PLF-045',
                '2022-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c4ea6b75-9669-4b59-b340-b72e3e1e31b2',
                'PLF-045',
                '2022-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9d069c90-0bc3-4ffc-909e-5daab624d979',
                'PLF-045',
                '2022-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e954de66-5fdf-4158-ab8d-2ce9e3725b9f',
                'PLF-045',
                '2022-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cbd0ff32-e734-4569-abdd-80e5d04b522b',
                'PLF-045',
                '2022-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0594641c-829a-40de-8eef-68c120aa1e9c',
                'PLF-045',
                '2023-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f744114c-d63b-4319-8d2f-5ae5917d5b50',
                'PLF-045',
                '2023-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3e8eaf98-21f8-40af-bd23-1a7f3ff2d473',
                'PLF-045',
                '2023-03-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3f0fd35c-c58d-4b52-b877-58dce6ca3c0e',
                'PLF-045',
                '2023-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '435f74bf-87fa-4f20-bde9-c9c7bc68f0e5',
                'PLF-045',
                '2023-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7d0938a3-3de3-4137-8963-23228e847d2e',
                'PLF-045',
                '2023-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7a68d504-6af9-4bc0-9db0-43296876fcee',
                'PLF-047',
                '2022-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4e2d2de0-7c43-438e-b6d3-851f1d06ec62',
                'PLF-047',
                '2022-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3cb708a2-fe04-4ce3-beb0-a132147eff24',
                'PLF-047',
                '2022-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e3a6b0b4-51df-47b6-b35c-e3d3e893c887',
                'PLF-047',
                '2022-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4a0abba5-21b1-4059-8eb5-c8854a55dcb3',
                'PLF-047',
                '2022-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c974480d-9580-492f-8109-3418af35b7cb',
                'PLF-047',
                '2022-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '57bfe4d8-831b-41ef-81a5-93ca71dd09a0',
                'PLF-047',
                '2023-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '82ce7900-adcd-4fba-b3fa-3500119f0d8f',
                'PLF-047',
                '2023-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9fa93ab4-f90c-4040-b3bb-427fc37afbcc',
                'PLF-047',
                '2023-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '18349ebd-9188-4325-a7d7-085855d80035',
                'PLF-047',
                '2023-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5009e0eb-2cc4-4df8-a327-a0302d826864',
                'PLF-047',
                '2023-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd4bbecf6-8cde-4895-9d25-782859dfe2c8',
                'PLF-047',
                '2023-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f1e8be8f-6811-4858-a5f6-22e403dab224',
                'PLF-048',
                '2022-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2f6f234d-b4e3-4838-a4d4-931feca44a46',
                'PLF-048',
                '2022-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1b798bfd-615f-4232-89d6-cd8a5361fc13',
                'PLF-048',
                '2022-12-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e044e4bd-c03e-4e0e-aa18-04df6e88c1fc',
                'PLF-048',
                '2023-01-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '70ad90e0-ead2-4929-b067-5f5c33c7ba93',
                'PLF-054',
                '2022-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c9f278a3-548c-46ef-bb35-70a74af0654a',
                'PLF-054',
                '2022-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2d5cb07b-444f-464f-bba9-bdc053d81e22',
                'PLF-054',
                '2022-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd297b2a4-861c-448e-85ac-a0b92501fd43',
                'PLF-054',
                '2022-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bdda4ed2-2ac4-4fc7-bafb-796c50437dde',
                'PLF-054',
                '2022-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '22713c4a-8add-4e03-8e51-f89929e70c96',
                'PLF-054',
                '2022-12-01'::date,
                450.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0eb7177-bfec-4ac0-bea9-a722788e2e1c',
                'PLF-054',
                '2023-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'de44a551-ffde-4d99-bcc7-7700f02a4503',
                'PLF-054',
                '2023-03-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f826e8af-c50f-40c5-bcba-63340eae86ef',
                'PLF-055',
                '2022-07-01'::date,
                850.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3d209259-0dd3-4930-bff1-5ae732eab87d',
                'PLF-055',
                '2022-08-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'de47af8c-8458-4d38-a551-4f964a715cb0',
                'PLF-055',
                '2022-09-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a30f690f-9b68-4bba-8ca7-d347f6156a02',
                'PLF-055',
                '2022-10-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a8a81fcb-f55d-4670-878b-1dd57d93b45d',
                'PLF-055',
                '2022-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd89a55a3-a1fe-4465-84aa-f362956fd7ad',
                'PLF-055',
                '2023-01-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '93a87151-6415-4f75-a90b-5826da250553',
                'PLF-055',
                '2023-02-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e98bbf92-5db4-49a8-99f7-a6ab036c5c79',
                'PLF-055',
                '2023-03-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7f98dfa8-c5d3-4d77-9284-094d58eefab2',
                'PLF-055',
                '2023-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '68181dfa-e54a-4444-a594-5918e1cd775f',
                'PLF-055',
                '2023-05-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a817c07d-b07f-4b40-bfaf-ada92126ab3b',
                'PLF-055',
                '2023-06-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd76de891-4dd9-4c36-a49c-f444e0789021',
                'PLF-059',
                '2022-07-01'::date,
                2750.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dd7beed9-580d-4571-85b9-f74ef785a689',
                'PLF-059',
                '2022-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0586dc22-5b20-437d-b31b-73027f7d9b43',
                'PLF-059',
                '2023-04-01'::date,
                2500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '86dea4de-1408-4c60-ad6f-7136fe21b631',
                'PLF-066',
                '2022-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f5410467-f5f2-485e-8a91-0faf7857a5b3',
                'PLF-066',
                '2023-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c4d3b49c-21b8-4e93-9910-f56609123cff',
                'PLF-069',
                '2022-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '84556e29-dc43-4847-be8d-6f9fc6c6ce66',
                'PLF-069',
                '2022-08-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e4504e69-51e8-491f-a487-cdf67036f0e0',
                'PLF-069',
                '2022-12-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e9cd05f2-bff4-41e4-9982-41b5b0ce060e',
                'PLF-072',
                '2022-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '56ccb90e-ea8e-4b8b-bae4-3663b8fabb1f',
                'PLF-072',
                '2022-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0fee686a-fb29-4483-b243-7957a4213fbb',
                'PLF-072',
                '2022-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b44ef2c0-0922-45f5-8494-831860d6821c',
                'PLF-074',
                '2022-09-01'::date,
                800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c7133681-583a-4e99-8e77-62b1182524d2',
                'PLF-074',
                '2022-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4ca42475-a11a-4301-81e9-317dce0b351d',
                'PLF-080',
                '2022-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6d695cab-18fe-41ef-b42f-7a1224595df8',
                'PLF-080',
                '2022-10-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c3918316-5b6d-4a2e-a392-523cbfa9cff4',
                'PLF-080',
                '2022-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '77b645cb-ae8c-4c58-8ea1-6da2b5c1776b',
                'PLF-080',
                '2023-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b133c621-7a8f-4211-93bb-ed5ed32bf514',
                'PLF-080',
                '2023-06-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0a6a6e13-8f80-4190-8133-ce2645e073d2',
                'PLF-081',
                '2022-11-01'::date,
                4500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '45f75c8b-9351-4a6d-b229-454ad1599485',
                'PLF-085',
                '2022-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5616f7e8-a1e9-4513-94ff-ecc944c5e940',
                'PLF-085',
                '2022-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '503a871e-7963-4384-8574-bb531e4e90e3',
                'PLF-085',
                '2022-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '10ec3c1f-032f-4c40-a18b-0b62b6f779e8',
                'PLF-085',
                '2022-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '69192ce3-2d2b-4ca4-9225-494f071a3433',
                'PLF-085',
                '2022-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ccbd6398-5675-4984-96c2-a60a1a483c17',
                'PLF-085',
                '2022-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '95d93b91-1558-4c5e-92e6-eb07273329da',
                'PLF-085',
                '2023-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a4a65e20-a499-438a-aa98-6b98d16076e3',
                'PLF-085',
                '2023-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '484be460-77cc-434a-92aa-eef61c29f7f3',
                'PLF-085',
                '2023-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1b9dfb61-a602-40a3-a027-8a2ebf05142f',
                'PLF-085',
                '2023-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5c71fc9e-014a-438d-a708-f761477ec04d',
                'PLF-085',
                '2023-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '83b6080c-3c8e-495c-b684-c425d88aebe8',
                'PLF-085',
                '2023-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c65ca934-b8f5-47e0-bb0d-a35c8d5878c4',
                'PLF-087',
                '2022-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ce9517b1-7c9f-4748-bbde-5f62e7b53655',
                'PLF-087',
                '2022-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '247f98d9-2b2e-4fdb-ab8d-58462f5fef6e',
                'PLF-087',
                '2022-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9b7b1c64-30a1-4a26-ade6-2541a067b138',
                'PLF-087',
                '2022-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cb35d2da-8c8b-4c50-b5da-afbeb3e7f8ba',
                'PLF-087',
                '2022-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9ac9f03b-9da5-4cb1-83d2-b204c6872549',
                'PLF-087',
                '2022-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '496b48a4-ced2-464b-b202-81b9a4294a2e',
                'PLF-087',
                '2023-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ab30f4b9-4bbe-44f3-96f4-2f8f6ba7eaca',
                'PLF-087',
                '2023-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd42e7128-cd29-4f10-a2c0-17177a6b2986',
                'PLF-087',
                '2023-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1cee78ee-a3c7-4e47-9e5f-7b29fa693327',
                'PLF-087',
                '2023-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a91922f8-a46e-44c3-8046-80c66fab3941',
                'PLF-087',
                '2023-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '99b7cfc0-dac3-4460-b0a5-7ab77bfcba48',
                'PLF-089',
                '2022-11-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2dbcdd79-1c13-48e1-b1f8-0783d9940530',
                'PLF-089',
                '2023-02-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '106a1f1d-1a79-4f42-b344-c26c10428bd2',
                'PLF-AVG',
                '2022-07-01'::date,
                5179.166666666667,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '16ad82c9-40a0-4bdf-96fc-470970db4919',
                'PLF-001',
                '2023-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0055e836-766a-46af-9f93-02daeff10b3d',
                'PLF-001',
                '2023-12-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '08f2f8fa-6d95-4993-b7a7-702f08e20fbb',
                'PLF-009',
                '2024-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '62d99fa4-77be-4e38-ad25-3431df1b2f09',
                'PLF-009',
                '2024-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3ae9732d-9f91-4ecf-946a-4e84ed7214d8',
                'PLF-009',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '34c20ef3-863d-4894-875d-b5ce4411bf3f',
                'PLF-017',
                '2023-07-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '55b9167a-4bf0-47f1-960d-2995c1a39cc5',
                'PLF-017',
                '2024-02-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '50300ee2-3bb0-4af1-8f6b-ff67302ec1e0',
                'PLF-018',
                '2023-10-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f981ea25-5a23-4c2b-b9b6-310d3f46ba24',
                'PLF-018',
                '2023-11-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9a905dfd-941f-4465-b7bc-6f851966dd84',
                'PLF-018',
                '2024-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '404489b1-bace-40bb-8f10-9841403ff3e5',
                'PLF-019',
                '2024-01-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cd440697-0f18-48f4-a331-4e2df0075d52',
                'PLF-019',
                '2024-02-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cc20edf8-ba2a-472b-aeee-5639170e979a',
                'PLF-019',
                '2024-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e11c290e-c6bf-46bf-975d-3732af0364d8',
                'PLF-019',
                '2024-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '809161a7-7b8d-41d5-9cbc-0bb8df97940d',
                'PLF-019',
                '2024-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '488444a2-e28e-415e-b128-e1e56f9f4a98',
                'PLF-019',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1f37e425-3f90-4505-b2ac-f7cdc9e8ea7e',
                'PLF-022',
                '2023-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '75c7a2f2-c0c4-4151-83ec-cf5298712742',
                'PLF-022',
                '2023-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e8e89182-fd90-49d7-8ca6-3734e5cec275',
                'PLF-022',
                '2023-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4d61ea5c-aef6-4bce-b96a-b3c37628403b',
                'PLF-022',
                '2023-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '12cfe1c1-74cd-4aab-91ee-8fc8319f70da',
                'PLF-022',
                '2024-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '12d4a3a2-9fd1-4885-8483-72bbe920363f',
                'PLF-022',
                '2024-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ccdf270a-3c93-4831-884a-80809f884390',
                'PLF-022',
                '2024-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f511858d-329c-40a0-b863-91fdd35588d6',
                'PLF-022',
                '2024-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '017213b8-40d4-4180-9b76-00bc8bbfc098',
                'PLF-022',
                '2024-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cca8fa7e-f5e9-4cc2-8083-8f0492c5dc2d',
                'PLF-022',
                '2024-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '625a086a-91d0-4c04-98f1-93a4e7ce332f',
                'PLF-024',
                '2023-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '68711e9d-450e-40a0-af96-49f917110b12',
                'PLF-024',
                '2023-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bc8a457c-657e-4da6-bddf-4af3efb62aa4',
                'PLF-024',
                '2023-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a4300554-278d-4bfc-be70-36524c8ce3a1',
                'PLF-024',
                '2023-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '02b2c74c-ae1f-4268-a6a1-89a40859ed75',
                'PLF-024',
                '2023-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b998a5e6-dc15-45c8-a650-fc830ef0bb3e',
                'PLF-024',
                '2024-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0942894f-3030-4193-9046-ad268486a781',
                'PLF-024',
                '2024-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '97b1ad64-1885-4b1c-bbfd-d5a836bdae6d',
                'PLF-024',
                '2024-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '44ad6770-9ccc-4493-8e15-3808e7ffc0f0',
                'PLF-024',
                '2024-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '53e7de00-4dbf-4c6e-8997-d37c293b50c8',
                'PLF-024',
                '2024-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '64228efd-454f-4d3c-ba8e-988d4d97abbb',
                'PLF-024',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c37cbe00-ed8e-480d-93c4-f017f13379d5',
                'PLF-025',
                '2023-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1e00e55b-f7b2-44a3-bf70-8d70876cca1e',
                'PLF-025',
                '2024-01-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8d656946-c77b-44ce-b8bb-83a4f63b1aa3',
                'PLF-025',
                '2024-02-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c2af1642-6ddd-4514-b47e-1c4c1759ccc2',
                'PLF-025',
                '2024-03-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cf8271ea-62d1-45c9-ba4a-f0622aff50e8',
                'PLF-025',
                '2024-04-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5a43b831-9d7a-4c38-8d27-3d70e629363b',
                'PLF-025',
                '2024-05-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '22f3b977-094b-4c93-8899-87054eee3aa8',
                'PLF-025',
                '2024-06-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd1fde2a4-062a-4f26-82be-663bd440b9ec',
                'PLF-030',
                '2024-01-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c569aa09-4190-4b87-9d1b-487cf0b47bc3',
                'PLF-030',
                '2024-06-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4d433838-da37-4382-8505-30ff899797f7',
                'PLF-031',
                '2023-07-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cc2d6e32-8e96-4e5d-b06b-d1d4d3c35c91',
                'PLF-031',
                '2023-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4d5ff8dc-36eb-4ae0-a1c2-2c441e7cffb7',
                'PLF-031',
                '2023-09-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '40f6bf41-7c5d-4f13-a772-6fc2d70de4c5',
                'PLF-031',
                '2023-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5d8f383f-d334-47c2-8d2d-59f583f6c0f5',
                'PLF-031',
                '2024-02-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a91c8d25-eeb6-4779-8e30-48b57f066bc2',
                'PLF-034',
                '2023-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6867876a-0046-4b25-872e-1907cebf50bb',
                'PLF-034',
                '2023-10-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '45cec971-8e82-430c-a755-efaf88c447b1',
                'PLF-034',
                '2023-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '21b817b7-73c5-4c5b-a97a-5cfcd4065177',
                'PLF-034',
                '2023-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c3781e74-d3eb-4c24-bbf4-ad12f601c75e',
                'PLF-034',
                '2024-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2c4b2e81-1ad5-4c97-9fe8-cb1dec80916c',
                'PLF-034',
                '2024-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '487bd083-cbab-4041-aad3-c2a9ab063f4a',
                'PLF-034',
                '2024-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '640baef6-b9dc-43a6-9913-9db197546efc',
                'PLF-034',
                '2024-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5f3ae22f-ae55-45b8-be20-1c42c0855b59',
                'PLF-034',
                '2024-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e48fde3d-d9ba-4587-898e-958578fccdca',
                'PLF-034',
                '2024-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8c679f72-161a-4bb1-88db-0c5091fabdf5',
                'PLF-035',
                '2023-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1fa4c395-926c-4efe-b844-2ebf4275da8b',
                'PLF-035',
                '2023-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'bce23027-b0d3-43d0-96f9-2df39852b5f0',
                'PLF-035',
                '2023-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c0e6ea42-025a-4a15-8908-fb68398e2cae',
                'PLF-035',
                '2024-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ad5812e4-5e0a-4886-b9fb-6beb1c7ecb7d',
                'PLF-035',
                '2024-03-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3b41b24d-4958-4097-a3f3-4b3fd419ffaa',
                'PLF-035',
                '2024-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6287895e-9a9c-4ae4-98b2-c49f280b77f7',
                'PLF-035',
                '2024-06-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b82764bb-ebc5-420c-81ef-e01848f98630',
                'PLF-042',
                '2023-07-01'::date,
                550.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f97dc10f-d164-4cab-a9ce-411077d10752',
                'PLF-042',
                '2024-02-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '28bb5f28-89e7-4124-aca6-655450aa479e',
                'PLF-042',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3d0cd653-b48d-431e-92b4-f92f59335277',
                'PLF-045',
                '2023-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3802510a-19e4-4bcd-a9c0-33abcb2c7ba3',
                'PLF-045',
                '2023-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2f4e3391-690a-4e83-8128-bac0c0f711c1',
                'PLF-045',
                '2023-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd47f1df1-833f-458c-86c6-472ba13966ef',
                'PLF-045',
                '2023-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ead038c4-2804-414a-96a1-feb7ed499eff',
                'PLF-045',
                '2023-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c199ca17-da39-4201-83fc-cf1395d77fb9',
                'PLF-045',
                '2023-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f1a2dda0-52b6-4afc-af3d-897840a7ab1c',
                'PLF-045',
                '2024-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0d32a6ac-9db9-4efc-9721-97a02a648047',
                'PLF-045',
                '2024-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4d4d8799-8d2f-462b-a6d8-d750803cf58a',
                'PLF-045',
                '2024-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6d1930d7-7443-47ab-b2ef-a4ffd07e9c49',
                'PLF-045',
                '2024-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dc5220ef-e03c-4a64-a6d0-6721a8da3e3d',
                'PLF-045',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '03610c13-cb8b-40df-85df-3ee05faf9cdc',
                'PLF-046',
                '2024-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2cd9d979-2f2d-46a3-bb61-70397b4fb94d',
                'PLF-047',
                '2023-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '064c434d-ff2a-46ba-abe2-3e456625283f',
                'PLF-047',
                '2023-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9c1a256b-0bae-4afc-b8ca-bdae8126a7d3',
                'PLF-047',
                '2023-10-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '51081df3-560e-43e4-a9d3-e2004e69f5f2',
                'PLF-047',
                '2023-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4f6344f1-2481-4857-8b4b-5e034fe0d08d',
                'PLF-047',
                '2023-12-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '566f71f2-f554-4ad4-b3ea-be2a7ab57f19',
                'PLF-047',
                '2024-01-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1fec5e70-d211-4bd0-8641-8ae08184fad8',
                'PLF-047',
                '2024-02-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '57a7a8bf-8ad4-49a3-b8b7-5458d353f8b1',
                'PLF-047',
                '2024-04-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '776163e0-e227-4576-a211-fca900d54a30',
                'PLF-047',
                '2024-06-01'::date,
                400.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3d1292fd-0575-4b0a-8d70-afc417cac386',
                'PLF-048',
                '2023-07-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f6ab8cb6-faaa-4c30-a179-643fcb05c2cd',
                'PLF-055',
                '2023-07-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '07e986cc-bcf3-4647-b313-4d9591ab40ff',
                'PLF-055',
                '2023-08-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1cf3c447-aaa9-46a1-8f24-dc4642a7d081',
                'PLF-055',
                '2023-09-01'::date,
                3000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '08c46f9d-6611-4936-8e6c-9e12660e5260',
                'PLF-055',
                '2023-10-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9e344357-8298-4bd3-b4ea-e66d04712a1d',
                'PLF-055',
                '2023-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c6bb3943-e0d8-4c24-9569-e1cace3b61b5',
                'PLF-055',
                '2023-12-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'aa3a8db1-ca4a-4a83-aa31-764be98de268',
                'PLF-055',
                '2024-01-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '949a1f4f-31e4-48c3-aa4f-99744786583c',
                'PLF-055',
                '2024-02-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '941b7853-4333-487f-99e4-9f638a799f8a',
                'PLF-055',
                '2024-03-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f7ab1625-b9a0-4195-b499-db587549a32a',
                'PLF-055',
                '2024-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e04ac3ae-79ce-46f2-b82b-9a3bb64bed4e',
                'PLF-055',
                '2024-05-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f3850bd5-b4bb-4887-86f4-e416d176a869',
                'PLF-055',
                '2024-06-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a4abaf37-6431-4912-a8b0-eb2ae07bd8b3',
                'PLF-056',
                '2024-05-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6bd1a1fb-5dde-48c8-afa9-d40aafa69dd3',
                'PLF-056',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b3ea00ec-8ef7-4b3f-a2be-c5bae6c2b8d3',
                'PLF-059',
                '2023-09-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c83c52f0-4125-4623-8acd-9f5fc41a5ec0',
                'PLF-059',
                '2023-10-01'::date,
                450.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '41275d8b-47b6-497f-a38f-b012eccefd09',
                'PLF-059',
                '2023-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '505a0e01-8dd6-4f32-aab2-b345a8768b7f',
                'PLF-059',
                '2023-12-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ab809591-ddf7-41f9-9ac2-72cd6b8c0ea6',
                'PLF-059',
                '2024-01-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b2f9dc9b-8563-420d-8ec8-3406a923fd7a',
                'PLF-059',
                '2024-02-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b03c96c2-3788-4004-b8cf-876c4a3e0174',
                'PLF-059',
                '2024-03-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a61de2d3-cbe0-459a-becd-b54c6c4ceb32',
                'PLF-059',
                '2024-04-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1f222784-4493-4155-9368-407babc16243',
                'PLF-059',
                '2024-05-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '47ea61e3-7d2a-4ea2-b1a2-1dc06fe00f6f',
                'PLF-059',
                '2024-06-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5f221b5f-4851-47b4-a591-1c8a5fa2a98d',
                'PLF-069',
                '2023-07-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5c578b57-5547-4583-ac50-e4ac22f0e318',
                'PLF-069',
                '2024-04-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b628b34f-2dc4-461a-ba0f-edf152512bee',
                'PLF-069',
                '2024-06-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd7b561cc-f98c-4636-b5f4-5fc726ce3161',
                'PLF-074',
                '2024-04-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b5a24d85-d01c-4dac-af6b-80d8265eea8b',
                'PLF-080',
                '2024-01-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'c93b5440-c415-481e-a043-310b7d0b8e94',
                'PLF-080',
                '2024-02-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '59799a74-688f-4f5d-a8ec-f1785a8ead27',
                'PLF-080',
                '2024-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ec454c80-73f6-42e4-b37e-640217f10c83',
                'PLF-080',
                '2024-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '54aa5654-f291-4cfb-9dd3-048fbb35fb7c',
                'PLF-080',
                '2024-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fe09a0ed-c260-4db9-a220-b7e577bbf6ef',
                'PLF-080',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ee45987a-ea48-4a2f-a863-eac2361114b4',
                'PLF-085',
                '2023-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2736fc02-fe07-4012-8ece-4548fb4f6f23',
                'PLF-085',
                '2023-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f64eff62-46c9-459b-8f92-aaabf1e0b243',
                'PLF-085',
                '2023-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e9e3bf9e-adf2-4256-bcad-cbd195ba9cc1',
                'PLF-085',
                '2023-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'db978900-8af3-4a3c-b5d2-5d47ece9665c',
                'PLF-085',
                '2023-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '05374687-2d12-4722-ba70-884ae3381298',
                'PLF-085',
                '2023-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '83e2df1f-94df-4ab1-92f0-5feffc9865e7',
                'PLF-085',
                '2024-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd600faf3-3457-41bf-b130-d27b5bffbe78',
                'PLF-085',
                '2024-02-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '948cac56-8bfb-49c1-b1da-3e7f99904d70',
                'PLF-085',
                '2024-03-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '98365fcf-b365-434d-a830-c73e73f8797a',
                'PLF-085',
                '2024-04-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8ef0f55a-924e-437a-82f3-c013565ee1a7',
                'PLF-085',
                '2024-05-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '522fc7ce-f04d-4a06-9911-55c8ad86b708',
                'PLF-085',
                '2024-06-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '97efb2c3-40ee-4bbb-8bfe-f08505a3ba43',
                'PLF-089',
                '2023-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3964cf7a-7cb3-41f8-9225-8a413c3a9eb2',
                'PLF-089',
                '2023-11-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7ffc9f5b-98d4-448d-b06c-bb171123ab57',
                'PLF-089',
                '2024-05-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9f15a63a-e7d9-43db-b667-9c81a840cca3',
                'PLF-009',
                '2024-09-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7451862c-4549-42f3-8e1d-24778970340a',
                'PLF-009',
                '2024-10-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'e0d4ac1a-35a0-4ebb-922c-3cb465eeb690',
                'PLF-009',
                '2024-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'db839aae-4467-4f27-a448-96e46f668b10',
                'PLF-009',
                '2023-12-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1da22535-b83a-4e29-8b4b-e2ff30497b7a',
                'PLF-009',
                '2025-01-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f1da3446-9b0f-4efc-aaf7-d0bb5ce349d5',
                'PLF-017',
                '2024-09-01'::date,
                1800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b32ac8f7-9d6b-4a7d-bf2f-c3e3b30ee40f',
                'PLF-018',
                '2024-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '67b79f34-c1c1-420d-9481-d0bd988e2f35',
                'PLF-019',
                '2024-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '778a444b-84e8-4dd4-adf9-49c4aa0f04f7',
                'PLF-019',
                '2024-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '855be853-f5b0-4142-af60-505146712934',
                'PLF-019',
                '2024-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '64c3fec1-5694-4324-a3e7-b13418dcaef2',
                'PLF-019',
                '2024-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'cec68ab1-94c8-4762-a94d-91afc6734957',
                'PLF-019',
                '2023-12-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3455b3ae-4c21-453a-a472-c1610547a445',
                'PLF-019',
                '2025-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a7f7722f-5ae7-41ef-8c76-738402f78301',
                'PLF-022',
                '2024-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '955e1908-68b1-4a57-a5d2-93856f8a1102',
                'PLF-022',
                '2024-09-01'::date,
                450.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '86455172-6513-4fb0-806d-10c89ffe4cd1',
                'PLF-022',
                '2024-10-01'::date,
                450.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '00d2a590-2e96-442b-84df-f0d9ef079fe4',
                'PLF-022',
                '2024-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '09e27726-09f1-4aaa-b374-4f915c81b0f5',
                'PLF-022',
                '2023-12-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6d0c8c16-6531-42f2-9a5c-b9c6456b965a',
                'PLF-024',
                '2024-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b12fbc19-1b44-40db-9428-4d1cd773cd7c',
                'PLF-024',
                '2024-08-01'::date,
                1500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'dd67b7a3-4df0-49c9-916b-e8ea81bcd263',
                'PLF-024',
                '2024-09-01'::date,
                2800.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7dd86055-629a-420f-980a-017c60d78b34',
                'PLF-024',
                '2024-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2528c587-4173-42b5-8f2c-73a9026a629d',
                'PLF-024',
                '2023-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f1797ce6-af50-4a0f-99a7-3812cbce44e1',
                'PLF-024',
                '2025-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'edf5d05c-2cd8-4596-9093-693499ec31d5',
                'PLF-025',
                '2024-09-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8fc6de2d-9490-4622-ac1a-aff31d0fcc5a',
                'PLF-025',
                '2025-01-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a047270e-8d1b-44dd-bd62-fd5306016b52',
                'PLF-030',
                '2025-01-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd0612a7d-2173-4cd3-9d53-420cf0111d90',
                'PLF-034',
                '2024-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '67e4f3b4-31db-498c-bfc7-9111737a809f',
                'PLF-034',
                '2024-09-01'::date,
                450.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '24feb3a6-3c2e-409a-b659-3dd6586bd2a9',
                'PLF-034',
                '2024-10-01'::date,
                450.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '67ae8480-a409-455b-8d74-9cb508d70f00',
                'PLF-034',
                '2024-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '101d30cc-5a05-481e-8000-263dd23fc55e',
                'PLF-034',
                '2023-12-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '9c038509-986b-4385-9d84-acbfe4f1569e',
                'PLF-035',
                '2024-08-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5f552e25-5620-4168-ae0c-12158495e019',
                'PLF-035',
                '2024-09-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '11eff28b-6ae1-49bd-b5a3-784083e3a7e7',
                'PLF-035',
                '2024-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'a6eb064c-1a6d-40fd-9990-f837c938c71f',
                'PLF-035',
                '2024-11-01'::date,
                200.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2606d2d1-e36a-4e17-acbb-92bd75fa110a',
                'PLF-045',
                '2024-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '7c72bce3-256b-45c0-ba09-e4abb62b2840',
                'PLF-045',
                '2024-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'ae43cb48-bb5a-4c02-b06c-9494b51f6631',
                'PLF-045',
                '2024-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '75e4667b-7b56-493d-ae2c-cd6b764edb79',
                'PLF-045',
                '2024-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f3cba1ee-f648-4a90-a4f5-270a011f96a6',
                'PLF-045',
                '2024-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8922a9e3-40e6-4a28-8d93-4b75141af37a',
                'PLF-045',
                '2023-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f1746d2e-f7e8-4620-9f4b-64190d2bc370',
                'PLF-045',
                '2025-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '973a9e3f-3814-4fc9-85a7-70858bfd999d',
                'PLF-047',
                '2024-09-01'::date,
                500.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '394a31d4-2b4c-46cb-9d28-b42249edba7a',
                'PLF-047',
                '2024-10-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fa5c8dd3-f40d-4724-b4e2-0fd91e820d39',
                'PLF-047',
                '2024-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '8b90f400-0a6a-41bf-a9d1-61885f349885',
                'PLF-054',
                '2025-01-01'::date,
                2000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '1afeba48-113a-4770-8317-5597a499a622',
                'PLF-055',
                '2024-08-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '32fc7541-a515-47a2-a347-caa806e03460',
                'PLF-055',
                '2024-09-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f43c903d-97a9-494b-a103-654108af9f03',
                'PLF-055',
                '2024-10-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5a978a34-b6a3-4e6e-b2e7-25ba9bd6ad6e',
                'PLF-056',
                '2024-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'd784acd6-e2ef-45eb-99b0-9798e19634b0',
                'PLF-056',
                '2024-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'be326d84-790e-4480-a157-6d33e1b19737',
                'PLF-056',
                '2024-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '2743db27-5662-417a-a180-326a18d999b9',
                'PLF-056',
                '2023-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f2825c0e-382f-46dd-a2ad-c2789762fd69',
                'PLF-056',
                '2025-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '4380b702-a49e-431f-9648-42d519f14ca4',
                'PLF-059',
                '2024-08-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '396bc000-6dff-4102-8a72-cd054abdf224',
                'PLF-059',
                '2024-09-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f8cdf207-70df-42fa-bed8-733815c82762',
                'PLF-059',
                '2024-10-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '780d8ba1-ead1-4542-a4db-10099d5fc5bd',
                'PLF-059',
                '2024-11-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '443ba858-0c74-4c05-a427-aa9ea5c0fd4d',
                'PLF-059',
                '2023-12-01'::date,
                250.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b2d831df-32a2-4af8-9b4f-7cbcea027681',
                'PLF-069',
                '2024-09-01'::date,
                1000.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '6fc2d3fc-3136-4c2d-a710-8b3d7401de9b',
                'PLF-080',
                '2024-07-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fa4f1356-f964-4914-a282-bf34a2e5645a',
                'PLF-080',
                '2024-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '65f02efb-14c9-447d-a9ac-6adcdbb87c60',
                'PLF-080',
                '2024-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '63aae1d1-a160-4e98-b3f9-9e082e7f5563',
                'PLF-080',
                '2024-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'f609a0ad-32f4-4a2f-bdaa-6ec2d834e8d6',
                'PLF-080',
                '2023-12-01'::date,
                600.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'fb6026e0-32da-451c-b9cd-a71d00b3b689',
                'PLF-080',
                '2025-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '3a893ac5-af9c-4834-9247-dfb9d0aee51f',
                'PLF-085',
                '2024-08-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '0744e75a-f53c-4243-95fb-1a622914b994',
                'PLF-085',
                '2024-09-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                '5cfb4d9d-5d98-4458-b8f5-a34742f5acd8',
                'PLF-085',
                '2024-10-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'b0dcb5e9-47f3-451f-9a6e-4c4283e9f900',
                'PLF-085',
                '2024-11-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'eaf3fcb0-b535-43f9-bdee-3efda8baf2b5',
                'PLF-085',
                '2023-12-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            


            INSERT INTO contributions (id, member_number, contribution_month, amount_due, created_at, updated_at)
            VALUES (
                'aafbccfc-fedf-4059-a0aa-460130e247f6',
                'PLF-085',
                '2025-01-01'::date,
                300.0,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number, contribution_month) DO UPDATE SET
                amount_due = EXCLUDED.amount_due,
                updated_at = NOW();
            

