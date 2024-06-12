# import requests
# import pprint
# import json
# from bs4 import BeautifulSoup

# dict = []

# def getMarketTransfer():
#     for i in range(1):
#         url = "https://www.transfermarkt.us/statistik/neuestetransfers?page=" + str(i)
#         headers = {"User-Agent":"Mozilla/5.0"}
#         response = requests.get(url, headers=headers)
#         soup = BeautifulSoup(response.text, 'html.parser')

#         li = soup.find_all(True, {"class":['odd', 'even']})
#         for item in li:
#             national_flag = item.find(class_="flaggenrahmen")["src"]
#             if "tiny" in national_flag or "verysmall" in national_flag or "small" in national_flag:
#                 national_flag = national_flag.replace("tiny", "medium")
#                 national_flag = national_flag.replace("verysmall", "medium")
#                 national_flag = national_flag.replace("small", "medium")
#             leaving_flag = item.find(class_="tiny_wappen")["src"]
#             if "tiny" in leaving_flag or "verysmall" in leaving_flag or "small" in leaving_flag:
#                 leaving_flag = leaving_flag.replace("tiny", "medium")
#                 leaving_flag = leaving_flag.replace("verysmall", "medium")
#                 leaving_flag = leaving_flag.replace("small", "medium")
#             joined_flag = item.select(".tiny_wappen")[1]["src"]
#             if "tiny" in joined_flag or "verysmall" in joined_flag or "small" in joined_flag:
#                 joined_flag = joined_flag.replace("tiny", "medium")
#                 joined_flag = joined_flag.replace("verysmall", "medium")
#                 joined_flag = joined_flag.replace("small", "medium")
                
        
            
#             dict.append({
#             "name": item.find("img")["title"],
#             "image": item.find("img")["data-src"],
#             "position": item.select("td")[3].get_text(),
#             "url": "https://www.transfermarkt.us" + item.find("a")["href"],
#             "age": item.find(class_="zentriert").get_text(),
#             "national_flag": national_flag,
#             "nationality": item.find(class_="flaggenrahmen")["alt"],
#             "leaving_name": item.find(class_="tiny_wappen")["title"],
#             "leaving_flag": leaving_flag,
#             "joined_name": item.select(".tiny_wappen")[1]["title"],
#             "joined_flag": joined_flag,
#             "fee": item.find(class_="rechts").get_text()
#             })
            
#     with open('./src/Components/HomePage/transfer.json', 'w') as f:
#         json.dump(dict, f, indent=2)
#         print("New JSON file has been created/overwritten!")
        
#     return dict

# getMarketTransfer()