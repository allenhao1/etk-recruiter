from selenium import webdriver
import json
json_data=open('conf.json').read()
data = json.loads(json_data)

browser = webdriver.Firefox()
browser.get('http://www.whenisgood.net/Login')

username = browser.find_element_by_name("loginEmail")
password = browser.find_element_by_name("loginPassword")

username.send_keys(data['email'])
password.send_keys(data['password'])

browser.find_element_by_xpath("/html/body/div[3]/form/table/tbody/tr[4]/td[2]/input[1]").click()

print browser.get_attribute('innerHTML')
