-- SQL Script to fix all members' closing balances based on Excel data
-- Generated: 2026-03-08T17:04:20.149786
-- Total members to fix: 66

-- ============================================
-- UPDATE MEMBERS TABLE
-- ============================================

-- Lesego Bokaba (M031)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.149786", "current_balance": 6220.824749612508, "outstanding_amount": 6220.824749612508, "total_contributions": 0}',
    closing_balance = 6220.824749612508,
    updated_at = NOW()
WHERE member_number = 'M031' AND name LIKE '%Lesego%';

-- Christopher Naude (M004)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 17019.300998314797, "outstanding_amount": 17019.300998314797, "total_contributions": 0}',
    closing_balance = 17019.300998314797,
    updated_at = NOW()
WHERE member_number = 'M004' AND name LIKE '%Christopher%';

-- Collin Oliphant (M005)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 22045.87902740575, "outstanding_amount": 22045.87902740575, "total_contributions": 0}',
    closing_balance = 22045.87902740575,
    updated_at = NOW()
WHERE member_number = 'M005' AND name LIKE '%Collin%';

-- Gosego Molale (M016)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 10524.572037429749, "outstanding_amount": 10524.572037429749, "total_contributions": 0}',
    closing_balance = 10524.572037429749,
    updated_at = NOW()
WHERE member_number = 'M016' AND name LIKE '%Gosego%';

-- Kedibone  Morokhu (M026)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 19879.250566590687, "outstanding_amount": 19879.250566590687, "total_contributions": 0}',
    closing_balance = 19879.250566590687,
    updated_at = NOW()
WHERE member_number = 'M026' AND name LIKE '%Kedibone%';

-- Lebogang Mafora (M028)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 14246.016568471512, "outstanding_amount": 14246.016568471512, "total_contributions": 0}',
    closing_balance = 14246.016568471512,
    updated_at = NOW()
WHERE member_number = 'M028' AND name LIKE '%Lebogang%';

-- Lekgowa  Mahole (M029)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 16122.929198753696, "outstanding_amount": 16122.929198753696, "total_contributions": 0}',
    closing_balance = 16122.929198753696,
    updated_at = NOW()
WHERE member_number = 'M029' AND name LIKE '%Lekgowa%';

-- Matshediso Ellen Tyobeka (M033)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 0, "outstanding_amount": 0, "total_contributions": 0}',
    closing_balance = -3709.343851204166,
    updated_at = NOW()
WHERE member_number = 'M033' AND name LIKE '%Matshediso%';

-- Gaithitjwe   Letlhaku (M013)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 854.8042578046625, "outstanding_amount": 854.8042578046625, "total_contributions": 0}',
    closing_balance = 854.8042578046625,
    updated_at = NOW()
WHERE member_number = 'M013' AND name LIKE '%Gaithitjwe%';

-- Dumisane  Mtotoba (M009)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 11386.067000195624, "outstanding_amount": 11386.067000195624, "total_contributions": 0}',
    closing_balance = 11386.067000195624,
    updated_at = NOW()
WHERE member_number = 'M009' AND name LIKE '%Dumisane%';

-- Babotshedi Malibe (M001)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 10432.750477436997, "outstanding_amount": 10432.750477436997, "total_contributions": 0}',
    closing_balance = 10432.750477436997,
    updated_at = NOW()
WHERE member_number = 'M001' AND name LIKE '%Babotshedi%';

-- Macbeth Masupha Sello (M032)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 15979.319337123568, "outstanding_amount": 15979.319337123568, "total_contributions": 0}',
    closing_balance = 15979.319337123568,
    updated_at = NOW()
WHERE member_number = 'M032' AND name LIKE '%Macbeth%';

-- Gideon Diole (M015)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 13951.355097800664, "outstanding_amount": 13951.355097800664, "total_contributions": 0}',
    closing_balance = 13951.355097800664,
    updated_at = NOW()
WHERE member_number = 'M015' AND name LIKE '%Gideon%';

-- Kgomodile Loate (M027)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 21855.215722854024, "outstanding_amount": 21855.215722854024, "total_contributions": 0}',
    closing_balance = 21855.215722854024,
    updated_at = NOW()
WHERE member_number = 'M027' AND name LIKE '%Kgomodile%';

-- Boitshoko Dire (M003)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 23085.86068859698, "outstanding_amount": 23085.86068859698, "total_contributions": 0}',
    closing_balance = 23085.86068859698,
    updated_at = NOW()
WHERE member_number = 'M003' AND name LIKE '%Boitshoko%';

-- Kabelo  Morubane (M022)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 2979.5485722331687, "outstanding_amount": 2979.5485722331687, "total_contributions": 0}',
    closing_balance = 2979.5485722331687,
    updated_at = NOW()
WHERE member_number = 'M022' AND name LIKE '%Kabelo%';

-- Keatlaretse Poo (M024)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 18886.838861036584, "outstanding_amount": 18886.838861036584, "total_contributions": 0}',
    closing_balance = 18886.838861036584,
    updated_at = NOW()
WHERE member_number = 'M024' AND name LIKE '%Keatlaretse%';

-- Belinda  Kelly (M002)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 14246.016568471512, "outstanding_amount": 14246.016568471512, "total_contributions": 0}',
    closing_balance = 14246.016568471512,
    updated_at = NOW()
WHERE member_number = 'M002' AND name LIKE '%Belinda%';

-- Daniel Moepeng (M006)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 12485.585120289827, "outstanding_amount": 12485.585120289827, "total_contributions": 0}',
    closing_balance = 12485.585120289827,
    updated_at = NOW()
WHERE member_number = 'M006' AND name LIKE '%Daniel%';

-- Dikagisho  Mokoma (M007)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 21179.227643079725, "outstanding_amount": 21179.227643079725, "total_contributions": 0}',
    closing_balance = 21179.227643079725,
    updated_at = NOW()
WHERE member_number = 'M007' AND name LIKE '%Dikagisho%';

-- Doni Mosimanekgosi (M008)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 14852.672537499731, "outstanding_amount": 14852.672537499731, "total_contributions": 0}',
    closing_balance = 14852.672537499731,
    updated_at = NOW()
WHERE member_number = 'M008' AND name LIKE '%Doni%';

-- Ekofo Lofembe (M010)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 14072.686291606307, "outstanding_amount": 14072.686291606307, "total_contributions": 0}',
    closing_balance = 14072.686291606307,
    updated_at = NOW()
WHERE member_number = 'M010' AND name LIKE '%Ekofo%';

-- Ephraim Mbulelo Zukane (M011)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 22045.87902740575, "outstanding_amount": 22045.87902740575, "total_contributions": 0}',
    closing_balance = 22045.87902740575,
    updated_at = NOW()
WHERE member_number = 'M011' AND name LIKE '%Ephraim%';

-- Freddy  Sonakile (M012)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.150319", "current_balance": 0, "outstanding_amount": 0, "total_contributions": 0}',
    closing_balance = -4574.770960482466,
    updated_at = NOW()
WHERE member_number = 'M012' AND name LIKE '%Freddy%';

-- Gasebakwe Mankuroane (M014)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 14017.386053689186, "outstanding_amount": 14017.386053689186, "total_contributions": 0}',
    closing_balance = 14017.386053689186,
    updated_at = NOW()
WHERE member_number = 'M014' AND name LIKE '%Gasebakwe%';

-- Jeff Matlou (M017)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 0, "outstanding_amount": 0, "total_contributions": 0}',
    closing_balance = -11699.640937462736,
    updated_at = NOW()
WHERE member_number = 'M017' AND name LIKE '%Jeff%';

-- Jonas Letlhaku (M018)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 5675.886183724499, "outstanding_amount": 5675.886183724499, "total_contributions": 0}',
    closing_balance = 5675.886183724499,
    updated_at = NOW()
WHERE member_number = 'M018' AND name LIKE '%Jonas%';

-- Jonas Moeng (M019)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 20312.576258753696, "outstanding_amount": 20312.576258753696, "total_contributions": 0}',
    closing_balance = 20312.576258753696,
    updated_at = NOW()
WHERE member_number = 'M019' AND name LIKE '%Jonas%';

-- Julia  Mtyela (M020)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 16152.649613988771, "outstanding_amount": 16152.649613988771, "total_contributions": 0}',
    closing_balance = 16152.649613988771,
    updated_at = NOW()
WHERE member_number = 'M020' AND name LIKE '%Julia%';

-- Justice Mxolisi Tyobeka (M021)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 5062.65196532548, "outstanding_amount": 5062.65196532548, "total_contributions": 0}',
    closing_balance = 5062.65196532548,
    updated_at = NOW()
WHERE member_number = 'M021' AND name LIKE '%Justice%';

-- Katlego  Khotsholo (M023)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 18769.301406754945, "outstanding_amount": 18769.301406754945, "total_contributions": 0}',
    closing_balance = 18769.301406754945,
    updated_at = NOW()
WHERE member_number = 'M023' AND name LIKE '%Katlego%';

-- Kebonemotse Lebotse (M025)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 19965.915705023286, "outstanding_amount": 19965.915705023286, "total_contributions": 0}',
    closing_balance = 19965.915705023286,
    updated_at = NOW()
WHERE member_number = 'M025' AND name LIKE '%Kebonemotse%';

-- Lenyatso Shadi (M030)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 15131.924946557265, "outstanding_amount": 15131.924946557265, "total_contributions": 0}',
    closing_balance = 15131.924946557265,
    updated_at = NOW()
WHERE member_number = 'M030' AND name LIKE '%Lenyatso%';

-- Matshidiso  Maleshane (M034)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 20832.567089349315, "outstanding_amount": 20832.567089349315, "total_contributions": 0}',
    closing_balance = 20832.567089349315,
    updated_at = NOW()
WHERE member_number = 'M034' AND name LIKE '%Matshidiso%';

-- Michael Boitumelo Kenosi Suping (M035)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 635.6727761264746, "outstanding_amount": 635.6727761264746, "total_contributions": 0}',
    closing_balance = 635.6727761264746,
    updated_at = NOW()
WHERE member_number = 'M035' AND name LIKE '%Michael%';

-- Mmantsho lamone (M036)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 10242.08717288527, "outstanding_amount": 10242.08717288527, "total_contributions": 0}',
    closing_balance = 10242.08717288527,
    updated_at = NOW()
WHERE member_number = 'M036' AND name LIKE '%Mmantsho%';

-- Mncedisi Sibiya (M037)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 24125.84234978821, "outstanding_amount": 24125.84234978821, "total_contributions": 0}',
    closing_balance = 24125.84234978821,
    updated_at = NOW()
WHERE member_number = 'M037' AND name LIKE '%Mncedisi%';

-- Mpho  Pilane (M038)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 15632.658783393155, "outstanding_amount": 15632.658783393155, "total_contributions": 0}',
    closing_balance = 15632.658783393155,
    updated_at = NOW()
WHERE member_number = 'M038' AND name LIKE '%Mpho%';

-- Mthobeli Keyizana (M039)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 10484.749560496555, "outstanding_amount": 10484.749560496555, "total_contributions": 0}',
    closing_balance = 10484.749560496555,
    updated_at = NOW()
WHERE member_number = 'M039' AND name LIKE '%Mthobeli%';

-- Naomi  Mokhine (M040)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 9896.682647438798, "outstanding_amount": 9896.682647438798, "total_contributions": 0}',
    closing_balance = 9896.682647438798,
    updated_at = NOW()
WHERE member_number = 'M040' AND name LIKE '%Naomi%';

-- Nicholas  Molale (M041)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 0, "outstanding_amount": 0, "total_contributions": 0}',
    closing_balance = -5934.263850214942,
    updated_at = NOW()
WHERE member_number = 'M041' AND name LIKE '%Nicholas%';

-- Nomalizo Florence Sebanyoni (M042)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 14588.171570184495, "outstanding_amount": 14588.171570184495, "total_contributions": 0}',
    closing_balance = 14588.171570184495,
    updated_at = NOW()
WHERE member_number = 'M042' AND name LIKE '%Nomalizo%';

-- Obakeng Kgosiemang (M043)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 23952.512072923008, "outstanding_amount": 23952.512072923008, "total_contributions": 0}',
    closing_balance = 23952.512072923008,
    updated_at = NOW()
WHERE member_number = 'M043' AND name LIKE '%Obakeng%';

-- Ookame Molale (M044)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.151586", "current_balance": 261.6279033838355, "outstanding_amount": 261.6279033838355, "total_contributions": 0}',
    closing_balance = 261.6279033838355,
    updated_at = NOW()
WHERE member_number = 'M044' AND name LIKE '%Ookame%';

-- Patrick Mateane (M045)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 20485.906535618902, "outstanding_amount": 20485.906535618902, "total_contributions": 0}',
    closing_balance = 20485.906535618902,
    updated_at = NOW()
WHERE member_number = 'M045' AND name LIKE '%Patrick%';

-- Pauline Mogomotsi (M046)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 19619.255151292877, "outstanding_amount": 19619.255151292877, "total_contributions": 0}',
    closing_balance = 19619.255151292877,
    updated_at = NOW()
WHERE member_number = 'M046' AND name LIKE '%Pauline%';

-- Poloko  khabae (M047)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 21525.888196810134, "outstanding_amount": 21525.888196810134, "total_contributions": 0}',
    closing_balance = 21525.888196810134,
    updated_at = NOW()
WHERE member_number = 'M047' AND name LIKE '%Poloko%';

-- Refilwe Lentswe (M048)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 19445.92487442767, "outstanding_amount": 19445.92487442767, "total_contributions": 0}',
    closing_balance = 19445.92487442767,
    updated_at = NOW()
WHERE member_number = 'M048' AND name LIKE '%Refilwe%';

-- Rosinah Letlhaku (M049)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 12859.374353549869, "outstanding_amount": 12859.374353549869, "total_contributions": 0}',
    closing_balance = 12859.374353549869,
    updated_at = NOW()
WHERE member_number = 'M049' AND name LIKE '%Rosinah%';

-- Simon  Mamatlhodi (M050)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 17019.300998314797, "outstanding_amount": 17019.300998314797, "total_contributions": 0}',
    closing_balance = 17019.300998314797,
    updated_at = NOW()
WHERE member_number = 'M050' AND name LIKE '%Simon%';

-- Sina Molale (M051)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 4274.748540982284, "outstanding_amount": 4274.748540982284, "total_contributions": 0}',
    closing_balance = 4274.748540982284,
    updated_at = NOW()
WHERE member_number = 'M051' AND name LIKE '%Sina%';

-- Sophy buthelezi (M052)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 18925.934043832054, "outstanding_amount": 18925.934043832054, "total_contributions": 0}',
    closing_balance = 18925.934043832054,
    updated_at = NOW()
WHERE member_number = 'M052' AND name LIKE '%Sophy%';

-- Stella Dintoe (M053)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 24125.84234978821, "outstanding_amount": 24125.84234978821, "total_contributions": 0}',
    closing_balance = 24125.84234978821,
    updated_at = NOW()
WHERE member_number = 'M053' AND name LIKE '%Stella%';

-- Tebogo Itshegetseng (M054)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 14246.016568471512, "outstanding_amount": 14246.016568471512, "total_contributions": 0}',
    closing_balance = 14246.016568471512,
    updated_at = NOW()
WHERE member_number = 'M054' AND name LIKE '%Tebogo%';

-- Thabo Moeti (M055)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 21872.548750540544, "outstanding_amount": 21872.548750540544, "total_contributions": 0}',
    closing_balance = 21872.548750540544,
    updated_at = NOW()
WHERE member_number = 'M055' AND name LIKE '%Thabo%';

-- Thembi Moepeng (M056)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 17885.952382640822, "outstanding_amount": 17885.952382640822, "total_contributions": 0}',
    closing_balance = 17885.952382640822,
    updated_at = NOW()
WHERE member_number = 'M056' AND name LIKE '%Thembi%';

-- Thenjiwe Shazi (M057)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 24472.502903518623, "outstanding_amount": 24472.502903518623, "total_contributions": 0}',
    closing_balance = 24472.502903518623,
    updated_at = NOW()
WHERE member_number = 'M057' AND name LIKE '%Thenjiwe%';

-- Theona Molokela (M058)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 22392.53958113616, "outstanding_amount": 22392.53958113616, "total_contributions": 0}',
    closing_balance = 22392.53958113616,
    updated_at = NOW()
WHERE member_number = 'M058' AND name LIKE '%Theona%';

-- Tlotlego Evodia Mankuroane (M059)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 6737.514425350565, "outstanding_amount": 6737.514425350565, "total_contributions": 0}',
    closing_balance = 6737.514425350565,
    updated_at = NOW()
WHERE member_number = 'M059' AND name LIKE '%Tlotlego%';

-- Tryphina  Kelly (M060)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 6792.814663267685, "outstanding_amount": 6792.814663267685, "total_contributions": 0}',
    closing_balance = 6792.814663267685,
    updated_at = NOW()
WHERE member_number = 'M060' AND name LIKE '%Tryphina%';

-- Tshepang  Setlhogo (M061)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 14419.346845336717, "outstanding_amount": 14419.346845336717, "total_contributions": 0}',
    closing_balance = 14419.346845336717,
    updated_at = NOW()
WHERE member_number = 'M061' AND name LIKE '%Tshepang%';

-- Tsholofelo Maleshane (M062)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 21525.888196810134, "outstanding_amount": 21525.888196810134, "total_contributions": 0}',
    closing_balance = 21525.888196810134,
    updated_at = NOW()
WHERE member_number = 'M062' AND name LIKE '%Tsholofelo%';

-- Tumelo  Letlhaku (M063)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 17279.296413612603, "outstanding_amount": 17279.296413612603, "total_contributions": 0}',
    closing_balance = 17279.296413612603,
    updated_at = NOW()
WHERE member_number = 'M063' AND name LIKE '%Tumelo%';

-- Vhuthihi Makhado (M064)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 2236.82666648533, "outstanding_amount": 2236.82666648533, "total_contributions": 0}',
    closing_balance = 2236.82666648533,
    updated_at = NOW()
WHERE member_number = 'M064' AND name LIKE '%Vhuthihi%';

-- wellington  galogakwe (M065)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 19965.915705023286, "outstanding_amount": 19965.915705023286, "total_contributions": 0}',
    closing_balance = 19965.915705023286,
    updated_at = NOW()
WHERE member_number = 'M065' AND name LIKE '%wellington%';

-- Zandie Mancotywa (M066)
UPDATE members 
SET financial_info = '{"data_source": "Excel Verification 2025 - Corrected", "last_updated": "2026-03-08T17:04:20.152588", "current_balance": 6446.154109537274, "outstanding_amount": 6446.154109537274, "total_contributions": 0}',
    closing_balance = 6446.154109537274,
    updated_at = NOW()
WHERE member_number = 'M066' AND name LIKE '%Zandie%';

-- ============================================
-- UPDATE MEMBER_BALANCES TABLE
-- ============================================

-- Lesego Bokaba (M031)
UPDATE member_balances 
SET savings_balance = 6220.824749612508,
    net_balance = 6220.824749612508,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M031';

-- Christopher Naude (M004)
UPDATE member_balances 
SET savings_balance = 17019.300998314797,
    net_balance = 17019.300998314797,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M004';

-- Collin Oliphant (M005)
UPDATE member_balances 
SET savings_balance = 22045.87902740575,
    net_balance = 22045.87902740575,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M005';

-- Gosego Molale (M016)
UPDATE member_balances 
SET savings_balance = 10524.572037429749,
    net_balance = 10524.572037429749,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M016';

-- Kedibone  Morokhu (M026)
UPDATE member_balances 
SET savings_balance = 19879.250566590687,
    net_balance = 19879.250566590687,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M026';

-- Lebogang Mafora (M028)
UPDATE member_balances 
SET savings_balance = 14246.016568471512,
    net_balance = 14246.016568471512,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M028';

-- Lekgowa  Mahole (M029)
UPDATE member_balances 
SET savings_balance = 16122.929198753696,
    net_balance = 16122.929198753696,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M029';

-- Matshediso Ellen Tyobeka (M033)
UPDATE member_balances 
SET savings_balance = 0,
    net_balance = -3709.343851204166,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M033';

-- Gaithitjwe   Letlhaku (M013)
UPDATE member_balances 
SET savings_balance = 854.8042578046625,
    net_balance = 854.8042578046625,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M013';

-- Dumisane  Mtotoba (M009)
UPDATE member_balances 
SET savings_balance = 11386.067000195624,
    net_balance = 11386.067000195624,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M009';

-- Babotshedi Malibe (M001)
UPDATE member_balances 
SET savings_balance = 10432.750477436997,
    net_balance = 10432.750477436997,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M001';

-- Macbeth Masupha Sello (M032)
UPDATE member_balances 
SET savings_balance = 15979.319337123568,
    net_balance = 15979.319337123568,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M032';

-- Gideon Diole (M015)
UPDATE member_balances 
SET savings_balance = 13951.355097800664,
    net_balance = 13951.355097800664,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M015';

-- Kgomodile Loate (M027)
UPDATE member_balances 
SET savings_balance = 21855.215722854024,
    net_balance = 21855.215722854024,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M027';

-- Boitshoko Dire (M003)
UPDATE member_balances 
SET savings_balance = 23085.86068859698,
    net_balance = 23085.86068859698,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M003';

-- Kabelo  Morubane (M022)
UPDATE member_balances 
SET savings_balance = 2979.5485722331687,
    net_balance = 2979.5485722331687,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M022';

-- Keatlaretse Poo (M024)
UPDATE member_balances 
SET savings_balance = 18886.838861036584,
    net_balance = 18886.838861036584,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M024';

-- Belinda  Kelly (M002)
UPDATE member_balances 
SET savings_balance = 14246.016568471512,
    net_balance = 14246.016568471512,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M002';

-- Daniel Moepeng (M006)
UPDATE member_balances 
SET savings_balance = 12485.585120289827,
    net_balance = 12485.585120289827,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M006';

-- Dikagisho  Mokoma (M007)
UPDATE member_balances 
SET savings_balance = 21179.227643079725,
    net_balance = 21179.227643079725,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M007';

-- Doni Mosimanekgosi (M008)
UPDATE member_balances 
SET savings_balance = 14852.672537499731,
    net_balance = 14852.672537499731,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M008';

-- Ekofo Lofembe (M010)
UPDATE member_balances 
SET savings_balance = 14072.686291606307,
    net_balance = 14072.686291606307,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M010';

-- Ephraim Mbulelo Zukane (M011)
UPDATE member_balances 
SET savings_balance = 22045.87902740575,
    net_balance = 22045.87902740575,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M011';

-- Freddy  Sonakile (M012)
UPDATE member_balances 
SET savings_balance = 0,
    net_balance = -4574.770960482466,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M012';

-- Gasebakwe Mankuroane (M014)
UPDATE member_balances 
SET savings_balance = 14017.386053689186,
    net_balance = 14017.386053689186,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M014';

-- Jeff Matlou (M017)
UPDATE member_balances 
SET savings_balance = 0,
    net_balance = -11699.640937462736,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M017';

-- Jonas Letlhaku (M018)
UPDATE member_balances 
SET savings_balance = 5675.886183724499,
    net_balance = 5675.886183724499,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M018';

-- Jonas Moeng (M019)
UPDATE member_balances 
SET savings_balance = 20312.576258753696,
    net_balance = 20312.576258753696,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M019';

-- Julia  Mtyela (M020)
UPDATE member_balances 
SET savings_balance = 16152.649613988771,
    net_balance = 16152.649613988771,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M020';

-- Justice Mxolisi Tyobeka (M021)
UPDATE member_balances 
SET savings_balance = 5062.65196532548,
    net_balance = 5062.65196532548,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M021';

-- Katlego  Khotsholo (M023)
UPDATE member_balances 
SET savings_balance = 18769.301406754945,
    net_balance = 18769.301406754945,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M023';

-- Kebonemotse Lebotse (M025)
UPDATE member_balances 
SET savings_balance = 19965.915705023286,
    net_balance = 19965.915705023286,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M025';

-- Lenyatso Shadi (M030)
UPDATE member_balances 
SET savings_balance = 15131.924946557265,
    net_balance = 15131.924946557265,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M030';

-- Matshidiso  Maleshane (M034)
UPDATE member_balances 
SET savings_balance = 20832.567089349315,
    net_balance = 20832.567089349315,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M034';

-- Michael Boitumelo Kenosi Suping (M035)
UPDATE member_balances 
SET savings_balance = 635.6727761264746,
    net_balance = 635.6727761264746,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M035';

-- Mmantsho lamone (M036)
UPDATE member_balances 
SET savings_balance = 10242.08717288527,
    net_balance = 10242.08717288527,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M036';

-- Mncedisi Sibiya (M037)
UPDATE member_balances 
SET savings_balance = 24125.84234978821,
    net_balance = 24125.84234978821,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M037';

-- Mpho  Pilane (M038)
UPDATE member_balances 
SET savings_balance = 15632.658783393155,
    net_balance = 15632.658783393155,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M038';

-- Mthobeli Keyizana (M039)
UPDATE member_balances 
SET savings_balance = 10484.749560496555,
    net_balance = 10484.749560496555,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M039';

-- Naomi  Mokhine (M040)
UPDATE member_balances 
SET savings_balance = 9896.682647438798,
    net_balance = 9896.682647438798,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M040';

-- Nicholas  Molale (M041)
UPDATE member_balances 
SET savings_balance = 0,
    net_balance = -5934.263850214942,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M041';

-- Nomalizo Florence Sebanyoni (M042)
UPDATE member_balances 
SET savings_balance = 14588.171570184495,
    net_balance = 14588.171570184495,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M042';

-- Obakeng Kgosiemang (M043)
UPDATE member_balances 
SET savings_balance = 23952.512072923008,
    net_balance = 23952.512072923008,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M043';

-- Ookame Molale (M044)
UPDATE member_balances 
SET savings_balance = 261.6279033838355,
    net_balance = 261.6279033838355,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M044';

-- Patrick Mateane (M045)
UPDATE member_balances 
SET savings_balance = 20485.906535618902,
    net_balance = 20485.906535618902,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M045';

-- Pauline Mogomotsi (M046)
UPDATE member_balances 
SET savings_balance = 19619.255151292877,
    net_balance = 19619.255151292877,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M046';

-- Poloko  khabae (M047)
UPDATE member_balances 
SET savings_balance = 21525.888196810134,
    net_balance = 21525.888196810134,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M047';

-- Refilwe Lentswe (M048)
UPDATE member_balances 
SET savings_balance = 19445.92487442767,
    net_balance = 19445.92487442767,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M048';

-- Rosinah Letlhaku (M049)
UPDATE member_balances 
SET savings_balance = 12859.374353549869,
    net_balance = 12859.374353549869,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M049';

-- Simon  Mamatlhodi (M050)
UPDATE member_balances 
SET savings_balance = 17019.300998314797,
    net_balance = 17019.300998314797,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M050';

-- Sina Molale (M051)
UPDATE member_balances 
SET savings_balance = 4274.748540982284,
    net_balance = 4274.748540982284,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M051';

-- Sophy buthelezi (M052)
UPDATE member_balances 
SET savings_balance = 18925.934043832054,
    net_balance = 18925.934043832054,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M052';

-- Stella Dintoe (M053)
UPDATE member_balances 
SET savings_balance = 24125.84234978821,
    net_balance = 24125.84234978821,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M053';

-- Tebogo Itshegetseng (M054)
UPDATE member_balances 
SET savings_balance = 14246.016568471512,
    net_balance = 14246.016568471512,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M054';

-- Thabo Moeti (M055)
UPDATE member_balances 
SET savings_balance = 21872.548750540544,
    net_balance = 21872.548750540544,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M055';

-- Thembi Moepeng (M056)
UPDATE member_balances 
SET savings_balance = 17885.952382640822,
    net_balance = 17885.952382640822,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M056';

-- Thenjiwe Shazi (M057)
UPDATE member_balances 
SET savings_balance = 24472.502903518623,
    net_balance = 24472.502903518623,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M057';

-- Theona Molokela (M058)
UPDATE member_balances 
SET savings_balance = 22392.53958113616,
    net_balance = 22392.53958113616,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M058';

-- Tlotlego Evodia Mankuroane (M059)
UPDATE member_balances 
SET savings_balance = 6737.514425350565,
    net_balance = 6737.514425350565,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M059';

-- Tryphina  Kelly (M060)
UPDATE member_balances 
SET savings_balance = 6792.814663267685,
    net_balance = 6792.814663267685,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M060';

-- Tshepang  Setlhogo (M061)
UPDATE member_balances 
SET savings_balance = 14419.346845336717,
    net_balance = 14419.346845336717,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M061';

-- Tsholofelo Maleshane (M062)
UPDATE member_balances 
SET savings_balance = 21525.888196810134,
    net_balance = 21525.888196810134,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M062';

-- Tumelo  Letlhaku (M063)
UPDATE member_balances 
SET savings_balance = 17279.296413612603,
    net_balance = 17279.296413612603,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M063';

-- Vhuthihi Makhado (M064)
UPDATE member_balances 
SET savings_balance = 2236.82666648533,
    net_balance = 2236.82666648533,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M064';

-- wellington  galogakwe (M065)
UPDATE member_balances 
SET savings_balance = 19965.915705023286,
    net_balance = 19965.915705023286,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M065';

-- Zandie Mancotywa (M066)
UPDATE member_balances 
SET savings_balance = 6446.154109537274,
    net_balance = 6446.154109537274,
    updated_at = NOW(),
    last_balance_update = NOW()
WHERE member_number = 'M066';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check a few members to verify the fix
SELECT member_number, name, closing_balance, financial_info->>'current_balance' as current_balance FROM members LIMIT 10;

SELECT mb.member_number, m.name, mb.savings_balance, mb.net_balance FROM member_balances mb JOIN members m ON mb.member_number = m.member_number LIMIT 10;
