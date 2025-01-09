import pickle
import numpy as np
import pandas as pd
import json
import sys

#Load the Model
model = pickle.load(open('model.pickle','rb'))

DFCOLS = ['availability',
 'total_sqft',
 'bath',
 'balcony',
 'BHK',
 '1st Block Jayanagar',
 '1st Phase JP Nagar',
 '2nd Stage Nagarbhavi',
 '5th Block Hbr Layout',
 '5th Phase JP Nagar',
 '6th Phase JP Nagar',
 '7th Phase JP Nagar',
 '8th Phase JP Nagar',
 '9th Phase JP Nagar',
 'AECS Layout',
 'Abbigere',
 'Akshaya Nagar',
 'Ambalipura',
 'Ambedkar Nagar',
 'Amruthahalli',
 'Anandapura',
 'Ananth Nagar',
 'Anekal',
 'Anjanapura',
 'Ardendale',
 'Arekere',
 'Attibele',
 'BTM 2nd Stage',
 'BTM Layout',
 'Babusapalaya',
 'Balagere',
 'Banashankari',
 'Banashankari Stage II',
 'Banashankari Stage III',
 'Banashankari Stage V',
 'Banashankari Stage VI',
 'Banaswadi',
 'Banjara Layout',
 'Bannerghatta',
 'Bannerghatta Road',
 'Basavangudi',
 'Basaveshwara Nagar',
 'Battarahalli',
 'Begur',
 'Begur Road',
 'Bellandur',
 'Benson Town',
 'Bharathi Nagar',
 'Bhoganhalli',
 'Billekahalli',
 'Binny Pete',
 'Bisuvanahalli',
 'Bommanahalli',
 'Bommasandra',
 'Bommasandra Industrial Area',
 'Bommenahalli',
 'Brookefield',
 'Budigere',
 'CV Raman Nagar',
 'Chamrajpet',
 'Chandapura',
 'Channasandra',
 'Chikka Tirupathi',
 'Chikkabanavar',
 'Chikkalasandra',
 'Choodasandra',
 'Cooke Town',
 'Cox Town',
 'Cunningham Road',
 'Dasanapura',
 'Dasarahalli',
 'Devanahalli',
 'Devarachikkanahalli',
 'Dodda Nekkundi',
 'Doddaballapur',
 'Doddakallasandra',
 'Doddathoguru',
 'Domlur',
 'Dommasandra',
 'EPIP Zone',
 'Electronic City',
 'Electronic City Phase II',
 'Electronics City Phase 1',
 'Frazer Town',
 'GM Palaya',
 'Garudachar Palya',
 'Giri Nagar',
 'Gollarapalya Hosahalli',
 'Gottigere',
 'Green Glen Layout',
 'Gubbalala',
 'Gunjur',
 'HAL 2nd Stage',
 'HBR Layout',
 'HRBR Layout',
 'HSR Layout',
 'Haralur Road',
 'Harlur',
 'Hebbal',
 'Hebbal Kempapura',
 'Hegde Nagar',
 'Hennur',
 'Hennur Road',
 'Hoodi',
 'Horamavu Agara',
 'Horamavu Banaswadi',
 'Hormavu',
 'Hosa Road',
 'Hosakerehalli',
 'Hoskote',
 'Hosur Road',
 'Hulimavu',
 'ISRO Layout',
 'Iblur Village',
 'Indira Nagar',
 'JP Nagar',
 'Jakkur',
 'Jalahalli',
 'Jalahalli East',
 'Jigani',
 'Judicial Layout',
 'KR Puram',
 'Kadubeesanahalli',
 'Kadugodi',
 'Kaggadasapura',
 'Kaggalipura',
 'Kaikondrahalli',
 'Kalena Agrahara',
 'Kalyan nagar',
 'Kambipura',
 'Kammanahalli',
 'Kammasandra',
 'Kanakapura',
 'Kanakpura Road',
 'Kannamangala',
 'Karuna Nagar',
 'Kasavanhalli',
 'Kasturi Nagar',
 'Kathriguppe',
 'Kaval Byrasandra',
 'Kenchenahalli',
 'Kengeri',
 'Kengeri Satellite Town',
 'Kereguddadahalli',
 'Kodichikkanahalli',
 'Kodigehaali',
 'Kodigehalli',
 'Kodihalli',
 'Kogilu',
 'Konanakunte',
 'Koramangala',
 'Kothannur',
 'Kothanur',
 'Kudlu',
 'Kudlu Gate',
 'Kumaraswami Layout',
 'Kundalahalli',
 'LB Shastri Nagar',
 'Laggere',
 'Lakshminarayana Pura',
 'Lingadheeranahalli',
 'Magadi Road',
 'Mahadevpura',
 'Mahalakshmi Layout',
 'Mallasandra',
 'Malleshpalya',
 'Malleshwaram',
 'Marathahalli',
 'Margondanahalli',
 'Mico Layout',
 'Munnekollal',
 'Murugeshpalya',
 'Mysore Road',
 'NGR Layout',
 'NRI Layout',
 'Nagarbhavi',
 'Nagasandra',
 'Nagavara',
 'Nagavarapalya',
 'Neeladri Nagar',
 'Nehru Nagar',
 'OMBR Layout',
 'Old Airport Road',
 'Old Madras Road',
 'Padmanabhanagar',
 'Pai Layout',
 'Panathur',
 'Poorna Pragna Layout',
 'Prithvi Layout',
 'R.T. Nagar',
 'Rachenahalli',
 'Raja Rajeshwari Nagar',
 'Rajaji Nagar',
 'Rajiv Nagar',
 'Ramagondanahalli',
 'Ramamurthy Nagar',
 'Rayasandra',
 'Sahakara Nagar',
 'Sanjay nagar',
 'Sarakki Nagar',
 'Sarjapur',
 'Sarjapur  Road',
 'Sarjapura - Attibele Road',
 'Sector 2 HSR Layout',
 'Sector 7 HSR Layout',
 'Seegehalli',
 'Shampura',
 'Shivaji Nagar',
 'Singasandra',
 'Somasundara Palya',
 'Sompura',
 'Sonnenahalli',
 'Subramanyapura',
 'Sultan Palaya',
 'TC Palaya',
 'Talaghattapura',
 'Thanisandra',
 'Thigalarapalya',
 'Thubarahalli',
 'Tindlu',
 'Tumkur Road',
 'Ulsoor',
 'Uttarahalli',
 'Varthur',
 'Varthur Road',
 'Vidyaranyapura',
 'Vijayanagar',
 'Vishveshwarya Layout',
 'Vishwapriya Layout',
 'Vittasandra',
 'Whitefield',
 'Yelachenahalli',
 'Yelahanka',
 'Yelahanka New Town',
 'Yelenahalli',
 'Yeshwanthpur',
 'Built-up  Area',
 'Carpet  Area',
 'Super built-up  Area']

#Call this function directly from the Backend
def predict_price(inputjson):
    #Get Data from JSON
    area_type = inputjson.get('area_type', '')
    location = inputjson.get('location', '')
    availability = inputjson.get('availability', '')
    total_sqft = inputjson.get('total_sqft', 0)
    bath = inputjson.get('bath', 0)
    balcony = inputjson.get('balcony', 0)
    BHK = inputjson.get('BHK', 0)

    #Process inputs
    try:
        availability = 1 if availability.lower() == 'ready to move' else 0
        total_sqft = float(total_sqft)
        bath = int(bath)
        balcony = int(balcony)
        BHK = int(BHK)
    except ValueError:
        print(json.dumps({"error": "Numeric fields must be valid numbers"}))
        return None

    locidx = DFCOLS.index(location) if location in DFCOLS else -1
    areaidx = DFCOLS.index(area_type) if area_type in DFCOLS else -1

    z = np.zeros(len(DFCOLS))
    z[0] = availability
    z[1] = total_sqft
    z[2] = bath
    z[3] = balcony
    z[4] = BHK

    if locidx >= 0:
        z[locidx] = 1
    if areaidx >= 0:
        z[areaidx] = 1

    z_df = pd.DataFrame([z], columns=DFCOLS)

    try:
        ans =  model.predict(z_df)[0].item()
        return ans
    except Exception as e:
        print(e)
        return None

if(__name__ == '__main__'):
    input_data = {}
    try:
        input_data = json.loads(sys.argv[1])  # Read JSON from Commandline
    except (IndexError, json.JSONDecodeError):
        print(json.dumps({"error": "Invalid input format"}))
        sys.exit(1)

    ans = predict_price(input_data)
    print(f"Predicted Answer: {ans}")