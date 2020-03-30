import time
from selenium import webdriver
from selenium.webdriver import ActionChains


Driver = 'C:/Drivers/chromedriver'
URL = 'https://frozen-shore-47195.herokuapp.com/'
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--incognito")


class AggieMap():
    driver = webdriver.Chrome(Driver, options=chrome_options)
    actionChains = ActionChains(driver)

    def __init__(self):
        self.driver.get(URL);
        self.MENU = self.driver.find_elements_by_xpath('/html/body/button')[0]
        self.BUS = self.driver.find_elements_by_xpath('/html/body/div[1]/div[1]/nav/button[1]')[0]
        self.BIKE = self.driver.find_elements_by_xpath('/html/body/div[1]/div[1]/nav/button[2]')[0]
        self.WALK = self.driver.find_elements_by_xpath('/html/body/div[1]/div[1]/nav/button[3]')[0]
        self.CAR = self.driver.find_elements_by_xpath('/html/body/div[1]/div[1]/nav/button[4]')[0]
        self.CHAIR = self.driver.find_elements_by_xpath('/html/body/div[1]/div[1]/nav/button[5]')[0]
        self.START = self.driver.find_elements_by_xpath('/html/body/div[1]/input[1]')[0]
        self.END = self.driver.find_elements_by_xpath('/html/body/div[1]/input[2]')[0]
        self.DIR = '//*[@id="output"]/div/div/div[3]/div[1]'

    def close_driver(self):
        # self.driver.close()
        return

    def click_bus(self):
        self.BUS.click()
        return 'Passed'

    def click_bike(self):
        self.BIKE.click()
        return 'Passed'

    def click_walk(self):
        self.WALK.click()
        return 'Passed'

    def click_car(self):
        self.CAR.click()
        return 'Passed'

    def click_chair(self):
        self.CHAIR.click()
        return 'Passed'

    def send_start(self, text):
        self.START.send_keys(text)
        time.sleep(1)

        action = webdriver.common.action_chains.ActionChains(self.driver)
        action.move_to_element_with_offset(self.START, 20, 60)
        action.click()
        action.perform()

        return 'Passed'

    def send_end(self, text):
        self.END.send_keys(text)
        time.sleep(1)

        action = webdriver.common.action_chains.ActionChains(self.driver)
        action.move_to_element_with_offset(self.END, 20, 60)
        action.click()
        action.perform()

        return 'Passed'

    def dir_visible(self):
        time.sleep(1)
        if self.driver.find_elements_by_xpath(self.DIR)[0].is_displayed():
            return 'Passed'
        else:
            return 'Failed'
        return

