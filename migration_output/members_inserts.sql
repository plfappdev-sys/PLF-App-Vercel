-- Member data migration SQL
-- Generated: 2025-09-21T19:45:27.489448


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '752cda82-3739-48f5-a601-61b06ae83f96',
                'PLF-001',
                '{"fullName": "Member 1"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 4271.790639044192, "shareValue": -1092.6796390441918}'::jsonb,
                '2018-08-14'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cf64ebe9-0fe1-4f09-b47c-7ec02364decb',
                'PLF-002',
                '{"fullName": "Member 2"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 1600.0, "currentBalance": 1115.2596271845598, "shareValue": 1373.8513728154403}'::jsonb,
                '2019-02-16'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f414cd07-dc13-4618-bd61-a48b06ddc10f',
                'PLF-003',
                '{"fullName": "Member 3"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 5168.446364367667, "shareValue": -1868.4463643676675}'::jsonb,
                '2018-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fd85ccf6-c577-4a88-b02e-77a2e396b95c',
                'PLF-004',
                '{"fullName": "Member 4"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 7640.016095854379, "shareValue": -3040.0160958543793}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ea4012bf-5660-49c4-9994-89627f990f45',
                'PLF-005',
                '{"fullName": "Member 5"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 459.86650311879976, "shareValue": 1922.5611718812002}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '654ebb26-58ec-4f60-a0ec-efef64ddfd21',
                'PLF-006',
                '{"fullName": "Member 6"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 600.0, "currentBalance": 6119.0501072471725, "shareValue": -2319.050107247172}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c288c4f8-bd29-4ffb-b3e7-6f0654432703',
                'PLF-007',
                '{"fullName": "Member 7"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 7800.0, "currentBalance": 2886.997381456857, "shareValue": -786.9973814568572}'::jsonb,
                '2021-10-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '348bb6ba-2e78-4af0-b24b-df18fe232e03',
                'PLF-008',
                '{"fullName": "Member 8"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 7072.237418619936, "shareValue": -2249.959668619935}'::jsonb,
                '2018-07-23'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd0fd0a4c-b048-48ea-bfe8-2e96bcd63afe',
                'PLF-009',
                '{"fullName": "Member 9"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 2898.5232384465407, "shareValue": 681.6766615534596}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8447ed5d-ffee-4468-91b7-75ad7998e950',
                'PLF-010',
                '{"fullName": "Member 10"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2400.0, "currentBalance": 3847.4803757604604, "shareValue": -1152.9803757604607}'::jsonb,
                '2020-06-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8dad2bbd-2bc3-43f7-a4ff-ce74b3c20e6f',
                'PLF-011',
                '{"fullName": "Member 11"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 4328.290584633558, "shareValue": 578.6426153664413}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a942ce87-6b70-4a77-b1ce-1de19b1180b0',
                'PLF-012',
                '{"fullName": "Member 12"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": -700.7595759593471, "shareValue": 2703.237225959347}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e07b2383-6e93-49d7-bc99-884ab044666a',
                'PLF-013',
                '{"fullName": "Member 13"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 175.4437540924084, "shareValue": 2431.4894459075917}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '228aa76e-46ec-496d-841f-f53676c867a6',
                'PLF-014',
                '{"fullName": "Member 14"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 4027.7218729122624, "shareValue": -1327.7218729122621}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3a6be783-f0a4-4ab3-aefb-c8ac19445f2d',
                'PLF-015',
                '{"fullName": "Member 15"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 4056.028093319164, "shareValue": 737.5384566808361}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '70e29e31-30f9-473e-a62d-7e453de9c3de',
                'PLF-016',
                '{"fullName": "Member 16"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 8020.257593006179, "shareValue": -3220.2575930061794}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c5c6f869-147c-41b4-b075-b38a64a18906',
                'PLF-017',
                '{"fullName": "Member 17"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 1200.0, "currentBalance": 2031.3907882792023, "shareValue": 1577.7701867207975}'::jsonb,
                '2019-01-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2767bc68-b769-4bd7-845b-bea55e34f507',
                'PLF-018',
                '{"fullName": "Member 18"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 285.1811228638513, "shareValue": 2371.7520771361487}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4321a56c-0377-4f8c-a7e7-f47fa00ee837',
                'PLF-019',
                '{"fullName": "Member 19"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2400.0, "currentBalance": 2719.2293424514646, "shareValue": -202.45159245146482}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd2b681eb-1d02-4787-9c83-96885de6a303',
                'PLF-020',
                '{"fullName": "Member 20"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 5100.6656511886, "shareValue": -190.61356618860032}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e2e116a0-34ac-4324-b9b3-7fb1e16958a5',
                'PLF-021',
                '{"fullName": "Member 21"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 6309.170855823072, "shareValue": -2409.170855823072}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3e0358d6-41a8-48f5-87f3-883b46edb803',
                'PLF-022',
                '{"fullName": "Member 22"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 3892.398961001488, "shareValue": -234.4768110014877}'::jsonb,
                '2018-08-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'adad0d63-b825-4ebf-b1be-f2ae6c973f14',
                'PLF-023',
                '{"fullName": "Member 23"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 2886.997381456857, "shareValue": -786.9973814568572}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2c004a12-1a43-4ce3-ac3e-9666c4232aeb',
                'PLF-024',
                '{"fullName": "Member 24"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 3922.8855300957784, "shareValue": 1110.780969904222}'::jsonb,
                '2018-08-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '69e87b4d-903e-43dd-b9a8-5df9242ff209',
                'PLF-025',
                '{"fullName": "Member 25"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 7770.732308703694, "shareValue": -2852.910108703694}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a407a241-e8c6-4c36-b896-735f27dce5c4',
                'PLF-026',
                '{"fullName": "Member 26"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 2774.141880701759, "shareValue": 138.23581929824093}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5ffd5e65-9b8c-4567-9e07-8bee7139e143',
                'PLF-027',
                '{"fullName": "Member 27"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 6289.355723332396, "shareValue": -2175.9890733323964}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '97e1a91e-cdd0-4eda-89dc-467807b7dce5',
                'PLF-028',
                '{"fullName": "Member 28"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 3000.0, "currentBalance": 5947.48037576046, "shareValue": -1152.9803757604607}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '03ff15dc-b2fc-4c07-9849-20727cbc7ec2',
                'PLF-029',
                '{"fullName": "Member 29"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 4733.300813724556, "shareValue": -375.3786637245564}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e9a5c57c-02a8-4eef-a434-77d321062e0b',
                'PLF-030',
                '{"fullName": "Member 30"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 1550.3139986384458, "shareValue": 1329.8859013615545}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e3e134ee-eaf5-459e-b42c-3548b58d3142',
                'PLF-031',
                '{"fullName": "Member 31"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 4788.204867215865, "shareValue": -1688.2048672158658}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '04078b95-a722-4352-a7c2-488ec1affa1c',
                'PLF-032',
                '{"fullName": "Member 32"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 7069.653850126675, "shareValue": -2769.6538501266755}'::jsonb,
                '2018-08-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cb8eab31-4520-40c2-8cb8-7d4fb3971a9f',
                'PLF-033',
                '{"fullName": "Member 33"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 5738.80861009537, "shareValue": -2138.8086100953697}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f2e6d5f9-279a-410e-8cf8-fed317312021',
                'PLF-034',
                '{"fullName": "Member 34"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 8020.257593006179, "shareValue": -3220.2575930061794}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0ad43fb4-754a-41b3-bf7c-da257786d340',
                'PLF-035',
                '{"fullName": "Member 35"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 7259.774598702576, "shareValue": -2859.7745987025764}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2ce364c7-e89c-4368-879a-c48c20c536e0',
                'PLF-036',
                '{"fullName": "Member 36"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2600.0, "currentBalance": 5605.676849389458, "shareValue": -735.4324993894578}'::jsonb,
                '2019-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '650af62c-cabe-4e39-ab3e-9d53bc4091f7',
                'PLF-037',
                '{"fullName": "Member 37"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 6637.740555550832, "shareValue": -1802.0961555508327}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '22ca41cf-28d3-48da-92f8-5bd434079bd7',
                'PLF-038',
                '{"fullName": "Member 38"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2400.0, "currentBalance": 2748.883054067338, "shareValue": -232.10530406733773}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '08d9b4db-714c-456e-916a-c0aed587dd53',
                'PLF-039',
                '{"fullName": "Member 39"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 8020.257593006179, "shareValue": -3220.2575930061794}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '077ea68f-3b64-407b-af5a-6de3a11e45e9',
                'PLF-040',
                '{"fullName": "Member 40"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 1000.0, "currentBalance": 3818.589049478772, "shareValue": -1228.5890494787716}'::jsonb,
                '2018-11-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2c03235b-460e-450a-8fd7-6b4c33e13dcb',
                'PLF-041',
                '{"fullName": "Member 41"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2400.0, "currentBalance": 2515.176500634911, "shareValue": 2017.445549365089}'::jsonb,
                '2019-07-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '47ea1e08-2b9f-438f-b96c-0bcb6a1474aa',
                'PLF-042',
                '{"fullName": "Member 42"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 400.0, "currentBalance": 5605.720216223262, "shareValue": -728.2431028282616}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '39db2aaa-b619-4518-8efb-16805cbb1468',
                'PLF-043',
                '{"fullName": "Member 43"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 400.0, "currentBalance": 2484.674433995597, "shareValue": 1635.6254160044027}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9156771a-be61-4ff7-b26b-5cf210e64e92',
                'PLF-044',
                '{"fullName": "Member 44"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": -5067.911628769285, "shareValue": 7578.511328769286}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b4c36424-17c7-4c17-b2d7-f8ea333f243c',
                'PLF-045',
                '{"fullName": "Member 45"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 1600.0, "currentBalance": 6044.524377570511, "shareValue": -1391.0577775705117}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5b9eff51-b612-4baa-8854-f21f58e44f24',
                'PLF-046',
                '{"fullName": "Member 46"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 6309.170855823072, "shareValue": -2409.170855823072}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '842bbfb9-7910-4e9a-a365-4fcd15fedce8',
                'PLF-047',
                '{"fullName": "Member 47"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 400.0, "currentBalance": -569.3288183303987, "shareValue": 2985.1731183303987}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f9ea9226-4941-44a7-aedc-3b8941fe3d4c',
                'PLF-048',
                '{"fullName": "Member 48"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 1273.921888157948, "shareValue": 1179.792476842052}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4fc3a3c4-e3bf-427b-adb1-dd20f4fd0f64',
                'PLF-049',
                '{"fullName": "Member 49"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 2791.937007168907, "shareValue": -741.9370071689068}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '73bd6472-1bfc-4650-a7c0-066d86d159d9',
                'PLF-050',
                '{"fullName": "Member 50"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 7259.774598702576, "shareValue": -2859.7745987025764}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ce1e2f1c-969a-4b04-85c4-174ddd8f091e',
                'PLF-051',
                '{"fullName": "Member 51"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 6199.259347603476, "shareValue": -2294.803797603476}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ecb32b1f-d304-4bfc-b69c-bd575a7c5592',
                'PLF-052',
                '{"fullName": "Member 52"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 1638.2981887182295, "shareValue": 3330.02376128177}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'da61aa56-ed09-49f1-86c7-c969b219b9c3',
                'PLF-053',
                '{"fullName": "Member 53"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 3398.564926893889, "shareValue": 1548.4682231061108}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1233ebdb-89d1-4464-a447-a54fb837ec69',
                'PLF-054',
                '{"fullName": "Member 54"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 2600.047200474874, "shareValue": 1642.530399525126}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4fed4169-7db8-4d8d-9c54-aa0cbb069b7c',
                'PLF-055',
                '{"fullName": "Member 55"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 2894.217831315007, "shareValue": 1310.4875936849933}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b6d42733-4ca0-4607-b651-ab81baea8bdc',
                'PLF-056',
                '{"fullName": "Member 56"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 3200.0, "currentBalance": 607.3713249863519, "shareValue": 1817.328575013648}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e8cfba85-bfd3-4b44-a679-0603d62a8cc9',
                'PLF-057',
                '{"fullName": "Member 57"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2600.0, "currentBalance": 6710.74231746629, "shareValue": -1871.68681746629}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a9a823b6-133d-43f4-a8e0-12daa013dbdc',
                'PLF-058',
                '{"fullName": "Member 58"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 3800.0, "currentBalance": 7200.52259300618, "shareValue": -2374.8337430061797}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ca86df58-c61c-43e5-9dae-0d311af56aa7',
                'PLF-059',
                '{"fullName": "Member 59"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 5280.715487084917, "shareValue": -387.1489370849172}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0a88c5fe-6e89-43b8-975a-3b4e046a7659',
                'PLF-060',
                '{"fullName": "Member 60"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2600.0, "currentBalance": 5389.770965655397, "shareValue": -1681.904315655397}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fc7cf3b6-66f2-4b4e-9eb7-03edad3428e1',
                'PLF-061',
                '{"fullName": "Member 61"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 8020.257593006179, "shareValue": -3220.2575930061794}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '88ddc4fe-4729-490f-ab0e-7452867d4eb0',
                'PLF-062',
                '{"fullName": "Member 62"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 1928.7130400460665, "shareValue": 511.38690995393364}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6442a103-e88c-458c-88cb-8cd854d438d2',
                'PLF-063',
                '{"fullName": "Member 63"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 6879.5331015507745, "shareValue": -2679.5331015507745}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7d3f4fb4-6205-4e43-a0f8-076167538899',
                'PLF-064',
                '{"fullName": "Member 64"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 6670.400278117284, "shareValue": -2580.400278117284}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c4709f41-91d0-4bf3-90a7-22a6946e20c2',
                'PLF-065',
                '{"fullName": "Member 65"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 600.0, "currentBalance": 4605.834824119744, "shareValue": -39.00157411974401}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5b5dde39-0f28-4bef-86a2-1e7576da1170',
                'PLF-066',
                '{"fullName": "Member 66"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 6003.067752721932, "shareValue": -2094.1566527219325}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd146b77f-4060-46ba-abdb-80b020252b50',
                'PLF-067',
                '{"fullName": "Member 67"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 3859.428052558193, "shareValue": -183.68370255819295}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '57c07c48-179f-49dd-b6c3-3b7768686c32',
                'PLF-068',
                '{"fullName": "Member 68"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 1800.0, "currentBalance": -2114.086718217619, "shareValue": 4992.30871821762}'::jsonb,
                '2019-04-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ca80facb-fa4c-4299-9269-9fae98a8775b',
                'PLF-069',
                '{"fullName": "Member 69"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 3694.157404368564, "shareValue": 803.8646956314359}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a5aa2581-1b27-4638-818a-83b22cb0ee7a',
                'PLF-070',
                '{"fullName": "Member 70"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 600.0, "currentBalance": 303.20019422363765, "shareValue": 2135.9108057763624}'::jsonb,
                '2018-10-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b659cfe4-ce3e-4f41-9b80-821b627b840f',
                'PLF-071',
                '{"fullName": "Member 71"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 4131.734715285025, "shareValue": -387.1792152850254}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '55ea2836-5279-4574-851d-8fb6bc377bff',
                'PLF-072',
                '{"fullName": "Member 72"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 4753.018714397521, "shareValue": 253.91448560247892}'::jsonb,
                '2018-08-02'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ef28fb88-0218-4f65-af3f-7ac2b70b81ff',
                'PLF-073',
                '{"fullName": "Member 73"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 400.0, "currentBalance": 1339.0931863465023, "shareValue": 1332.1956136534977}'::jsonb,
                '2018-09-05'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '695b430e-412e-4475-9632-cd06a302c880',
                'PLF-074',
                '{"fullName": "Member 74"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": -985.8055080048839, "shareValue": 3532.8386580048837}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3c2924a6-ef6c-418a-8942-5614526b004c',
                'PLF-075',
                '{"fullName": "Member 75"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 4069.3270098613675, "shareValue": -951.5048098613676}'::jsonb,
                '2018-08-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cdf80553-7e6e-4a72-b711-ee258ee21fad',
                'PLF-076',
                '{"fullName": "Member 76"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 4598.084118639965, "shareValue": -1598.084118639965}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ed2a34bc-e8d3-43fb-87ad-99d30bb403e1',
                'PLF-077',
                '{"fullName": "Member 77"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 5040.381499205549, "shareValue": -469.09269920554897}'::jsonb,
                '2018-07-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '67a39337-70f9-4c27-9ff1-39793447d981',
                'PLF-078',
                '{"fullName": "Member 78"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 4027.7218729122624, "shareValue": -1327.7218729122621}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9f062925-7777-43b0-8fcf-473a7217fc0d',
                'PLF-079',
                '{"fullName": "Member 79"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 6689.412352974874, "shareValue": -2589.412352974874}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '839d12e9-1ddc-49f6-a4ae-d9e54bd9ad0d',
                'PLF-080',
                '{"fullName": "Member 80"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 600.0, "currentBalance": 3462.9994413868144, "shareValue": -531.8105913868146}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd40e9b5f-4fcb-4a3a-86ec-4684b97d89f0',
                'PLF-081',
                '{"fullName": "Member 81"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 2400.0, "currentBalance": 2358.243081346418, "shareValue": 68.49021865358175}'::jsonb,
                '2019-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9dda3377-5bd6-477f-b6e2-ee8d8d0d0f09',
                'PLF-082',
                '{"fullName": "Member 82"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": -431.8809466858066, "shareValue": 2952.1807966858064}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e35d9955-39f9-4ec1-ad26-2c5d189e9d63',
                'PLF-083',
                '{"fullName": "Member 83"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 400.0, "currentBalance": 3457.35962718456, "shareValue": -1057.35962718456}'::jsonb,
                '2018-09-17'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '769c3c00-f3fc-400d-866f-466d0c382f5f',
                'PLF-084',
                '{"fullName": "Member 84"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": -982.547260597365, "shareValue": 3511.758210597365}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7b2c5cdd-3273-4093-a312-686e810d7239',
                'PLF-085',
                '{"fullName": "Member 85"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 600.0, "currentBalance": 3339.311786955099, "shareValue": 173.06591304490155}'::jsonb,
                '2018-10-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ea2602db-ea4c-468b-8b98-a2b36c27b810',
                'PLF-086',
                '{"fullName": "Member 86"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 3400.0, "currentBalance": 5205.515561392998, "shareValue": -1806.5600113929986}'::jsonb,
                '2019-12-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '58e767f0-7445-479d-b115-fd660bdecc8b',
                'PLF-087',
                '{"fullName": "Member 87"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 8020.257593006179, "shareValue": -3220.2575930061794}'::jsonb,
                '2018-07-24'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '041bece9-756d-480a-a65a-766c92f37b03',
                'PLF-088',
                '{"fullName": "Member 88"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 200.0, "currentBalance": 5928.92935867127, "shareValue": -2228.92935867127}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '14880c70-a5b2-4da6-b123-5b026d387cc8',
                'PLF-089',
                '{"fullName": "Member 89"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 2400.0, "balanceBroughtForward": 0, "catchUpFee": 0.0, "currentBalance": 2996.1911843822563, "shareValue": 1310.7420156177432}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'aa6ca037-d2ad-49c9-a5cf-b40128259a3f',
                'PLF-001',
                '{"fullName": "Member 1"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8124.891141590663, "shareValue": -1337.720402546471}'::jsonb,
                '2018-08-14'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6a31ea88-d027-4773-90ae-d54aab7ae4c8',
                'PLF-002',
                '{"fullName": "Member 2"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3831.6716879526457, "shareValue": -255.65906076808645}'::jsonb,
                '2019-02-16'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '04b2edd7-9c66-4888-a48d-8a53b3762cb6',
                'PLF-003',
                '{"fullName": "Member 3"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13283.648544864302, "shareValue": -5715.202180496634}'::jsonb,
                '2018-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '88a19bf8-366f-4c81-b27a-f02e17a7892b',
                'PLF-004',
                '{"fullName": "Member 4"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17982.61541994222, "shareValue": -7942.599324087842}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7102462b-e687-4fcb-bd4b-b356173fc3bb',
                'PLF-005',
                '{"fullName": "Member 5"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 2267.499018865695, "shareValue": 640.8737204381049}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '614ea9a6-9470-41b1-88f8-ac3eb4e3d978',
                'PLF-006',
                '{"fullName": "Member 6"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12748.843496817346, "shareValue": -4143.0033895701745}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '35c87c3e-a588-4226-b224-a200c0e53b09',
                'PLF-007',
                '{"fullName": "Member 7"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8946.140660176992, "shareValue": -3664.643278720135}'::jsonb,
                '2021-10-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9293532a-df4b-49ee-94b7-63c557ed6e9b',
                'PLF-008',
                '{"fullName": "Member 8"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16498.590145365175, "shareValue": -7013.218176745238}'::jsonb,
                '2018-07-23'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0d30f99b-6557-4c1a-a8ff-412eedfcc45a',
                'PLF-009',
                '{"fullName": "Member 9"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7609.2568054794, "shareValue": -2270.6336170328595}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f7ff0545-493c-4a63-95ea-123182e5434c',
                'PLF-010',
                '{"fullName": "Member 10"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9693.901332859483, "shareValue": -3419.6876570990225}'::jsonb,
                '2020-06-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '079de0eb-f74a-4b4c-a80a-72b9c3085669',
                'PLF-011',
                '{"fullName": "Member 11"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9885.099755896252, "shareValue": -3114.4814462626928}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a9715076-d044-48ef-a6cb-fdd0469d0c28',
                'PLF-012',
                '{"fullName": "Member 12"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1665.0846338486695, "shareValue": 3477.129232889323}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '868b3c9f-7d1c-4b0c-b3bb-84b5b8ce4b75',
                'PLF-013',
                '{"fullName": "Member 13"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 216.1966523141345, "shareValue": 2457.269201778274}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '20ddbf8a-9ab5-40c8-b5fe-4ba6ba76e784',
                'PLF-014',
                '{"fullName": "Member 14"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11114.894602520646, "shareValue": -4687.1727296083845}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '86c08a02-d903-42d4-832a-c44129302c1c',
                'PLF-015',
                '{"fullName": "Member 15"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11168.710600651793, "shareValue": -4712.68250733263}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fc08a672-4cee-4d4d-94b4-afd94945e874',
                'PLF-016',
                '{"fullName": "Member 16"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18705.533400723434, "shareValue": -8285.275807717257}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '80db561c-475e-407b-8879-87f08145f51d',
                'PLF-017',
                '{"fullName": "Member 17"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -3072.720602622438, "shareValue": 7793.72214090164}'::jsonb,
                '2019-01-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '104d501c-5092-4de4-a23e-a46645f12f55',
                'PLF-018',
                '{"fullName": "Member 18"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 542.1884855859134, "shareValue": 2248.997437277938}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '490fa299-05c4-4432-a9e0-4ddd72b80c01',
                'PLF-019',
                '{"fullName": "Member 19"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8627.178808548832, "shareValue": -3507.9494660973664}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2c19f400-9fba-4e58-8d69-1dbb9c234434',
                'PLF-020',
                '{"fullName": "Member 20"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7821.389321605218, "shareValue": -169.46707041661813}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5d2a98e9-f971-4c58-9e18-27bb39e77312',
                'PLF-021',
                '{"fullName": "Member 21"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15452.402487207954, "shareValue": -6743.231631384883}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '52045c0a-bc7b-4303-a0f9-11b563342f87',
                'PLF-022',
                '{"fullName": "Member 22"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10417.97163652279, "shareValue": -4107.750475521302}'::jsonb,
                '2018-08-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c12b41bc-cbdb-4d1f-8b07-67d6a41342c6',
                'PLF-023',
                '{"fullName": "Member 23"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8946.140660176992, "shareValue": -3659.143278720135}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '13ac13ff-8ac6-4af4-9812-60cdc4cc0fa9',
                'PLF-024',
                '{"fullName": "Member 24"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5729.539522001511, "shareValue": 752.3532080942682}'::jsonb,
                '2018-08-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '287b433f-02d8-473f-b060-f633e3995f84',
                'PLF-025',
                '{"fullName": "Member 25"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17262.317741006296, "shareValue": -7064.852132302603}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '16e4445c-f613-4544-8253-2e728356ac2b',
                'PLF-026',
                '{"fullName": "Member 26"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8731.578937332317, "shareValue": -3557.4370566305593}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'dc63ecec-6431-4d1a-bd93-487dbbfbcb57',
                'PLF-027',
                '{"fullName": "Member 27"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14477.889808985376, "shareValue": -5753.81808565298}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c5bec1a2-28a8-41a5-a27e-ef875e6e49e8',
                'PLF-028',
                '{"fullName": "Member 28"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14764.753838985147, "shareValue": -6417.273463224686}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'adacfd68-6bb6-4bd1-a752-637c835c26c2',
                'PLF-029',
                '{"fullName": "Member 29"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10038.293385755764, "shareValue": -2806.970472031208}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f31ea6a4-0379-4610-a778-767c18c81e46',
                'PLF-030',
                '{"fullName": "Member 30"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3491.6259450202165, "shareValue": 551.6743536182291}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a96726c5-18a2-40cc-9e30-74c3a9b6c519',
                'PLF-031',
                '{"fullName": "Member 31"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3485.7395963966446, "shareValue": 3982.816770819221}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e047e5d2-af67-4758-99a8-2ad64d3951c8',
                'PLF-032',
                '{"fullName": "Member 32"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16898.23844877039, "shareValue": -7428.584598643715}'::jsonb,
                '2018-08-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b7f35f14-a6fb-496b-af09-77dd2a162e1d',
                'PLF-033',
                '{"fullName": "Member 33"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14368.025516036127, "shareValue": -6229.216905940758}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0cd473d8-801e-4dcc-bb8d-c640e329c565',
                'PLF-034',
                '{"fullName": "Member 34"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18705.533400723434, "shareValue": -8285.275807717257}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f5e26107-240c-44a3-b8ca-cd2455c27923',
                'PLF-035',
                '{"fullName": "Member 35"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17259.697439161002, "shareValue": -7599.922840458425}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4e621349-1ecb-466a-a993-8c3a62c4651e',
                'PLF-036',
                '{"fullName": "Member 36"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11666.089591180651, "shareValue": -3589.1239417911943}'::jsonb,
                '2019-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c73e4fd2-f952-4972-8f37-188b3efbfe8b',
                'PLF-037',
                '{"fullName": "Member 37"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15603.07157273084, "shareValue": -6554.192142180008}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a6b9e91e-7d97-4b6b-8e52-369a8d8e2058',
                'PLF-038',
                '{"fullName": "Member 38"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8683.556667053468, "shareValue": -3534.6736129861306}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '96f91301-31dd-43c2-93c7-71c0cc8cf559',
                'PLF-039',
                '{"fullName": "Member 39"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18705.533400723434, "shareValue": -8285.275807717257}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8c089d2b-fb39-4f98-a98f-1ce1cba8851d',
                'PLF-040',
                '{"fullName": "Member 40"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3878.829384307109, "shareValue": 2613.4506651716624}'::jsonb,
                '2018-11-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '59083b5a-aaf0-4ef3-9f4a-eaaad7570bea',
                'PLF-041',
                '{"fullName": "Member 41"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8239.232018196799, "shareValue": -3324.0555175618883}'::jsonb,
                '2019-07-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a67dd4e5-e7be-4e3c-a2f7-84db9c11571e',
                'PLF-042',
                '{"fullName": "Member 42"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12438.645790664854, "shareValue": -4384.146624441593}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '62e17409-bf80-413e-bdf3-0eec11f5d06c',
                'PLF-043',
                '{"fullName": "Member 43"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4216.430944681088, "shareValue": 783.2754393145094}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8491eb6b-828d-48a3-938e-3b35b5ae9e91',
                'PLF-044',
                '{"fullName": "Member 44"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -6177.791898596735, "shareValue": 3509.8802698274503}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a4ed56c4-d4e6-4403-a36d-73defb4ae55a',
                'PLF-045',
                '{"fullName": "Member 45"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10166.760103902856, "shareValue": -1571.7914763323447}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '034bc273-a927-48d5-b98a-bb4729f2a875',
                'PLF-046',
                '{"fullName": "Member 46"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15452.402487207954, "shareValue": -6743.231631384883}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9bc1bfa9-76db-4ae5-8034-3c65cc2a4b42',
                'PLF-047',
                '{"fullName": "Member 47"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1082.4122112680845, "shareValue": 3019.088192937686}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '43c5d846-0d32-4d78-ab91-fd0de974cd19',
                'PLF-048',
                '{"fullName": "Member 48"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4054.7453854125824, "shareValue": -330.47578225463417}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '405fad8f-6396-45ff-ae38-69efcddd12aa',
                'PLF-049',
                '{"fullName": "Member 49"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8765.411164981688, "shareValue": -3573.474157812781}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '159661a7-62d1-4a95-b39b-0b068e7ed776',
                'PLF-050',
                '{"fullName": "Member 50"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17259.697439161002, "shareValue": -7599.922840458425}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fa11873c-b8a3-46d8-8266-b55784ffd154',
                'PLF-051',
                '{"fullName": "Member 51"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15243.437905009798, "shareValue": -6644.178557406321}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2af8cb12-63da-4e5d-a7da-32e9b7f0e0fb',
                'PLF-052',
                '{"fullName": "Member 52"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5986.579407481083, "shareValue": -1926.5837187628533}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4a1926e3-294c-49ca-a05a-15bd18e8aa13',
                'PLF-053',
                '{"fullName": "Member 53"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6263.676326967757, "shareValue": -358.4708000738675}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f7719291-9fbb-4387-ba1b-e6cd16344ad6',
                'PLF-054',
                '{"fullName": "Member 54"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6136.772216322219, "shareValue": -1065.4362158473443}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '511b9da8-edd3-4a1d-9980-6bc7c028292a',
                'PLF-055',
                '{"fullName": "Member 55"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5850.472863830833, "shareValue": -463.4034275158268}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e0b792c1-f732-47f8-9c60-6b84afc4e0ce',
                'PLF-056',
                '{"fullName": "Member 56"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 2275.7455004818603, "shareValue": 789.5479745044914}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f80fc255-de60-4b9b-ad18-0c5b588406eb',
                'PLF-057',
                '{"fullName": "Member 57"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16215.873156151229, "shareValue": -7105.130838684938}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '12fcdbf4-3432-498f-99c0-58b9c07b02d9',
                'PLF-058',
                '{"fullName": "Member 58"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17147.047082384775, "shareValue": -7546.524489378595}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '95b68d05-b8f9-43fe-8882-115a980187ed',
                'PLF-059',
                '{"fullName": "Member 59"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11848.422818099982, "shareValue": -4100.874081015065}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '981cf443-24d2-4f23-9fdf-077aa6afba8b',
                'PLF-060',
                '{"fullName": "Member 60"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13704.43253361516, "shareValue": -5914.6615679597635}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd7907492-b561-4440-8dfd-b1b535575402',
                'PLF-061',
                '{"fullName": "Member 61"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18444.851815473434, "shareValue": -8015.915222467256}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2a5a67e5-42e5-4d42-921d-d33d5e56978f',
                'PLF-062',
                '{"fullName": "Member 62"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4812.6682968011555, "shareValue": -397.1652567550886}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '505ae4f2-c9a4-45f3-9a0f-57be5b17a517',
                'PLF-063',
                '{"fullName": "Member 63"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16536.77945837978, "shareValue": -7257.246356829007}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2b8e9b69-eb18-476c-b744-df9f346d664a',
                'PLF-064',
                '{"fullName": "Member 64"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16139.17456895011, "shareValue": -7068.774290832826}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '75c82cb3-3bb9-401a-b6ad-9652e77f9528',
                'PLF-065',
                '{"fullName": "Member 65"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12214.007272970543, "shareValue": -5208.172448850798}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b5c2dd6a-71e7-4e2b-8bab-86a3f8d4acfd',
                'PLF-066',
                '{"fullName": "Member 66"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12507.319123923638, "shareValue": -4033.658871201706}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a469c562-3f89-4d6c-92c6-c41a7e023744',
                'PLF-067',
                '{"fullName": "Member 67"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8028.922166755156, "shareValue": -1698.205314196962}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '579daba9-39e4-4ff7-b79c-dc729968fe37',
                'PLF-068',
                '{"fullName": "Member 68"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1290.350967034473, "shareValue": 1602.301248816854}'::jsonb,
                '2019-04-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1f81cfa1-7dea-4a4c-98b8-ece4cfa84fc6',
                'PLF-069',
                '{"fullName": "Member 69"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7021.977388609899, "shareValue": -821.8151842413349}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8b915db7-5553-4890-ad8b-46659e771ae3',
                'PLF-070',
                '{"fullName": "Member 70"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3127.9415059353473, "shareValue": -398.0080117117099}'::jsonb,
                '2018-10-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a315c92a-a417-4004-9e86-ee72b12dbd78',
                'PLF-071',
                '{"fullName": "Member 71"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11312.644597054816, "shareValue": -4780.909881769791}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'bd08e866-c5fb-459e-80e8-0ec7bc89b15e',
                'PLF-072',
                '{"fullName": "Member 72"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9036.474759765224, "shareValue": -1777.451245367704}'::jsonb,
                '2018-08-02'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4f853c7a-70e9-46a9-9603-5bdade8ff84d',
                'PLF-073',
                '{"fullName": "Member 73"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3459.953617607367, "shareValue": 342.19228456413487}'::jsonb,
                '2018-09-05'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5c0317e9-f0eb-478c-bd86-0f61d450451f',
                'PLF-074',
                '{"fullName": "Member 74"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1223.6998871859632, "shareValue": 199.40570480915284}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2d807942-f21b-42fa-a4cb-0a46e3dd6365',
                'PLF-075',
                '{"fullName": "Member 75"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11193.994600334314, "shareValue": -4724.667590472946}'::jsonb,
                '2018-08-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ca3775d4-bb19-4c55-b711-0b9aeb712599',
                'PLF-076',
                '{"fullName": "Member 76"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12199.271573692473, "shareValue": -5201.187455052508}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '574801ea-c966-4d37-b5b9-3d6d71df6908',
                'PLF-077',
                '{"fullName": "Member 77"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12134.306064364586, "shareValue": -4667.191265159037}'::jsonb,
                '2018-07-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6147c9cf-da89-492d-972d-2051e06c72b1',
                'PLF-078',
                '{"fullName": "Member 78"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11114.894602520646, "shareValue": -4687.1727296083845}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5d1e4dea-6f0f-4938-a82b-32e8985db44a',
                'PLF-079',
                '{"fullName": "Member 79"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16175.320467989171, "shareValue": -7085.908115014297}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '289bee8f-7aa9-439b-947a-64d4436052f8',
                'PLF-080',
                '{"fullName": "Member 80"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7500.043599470225, "shareValue": -1567.9831330834104}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1c07d15e-8e5e-4fc9-81c8-edc81d77fbb0',
                'PLF-081',
                '{"fullName": "Member 81"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7940.86902667976, "shareValue": -3182.625945333342}'::jsonb,
                '2019-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a946b8fa-7a32-4e1a-95de-0de459cc4d96',
                'PLF-082',
                '{"fullName": "Member 82"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 417.90691889300723, "shareValue": 1612.5898344211862}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2243b446-d92e-46b9-84dc-fa9dda60d0d0',
                'PLF-083',
                '{"fullName": "Member 83"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10030.51763134882, "shareValue": -4173.15800416426}'::jsonb,
                '2018-09-17'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cd5e4a39-46f2-49e8-b80b-4ff792f65b26',
                'PLF-084',
                '{"fullName": "Member 84"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 630.8634053539017, "shareValue": 813.3226340487332}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'bda3ac5d-5640-4677-ac2f-7b6bb6f31424',
                'PLF-085',
                '{"fullName": "Member 85"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9256.5266527289, "shareValue": -3494.937115773802}'::jsonb,
                '2018-10-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '27d3f1fb-041d-46c8-9f45-4fafeded129f',
                'PLF-086',
                '{"fullName": "Member 86"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13354.124779739934, "shareValue": -5748.609218346936}'::jsonb,
                '2019-12-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2a0db40b-d96f-490b-bb03-7f9e30b239ac',
                'PLF-087',
                '{"fullName": "Member 87"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18705.533400723434, "shareValue": -8285.275807717257}'::jsonb,
                '2018-07-24'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '933064d4-c613-4147-84c6-7e0904d7e748',
                'PLF-088',
                '{"fullName": "Member 88"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14729.484506426736, "shareValue": -6400.555147755465}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5aea65a4-3f60-46f8-807e-b0bfd8c4f68f',
                'PLF-089',
                '{"fullName": "Member 89"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9153.740735697254, "shareValue": -3757.5495513149986}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e37c38bf-c4f0-422a-9964-7a05e9808a91',
                'PLF-001',
                '{"fullName": "Member 1"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9643.280324722211, "shareValue": -666.3151831315475}'::jsonb,
                '2018-08-14'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '165ae92c-b79f-4013-903a-1a8d32d6ea33',
                'PLF-002',
                '{"fullName": "Member 2"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5006.07089013764, "shareValue": -348.3622021849946}'::jsonb,
                '2019-02-16'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ea929373-fc55-45d2-9d92-e47a60b55574',
                'PLF-003',
                '{"fullName": "Member 3"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17372.329472741807, "shareValue": -3288.6809278775063}'::jsonb,
                '2018-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '894540e1-60ef-4f67-b4de-c49ce0454c36',
                'PLF-004',
                '{"fullName": "Member 4"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 23193.52547005866, "shareValue": -4410.9100501164385}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '05b3a159-7e90-4269-9d9d-988a6963584a',
                'PLF-005',
                '{"fullName": "Member 5"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3725.2518849638245, "shareValue": -657.7528660981297}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9600bfa8-36e5-4013-af4e-1ae78e246c4c',
                'PLF-006',
                '{"fullName": "Member 6"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14238.884295942553, "shareValue": -603.2507991252064}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6611c2b1-70f9-4a38-b5d4-68fd50191206',
                'PLF-007',
                '{"fullName": "Member 7"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11998.91778291087, "shareValue": -2252.777122733877}'::jsonb,
                '2021-10-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '784b60f7-1456-489c-94a7-5db26ccaec97',
                'PLF-008',
                '{"fullName": "Member 8"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21355.07837776208, "shareValue": -4056.4882323969064}'::jsonb,
                '2018-07-23'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '45529449-c01e-4a0b-9f59-67f1d6d4ff00',
                'PLF-009',
                '{"fullName": "Member 9"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9972.115783688922, "shareValue": -1549.840478209521}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3f14d0eb-3120-4e4e-b420-b7727b6f210e',
                'PLF-010',
                '{"fullName": "Member 10"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11851.99481199787, "shareValue": -1319.037979138388}'::jsonb,
                '2020-06-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4f42313b-e60b-4963-b39c-996e4c118e0a',
                'PLF-011',
                '{"fullName": "Member 11"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13162.123456616446, "shareValue": -2477.023700720195}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4a290bd2-f243-4f7e-bec1-8f3dfe997be5',
                'PLF-012',
                '{"fullName": "Member 12"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1943.000319913634, "shareValue": 1108.2921860649644}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8fb6149a-0eff-40c5-bde7-3882e692c37b',
                'PLF-013',
                '{"fullName": "Member 13"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1184.0479473943524, "shareValue": -167.8512950802178}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e735b60f-5c12-4753-9a00-0fc1b96c03f3',
                'PLF-014',
                '{"fullName": "Member 14"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14685.623627826337, "shareValue": -2770.7290253056913}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '79d328c3-7f1e-4558-b469-7592f462eefa',
                'PLF-015',
                '{"fullName": "Member 15"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14752.292212909191, "shareValue": -2783.5816122573983}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ff61fe8e-5e59-453b-b125-dcde93a7dd96',
                'PLF-016',
                '{"fullName": "Member 16"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 24089.094085030476, "shareValue": -4583.560684307043}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '59c73d2f-00af-43eb-9fc7-56063b901618',
                'PLF-017',
                '{"fullName": "Member 17"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -2890.3438218869815, "shareValue": 617.6232192645432}'::jsonb,
                '2019-01-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e6769491-c246-4b86-9e8e-73e98c20968b',
                'PLF-018',
                '{"fullName": "Member 18"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1587.894666353867, "shareValue": -245.70618076795364}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b2ce0167-9a6f-46c6-9b4c-0918bd845301',
                'PLF-019',
                '{"fullName": "Member 19"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11603.77997850491, "shareValue": -2176.6011699560786}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '96604cc0-0038-4266-bd55-db7b1999f574',
                'PLF-020',
                '{"fullName": "Member 20"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10605.54809886469, "shareValue": -1984.158777259472}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1cd00c8c-c9c6-4044-bb3f-d6e341b98fd1',
                'PLF-021',
                '{"fullName": "Member 21"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20059.035317657275, "shareValue": -3806.6328304493204}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0e627579-3b09-4d9d-9074-210ff83ec8f6',
                'PLF-022',
                '{"fullName": "Member 22"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13822.258277961506, "shareValue": -2604.286641438715}'::jsonb,
                '2018-08-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3b8fd044-8d03-495a-88b7-2ebc3753ed22',
                'PLF-023',
                '{"fullName": "Member 23"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11998.91778291087, "shareValue": -2252.777122733877}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1fe0160a-3103-41a6-900c-b1c6bed37272',
                'PLF-024',
                '{"fullName": "Member 24"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6639.78569402315, "shareValue": -58.17217202164022}'::jsonb,
                '2018-08-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f329f549-7347-4015-b1c8-a3c3f349a1d9',
                'PLF-025',
                '{"fullName": "Member 25"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19906.233649604863, "shareValue": -1757.125908598568}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd4dce8e7-0936-47ad-9510-cb28870d4785',
                'PLF-026',
                '{"fullName": "Member 26"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11733.113431570317, "shareValue": -2201.5344942379993}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7e0cd2f0-3c73-46ab-bf17-e97e54b6e668',
                'PLF-027',
                '{"fullName": "Member 27"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18851.784989528554, "shareValue": -3573.89518054318}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f4d5c071-e2db-4541-8ad0-e3a099d9b7c6',
                'PLF-028',
                '{"fullName": "Member 28"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19207.159221269903, "shareValue": -3642.4053822847554}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '659cd219-5e7f-4577-a5c5-0a9d3725dac8',
                'PLF-029',
                '{"fullName": "Member 29"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13351.903501605133, "shareValue": -2513.610115849369}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2949b6d2-f224-4f45-bf3f-5bd7160816ab',
                'PLF-030',
                '{"fullName": "Member 30"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3155.4388587653552, "shareValue": 1218.6375862548612}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd03990e1-7782-488c-b19c-9b8648ccf87c',
                'PLF-031',
                '{"fullName": "Member 31"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3833.9402428008016, "shareValue": 503.8733535958429}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5863dac8-320f-4422-a9e2-a6ed54bac2e5',
                'PLF-032',
                '{"fullName": "Member 32"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21850.17254760092, "shareValue": -4151.93409883053}'::jsonb,
                '2018-08-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7eafb9ee-92c1-4dfe-bb5f-4a75907247aa',
                'PLF-033',
                '{"fullName": "Member 33"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18382.68239519954, "shareValue": -3201.638379163414}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9ce52349-435c-43d2-a968-0dd7e0fb0aad',
                'PLF-034',
                '{"fullName": "Member 34"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 24089.094085030476, "shareValue": -4583.560684307043}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'aeec0e69-a4d5-433e-85b8-4800a86d7bf8',
                'PLF-035',
                '{"fullName": "Member 35"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 22297.956855086835, "shareValue": -4238.259415925833}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6a110b68-71b3-4191-ac5f-822e8bce814d',
                'PLF-036',
                '{"fullName": "Member 36"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15368.45756707932, "shareValue": -2902.367975898668}'::jsonb,
                '2019-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '89f9bf7e-de25-4555-b36a-0e72de84171b',
                'PLF-037',
                '{"fullName": "Member 37"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20245.68789489015, "shareValue": -3842.6163221593124}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5e31d60b-3a5f-4552-9ab0-603016715577',
                'PLF-038',
                '{"fullName": "Member 38"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11673.622259369902, "shareValue": -2190.065592316434}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f38ccdf6-15da-4fc3-93e4-b14d9954f41d',
                'PLF-039',
                '{"fullName": "Member 39"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 24089.094085030476, "shareValue": -4583.560684307043}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '13f2ec7a-3a72-45e2-ade4-12ba920a72eb',
                'PLF-040',
                '{"fullName": "Member 40"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5721.407661973239, "shareValue": -1042.5782776661295}'::jsonb,
                '2018-11-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7f49b61a-e667-47e7-b3a1-2c2d25ee5350',
                'PLF-041',
                '{"fullName": "Member 41"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11123.181931485964, "shareValue": -2083.949913289164}'::jsonb,
                '2019-07-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd4f19609-6c38-48c0-bce5-3dc02727f3db',
                'PLF-042',
                '{"fullName": "Member 42"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15974.204230993513, "shareValue": -2722.5399403286606}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3d763e13-72df-4c45-8e44-494512c123cc',
                'PLF-043',
                '{"fullName": "Member 43"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5201.453697053987, "shareValue": -150.30675237289944}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'bce4b455-6eae-41a7-8581-d2edbe1bfd1f',
                'PLF-044',
                '{"fullName": "Member 44"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -6736.982685288056, "shareValue": 1359.190786691321}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '09a15519-0884-43b6-b08f-72d138995575',
                'PLF-045',
                '{"fullName": "Member 45"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11722.841238830644, "shareValue": -686.6491349277882}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ba6628e9-07c4-4b7f-9b61-f9e906136c53',
                'PLF-046',
                '{"fullName": "Member 46"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20059.035317657275, "shareValue": -3806.6328304493204}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2374193d-5a44-4393-9ac4-073443b03fc9',
                'PLF-047',
                '{"fullName": "Member 47"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1340.9189294564185, "shareValue": 1093.222718188334}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fe8f6a82-8917-4188-b390-9b42636d43fa',
                'PLF-048',
                '{"fullName": "Member 48"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4534.076740582073, "shareValue": 372.742644830509}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8dbe7318-ca4c-4f9e-80bd-85222f46620f',
                'PLF-049',
                '{"fullName": "Member 49"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11775.025629167914, "shareValue": -2209.6144641862256}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '380adf7d-6a26-4846-a24e-137590aa05fe',
                'PLF-050',
                '{"fullName": "Member 50"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 22297.956855086835, "shareValue": -4238.259415925833}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '98b0f496-9178-4e34-bff2-08370fa08bb2',
                'PLF-051',
                '{"fullName": "Member 51"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19800.164842122645, "shareValue": -3756.726937112847}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3729138a-613c-4b81-9346-038851feef9c',
                'PLF-052',
                '{"fullName": "Member 52"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7838.357248036572, "shareValue": -1034.4198405554891}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4873551e-e27c-48ad-b92c-1014e6f61292',
                'PLF-053',
                '{"fullName": "Member 53"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7251.610687383914, "shareValue": -133.69061041615768}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6bd793ca-8129-4f8d-ba0e-6aa690c131e6',
                'PLF-054',
                '{"fullName": "Member 54"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7113.3429019755795, "shareValue": -124.49668565336094}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fc4a6b8e-9dec-42b5-b6d6-598faa62cc9e',
                'PLF-055',
                '{"fullName": "Member 55"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6933.6965515262755, "shareValue": -235.489187695442}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9c393e5a-1e46-425d-8d7a-47b186de399d',
                'PLF-056',
                '{"fullName": "Member 56"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3735.467829670856, "shareValue": -659.7223291889961}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0c23aef4-faad-40c8-b3d9-7c454eb84e3a',
                'PLF-057',
                '{"fullName": "Member 57"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21004.841602373363, "shareValue": -3988.968446222133}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '507b1b81-b55e-441e-b464-27eb89451c7d',
                'PLF-058',
                '{"fullName": "Member 58"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 22158.402816210746, "shareValue": -4211.35573382597}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5053b89c-fa14-4790-b6b3-c8084068cba6',
                'PLF-059',
                '{"fullName": "Member 59"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15594.336463214988, "shareValue": -2945.913645115006}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5da0c57e-962e-48bb-87d5-073382797b6e',
                'PLF-060',
                '{"fullName": "Member 60"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17893.607050594685, "shareValue": -3389.174516979524}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6360fd85-58a4-4841-9c1d-a29b656c1898',
                'PLF-061',
                '{"fullName": "Member 61"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 23322.155311258775, "shareValue": -4059.945495785341}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6314eb31-231a-40a4-8248-ff40f3c18af3',
                'PLF-062',
                '{"fullName": "Member 62"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6878.2703264837055, "shareValue": -1265.6020296825495}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c49385ff-8e75-483a-a737-b33c08a7eab0',
                'PLF-063',
                '{"fullName": "Member 63"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21402.388240115008, "shareValue": -4065.608781735228}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f27bfe08-ea2a-41e2-b220-6627743e147e',
                'PLF-064',
                '{"fullName": "Member 64"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20909.825501880507, "shareValue": -3970.6509329303954}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '302d36fc-d42d-4053-a723-44200e3c1b64',
                'PLF-065',
                '{"fullName": "Member 65"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16047.231497793942, "shareValue": -3033.224224823399}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'de49dce8-9abf-47f4-85c9-3fa99522ede0',
                'PLF-066',
                '{"fullName": "Member 66"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16410.59344907508, "shareValue": -3103.274325151444}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9c554570-0627-48a7-b9cc-1891e0046b13',
                'PLF-067',
                '{"fullName": "Member 67"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8467.675603250773, "shareValue": 448.03656350438183}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '221a3b61-6e7d-4df9-9cb7-a4ed7dd7754a',
                'PLF-068',
                '{"fullName": "Member 68"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -682.3003807951118, "shareValue": 191.9494137606389}'::jsonb,
                '2019-04-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b056dee9-6507-498b-b8a5-8a44dd8cdef0',
                'PLF-069',
                '{"fullName": "Member 69"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9282.216890266307, "shareValue": -1447.2210016564086}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2004ed29-ba32-496a-8918-6d4b3fc586c3',
                'PLF-070',
                '{"fullName": "Member 70"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4544.097698390793, "shareValue": -607.4771924554456}'::jsonb,
                '2018-10-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9d352b40-73b9-49b3-a48c-aa7736b2d288',
                'PLF-071',
                '{"fullName": "Member 71"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14930.601195716226, "shareValue": -2817.95659866141}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '29d28b17-f050-4671-96f9-a2f79181ac2b',
                'PLF-072',
                '{"fullName": "Member 72"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11194.607687147785, "shareValue": -1323.4169273825603}'::jsonb,
                '2018-08-02'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '34437233-83b6-4b72-978c-658117dba4d9',
                'PLF-073',
                '{"fullName": "Member 73"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5202.494036636152, "shareValue": -942.5404190287844}'::jsonb,
                '2018-09-05'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '943e2393-02be-46f2-8eaa-7f90d4a87896',
                'PLF-074',
                '{"fullName": "Member 74"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 2210.1677903380028, "shareValue": -177.78890315203958}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9ac48aba-fc91-496f-8f37-150287e65328',
                'PLF-075',
                '{"fullName": "Member 75"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14783.614654982293, "shareValue": -2789.620054647979}'::jsonb,
                '2018-08-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'afb5960c-018b-4b53-90cd-bec0de63c1a4',
                'PLF-076',
                '{"fullName": "Member 76"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16028.976550284071, "shareValue": -3029.704976591599}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5a37a9ce-8395-426b-a2ed-f6412f6e8705',
                'PLF-077',
                '{"fullName": "Member 77"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15701.404125888277, "shareValue": -2758.419061523691}'::jsonb,
                '2018-07-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3b5715f6-a6f2-4345-847f-27b8486d89c7',
                'PLF-078',
                '{"fullName": "Member 78"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14685.623627826337, "shareValue": -2770.7290253056913}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9a97d999-4d0d-41e4-801b-174e3693df56',
                'PLF-079',
                '{"fullName": "Member 79"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20954.6039326291, "shareValue": -3979.283464639926}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'dc1ba5c5-699a-4542-bf6e-27510e81f25a',
                'PLF-080',
                '{"fullName": "Member 80"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10207.457096910968, "shareValue": -1907.4134974407439}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b9cb89ba-7466-4f6f-8b6c-472d0dca486a',
                'PLF-081',
                '{"fullName": "Member 81"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7091.392675885438, "shareValue": 1797.0193507943225}'::jsonb,
                '2019-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fbb892e5-4528-4ba2-b9f7-a2ac3160a2bf',
                'PLF-082',
                '{"fullName": "Member 82"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1433.9315979164, "shareValue": -216.0246790233927}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '85c4975f-8708-4ab0-ae92-da2cffeb6b85',
                'PLF-083',
                '{"fullName": "Member 83"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13342.270705368603, "shareValue": -2511.7530740197844}'::jsonb,
                '2018-09-17'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8d0147a0-5adf-4aa0-b4fa-547e1835b965',
                'PLF-084',
                '{"fullName": "Member 84"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1697.747342854645, "shareValue": -266.88393750074334}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e460ca37-184d-4d39-ba6c-d99f8bb3bcbd',
                'PLF-085',
                '{"fullName": "Member 85"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12383.43160169288, "shareValue": -2326.9049489639806}'::jsonb,
                '2018-10-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c23a7eb9-c188-4a2e-ab9b-9113a5cfd356',
                'PLF-086',
                '{"fullName": "Member 86"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17459.637169788977, "shareValue": -3305.512390049045}'::jsonb,
                '2019-12-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'bcffcf49-e342-49ad-891a-c3eee851a58a',
                'PLF-087',
                '{"fullName": "Member 87"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 24089.094085030476, "shareValue": -4583.560684307043}'::jsonb,
                '2018-07-24'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2997833b-8841-4f93-b3d4-2770ad8b6053',
                'PLF-088',
                '{"fullName": "Member 88"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19163.46670268545, "shareValue": -3633.9821962587157}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ee1f70c8-6317-4e50-b375-bbf548b4742f',
                'PLF-089',
                '{"fullName": "Member 89"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 800.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12256.097873936982, "shareValue": -2302.357138239727}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '29146a4f-da75-44c4-a3ff-95d9ae27aa9e',
                'PLF-001',
                '{"fullName": "Member 1"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4720.872356364564, "shareValue": -454.3168563645643}'::jsonb,
                '2018-08-14'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8e3290ab-af63-4b7b-9b41-0ee2f43a5472',
                'PLF-002',
                '{"fullName": "Member 2"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1781.4270179999999, "shareValue": 1503.6469819999998}'::jsonb,
                '2019-02-16'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '06deadd0-2c94-4524-a34a-6574efd8db79',
                'PLF-003',
                '{"fullName": "Member 3"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10270.321867, "shareValue": -2170.321867}'::jsonb,
                '2018-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0bed6ed6-9fbf-41b2-bb44-5d85438eae38',
                'PLF-004',
                '{"fullName": "Member 4"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11974.35668, "shareValue": -2574.3566800000003}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e6dfb4c5-d7d6-4928-94bb-941ad2960110',
                'PLF-005',
                '{"fullName": "Member 5"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5107.5289462933, "shareValue": -946.1989462933}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8fd6aa7b-b264-4d1d-aea8-e2ee70c19c0f',
                'PLF-006',
                '{"fullName": "Member 6"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5029.942832000001, "shareValue": -408.2453320000001}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c0b615b7-79d2-4554-a3a5-e6ab99c462e0',
                'PLF-007',
                '{"fullName": "Member 7"}'::jsonb,
                '{"membershipFee": 100.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9781.227403, "shareValue": -186.72740300000004}'::jsonb,
                '2021-10-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0f1c5e06-5d0a-4a00-bd46-0d7458acffe0',
                'PLF-008',
                '{"fullName": "Member 8"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9266.693659, "shareValue": -1758.0146590000006}'::jsonb,
                '2018-07-23'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd580128f-049e-47ed-8c8c-282a15a6a46d',
                'PLF-009',
                '{"fullName": "Member 9"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5551.456231, "shareValue": -1051.4562310000001}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ea4cc311-49a9-472e-9b51-9696b9eb9bf0',
                'PLF-010',
                '{"fullName": "Member 10"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9727.445362, "shareValue": -1605.7478620000004}'::jsonb,
                '2020-06-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2b3adfd7-16ff-4b5f-b4b0-a3588e8e00e9',
                'PLF-011',
                '{"fullName": "Member 11"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4044.0408195, "shareValue": -694.0408195}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e2dc35dd-2237-4be1-8d3b-3fca99bea739',
                'PLF-012',
                '{"fullName": "Member 12"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 502.8472035, "shareValue": 1309.3687965000001}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '79998fae-d75c-43af-b555-21cca45b797b',
                'PLF-013',
                '{"fullName": "Member 13"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3454.182615, "shareValue": -554.182615}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ef165362-8953-4f30-a9d9-35aaa0d60714',
                'PLF-014',
                '{"fullName": "Member 14"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10905.436281, "shareValue": -1339.4362810000002}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '59231a13-167f-4122-8d91-362ce8455ae4',
                'PLF-015',
                '{"fullName": "Member 15"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9483.844261, "shareValue": -1983.8442610000004}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '24183d6b-b9a3-4212-92b9-0ff3be32bc40',
                'PLF-016',
                '{"fullName": "Member 16"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10532.481069000001, "shareValue": -2232.4810690000004}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f8b7927d-e985-4328-805a-3bf51f92750d',
                'PLF-017',
                '{"fullName": "Member 17"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -4944.39943, "shareValue": 3481.8994300000004}'::jsonb,
                '2019-01-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8dd78300-43ff-43c8-a1f9-1ab4766bf351',
                'PLF-018',
                '{"fullName": "Member 18"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1321.0267079999999, "shareValue": 1245.5287919999998}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cacbe8de-d756-4a5b-bde5-cb357a5a06f5',
                'PLF-019',
                '{"fullName": "Member 19"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11581.117877, "shareValue": -2481.1178769999997}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '49bceb6e-a408-4241-b324-6adf02dc654b',
                'PLF-020',
                '{"fullName": "Member 20"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3145.2762923, "shareValue": -306.5972923}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ae96b936-4896-4865-956a-1f012f333228',
                'PLF-021',
                '{"fullName": "Member 21"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10663.56067, "shareValue": -2263.5606700000003}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0d1839b4-9707-4fe2-bd56-d8a2e1033be0',
                'PLF-022',
                '{"fullName": "Member 22"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6469.013438, "shareValue": -1269.013438}'::jsonb,
                '2018-08-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '02ec8d38-61a9-42e1-962a-b6dbcb938fe7',
                'PLF-023',
                '{"fullName": "Member 23"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11581.117877, "shareValue": -2481.1178769999997}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f65e1081-6e08-4d21-aa69-1757eb96f4ef',
                'PLF-024',
                '{"fullName": "Member 24"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -481.835098, "shareValue": 2499.909098}'::jsonb,
                '2018-08-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '09b33ee3-bcef-4760-b739-89fdad56bf74',
                'PLF-025',
                '{"fullName": "Member 25"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3708.8506305, "shareValue": 1038.6863695}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f85d6414-c522-4941-a36d-ec8efed03524',
                'PLF-026',
                '{"fullName": "Member 26"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9483.844261, "shareValue": -1983.8442610000004}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '93293711-5a55-424c-898b-3c268703ec33',
                'PLF-027',
                '{"fullName": "Member 27"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10794.640271, "shareValue": -2294.6402710000007}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '91eab1fd-5ec8-44a8-8953-88faae250093',
                'PLF-028',
                '{"fullName": "Member 28"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11581.117877, "shareValue": -2481.1178769999997}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9993cd66-8210-43af-82ba-5c3435f09a5d',
                'PLF-029',
                '{"fullName": "Member 29"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5027.1378270000005, "shareValue": -927.137827}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4fb2c059-ec8f-4715-9f0b-719ca4550a5b',
                'PLF-030',
                '{"fullName": "Member 30"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 883.471407, "shareValue": 1288.886593}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '46863e4e-3f80-4d9a-96d4-f14949aed55c',
                'PLF-031',
                '{"fullName": "Member 31"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -444.555301, "shareValue": 2141.7898010000004}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '949b0355-67d6-477a-af69-0d14c607eaec',
                'PLF-032',
                '{"fullName": "Member 32"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10663.56067, "shareValue": -2263.5606700000003}'::jsonb,
                '2018-08-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f18a2307-e334-43bb-990a-68837b4e0996',
                'PLF-033',
                '{"fullName": "Member 33"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11626.126477, "shareValue": -2317.4474769999997}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b89504e5-8e5b-4a18-9f58-30811aa11cad',
                'PLF-034',
                '{"fullName": "Member 34"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11712.197478, "shareValue": -2512.197478}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1fdee5e0-9fe3-4c6f-a770-6431cf25b796',
                'PLF-035',
                '{"fullName": "Member 35"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10243.504282, "shareValue": -562.7697820000002}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2f00c631-f9cc-48df-aba8-2077bd558347',
                'PLF-036',
                '{"fullName": "Member 36"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7910.889049, "shareValue": -1610.889049}'::jsonb,
                '2019-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3f573473-2b24-4de2-a096-483728911a89',
                'PLF-037',
                '{"fullName": "Member 37"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7367.1614465, "shareValue": -1099.8034465000003}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b924f7ee-3dd7-4f07-9fe1-9cdb0c4bb59c',
                'PLF-038',
                '{"fullName": "Member 38"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11581.117877, "shareValue": -2481.1178769999997}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1c4d03f4-42a3-42a7-9de4-c936e6fc73f9',
                'PLF-039',
                '{"fullName": "Member 39"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8550.273025999999, "shareValue": -1130.330476}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c804a6d7-13df-49ac-b65e-d20521c54c8c',
                'PLF-040',
                '{"fullName": "Member 40"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3585.262216, "shareValue": -585.2622160000001}'::jsonb,
                '2018-11-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b0fc9740-7af7-49e8-99fe-fd2e8288e682',
                'PLF-041',
                '{"fullName": "Member 41"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8173.048251, "shareValue": -1673.0482510000002}'::jsonb,
                '2019-07-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '229195ba-dfd2-4708-a5cc-73efa995e1cc',
                'PLF-042',
                '{"fullName": "Member 42"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6167.2467841711, "shareValue": -469.09978417110034}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2e126255-3c4b-4c35-b2fb-826c664dedcb',
                'PLF-043',
                '{"fullName": "Member 43"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1186.8386863, "shareValue": 2249.7336863}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b3669eba-2cd7-4848-ace5-e10a38948fa5',
                'PLF-044',
                '{"fullName": "Member 44"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4896.058226, "shareValue": -896.0582260000001}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8919c061-09cf-46ce-aab0-ad13eadb8d4c',
                'PLF-045',
                '{"fullName": "Member 45"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 879.7164090000001, "shareValue": 1715.499591}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '63e205a1-4859-4076-bc93-06c00d0477a4',
                'PLF-046',
                '{"fullName": "Member 46"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8959.525857, "shareValue": -1859.525857}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '208a6502-48a2-4bec-9e52-dc4a7773c93b',
                'PLF-047',
                '{"fullName": "Member 47"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -355.84246310000003, "shareValue": 1831.2189630999999}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cc35f18f-c1f4-4e85-98c8-c9a4cff0aa6a',
                'PLF-048',
                '{"fullName": "Member 48"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 2082.9726529, "shareValue": 1079.0828471}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c859c1e8-7a9d-4a0a-8dbb-c53405157bbf',
                'PLF-049',
                '{"fullName": "Member 49"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11712.197478, "shareValue": -2512.197478}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '47b1386c-2995-4741-a7f6-e46664571e9e',
                'PLF-050',
                '{"fullName": "Member 50"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11056.799473000001, "shareValue": -2356.7994730000005}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8fbfffe8-0e5c-4bc9-b883-9db4c1e30288',
                'PLF-051',
                '{"fullName": "Member 51"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12039.8964805, "shareValue": -2589.8964805000005}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'dc9c278e-f67b-4002-9f69-a371d4df65fc',
                'PLF-052',
                '{"fullName": "Member 52"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4633.899024, "shareValue": -833.899024}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e205768d-4f41-4b67-9115-f4c0a6498dd9',
                'PLF-053',
                '{"fullName": "Member 53"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 523.6842723, "shareValue": 314.99472770000006}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a3a287a0-77e5-4139-b0c8-8223ee0d98e0',
                'PLF-054',
                '{"fullName": "Member 54"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1085.693609, "shareValue": 1921.3803910000004}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '999f341a-7a74-45a1-ae0b-8bd221b09694',
                'PLF-055',
                '{"fullName": "Member 55"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1643.6093106, "shareValue": 3373.2295606000002}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9e71d9c6-5d5b-4c05-8aa7-317512aaf91a',
                'PLF-056',
                '{"fullName": "Member 56"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8173.048251, "shareValue": -1673.0482510000002}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd092fe59-2ce2-4809-9a0e-1dcf6b0dd8f0',
                'PLF-057',
                '{"fullName": "Member 57"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10925.719872000001, "shareValue": -2325.7198720000006}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fa01ef88-87f4-4e8b-90d3-0a22ea96a7cb',
                'PLF-058',
                '{"fullName": "Member 58"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11318.958675, "shareValue": -2418.958675}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '323f2953-5a96-4584-9c5f-faf5b6ff6392',
                'PLF-059',
                '{"fullName": "Member 59"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1913.811831, "shareValue": 3138.221919}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6f04d074-d141-4dc6-b0f6-1ac5e02fafd1',
                'PLF-060',
                '{"fullName": "Member 60"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11843.277079, "shareValue": -2543.277079}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd7f47e46-1446-4878-9eab-148508c754fc',
                'PLF-061',
                '{"fullName": "Member 61"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8304.127852, "shareValue": -1704.127852}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '91d881f7-a397-4990-85d9-1d10a8b430d2',
                'PLF-062',
                '{"fullName": "Member 62"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7648.7298470000005, "shareValue": -1548.729847}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f291c2c8-ab6d-43d2-b1cb-0db93136c09d',
                'PLF-063',
                '{"fullName": "Member 63"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11305.8507149, "shareValue": -2415.8507148999997}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7786abd8-7691-4502-b3d5-1905512d0fb6',
                'PLF-064',
                '{"fullName": "Member 64"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11843.277079, "shareValue": -2543.277079}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '01583b10-7c9c-43ae-ac45-e810b377691d',
                'PLF-065',
                '{"fullName": "Member 65"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9090.605458, "shareValue": -1890.6054580000002}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5af0607d-376b-464d-96c8-8c881568ee75',
                'PLF-066',
                '{"fullName": "Member 66"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6667.156252, "shareValue": -10.742751999999953}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '073aefe6-81a8-4c15-ba2a-99c767e06e50',
                'PLF-067',
                '{"fullName": "Member 67"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 758.437606, "shareValue": 1530.420394}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9fe95755-06f3-4a71-b71b-c34ed46e821f',
                'PLF-068',
                '{"fullName": "Member 68"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5682.535832, "shareValue": -1082.535832}'::jsonb,
                '2019-04-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c2fc3f53-a9e0-4b7b-84ec-46e12a95f46f',
                'PLF-069',
                '{"fullName": "Member 69"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4.3452085000000125, "shareValue": 2367.2102915}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ebd763b7-86b7-4f7c-9226-d25b5644bbb3',
                'PLF-070',
                '{"fullName": "Member 70"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7124.411443, "shareValue": -1424.4114430000002}'::jsonb,
                '2018-10-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a51bef48-369c-4012-a265-210130068a68',
                'PLF-071',
                '{"fullName": "Member 71"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11056.799473000001, "shareValue": -2356.7994730000005}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4a5619a1-6aa6-4438-9754-e6d029de7e9c',
                'PLF-072',
                '{"fullName": "Member 72"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 262.159202, "shareValue": 1616.556798}'::jsonb,
                '2018-08-02'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c170a9fe-8dfa-4cda-be93-9017003305fd',
                'PLF-073',
                '{"fullName": "Member 73"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5138.3588684485, "shareValue": -953.5088684485}'::jsonb,
                '2018-09-05'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fe4f2972-4e0d-4ff0-9eb3-f00f7ad86322',
                'PLF-074',
                '{"fullName": "Member 74"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4958.217428, "shareValue": -747.2174280000002}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8d9bf6a4-5b3a-4ad4-9e2f-9fbcb12063e8',
                'PLF-075',
                '{"fullName": "Member 75"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9352.76466, "shareValue": -1952.76466}'::jsonb,
                '2018-08-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '38bf0d06-9157-40a1-8313-97f0c471a336',
                'PLF-076',
                '{"fullName": "Member 76"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11843.277079, "shareValue": -2543.277079}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b6fe0063-08e6-4c94-aa3c-e01b1bc6c3aa',
                'PLF-077',
                '{"fullName": "Member 77"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6337.9338370000005, "shareValue": -1237.933837}'::jsonb,
                '2018-07-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3ae6d7fc-6ed0-4341-a2f2-0ad2d6efee69',
                'PLF-078',
                '{"fullName": "Member 78"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11318.958675, "shareValue": -2418.958675}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '94248ab3-a6d2-4c3f-b7df-d6e7f665af74',
                'PLF-079',
                '{"fullName": "Member 79"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9746.003463000001, "shareValue": -2046.003463}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9545c9db-1ec8-4365-bfeb-eafafd51ace0',
                'PLF-080',
                '{"fullName": "Member 80"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5109.4344355, "shareValue": -116.89743550000009}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5178bf87-7902-4261-8ce5-f248d45d93c4',
                'PLF-081',
                '{"fullName": "Member 81"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3847.421418, "shareValue": -647.4214180000001}'::jsonb,
                '2019-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c15dba61-16f0-4ebc-88c9-4edcaf3627d1',
                'PLF-082',
                '{"fullName": "Member 82"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3716.341817, "shareValue": -616.3418170000001}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b2fa2502-11d8-44d1-9dff-6c08d63d542e',
                'PLF-083',
                '{"fullName": "Member 83"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9090.605458, "shareValue": -1890.6054580000002}'::jsonb,
                '2018-09-17'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '43ee6f5b-023c-4e6b-8f11-4d8151523455',
                'PLF-084',
                '{"fullName": "Member 84"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5879.1552335, "shareValue": -1129.1552335000001}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'aeea5fea-2be9-4e66-956e-8dbd4fde9197',
                'PLF-085',
                '{"fullName": "Member 85"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5694.242647, "shareValue": 702.9918529999999}'::jsonb,
                '2018-10-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4b02c5e0-a606-4ea9-8670-2c7eed23b743',
                'PLF-086',
                '{"fullName": "Member 86"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12105.436281, "shareValue": -2605.4362810000002}'::jsonb,
                '2019-12-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6c38c2ac-5734-43ec-bb19-b5c05ae5396c',
                'PLF-087',
                '{"fullName": "Member 87"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9044.492469, "shareValue": -465.77646900000065}'::jsonb,
                '2018-07-24'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9c1d0cf2-0f2f-4fd2-a43b-e7308d3bece3',
                'PLF-088',
                '{"fullName": "Member 88"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11450.038276, "shareValue": -2450.038276}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd086fc27-0280-4903-ba67-21c5ce4e4432',
                'PLF-089',
                '{"fullName": "Member 89"}'::jsonb,
                '{"membershipFee": 0.0, "expectedContribution": 1600.0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4248.552619, "shareValue": 303.5213809999999}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a876d9ae-eec9-44b1-b311-7c0cdddca4f7',
                'PLF-001',
                '{"fullName": "Member 1"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6178.128275289009, "shareValue": -1079.1282752890088}'::jsonb,
                '2018-08-14'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ea854486-0fb1-4365-97da-d8e021e79c77',
                'PLF-002',
                '{"fullName": "Member 2"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6720.297167319086, "shareValue": -2709.2971673190855}'::jsonb,
                '2019-02-16'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1b8f1309-e709-4482-bdd5-a18a4fb6386c',
                'PLF-003',
                '{"fullName": "Member 3"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16938.85764713494, "shareValue": -8038.857647134941}'::jsonb,
                '2018-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5cca520f-5d50-4f04-8695-8e38643bad2d',
                'PLF-004',
                '{"fullName": "Member 4"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19591.199254714797, "shareValue": -9391.199254714797}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '738fe542-9ef8-4aa3-a15e-356122c43e6a',
                'PLF-005',
                '{"fullName": "Member 5"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8902.935862883747, "shareValue": -3941.6058628837463}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '07693a18-cf40-4ef4-828f-b208cd0f9691',
                'PLF-006',
                '{"fullName": "Member 6"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9797.937934419944, "shareValue": -4397.937934419944}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '338fb56a-f6f4-4d75-b2cb-49c45db72f2b',
                'PLF-007',
                '{"fullName": "Member 7"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19999.251809727084, "shareValue": -9599.251809727084}'::jsonb,
                '2021-10-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c2f4e430-f88b-4442-9bad-1701d1badb3c',
                'PLF-008',
                '{"fullName": "Member 8"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15714.699982098082, "shareValue": -7414.699982098083}'::jsonb,
                '2018-07-23'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '655dda27-a62c-4bb3-a98f-4aedd0f2fd74',
                'PLF-009',
                '{"fullName": "Member 9"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9593.9116569138, "shareValue": -4293.9116569138005}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ad0b7557-58d7-4552-822a-0e0e5daa87fd',
                'PLF-010',
                '{"fullName": "Member 10"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15257.680145575805, "shareValue": -6297.180145575805}'::jsonb,
                '2020-06-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd021e048-8037-44d3-878a-f8e3b99e7225',
                'PLF-011',
                '{"fullName": "Member 11"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7247.609465593158, "shareValue": -3097.6094655931583}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '694e4a56-0770-4118-b40d-5bbc446b0049',
                'PLF-012',
                '{"fullName": "Member 12"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3268.968908623149, "shareValue": -696.9689086231492}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'decb7986-7520-46cb-ab3c-a6288071a957',
                'PLF-013',
                '{"fullName": "Member 13"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6329.491216815515, "shareValue": -2629.4912168155156}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6afafb23-735e-4b4b-a6e1-276fff4c0182',
                'PLF-014',
                '{"fullName": "Member 14"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18422.609308232593, "shareValue": -8078.609308232593}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'aa716114-a50f-4693-bdcd-0226ce00ad37',
                'PLF-015',
                '{"fullName": "Member 15"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15714.699982098082, "shareValue": -7414.699982098083}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ac1a9848-3cdc-4f97-b265-2af072d218c0',
                'PLF-016',
                '{"fullName": "Member 16"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17346.910202147228, "shareValue": -8246.910202147228}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '24a8a62a-4c74-4924-9faa-6dd748367604',
                'PLF-017',
                '{"fullName": "Member 17"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -7278.978421934787, "shareValue": 6616.478421934787}'::jsonb,
                '2019-01-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b50de1da-be36-4250-a0c4-4f0c299bec0f',
                'PLF-018',
                '{"fullName": "Member 18"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4595.516783768657, "shareValue": -1251.5167837686563}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fb4992ad-a958-47af-86e0-dcdad6abacbf',
                'PLF-019',
                '{"fullName": "Member 19"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16990.413448238338, "shareValue": -7021.663448238336}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '71aa25e4-8fa1-4288-83e4-fa78def378ee',
                'PLF-020',
                '{"fullName": "Member 20"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6186.672822561216, "shareValue": -2556.672822561216}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ad588cef-99a0-4bb5-b9f7-2c34ab544c5d',
                'PLF-021',
                '{"fullName": "Member 21"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17550.936479653366, "shareValue": -8350.936479653366}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '07e663dd-97ae-41e4-8a7d-2ddceed0c407',
                'PLF-022',
                '{"fullName": "Member 22"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11022.0955994568, "shareValue": -5022.0955994568}'::jsonb,
                '2018-08-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd1dab756-f8f9-4f9d-b85b-d724447b75ad',
                'PLF-023',
                '{"fullName": "Member 23"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18979.12042219637, "shareValue": -9079.120422196369}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cb5be361-fb72-4f49-9aae-daf1636d6d57',
                'PLF-024',
                '{"fullName": "Member 24"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1226.4959720994013, "shareValue": 4124.495972099401}'::jsonb,
                '2018-08-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e97916c5-f543-489a-ae81-433b890e2550',
                'PLF-025',
                '{"fullName": "Member 25"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8357.037169075105, "shareValue": -2863.0371690751044}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9a93b6f3-1b0a-469a-8f91-90efcb179e93',
                'PLF-026',
                '{"fullName": "Member 26"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14608.33557202379, "shareValue": -6253.3355720237905}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3cee85ce-2c91-4568-be25-afe34ed74bb8',
                'PLF-027',
                '{"fullName": "Member 27"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17754.962757159512, "shareValue": -8454.962757159512}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '733ac900-551d-49bc-a4eb-429a6c06ded4',
                'PLF-028',
                '{"fullName": "Member 28"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18979.12042219637, "shareValue": -9079.120422196369}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '471add82-f406-4879-a7ed-c0ac89f5e988',
                'PLF-029',
                '{"fullName": "Member 29"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8777.80654688923, "shareValue": -3877.806546889229}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8f38df18-c2e6-47dd-9b64-899575474777',
                'PLF-030',
                '{"fullName": "Member 30"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1577.433486075598, "shareValue": 1454.566513924402}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7e404eda-a26e-4711-bb38-97cb0b6f1aac',
                'PLF-031',
                '{"fullName": "Member 31"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1237.407235397227, "shareValue": 3810.657235397227}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '21e1085a-df6c-4826-b248-90e70c301a23',
                'PLF-032',
                '{"fullName": "Member 32"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17550.936479653366, "shareValue": -8350.936479653366}'::jsonb,
                '2018-08-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '33e658b4-1cd8-44d3-8adf-9f4f4fcc70c5',
                'PLF-033',
                '{"fullName": "Member 33"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19387.172977208655, "shareValue": -9287.172977208655}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '94056e51-b712-4636-8958-78e28aa3376f',
                'PLF-034',
                '{"fullName": "Member 34"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19183.146699702513, "shareValue": -9183.14669970251}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7aec4016-164c-4c69-9ced-c5af702f8a45',
                'PLF-035',
                '{"fullName": "Member 35"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18071.316524306196, "shareValue": -7605.316524306194}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2aba80aa-dc3b-4f49-b280-59920d6a3a93',
                'PLF-036',
                '{"fullName": "Member 36"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13266.384652024371, "shareValue": -6166.384652024371}'::jsonb,
                '2019-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b75ed236-5804-4bf4-9b6b-7e77666275a0',
                'PLF-037',
                '{"fullName": "Member 37"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13164.371513271299, "shareValue": -6114.371513271299}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'abf4ddd3-3dca-417f-86d9-23c19cd710f6',
                'PLF-038',
                '{"fullName": "Member 38"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18979.12042219637, "shareValue": -9079.120422196369}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4cdbc179-4fdd-4cf7-b6e1-5f36a62fdb24',
                'PLF-039',
                '{"fullName": "Member 39"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15490.271076841327, "shareValue": -7300.271076841326}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9113b35d-2737-46c8-b926-8917384a7184',
                'PLF-040',
                '{"fullName": "Member 40"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6533.517494321659, "shareValue": -2733.517494321659}'::jsonb,
                '2018-11-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fed8efde-c2a8-47f2-b829-1ab4c1ca5300',
                'PLF-041',
                '{"fullName": "Member 41"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13674.437207036655, "shareValue": -6374.437207036655}'::jsonb,
                '2019-07-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2967cbdf-6bd1-45ca-95e1-9a834fa3d869',
                'PLF-042',
                '{"fullName": "Member 42"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10605.113734024608, "shareValue": -4094.503734024607}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5f39a849-54e2-4096-ac77-cc2c3522b85e',
                'PLF-043',
                '{"fullName": "Member 43"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1501.9040978551113, "shareValue": 3414.904097855111}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '769f5eb2-2a7d-41e0-876c-91d22a0e4ee3',
                'PLF-044',
                '{"fullName": "Member 44"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8573.780269383087, "shareValue": -3773.7802693830868}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8fe33010-d1f4-424e-b8ec-f6fe93426b98',
                'PLF-045',
                '{"fullName": "Member 45"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -281.64811106254456, "shareValue": 3790.6481110625446}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '29289651-4e5b-4f16-bdea-8c31f8d5f137',
                'PLF-046',
                '{"fullName": "Member 46"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14898.594872073514, "shareValue": -6998.594872073513}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e29bc860-ee3e-456d-a13d-2cc91637adcc',
                'PLF-047',
                '{"fullName": "Member 47"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -428.45518276289977, "shareValue": 2750.4551827628998}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '11b855ae-35c4-4a4f-8172-72eb0acdeb53',
                'PLF-048',
                '{"fullName": "Member 48"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4369.157759480114, "shareValue": -402.157759480114}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c7ae9862-5799-44f3-8321-424926e3ef05',
                'PLF-049',
                '{"fullName": "Member 49"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19183.146699702513, "shareValue": -9183.14669970251}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e4af061b-70f0-4d09-b8e3-6f1a29670101',
                'PLF-050',
                '{"fullName": "Member 50"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18163.0153121718, "shareValue": -8663.0153121718}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f8ca0a06-b686-40a1-8239-30af9504b7f3',
                'PLF-051',
                '{"fullName": "Member 51"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19693.212393467868, "shareValue": -9443.212393467868}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '12c12757-21ba-431b-abbe-cb0155dbaac4',
                'PLF-052',
                '{"fullName": "Member 52"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8165.727714370802, "shareValue": -3565.727714370801}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8cc8945b-b80f-4bc7-8b49-aa76fb6c85bb',
                'PLF-053',
                '{"fullName": "Member 53"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 2106.1472724383602, "shareValue": -476.14727243836}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '232b4661-b58f-428f-8fb3-3770f445c4f8',
                'PLF-054',
                '{"fullName": "Member 54"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 2994.2759428007976, "shareValue": 818.4740571992024}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'eff3fae8-5508-4784-bec8-221df65b3787',
                'PLF-055',
                '{"fullName": "Member 55"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -1649.9183857375547, "shareValue": 4237.918385737555}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '97e3fc0e-51c8-4805-9d17-f7761bad4967',
                'PLF-056',
                '{"fullName": "Member 56"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13674.437207036655, "shareValue": -6374.437207036655}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '694a1b60-db0f-409a-8330-0ea4a1c5474a',
                'PLF-057',
                '{"fullName": "Member 57"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17958.989034665654, "shareValue": -8558.989034665654}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '64497551-dd40-460a-bdae-39d1d77fa991',
                'PLF-058',
                '{"fullName": "Member 58"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18571.067867184083, "shareValue": -8871.067867184083}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a090e1ae-7d16-45c6-aba0-d6224b1ec4c5',
                'PLF-059',
                '{"fullName": "Member 59"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3671.35128786676, "shareValue": 2331.14871213324}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0a1ad4e7-16bc-4cf3-acc9-0c37ad535d56',
                'PLF-060',
                '{"fullName": "Member 60"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19387.172977208655, "shareValue": -9287.172977208655}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b1827b42-c7b0-4a5f-bf31-7c7304b8343a',
                'PLF-061',
                '{"fullName": "Member 61"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13878.463484542799, "shareValue": -6478.463484542799}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3e5a1f51-99dc-4f9a-984b-af31d736479d',
                'PLF-062',
                '{"fullName": "Member 62"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12858.332097012084, "shareValue": -5958.332097012085}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '64efb2e1-c140-43dc-9ee5-326140459e49',
                'PLF-063',
                '{"fullName": "Member 63"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18550.665239433467, "shareValue": -8860.665239433469}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2493da0d-9ef2-4f12-b317-3dd1c1341543',
                'PLF-064',
                '{"fullName": "Member 64"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19387.172977208655, "shareValue": -9287.172977208655}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '813a661f-c2f1-4385-bd08-51a5a4e4ebfb',
                'PLF-065',
                '{"fullName": "Member 65"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15102.621149579656, "shareValue": -7102.621149579655}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9546e212-4514-47da-b1a0-a96dbfaf7a89',
                'PLF-066',
                '{"fullName": "Member 66"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12819.755935814062, "shareValue": -5386.7559358140625}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6317af60-786f-4658-8c12-cfa42aba91c5',
                'PLF-067',
                '{"fullName": "Member 67"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4901.307274272516, "shareValue": -1901.3072742725162}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ca4d5c08-b7b8-496d-8370-0b468510e75f',
                'PLF-068',
                '{"fullName": "Member 68"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9797.937934419944, "shareValue": -4397.937934419944}'::jsonb,
                '2019-04-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cbe8f6b0-6c00-4c9f-8dfd-321d70c3b472',
                'PLF-069',
                '{"fullName": "Member 69"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1679.6847072302176, "shareValue": 1485.8152927697824}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b5145438-1b3e-40ed-93fd-cbfe5e8b9c6e',
                'PLF-070',
                '{"fullName": "Member 70"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12042.226986987514, "shareValue": -5542.2269869875145}'::jsonb,
                '2018-10-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1e3771c0-2e9d-4622-a964-c74c3fda96fc',
                'PLF-071',
                '{"fullName": "Member 71"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18163.0153121718, "shareValue": -8663.0153121718}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '60d3d71f-9ba1-4802-b90d-62d8134fe9a2',
                'PLF-072',
                '{"fullName": "Member 72"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 3071.2572640027856, "shareValue": -438.2572640027854}'::jsonb,
                '2018-08-02'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '592a597e-e688-4c4a-a9bb-5c810512f304',
                'PLF-073',
                '{"fullName": "Member 73"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8950.922843353192, "shareValue": -3966.072843353191}'::jsonb,
                '2018-09-05'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5cd9a103-8f18-40d0-8585-f0ec250c4d67',
                'PLF-074',
                '{"fullName": "Member 74"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7110.427279450214, "shareValue": -2055.4272794502144}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9ebd160b-4e27-4ff3-8f21-be7bade2709a',
                'PLF-075',
                '{"fullName": "Member 75"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15510.67370459194, "shareValue": -7310.673704591941}'::jsonb,
                '2018-08-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '50a2d414-ae3f-480c-b1e2-39d071b5e881',
                'PLF-076',
                '{"fullName": "Member 76"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19387.172977208655, "shareValue": -9287.172977208655}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8a63bdd8-15d2-417f-a180-8aa9f9353f7a',
                'PLF-077',
                '{"fullName": "Member 77"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10818.069321950657, "shareValue": -4918.0693219506575}'::jsonb,
                '2018-07-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b8045dee-49ac-49db-980a-bf5746d35bbe',
                'PLF-078',
                '{"fullName": "Member 78"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18571.067867184083, "shareValue": -8871.067867184083}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '86f5b652-b4af-419d-8d5e-8ecfc3f324f7',
                'PLF-079',
                '{"fullName": "Member 79"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16122.75253711037, "shareValue": -7622.752537110368}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '59cf3aee-cb8d-4f73-b836-54414ec78551',
                'PLF-080',
                '{"fullName": "Member 80"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8431.91807959491, "shareValue": -2610.41807959491}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '81f415d8-e395-4dc4-9f86-97a87f0e6dad',
                'PLF-081',
                '{"fullName": "Member 81"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -856.0002752775817, "shareValue": 5103.500275277582}'::jsonb,
                '2019-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2725a9f3-0270-4ebe-93e2-79b4f05a2f39',
                'PLF-082',
                '{"fullName": "Member 82"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6737.543771827801, "shareValue": -2837.5437718278013}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '39301410-9727-44a8-8d7d-628c55f738db',
                'PLF-083',
                '{"fullName": "Member 83"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15102.621149579656, "shareValue": -7102.621149579655}'::jsonb,
                '2018-09-17'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a30942f3-cfe9-4c1a-8690-bac2c59b56ba',
                'PLF-084',
                '{"fullName": "Member 84"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10103.977350679157, "shareValue": -4553.977350679157}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'bba90c2e-0206-4c94-a1af-660ce11b944f',
                'PLF-085',
                '{"fullName": "Member 85"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7750.66023817088, "shareValue": -452.6602381708799}'::jsonb,
                '2018-10-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '696e62ee-9981-4660-9512-76d89dbaa71c',
                'PLF-086',
                '{"fullName": "Member 86"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19795.225532220942, "shareValue": -9495.225532220942}'::jsonb,
                '2019-12-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'eabd5e91-1db4-4dcd-a4a5-57c747a961b4',
                'PLF-087',
                '{"fullName": "Member 87"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14305.813147923855, "shareValue": -4884.813147923854}'::jsonb,
                '2018-07-24'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b122e799-7028-434f-9bed-56b89a4d600f',
                'PLF-088',
                '{"fullName": "Member 88"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18775.094144690225, "shareValue": -8975.094144690225}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '69dcf383-559d-4f36-8ba9-bf3942cee844',
                'PLF-089',
                '{"fullName": "Member 89"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4634.017394575345, "shareValue": 830.9826054246555}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a6054f22-be5d-4073-9b1c-7dc431d1145f',
                'PLF-AVG',
                '{"fullName": "AVG"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '74e72bc1-590c-43b0-bddf-7afc2f2fdbe7',
                'PLF-Gaithijwe Letlhaku',
                '{"fullName": "Gaithijwe Letlhaku"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '453bfe9c-6272-47c8-947e-7d0205f30ad8',
                'PLF-Naomi Mokhine',
                '{"fullName": "Naomi Mokhine"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6b5263bb-8265-4039-a1eb-a50082ac707c',
                'PLF-Matshediso Ellen Tyobeka',
                '{"fullName": "Matshediso Ellen Tyobeka"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4828f6a4-78cb-4ada-b056-54016a33ed33',
                'PLF-Keatlaretse Poo',
                '{"fullName": "Keatlaretse Poo"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7091fc43-c690-4ef2-b026-c3d7062dc054',
                'PLF-Michael Boitumelo Kenosi Suping',
                '{"fullName": "Michael Boitumelo Kenosi Suping"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '16b789f2-2763-41e2-bcb4-eab2850d7828',
                'PLF-  Lesego Bokaba',
                '{"fullName": "  Lesego Bokaba"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a6a6284c-8b36-42db-8ca2-65747c152b68',
                'PLF-Sylvia Mokhadi',
                '{"fullName": "Sylvia Mokhadi"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c7de5b3d-1ebf-4a25-9383-5249ff36c81b',
                'PLF- wellington galogakwe',
                '{"fullName": " wellington galogakwe"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b8169887-a3d3-4fb3-9efd-477eef55c27e',
                'PLF-Nicholas Molale',
                '{"fullName": "Nicholas Molale"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '18adf661-e233-4cde-9173-7895ac7a690d',
                'PLF- Dumisane Mtotoba',
                '{"fullName": " Dumisane Mtotoba"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '334562d4-5d94-4638-8dfb-6f6406f5646c',
                'PLF- kabelo morubane',
                '{"fullName": " kabelo morubane"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1819ca8b-9934-4c40-9c1d-9fb529cbc3c2',
                'PLF- Jeff Matlou',
                '{"fullName": " Jeff Matlou"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3c578b23-5890-4eb6-be39-0c1130f3433a',
                'PLF-Belinda Kelly',
                '{"fullName": "Belinda Kelly"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e722a1eb-274e-412b-98ba-c01cf80cad22',
                'PLF-Refilwe Lentswe',
                '{"fullName": "Refilwe Lentswe"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c766292c-4b81-4e56-9213-2d770d28ec18',
                'PLF-Freddy Sonakile',
                '{"fullName": "Freddy Sonakile"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'be0a6b38-007e-451c-b834-b409946bf1f6',
                'PLF-Lenyatso Shadi',
                '{"fullName": "Lenyatso Shadi"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b0bc5681-13a0-4081-9a7b-08ec9fc2065e',
                'PLF-Naomi Mokhine',
                '{"fullName": "Naomi Mokhine"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd38a9542-b12f-42ab-aecd-38b4e5ed813b',
                'PLF-Sylvia Mokhadi',
                '{"fullName": "Sylvia Mokhadi"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '00307468-fe2c-4f1d-9d07-96d26b6a0fe1',
                'PLF-wellington galogakwe',
                '{"fullName": "wellington galogakwe"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cb7eb308-cd6f-4f8c-b14b-13061747f60c',
                'PLF-Nicholas Molale',
                '{"fullName": "Nicholas Molale"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b9577886-0cc0-4c68-b2fe-6535b00a6b91',
                'PLF-Elizabeth Nakuphi Thabeng',
                '{"fullName": "Elizabeth Nakuphi Thabeng"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '746f218f-e24e-4404-a2ce-9ec0b2b73648',
                'PLF-Matshediso Ellen Tyobeka',
                '{"fullName": "Matshediso Ellen Tyobeka"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '29839305-c87f-4998-9949-2b94eba0b73c',
                'PLF-Keatlaretse Poo',
                '{"fullName": "Keatlaretse Poo"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c9c29a32-8438-41bd-864c-61ad2355a645',
                'PLF-Michael Boitumelo Kenosi Suping',
                '{"fullName": "Michael Boitumelo Kenosi Suping"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6592c487-0bcd-4ff3-a311-11fa54e37678',
                'PLF-Vhuthihi Makhado',
                '{"fullName": "Vhuthihi Makhado"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd6845185-d9fe-4f6e-a941-8598e156f38f',
                'PLF-Lesego Bokaba',
                '{"fullName": "Lesego Bokaba"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '13112293-53c7-496e-95d1-df54a1256e93',
                'PLF-kabelo morubane',
                '{"fullName": "kabelo morubane"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f9c7a730-8145-4ac4-ae8f-012996cba9de',
                'PLF-Freddy Sonakile',
                '{"fullName": "Freddy Sonakile"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'eaea434a-98ee-4563-ab36-de151152e693',
                'PLF-Jeff Matlou',
                '{"fullName": "Jeff Matlou"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a2ebd473-a427-4432-b551-5db84d0364c5',
                'PLF-Belinda Kelly',
                '{"fullName": "Belinda Kelly"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'da0ea281-239b-4bd1-acee-3360a0819f93',
                'PLF-Babotshedi Malibe',
                '{"fullName": "Babotshedi Malibe"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e566bdfd-4e9e-4d53-afa7-0aa6c6d14d2b',
                'PLF-Naomi Mokhine',
                '{"fullName": "Naomi Mokhine"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9e21d794-1161-44ef-9596-3c4dbbd49c8c',
                'PLF-Sina Molale',
                '{"fullName": "Sina Molale"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd3bff268-c041-4d97-a137-ddb1db74399b',
                'PLF-mmantsho lamone',
                '{"fullName": "mmantsho lamone"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a975459f-23b5-4c11-bae2-98477ba11e9b',
                'PLF-Lesego Bokaba',
                '{"fullName": "Lesego Bokaba"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7d08205c-61f7-4102-881e-da55046be49d',
                'PLF-Sylvia Mokhadi',
                '{"fullName": "Sylvia Mokhadi"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '70d18dfa-0b0f-4cc6-a11a-09030463b74f',
                'PLF-Michael Boitumelo Kenosi Suping',
                '{"fullName": "Michael Boitumelo Kenosi Suping"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ea53b905-75ed-44aa-add2-7e2da33b88c1',
                'PLF-Tebogo Itshegetseng',
                '{"fullName": "Tebogo Itshegetseng"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7445337d-c327-4087-bf83-1b7cf27b857d',
                'PLF-Nicholas Molale',
                '{"fullName": "Nicholas Molale"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '95a34a52-2d62-41f3-8d5a-9be43a9631ea',
                'PLF-Rosinah Letlhaku',
                '{"fullName": "Rosinah Letlhaku"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b0dac214-8aed-4ba3-a104-72e81b6461d2',
                'PLF-jonas letlhaku',
                '{"fullName": "jonas letlhaku"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6fd6d85e-d81a-4aca-a75f-16b1bbf6a6df',
                'PLF-Vhuthihi Makhado',
                '{"fullName": "Vhuthihi Makhado"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2006b90c-dfb3-48ac-8920-1808c9a25deb',
                'PLF-Matshediso Ellen Tyobeka',
                '{"fullName": "Matshediso Ellen Tyobeka"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c1f72373-d36b-4917-bd41-1cbbbf2a594d',
                'PLF-Justice Mxolisi Tyobeka',
                '{"fullName": "Justice Mxolisi Tyobeka"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a8f92f88-c416-4037-8e1b-306a17ce0aaf',
                'PLF-wellington galogakwe',
                '{"fullName": "wellington galogakwe"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e161c8e2-2eea-4aef-a205-7a33b08dcc5d',
                'PLF-  kabelo morubane',
                '{"fullName": "  kabelo morubane"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '200889e6-92af-4f8f-9ccb-70ce2ba68d48',
                'PLF-Jeff Matlou',
                '{"fullName": "Jeff Matlou"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 0, "shareValue": 0}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e8b5cbc0-b2d7-4cd1-988d-f7cc8bdf2e4c',
                'PLF-001',
                '{"fullName": "Member 1"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13975.877898581479, "shareValue": -5309.74962329247}'::jsonb,
                '2018-08-14'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '54ac2d07-3fbf-4054-89a5-0e7af6c7b75e',
                'PLF-002',
                '{"fullName": "Member 2"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17388.32175706755, "shareValue": -8268.024589748466}'::jsonb,
                '2019-02-16'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a4dbeab2-a005-40dc-9534-7a0a97b87cf0',
                'PLF-003',
                '{"fullName": "Member 3"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 38236.87031874968, "shareValue": -18898.01267161474}'::jsonb,
                '2018-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '23e411a9-77c6-44ac-9b9e-b3533a1e6bdf',
                'PLF-004',
                '{"fullName": "Member 4"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 43648.34416744145, "shareValue": -21657.14491272665}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c19a4405-ca78-405c-9eec-efd60acb4213',
                'PLF-005',
                '{"fullName": "Member 5"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21841.47823903676, "shareValue": -10538.542376153015}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '560b9188-b508-4828-843c-78fbe61b250b',
                'PLF-006',
                '{"fullName": "Member 6"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 23667.51764919493, "shareValue": -11469.579714774985}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ef8a0a46-fa3d-4aec-9b16-39112ca331a8',
                'PLF-007',
                '{"fullName": "Member 7"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 44480.87860570173, "shareValue": -22081.62679597464}'::jsonb,
                '2021-10-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4505df94-ea38-4f86-a931-ffe57b6ba8e6',
                'PLF-008',
                '{"fullName": "Member 8"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 35739.26700396886, "shareValue": -17624.56702187078}'::jsonb,
                '2018-07-23'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '264f2032-2bc7-494d-9ac6-cbc11e4efacc',
                'PLF-009',
                '{"fullName": "Member 9"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 22191.424233784794, "shareValue": -10153.512576870993}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ab303515-c177-4556-bad1-cb895e068108',
                'PLF-010',
                '{"fullName": "Member 10"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 34806.8264440478, "shareValue": -17149.146298472}'::jsonb,
                '2020-06-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ae883564-679a-4464-8671-f7c936b89f5f',
                'PLF-011',
                '{"fullName": "Member 11"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18464.177410068227, "shareValue": -8816.56794447507}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2c8de167-fc1d-4037-8cb1-e98ca496928f',
                'PLF-012',
                '{"fullName": "Member 12"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10346.705186332652, "shareValue": -4677.736277709503}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '92166efb-b00c-401b-b66b-3f13770cf9ca',
                'PLF-013',
                '{"fullName": "Member 13"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16590.97492398262, "shareValue": -7861.483707167103}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2906172d-9987-44f8-866f-9403e763f330',
                'PLF-014',
                '{"fullName": "Member 14"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 41264.11360032278, "shareValue": -20441.504292090187}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'fb3b20da-bc89-4759-9572-09a38ca2d622',
                'PLF-015',
                '{"fullName": "Member 15"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 35739.26700396886, "shareValue": -17624.56702187078}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '91c719e3-993b-45ae-9bbd-acb3cab29b2c',
                'PLF-016',
                '{"fullName": "Member 16"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 39069.40475700995, "shareValue": -19322.494554862726}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0cf4c97a-0eb2-475c-9b21-a10b40aacb63',
                'PLF-017',
                '{"fullName": "Member 17"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -13774.550966987554, "shareValue": 9005.572545052768}'::jsonb,
                '2019-01-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '056816c7-4805-4f35-bf33-52d0cedb32ec',
                'PLF-018',
                '{"fullName": "Member 18"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 10993.456407209234, "shareValue": -3931.9396234405776}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f708492d-99a6-48f2-93bb-2e4495e2bc1d',
                'PLF-019',
                '{"fullName": "Member 19"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 35671.60412119091, "shareValue": -16173.940672952573}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7ea8e6e7-b1b1-4fdd-81f4-fb4eacd05065',
                'PLF-020',
                '{"fullName": "Member 20"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 16299.58787059152, "shareValue": -7712.915048030305}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9af18cc7-f557-41b0-a58a-b65418544a64',
                'PLF-021',
                '{"fullName": "Member 21"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 39485.67197614008, "shareValue": -19534.735496486715}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c5cdf0ee-3047-4aa1-8a5a-b6d1a77405fc',
                'PLF-022',
                '{"fullName": "Member 22"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 22750.568370406756, "shareValue": -9207.472770949957}'::jsonb,
                '2018-08-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a5f65d44-a1b3-4915-8987-a58c5f4d398c',
                'PLF-023',
                '{"fullName": "Member 23"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 42399.54251005105, "shareValue": -21020.422087854673}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '603607c1-b590-4d1c-ad7a-3403dd79b305',
                'PLF-024',
                '{"fullName": "Member 24"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -3821.110858614249, "shareValue": 5176.114886514848}'::jsonb,
                '2018-08-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5f841b4c-8567-4773-ab26-7fff9b8b29dc',
                'PLF-025',
                '{"fullName": "Member 25"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 15128.857702510119, "shareValue": -4151.820533435013}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0efdd0a5-b6a0-42c7-87aa-c4926a02edfb',
                'PLF-026',
                '{"fullName": "Member 26"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 33481.99288244149, "shareValue": -16473.6573104177}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4184a18d-8721-4f39-b1cc-e75a831b5d3b',
                'PLF-027',
                '{"fullName": "Member 27"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 39901.93919527023, "shareValue": -19746.976438110712}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f3b5d505-428b-4abd-b1e2-101c58f2ced9',
                'PLF-028',
                '{"fullName": "Member 28"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 42399.54251005105, "shareValue": -21020.422087854673}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1e189a58-4224-4a2b-b33e-7c361eb3446f',
                'PLF-029',
                '{"fullName": "Member 29"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21586.18155354425, "shareValue": -10408.37500665502}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2f63e3ea-53fb-4531-b84b-cc858cebd8d3',
                'PLF-030',
                '{"fullName": "Member 30"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5391.428978364881, "shareValue": -1353.495492289283}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6e2b90b6-a148-4376-ba65-661aa2a3083d',
                'PLF-031',
                '{"fullName": "Member 31"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -2002.2012335850127, "shareValue": 3272.0439981877857}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1ae6fce8-5798-4ab3-88db-779b474b0214',
                'PLF-032',
                '{"fullName": "Member 32"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 39485.67197614008, "shareValue": -19534.735496486715}'::jsonb,
                '2018-08-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e31d5e1b-fa6d-46b6-9170-91fe4b823055',
                'PLF-033',
                '{"fullName": "Member 33"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 43232.07694831131, "shareValue": -21444.90397110266}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a5940c61-784a-4ea6-9351-303f35fde849',
                'PLF-034',
                '{"fullName": "Member 34"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 39401.25713561219, "shareValue": -17697.11043590968}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c2cfb08e-1a8c-4f0a-87dc-35aff5ba6f2b',
                'PLF-035',
                '{"fullName": "Member 35"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 38399.34615017772, "shareValue": -17851.029625871528}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f41e32e3-9d45-4f8f-9392-a25334a203a2',
                'PLF-036',
                '{"fullName": "Member 36"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 30744.06037440724, "shareValue": -15077.675722382866}'::jsonb,
                '2019-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '41017722-7e04-4832-94d0-ad30a21ddbbf',
                'PLF-037',
                '{"fullName": "Member 37"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 30535.926764842166, "shareValue": -14971.55525157087}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '990e270b-70a5-4e81-989a-3ceb04cb9a00',
                'PLF-038',
                '{"fullName": "Member 38"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 42399.54251005105, "shareValue": -21020.422087854673}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a8970d6f-9956-49c0-ad21-40370f8cca9d',
                'PLF-039',
                '{"fullName": "Member 39"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 35281.37306292572, "shareValue": -17391.10198608439}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4d2a48be-ff07-4e4d-b9cf-b47e7499bb02',
                'PLF-040',
                '{"fullName": "Member 40"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17007.242143112755, "shareValue": -8073.724648791096}'::jsonb,
                '2018-11-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4703dd92-0d76-4a8d-9fe5-6924cf5d5c48',
                'PLF-041',
                '{"fullName": "Member 41"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 31576.594812667503, "shareValue": -15502.15760563085}'::jsonb,
                '2019-07-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b0a1feec-52a6-4b1c-840c-511aa329d97a',
                'PLF-042',
                '{"fullName": "Member 42"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 23766.144979957906, "shareValue": -10692.2812459333}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b1ad70be-dcf9-4b46-98c6-69fb618301d0',
                'PLF-043',
                '{"fullName": "Member 43"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 612.8705866696598, "shareValue": 285.22531547522897}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '79825ee6-a6ce-46e6-beaf-fefb41fe7224',
                'PLF-044',
                '{"fullName": "Member 44"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21169.914334414112, "shareValue": -10196.134065031027}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'da41c587-84bc-4b01-a178-7f60da82086d',
                'PLF-045',
                '{"fullName": "Member 45"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -2021.655161285106, "shareValue": 4321.507050222562}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2add9b7a-d582-4409-9fe8-895ae6425076',
                'PLF-046',
                '{"fullName": "Member 46"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 33682.642327448324, "shareValue": -16367.547455374814}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0fa36eba-5705-4b42-97ca-9f1f0024231f',
                'PLF-047',
                '{"fullName": "Member 47"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -618.6556741584267, "shareValue": 2711.200491395527}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4cf7d1fe-7dea-4dad-9594-d3b569fc959b',
                'PLF-048',
                '{"fullName": "Member 48"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 11485.015134199435, "shareValue": -4660.85737471932}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'eb0306e3-4c5c-4197-be52-ce31748d64b7',
                'PLF-049',
                '{"fullName": "Member 49"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 42815.80972918117, "shareValue": -21232.663029478663}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '62129a2b-eabc-4471-90f0-29fe938e659c',
                'PLF-050',
                '{"fullName": "Member 50"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 40734.473633530506, "shareValue": -20171.458321358703}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f8d865ed-b759-44f9-8cf6-3b8709cced5d',
                'PLF-051',
                '{"fullName": "Member 51"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 43856.47777700652, "shareValue": -21763.26538353865}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '530ba301-a75c-44ff-82e1-e64a7baf9a78',
                'PLF-052',
                '{"fullName": "Member 52"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20337.37989615384, "shareValue": -9771.65218178304}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9bbe8989-341e-40d7-ad10-8cc7087ec4e1',
                'PLF-053',
                '{"fullName": "Member 53"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7974.243487988805, "shareValue": -3468.096215550445}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3aa9b773-c92c-4247-bd77-08e9d42ce46f',
                'PLF-054',
                '{"fullName": "Member 54"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9786.259353594087, "shareValue": -4391.98341079329}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '8f869395-4943-43a9-9e73-287671a70324',
                'PLF-055',
                '{"fullName": "Member 55"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -9589.321011955255, "shareValue": 10655.6526262177}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b670f507-95c1-49e7-a462-915ed3e51b05',
                'PLF-056',
                '{"fullName": "Member 56"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 30990.634812667504, "shareValue": -14888.697605630849}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4356dfea-d123-4021-9906-ca33df495759',
                'PLF-057',
                '{"fullName": "Member 57"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 40318.20641440036, "shareValue": -19959.217379734706}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ca741859-e434-4f75-99ad-8eb9d067f76c',
                'PLF-058',
                '{"fullName": "Member 58"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 41567.00807179077, "shareValue": -20595.940204606683}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ba081aac-d292-431a-a4c2-bbb19f10c0c5',
                'PLF-059',
                '{"fullName": "Member 59"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 6508.724491190716, "shareValue": -275.1232033239562}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3c49f7de-4bb4-4eb8-b3dc-82548546ac14',
                'PLF-060',
                '{"fullName": "Member 60"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 43232.07694831131, "shareValue": -21444.90397110266}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '54e5bbfd-27b1-436c-97bb-1b237ae6e8f0',
                'PLF-061',
                '{"fullName": "Member 61"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 31992.862031797646, "shareValue": -15714.398547254848}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ec8d984a-96ef-4363-bea3-a2d8e29dddfb',
                'PLF-062',
                '{"fullName": "Member 62"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 29911.525936146965, "shareValue": -14653.19383913488}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '550b0e4f-94f6-4ba2-903e-1eaa077effa5',
                'PLF-063',
                '{"fullName": "Member 63"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 41525.38134987775, "shareValue": -20574.716110444286}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1f6d3398-3f70-434d-b5b2-5838c7f273e7',
                'PLF-064',
                '{"fullName": "Member 64"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 43232.07694831131, "shareValue": -21444.90397110266}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '849ec864-f864-407c-a8df-9d63fb3e85e4',
                'PLF-065',
                '{"fullName": "Member 65"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 34490.465346578465, "shareValue": -16987.84419699881}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e7ceec37-a9c2-4236-9be8-62bbde507667',
                'PLF-066',
                '{"fullName": "Member 66"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 29832.820430449872, "shareValue": -14613.06449463581}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '551c6ff8-ff9e-48c2-8d25-8e6d14b87719',
                'PLF-067',
                '{"fullName": "Member 67"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13677.104390071667, "shareValue": -6375.797115799151}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a20c0fb6-d5e7-4e17-a509-d64f325bfe73',
                'PLF-068',
                '{"fullName": "Member 68"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 23667.51764919493, "shareValue": -11469.579714774985}'::jsonb,
                '2019-04-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f43fa3b0-b5f9-4f3e-9838-3d3317a8bf25',
                'PLF-069',
                '{"fullName": "Member 69"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 5103.73614519285, "shareValue": -930.551437962632}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f47df81e-282f-4dec-9ddb-71605644b4a1',
                'PLF-070',
                '{"fullName": "Member 70"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 28246.457059626424, "shareValue": -13804.230072638908}'::jsonb,
                '2018-10-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6266ffa7-0a42-4e7d-8de2-018a3dfdb3ef',
                'PLF-071',
                '{"fullName": "Member 71"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 40734.473633530506, "shareValue": -20171.458321358703}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '888a07c4-bbff-4236-8a0f-0c4ad2d2abdf',
                'PLF-072',
                '{"fullName": "Member 72"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 9943.321477617552, "shareValue": -4472.064213614765}'::jsonb,
                '2018-08-02'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '80d459b8-4817-4730-b373-91559be4502d',
                'PLF-073',
                '{"fullName": "Member 73"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 21939.384288976165, "shareValue": -10588.461445622976}'::jsonb,
                '2018-09-05'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '29852455-6e45-48f2-bb9e-4c5d6e7c4dfb',
                'PLF-074',
                '{"fullName": "Member 74"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17923.252502279232, "shareValue": -8401.825222829018}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '90c49454-1bf2-466d-aed2-a54718a939ab',
                'PLF-075',
                '{"fullName": "Member 75"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 35322.99978483873, "shareValue": -17412.326080246785}'::jsonb,
                '2018-08-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '94478b15-e1ba-4e96-a7e2-23afad52bac0',
                'PLF-076',
                '{"fullName": "Member 76"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 43232.07694831131, "shareValue": -21444.90397110266}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'bbc74666-874b-4072-be5c-2c4f0577ce3c',
                'PLF-077',
                '{"fullName": "Member 77"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 25748.853744845605, "shareValue": -12530.784422894949}'::jsonb,
                '2018-07-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'e0fed11c-d060-4acd-8370-041c71d8dd1c',
                'PLF-078',
                '{"fullName": "Member 78"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 41567.00807179077, "shareValue": -20595.940204606683}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2b16a522-cc9c-4c62-a8a7-31a14c1bbc9a',
                'PLF-079',
                '{"fullName": "Member 79"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 36571.80144222913, "shareValue": -18049.048905118765}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '2551197f-fcb0-401e-8412-410c6e916a67',
                'PLF-080',
                '{"fullName": "Member 80"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 18210.0246100121, "shareValue": -7270.856530417188}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1bcf47cc-ef97-4321-96c6-b42d085b5e79',
                'PLF-081',
                '{"fullName": "Member 81"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 1930.6841121444745, "shareValue": -386.68438742205615}'::jsonb,
                '2019-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'dc826392-75b3-4d7c-a490-ddb712d3a74f',
                'PLF-082',
                '{"fullName": "Member 82"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 17423.50936224289, "shareValue": -8285.965590415088}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7482cfb1-3b7b-4949-b2d3-a8544ac8261b',
                'PLF-083',
                '{"fullName": "Member 83"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 34490.465346578465, "shareValue": -16987.84419699881}'::jsonb,
                '2018-09-17'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3f34418a-21d6-4398-8a65-b4d57d58aa9e',
                'PLF-084',
                '{"fullName": "Member 84"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 24291.918477890133, "shareValue": -11787.941127210976}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd9f9182f-4d9c-44ba-8491-aa4fa3404d5d',
                'PLF-085',
                '{"fullName": "Member 85"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13974.808761470958, "shareValue": -3626.1485233000785}'::jsonb,
                '2018-10-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a25dde1e-755d-4c69-ad85-9d4715c9f385',
                'PLF-086',
                '{"fullName": "Member 86"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 44064.61138657159, "shareValue": -21869.385854350647}'::jsonb,
                '2019-12-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9020f7cf-8592-4399-aaf2-1571721b886c',
                'PLF-087',
                '{"fullName": "Member 87"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 32864.767641929044, "shareValue": -16158.95449400519}'::jsonb,
                '2018-07-24'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ab4699be-3102-41fa-9fab-d738eff75be0',
                'PLF-088',
                '{"fullName": "Member 88"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 41983.27529092091, "shareValue": -20808.18114623068}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3ab85376-bef1-43d3-a4ba-1c7461aa7e44',
                'PLF-089',
                '{"fullName": "Member 89"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 8250.527012783266, "shareValue": -1051.5096182079205}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '193cc8ce-4d5d-4c02-9422-ea5118510023',
                'PLF-001',
                '{"fullName": "Member 1"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 32191.613034515183, "shareValue": -15815.735135933703}'::jsonb,
                '2018-08-14'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '66559bb2-65e4-4df8-b9ae-aded32b865b2',
                'PLF-002',
                '{"fullName": "Member 2"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 39153.8952109713, "shareValue": -19365.57345390375}'::jsonb,
                '2019-02-16'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '03c1dc03-01e3-4a8f-a9ae-337176049bce',
                'PLF-003',
                '{"fullName": "Member 3"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 81690.41275543183, "shareValue": -41053.542436682146}'::jsonb,
                '2018-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b2161264-0bae-4f87-9f35-fe1de3b684d6',
                'PLF-004',
                '{"fullName": "Member 4"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 92731.24140713604, "shareValue": -46682.89723969459}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '92e39e4c-189a-466b-a5b7-ee770cd4095e',
                'PLF-005',
                '{"fullName": "Member 5"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 48239.50461265659, "shareValue": -23998.02637361983}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '29202d37-9e6c-4cc4-a1d9-755699b6c843',
                'PLF-006',
                '{"fullName": "Member 6"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 51965.104846997434, "shareValue": -25897.5871978025}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f863584f-e5f8-4b70-9882-4a1c32a4f189',
                'PLF-007',
                '{"fullName": "Member 7"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 94429.83043047517, "shareValue": -47548.95182477344}'::jsonb,
                '2021-10-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'aa4ba33b-8a6c-4ac5-8877-e72423c320b2',
                'PLF-008',
                '{"fullName": "Member 8"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 76594.64568541449, "shareValue": -38455.378681445625}'::jsonb,
                '2018-07-23'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4bfe9e28-6d08-4b25-92cc-9dc158b8579b',
                'PLF-009',
                '{"fullName": "Member 9"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 46781.28053560412, "shareValue": -22121.106301819324}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b5571603-c225-484b-8a90-5137c2b5049a',
                'PLF-010',
                '{"fullName": "Member 10"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 74692.22192105014, "shareValue": -37485.39547700233}'::jsonb,
                '2020-06-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c0fca591-11ff-4cd8-bf5c-83191a4b1666',
                'PLF-011',
                '{"fullName": "Member 11"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 41348.92345112799, "shareValue": -20484.74604105976}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd7dc43db-d9ab-4a6f-9845-70166ccf80ac',
                'PLF-012',
                '{"fullName": "Member 12"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 24787.147045445185, "shareValue": -12040.441859112532}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6116ead1-f252-4600-87ca-0322c73ea020',
                'PLF-013',
                '{"fullName": "Member 13"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 37527.098148615, "shareValue": -18536.12322463238}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '987f58c1-edc9-4449-9b4c-3911c5255aa1',
                'PLF-014',
                '{"fullName": "Member 14"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 87866.78453388023, "shareValue": -44202.67093355745}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0d1cdd58-b3d3-48ef-b693-d3816224ee40',
                'PLF-015',
                '{"fullName": "Member 15"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 76594.64568541449, "shareValue": -38455.378681445625}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'dcd0e7a0-fa91-42b5-b871-525cbb6d1d8f',
                'PLF-016',
                '{"fullName": "Member 16"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 83389.00177877094, "shareValue": -41919.59702176098}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '919b64af-6bb7-4e83-a9bf-1307eaaefd3b',
                'PLF-017',
                '{"fullName": "Member 17"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -27898.11025611574, "shareValue": 16622.559289128185}'::jsonb,
                '2019-01-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '57f3f1aa-96d5-47e2-9838-278e6ec7aa8c',
                'PLF-018',
                '{"fullName": "Member 18"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 25528.096772088487, "shareValue": -12118.140364879255}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '038789fb-0c1c-4df7-bc5e-fe245666176d',
                'PLF-019',
                '{"fullName": "Member 19"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 72934.7245123657, "shareValue": -34747.620391174794}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1ad8835e-d0de-4ac9-a96e-f73afaf68b0e',
                'PLF-020',
                '{"fullName": "Member 20"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 36932.5919904463, "shareValue": -18233.00411985478}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '34550ac9-7ff5-4c8f-a72c-eeeacd577a9c',
                'PLF-021',
                '{"fullName": "Member 21"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 84238.29629044048, "shareValue": -42352.6243143004}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'f37e8796-9dbb-43e2-a691-e17b336e84ac',
                'PLF-022',
                '{"fullName": "Member 22"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 47152.99818193272, "shareValue": -21914.429811525963}'::jsonb,
                '2018-08-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c2dc5bb6-0437-4830-9fac-d549cb1bf353',
                'PLF-023',
                '{"fullName": "Member 23"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 90183.3578721274, "shareValue": -45383.81536207635}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5862508c-d16a-40e3-8922-3cac71b5c3ba',
                'PLF-024',
                '{"fullName": "Member 24"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -14411.321489311636, "shareValue": 13292.710630697387}'::jsonb,
                '2018-08-27'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0e9af770-d076-4a8c-9526-b15a6a7da6cd',
                'PLF-025',
                '{"fullName": "Member 25"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 33283.41800329932, "shareValue": -15713.310300789199}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c54749ea-bfdd-424e-a4a6-11e0c1f1654c',
                'PLF-026',
                '{"fullName": "Member 26"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 71989.2133221527, "shareValue": -36107.22043971122}'::jsonb,
                '2018-07-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '73493186-a399-418a-b08e-f7116dbc5455',
                'PLF-027',
                '{"fullName": "Member 27"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 85087.59080211005, "shareValue": -42785.65160683982}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '67b485b6-fcc7-4917-a1d8-710a59d34356',
                'PLF-028',
                '{"fullName": "Member 28"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 90183.3578721274, "shareValue": -45383.81536207635}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '715184ba-446f-4f62-866a-ba4d053737dc',
                'PLF-029',
                '{"fullName": "Member 29"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 47718.63228864966, "shareValue": -23732.450735105405}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'dda7eebf-82ba-4891-8941-9a10e2c48efb',
                'PLF-030',
                '{"fullName": "Member 30"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 13120.24903710399, "shareValue": -5273.820058739109}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3fde66eb-90a5-4383-bf67-e38e47a1a884',
                'PLF-031',
                '{"fullName": "Member 31"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -407.86703582991277, "shareValue": 805.6658022449001}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '55d98186-9184-4dfc-b402-cb56c0847f87',
                'PLF-032',
                '{"fullName": "Member 32"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 84238.29629044048, "shareValue": -42352.6243143004}'::jsonb,
                '2018-08-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'd9ed115e-af50-4fc6-8568-f0dff8e98f95',
                'PLF-033',
                '{"fullName": "Member 33"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 91881.94689546648, "shareValue": -46249.869947155166}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'b91fe0d2-d416-4270-85c8-f5ff690c3718',
                'PLF-034',
                '{"fullName": "Member 34"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 81124.7786487149, "shareValue": -39235.52151310271}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '424226da-61a9-41e5-95d3-911e4d96e7f7',
                'PLF-035',
                '{"fullName": "Member 35"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 80334.24633398646, "shareValue": -39485.400183808735}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '08af7a8a-1faf-42f4-a344-38770325b936',
                'PLF-036',
                '{"fullName": "Member 36"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 66403.11154537986, "shareValue": -33259.05117097262}'::jsonb,
                '2019-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '20db64b4-d4d8-4af7-bd7f-aab4d1e95228',
                'PLF-037',
                '{"fullName": "Member 37"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 65978.46428954507, "shareValue": -33042.5375247029}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '53c1fdf8-64bc-49bc-9f58-15772a4a1cab',
                'PLF-038',
                '{"fullName": "Member 38"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 90183.3578721274, "shareValue": -45383.81536207635}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ff11a3fc-2a0c-4878-80a3-03dd6e0c7930',
                'PLF-039',
                '{"fullName": "Member 39"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 75660.421722578, "shareValue": -37979.04865965228}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '67b8f0f7-77c1-4183-83c0-e9070f4fab01',
                'PLF-040',
                '{"fullName": "Member 40"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 38376.39266028456, "shareValue": -18969.1505171718}'::jsonb,
                '2018-11-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0d804826-fcb8-4751-b034-f7b9d3d6e742',
                'PLF-041',
                '{"fullName": "Member 41"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 68101.70056871895, "shareValue": -34125.105756051445}'::jsonb,
                '2019-07-22'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '97c48e5d-43de-4297-a36f-221595fc4fad',
                'PLF-042',
                '{"fullName": "Member 42"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 52166.330518556795, "shareValue": -26000.18553859889}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '05adf8d1-b5fa-42ee-83e7-2dfc42178797',
                'PLF-043',
                '{"fullName": "Member 43"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 4927.5666531478255, "shareValue": -1914.6960664781654}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7caa8604-97d1-4ee5-95ce-ed81c9d6ce52',
                'PLF-044',
                '{"fullName": "Member 44"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 46869.3377769801, "shareValue": -23299.423442565985}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5b6c1e83-b426-450f-8da0-841d43cee32c',
                'PLF-045',
                '{"fullName": "Member 45"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -3996.5298327786386, "shareValue": 4490.374671493532}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ed82cd26-def4-4fb8-93b0-7cd69fec2df2',
                'PLF-046',
                '{"fullName": "Member 46"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 72398.59091563689, "shareValue": -36315.94858818856}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '29ed2ca1-e0c4-4d33-a5b8-777b545a4acf',
                'PLF-047',
                '{"fullName": "Member 47"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 560.3856645486798, "shareValue": 1275.9586612928936}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'aaed63f6-2c86-416d-918c-e3ea4249d267',
                'PLF-048',
                '{"fullName": "Member 48"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 27109.5984585599, "shareValue": -13224.583324360463}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '59da096e-ef53-486e-8d1f-fb061742b30d',
                'PLF-049',
                '{"fullName": "Member 49"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 91032.65238379691, "shareValue": -45816.84265461574}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '47a4f4f2-0738-4023-ab05-0210bee75e00',
                'PLF-050',
                '{"fullName": "Member 50"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 86786.17982544917, "shareValue": -43651.70619191867}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c621b886-95f6-49e5-90ea-feb148b58941',
                'PLF-051',
                '{"fullName": "Member 51"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 93155.88866297083, "shareValue": -46899.41088596432}'::jsonb,
                '2018-07-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'cad99a68-90b3-4281-8250-497a9f8f0254',
                'PLF-052',
                '{"fullName": "Member 52"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 45170.74875364099, "shareValue": -22433.368857487145}'::jsonb,
                '2018-07-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '3fb46f45-455d-43b1-b369-c5f7e7b66144',
                'PLF-053',
                '{"fullName": "Member 53"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 19946.701757055223, "shareValue": -9572.458269066417}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '750cc7f1-5dd8-4d70-a4d2-3c63561dfca7',
                'PLF-054',
                '{"fullName": "Member 54"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20530.025433316383, "shareValue": -8233.766079722298}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ed1716c8-c42e-4ff6-ab27-1572a47c75c2',
                'PLF-055',
                '{"fullName": "Member 55"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": -17335.449373051415, "shareValue": 10187.378361096158}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '24e31178-ecc4-4109-bc70-fe69d4095580',
                'PLF-056',
                '{"fullName": "Member 56"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 64487.469855559975, "shareValue": -31014.335042892468}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'dbfc9ea0-0697-4179-b229-51da4a48b7a7',
                'PLF-057',
                '{"fullName": "Member 57"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 85936.8853137796, "shareValue": -43218.678899379236}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c1d7e2e9-9a49-4f97-a852-7f2df62b4d6a',
                'PLF-058',
                '{"fullName": "Member 58"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 88484.76884878826, "shareValue": -44517.760776997486}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '113f7b64-4701-4a6f-8e5c-fb1e3bdc7f39',
                'PLF-059',
                '{"fullName": "Member 59"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 14664.980715835962, "shareValue": -5687.506224645244}'::jsonb,
                '2018-08-20'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ef8ff560-fda4-4f3c-bd3b-4c2f8e733d88',
                'PLF-060',
                '{"fullName": "Member 60"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 91881.94689546648, "shareValue": -46249.869947155166}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '166005c8-92de-4d28-a240-e8fee4f7aa73',
                'PLF-061',
                '{"fullName": "Member 61"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 68950.99508038851, "shareValue": -34558.13304859087}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ace21305-4cd5-48b8-8b8d-59d95aeea2d0',
                'PLF-062',
                '{"fullName": "Member 62"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 64704.522522040745, "shareValue": -32392.996585893776}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ab543cb0-7a5d-4789-a88f-0a41b6b412bb',
                'PLF-063',
                '{"fullName": "Member 63"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 88399.83939762128, "shareValue": -44474.45804774354}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'a531d4a1-364e-4954-8e40-62a291a9c044',
                'PLF-064',
                '{"fullName": "Member 64"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 91881.94689546648, "shareValue": -46249.869947155166}'::jsonb,
                '2018-07-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1fecb871-7eca-49eb-99cf-d4e27888cd10',
                'PLF-065',
                '{"fullName": "Member 65"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 74046.76215040585, "shareValue": -37156.296803827376}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '156b4220-3fa0-49eb-9487-4b3adf84d312',
                'PLF-066',
                '{"fullName": "Member 66"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 64543.94260857459, "shareValue": -32311.12217812471}'::jsonb,
                '2018-08-01'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '9e9cd0e1-aad0-41e9-9e7f-5977388df4c3',
                'PLF-067',
                '{"fullName": "Member 67"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 31582.036566928116, "shareValue": -15504.932176856451}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '5d58ae14-b5d3-451e-ad1c-bdf6c3ee8d0d',
                'PLF-068',
                '{"fullName": "Member 68"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 51965.104846997434, "shareValue": -25897.5871978025}'::jsonb,
                '2019-04-26'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '1c349d7d-afb0-4851-9714-1072b33b9907',
                'PLF-069',
                '{"fullName": "Member 69"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 12161.470099885752, "shareValue": -4602.7339546929015}'::jsonb,
                '2018-07-28'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'ad3d0ccd-3be9-4f8f-9be6-590ae423ab8d',
                'PLF-070',
                '{"fullName": "Member 70"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 61307.34447536254, "shareValue": -30660.88741573611}'::jsonb,
                '2018-10-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '34c17e10-f22c-4ab1-be12-ad22f58d041c',
                'PLF-071',
                '{"fullName": "Member 71"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 86786.17982544917, "shareValue": -43651.70619191867}'::jsonb,
                '2018-08-31'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'c7290bdb-cfe3-419d-8b5c-d7203f4d78b4',
                'PLF-072',
                '{"fullName": "Member 72"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 23964.138280487547, "shareValue": -11620.816802869993}'::jsonb,
                '2018-08-02'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '17cbf5b1-3668-445d-83ea-08dc4e5279ea',
                'PLF-073',
                '{"fullName": "Member 73"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 48439.258681801264, "shareValue": -24099.874392825102}'::jsonb,
                '2018-09-05'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '160c141e-8501-4879-b7ef-5346526a1424',
                'PLF-074',
                '{"fullName": "Member 74"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 40245.294497662566, "shareValue": -19922.041995383333}'::jsonb,
                '2018-08-25'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '04382110-a571-4ad5-8e33-c8632e803128',
                'PLF-075',
                '{"fullName": "Member 75"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 75745.35117374494, "shareValue": -38022.351388906216}'::jsonb,
                '2018-08-18'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6465f50e-d55f-4f13-8e95-3788b0ab1a08',
                'PLF-076',
                '{"fullName": "Member 76"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 91881.94689546648, "shareValue": -46249.869947155166}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '6f004835-b699-4ec9-9886-b3814b523385',
                'PLF-077',
                '{"fullName": "Member 77"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 56211.57740534519, "shareValue": -28062.723660499585}'::jsonb,
                '2018-07-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'baed06e6-38c5-401f-91c8-0223230c1f0f',
                'PLF-078',
                '{"fullName": "Member 78"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 88484.76884878826, "shareValue": -44517.760776997486}'::jsonb,
                '2018-08-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '4e9dc777-2c7c-4625-8b7f-773d98ca7c8f',
                'PLF-079',
                '{"fullName": "Member 79"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 78293.23470875359, "shareValue": -39321.433266524466}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'be4a9433-a4b4-4a23-9eed-257e9be90800',
                'PLF-080',
                '{"fullName": "Member 80"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 37308.513841932254, "shareValue": -16582.989231920154}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '92f9493d-601d-499d-8536-49a7ae8c042f',
                'PLF-081',
                '{"fullName": "Member 81"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 7616.252533646553, "shareValue": -3285.5684215020797}'::jsonb,
                '2019-07-30'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '493bc6e6-05bb-41f3-9f48-f3f10546e286',
                'PLF-082',
                '{"fullName": "Member 82"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 39225.68717195411, "shareValue": -19402.177809711222}'::jsonb,
                '2018-08-21'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7217caf2-c3c5-4ba6-9666-19e9dcb3e34a',
                'PLF-083',
                '{"fullName": "Member 83"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 74046.76215040585, "shareValue": -37156.296803827376}'::jsonb,
                '2018-09-17'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '44576a9e-942d-4141-ba2e-2491cffa0f25',
                'PLF-084',
                '{"fullName": "Member 84"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 53239.046614501756, "shareValue": -26547.128136611624}'::jsonb,
                '2018-06-29'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '17f2f4d1-3ed0-492d-892f-483bf6e02f8e',
                'PLF-085',
                '{"fullName": "Member 85"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 28972.369364455953, "shareValue": -12498.560602984995}'::jsonb,
                '2018-10-15'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '7f51c279-5214-4566-96c1-f6178126c458',
                'PLF-086',
                '{"fullName": "Member 86"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 93580.53591880562, "shareValue": -47115.92453223403}'::jsonb,
                '2019-12-04'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                'befbc4ce-48c4-4d8c-b3c3-b2fde26831ff',
                'PLF-087',
                '{"fullName": "Member 87"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 70729.91164010683, "shareValue": -35465.14399817779}'::jsonb,
                '2018-07-24'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '560fe9a3-5d8b-4596-b703-391fc5d14190',
                'PLF-088',
                '{"fullName": "Member 88"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 89334.06336045783, "shareValue": -44950.78806953692}'::jsonb,
                'None'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            


            INSERT INTO members (id, member_number, personal_info, financial_info, join_date, created_at, last_updated)
            VALUES (
                '0e3ce334-fb35-4794-a89f-6a4d67cf56f6',
                'PLF-089',
                '{"fullName": "Member 89"}'::jsonb,
                '{"membershipFee": 0, "expectedContribution": 0, "balanceBroughtForward": 0, "catchUpFee": 0, "currentBalance": 20510.392748056118, "shareValue": -9859.865735272853}'::jsonb,
                '2018-07-03'::date,
                NOW(),
                NOW()
            )
            ON CONFLICT (member_number) DO UPDATE SET
                financial_info = EXCLUDED.financial_info,
                last_updated = NOW();
            

