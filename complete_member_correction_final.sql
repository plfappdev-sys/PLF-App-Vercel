-- PLF Complete Member Balance Correction SQL
-- Generated automatically on 2025-10-28T17:00:51.918Z
-- This script updates ALL member balances with corrected calculations

-- First, let's check the current state
SELECT COUNT(*) as existing_records FROM member_balances;

-- Update all member balances with corrected calculations
-- Babotshedi Malibe (M001)
UPDATE member_balances 
SET 
    total_contributions = 2200.00,
    total_interest_earned = 516.77,
    savings_balance = 1708.77,
    net_balance = 1708.77,
    available_funds = 1708.77,
    updated_at = NOW()
WHERE member_id = 1341;

-- Belinda  Kelly (M002)
UPDATE member_balances 
SET 
    total_contributions = 1400.00,
    total_interest_earned = 328.86,
    savings_balance = 664.86,
    net_balance = 664.86,
    available_funds = 664.86,
    updated_at = NOW()
WHERE member_id = 1342;

-- Boitshoko Dire (M003)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1343;

-- Boitshoko Selekanyane (M004)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1344;

-- Boitumelo  Marumo  (M005)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1345;

-- Christopher Naude (M006)
UPDATE member_balances 
SET 
    total_contributions = 500.00,
    total_interest_earned = 117.45,
    savings_balance = -509.55,
    net_balance = -509.55,
    available_funds = -509.55,
    updated_at = NOW()
WHERE member_id = 1346;

-- Collen Zolile Mbengo (M007)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1347;

-- Collin Oliphant (M008)
UPDATE member_balances 
SET 
    total_contributions = 200.00,
    total_interest_earned = 46.98,
    savings_balance = -901.02,
    net_balance = -901.02,
    available_funds = -901.02,
    updated_at = NOW()
WHERE member_id = 1348;

-- Daniel Moepeng (M009)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1349;

-- Dikagisho  Mokoma (M010)
UPDATE member_balances 
SET 
    total_contributions = 800.00,
    total_interest_earned = 187.92,
    savings_balance = -118.08,
    net_balance = -118.08,
    available_funds = -118.08,
    updated_at = NOW()
WHERE member_id = 1350;

-- Doni Mosimanekgosi (M011)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1351;

-- Dumisane  Mtotoba  (M012)
UPDATE member_balances 
SET 
    total_contributions = 1300.00,
    total_interest_earned = 305.37,
    savings_balance = 534.37,
    net_balance = 534.37,
    available_funds = 534.37,
    updated_at = NOW()
WHERE member_id = 1352;

-- Ekofo Lofembe (M013)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1353;

-- Elizabeth Nakuphi Thabeng (M014)
UPDATE member_balances 
SET 
    total_contributions = 800.00,
    total_interest_earned = 187.92,
    savings_balance = -118.08,
    net_balance = -118.08,
    available_funds = -118.08,
    updated_at = NOW()
WHERE member_id = 1354;

-- Ephraim Mbulelo Zukane (M015)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1355;

-- Euvodia Mothibi (M016)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1356;

-- Freddy  Sonakile  (M017)
UPDATE member_balances 
SET 
    total_contributions = 1500.00,
    total_interest_earned = 352.34,
    savings_balance = 795.34,
    net_balance = 795.34,
    available_funds = 795.34,
    updated_at = NOW()
WHERE member_id = 1357;

-- Gaithitjwe   Letlhaku (M018)
UPDATE member_balances 
SET 
    total_contributions = 1400.00,
    total_interest_earned = 328.86,
    savings_balance = 664.86,
    net_balance = 664.86,
    available_funds = 664.86,
    updated_at = NOW()
WHERE member_id = 1358;

-- Gasebakwe Mankuroane (M019)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1359;

-- Gideon Diole (M020)
UPDATE member_balances 
SET 
    total_contributions = 200.00,
    total_interest_earned = 46.98,
    savings_balance = -901.02,
    net_balance = -901.02,
    available_funds = -901.02,
    updated_at = NOW()
WHERE member_id = 1360;

-- Gladness Mokgosi (M021)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1361;

-- Gosego Molale (M022)
UPDATE member_balances 
SET 
    total_contributions = 200.00,
    total_interest_earned = 46.98,
    savings_balance = -901.02,
    net_balance = -901.02,
    available_funds = -901.02,
    updated_at = NOW()
WHERE member_id = 1362;

-- Jaftha Nkashe  (M023)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1363;

-- Jeff Matlou (M024)
UPDATE member_balances 
SET 
    total_contributions = 2700.00,
    total_interest_earned = 634.22,
    savings_balance = 2361.22,
    net_balance = 2361.22,
    available_funds = 2361.22,
    updated_at = NOW()
WHERE member_id = 1364;

-- Jonas Letlhaku (M025)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1365;

-- Jonas Moeng (M026)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1366;

-- Joseph Sekgalo (M027)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1367;

-- Josiah Gaotlhaolwe Montwedi (M028)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1368;

-- Julia  Mtyela (M029)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1369;

-- Justice Mxolisi Tyobeka (M030)
UPDATE member_balances 
SET 
    total_contributions = 3300.00,
    total_interest_earned = 775.16,
    savings_balance = 3144.16,
    net_balance = 3144.16,
    available_funds = 3144.16,
    updated_at = NOW()
WHERE member_id = 1370;

-- Kabelo  Morubane (M031)
UPDATE member_balances 
SET 
    total_contributions = 2500.00,
    total_interest_earned = 587.24,
    savings_balance = 2100.24,
    net_balance = 2100.24,
    available_funds = 2100.24,
    updated_at = NOW()
WHERE member_id = 1371;

-- Kagiso Isaac Phetoe (M032)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1372;

-- Kagiso Mokaila (M033)
UPDATE member_balances 
SET 
    total_contributions = 500.00,
    total_interest_earned = 117.45,
    savings_balance = -509.55,
    net_balance = -509.55,
    available_funds = -509.55,
    updated_at = NOW()
WHERE member_id = 1373;

-- Katlego  Khotsholo (M034)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1374;

-- Keatlaretse Poo (M035)
UPDATE member_balances 
SET 
    total_contributions = 1100.00,
    total_interest_earned = 258.39,
    savings_balance = 273.39,
    net_balance = 273.39,
    available_funds = 273.39,
    updated_at = NOW()
WHERE member_id = 1375;

-- Kebonemotse Lebotse (M036)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1376;

-- Kedibone  Morokhu (M037)
UPDATE member_balances 
SET 
    total_contributions = 400.00,
    total_interest_earned = 93.96,
    savings_balance = -640.04,
    net_balance = -640.04,
    available_funds = -640.04,
    updated_at = NOW()
WHERE member_id = 1377;

-- Kegomoditswe Kgosimore (M038)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1378;

-- Kgomodile Loate (M039)
UPDATE member_balances 
SET 
    total_contributions = 690.00,
    total_interest_earned = 162.08,
    savings_balance = -261.62,
    net_balance = -261.62,
    available_funds = -261.62,
    updated_at = NOW()
WHERE member_id = 1379;

-- Lebogang Mafora (M040)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1380;

-- Lekgowa  Mahole (M041)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1381;

-- Lenyatso Shadi (M042)
UPDATE member_balances 
SET 
    total_contributions = 900.00,
    total_interest_earned = 211.41,
    savings_balance = 12.41,
    net_balance = 12.41,
    available_funds = 12.41,
    updated_at = NOW()
WHERE member_id = 1382;

-- Lesego Bokaba (M043)
UPDATE member_balances 
SET 
    total_contributions = 2500.00,
    total_interest_earned = 587.24,
    savings_balance = 2100.24,
    net_balance = 2100.24,
    available_funds = 2100.24,
    updated_at = NOW()
WHERE member_id = 1383;

-- Macbeth Masupha Sello (M044)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1384;

-- Matshediso Ellen Tyobeka (M045)
UPDATE member_balances 
SET 
    total_contributions = 2900.00,
    total_interest_earned = 681.20,
    savings_balance = 2622.20,
    net_balance = 2622.20,
    available_funds = 2622.20,
    updated_at = NOW()
WHERE member_id = 1385;

-- Matshidiso  Maleshane (M046)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1386;

-- Michael Boitumelo Kenosi Suping (M047)
UPDATE member_balances 
SET 
    total_contributions = 2000.00,
    total_interest_earned = 469.79,
    savings_balance = 1447.79,
    net_balance = 1447.79,
    available_funds = 1447.79,
    updated_at = NOW()
WHERE member_id = 1387;

-- Mmantsho lamone (M048)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1388;

-- Mmapako kgagane (M049)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1389;

-- Mncedisi Sibiya (M050)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1390;

-- Monaco frans makwaeba (M051)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1391;

-- Mpho  Pilane  (M052)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1392;

-- Mthobeli Keyizana (M053)
UPDATE member_balances 
SET 
    total_contributions = 1250.00,
    total_interest_earned = 293.62,
    savings_balance = 469.12,
    net_balance = 469.12,
    available_funds = 469.12,
    updated_at = NOW()
WHERE member_id = 1393;

-- Naomi  Mokhine (M054)
UPDATE member_balances 
SET 
    total_contributions = 1600.00,
    total_interest_earned = 375.83,
    savings_balance = 925.83,
    net_balance = 925.83,
    available_funds = 925.83,
    updated_at = NOW()
WHERE member_id = 1394;

-- Nicholas  Molale  (M055)
UPDATE member_balances 
SET 
    total_contributions = 2750.00,
    total_interest_earned = 645.97,
    savings_balance = 2426.47,
    net_balance = 2426.47,
    available_funds = 2426.47,
    updated_at = NOW()
WHERE member_id = 1395;

-- Nomalizo Florence Sebanyoni (M056)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1396;

-- Obakeng Kgosiemang (M057)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1397;

-- Ontiretse Molefe (M058)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1398;

-- Ookame Molale (M059)
UPDATE member_balances 
SET 
    total_contributions = 3250.00,
    total_interest_earned = 763.41,
    savings_balance = 3078.91,
    net_balance = 3078.91,
    available_funds = 3078.91,
    updated_at = NOW()
WHERE member_id = 1399;

-- Oratile Belicent Letlhogile (M060)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1400;

-- Patrick Mateane (M061)
UPDATE member_balances 
SET 
    total_contributions = 400.00,
    total_interest_earned = 93.96,
    savings_balance = -640.04,
    net_balance = -640.04,
    available_funds = -640.04,
    updated_at = NOW()
WHERE member_id = 1401;

-- Pauline Mogomotsi (M062)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1402;

-- PHILLIO THABISO MTYELA (M063)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1403;

-- Phineas Mpho Kgajane (M064)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1404;

-- Poloko  khabae (M065)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1405;

-- Refilwe Lentswe (M066)
UPDATE member_balances 
SET 
    total_contributions = 1300.00,
    total_interest_earned = 305.37,
    savings_balance = 534.37,
    net_balance = 534.37,
    available_funds = 534.37,
    updated_at = NOW()
WHERE member_id = 1406;

-- Rosinah Letlhaku (M067)
UPDATE member_balances 
SET 
    total_contributions = 2500.00,
    total_interest_earned = 587.24,
    savings_balance = 2100.24,
    net_balance = 2100.24,
    available_funds = 2100.24,
    updated_at = NOW()
WHERE member_id = 1407;

-- Simon  Mamatlhodi  (M068)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1408;

-- Sina Molale (M069)
UPDATE member_balances 
SET 
    total_contributions = 2700.00,
    total_interest_earned = 634.22,
    savings_balance = 2361.22,
    net_balance = 2361.22,
    available_funds = 2361.22,
    updated_at = NOW()
WHERE member_id = 1409;

-- Sophy buthelezi (M070)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1410;

-- Stella Dintoe (M071)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1411;

-- Sylvia Mokhadi (M072)
UPDATE member_balances 
SET 
    total_contributions = 1600.00,
    total_interest_earned = 375.83,
    savings_balance = 925.83,
    net_balance = 925.83,
    available_funds = 925.83,
    updated_at = NOW()
WHERE member_id = 1412;

-- Tabane Matshego (M073)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1413;

-- Tebogo Itshegetseng (M074)
UPDATE member_balances 
SET 
    total_contributions = 600.00,
    total_interest_earned = 140.94,
    savings_balance = -379.06,
    net_balance = -379.06,
    available_funds = -379.06,
    updated_at = NOW()
WHERE member_id = 1414;

-- Thabo Moeti (M075)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1415;

-- Thapelo Cornelius Moseki (M076)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1416;

-- Thembi Moepeng (M077)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1417;

-- Thenjiwe Shazi (M078)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1418;

-- Theona Molokela (M079)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1419;

-- Tlotlego Evodia Mankuroane (M080)
UPDATE member_balances 
SET 
    total_contributions = 900.00,
    total_interest_earned = 211.41,
    savings_balance = 12.41,
    net_balance = 12.41,
    available_funds = 12.41,
    updated_at = NOW()
WHERE member_id = 1420;

-- Tryphina  Kelly (M081)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1421;

-- Tshepang  Setlhogo  (M082)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1422;

-- Tsholofelo Maleshane (M083)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1423;

-- Tumelo  Letlhaku  (M084)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1424;

-- Vhuthihi Makhado (M085)
UPDATE member_balances 
SET 
    total_contributions = 1900.00,
    total_interest_earned = 446.30,
    savings_balance = 1317.30,
    net_balance = 1317.30,
    available_funds = 1317.30,
    updated_at = NOW()
WHERE member_id = 1425;

-- Violet Molefe (M086)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1426;

-- wellington  galogakwe (M087)
UPDATE member_balances 
SET 
    total_contributions = 1300.00,
    total_interest_earned = 305.37,
    savings_balance = 534.37,
    net_balance = 534.37,
    available_funds = 534.37,
    updated_at = NOW()
WHERE member_id = 1427;

-- Winnie Gaaratwe (M088)
UPDATE member_balances 
SET 
    total_contributions = 13280.00,
    total_interest_earned = 3119.43,
    savings_balance = 16167.03,
    net_balance = 16167.03,
    available_funds = 16167.03,
    updated_at = NOW()
WHERE member_id = 1428;

-- Zandie Mancotywa (M089)
UPDATE member_balances 
SET 
    total_contributions = 1600.00,
    total_interest_earned = 375.83,
    savings_balance = 925.83,
    net_balance = 925.83,
    available_funds = 925.83,
    updated_at = NOW()
WHERE member_id = 1429;

-- Verification queries
SELECT 
    m.name,
    mb.member_number,
    mb.total_contributions,
    mb.total_interest_earned,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.updated_at > NOW() - INTERVAL '1 hour'
ORDER BY m.name;

-- Show members with negative balances (outstanding payments)
SELECT 
    m.name,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.net_balance < 0
ORDER BY mb.net_balance ASC;

-- Show members with positive balances
SELECT 
    m.name,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE mb.net_balance >= 0
ORDER BY mb.net_balance DESC;

-- Summary statistics
SELECT 
    COUNT(*) as total_members,
    COUNT(CASE WHEN mb.net_balance < 0 THEN 1 END) as members_with_negative_balance,
    COUNT(CASE WHEN mb.net_balance >= 0 THEN 1 END) as members_with_positive_balance,
    SUM(CASE WHEN mb.savings_balance > 0 THEN mb.savings_balance ELSE 0 END) as total_fund_value,
    AVG(mb.savings_balance) as average_balance
FROM member_balances mb;

-- Check Babotshedi Malibe specifically
SELECT 
    m.name,
    mb.total_contributions,
    mb.total_interest_earned,
    mb.savings_balance,
    mb.net_balance
FROM member_balances mb
JOIN members m ON mb.member_id = m.id
WHERE m.name LIKE '%Babotshedi Malibe%';