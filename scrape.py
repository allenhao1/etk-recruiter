from selenium import webdriver
import json
import sys
from sys import argv
if len(argv) != 3 and len(argv) != 1:
    print 'Usage {0} [survey id] [survey code]'
elif len(argv) == 3:
    _id = argv[1]
    code = argv[2]
else:
    _id = 'igjq25h'
    _code = '2xdzp5k'
json_data=open('conf.json').read()
data = json.loads(json_data)

browser = webdriver.Firefox()
browser.get('http://www.whenisgood.net/Login')

username = browser.find_element_by_name("loginEmail")
password = browser.find_element_by_name("loginPassword")

username.send_keys(data['email'])
password.send_keys(data['password'])

browser.find_element_by_xpath("/html/body/div[3]/form/table/tbody/tr[4]/td[2]/input[1]").click()
browser.get('http://whenisgood.net/igjq25h/results/2xdzp5k')
# print browser.find_element_by_xpath('/html/body').html
print browser.page_source
# Loop through results table

browser.quit()

# print     browser.getAttribute('innerHTML')
