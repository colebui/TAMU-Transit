import time
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.keys import Keys

Driver = 'D:/drivers/chromedriver'
URL = 'https://powerful-savannah-86477.herokuapp.com/'
chrome_options = webdriver.ChromeOptions()
# chrome_options.add_argument("--incognito")


class AggieMap():
    driver = webdriver.Chrome(Driver, options=chrome_options)
    actionChains = ActionChains(driver)

    def __init__(self):
        self.driver.get(URL);
        # wait for animation
        time.sleep(3)


    def close_driver(self):
        # self.driver.close()
        return

    def click_bus(self):
        self.BUS = self.driver.find_element_by_id('bus')

        if not self.BUS.is_displayed(): return "Failed"

        self.BUS.click()
        return 'Passed'

    def click_bike(self):
        self.BIKE = self.driver.find_element_by_id('bike')
        if not self.BIKE.is_displayed(): return "Failed"
        self.BIKE.click()
        return 'Passed'

    def click_walk(self):
        self.WALK = self.driver.find_element_by_id('walk')
        self.WALK.click()
        if not self.WALK.is_displayed(): return "Failed"
        return 'Passed'

    def click_car(self):
        self.CAR = self.driver.find_element_by_id('car')
        if not self.CAR.is_displayed(): return "Failed"
        self.CAR.click()
        return 'Passed'

    def click_chair(self):
        self.CHAIR = self.driver.find_element_by_id('wheelchair')
        if not self.CHAIR.is_displayed(): return "Failed"
        self.CHAIR.click()
        return 'Passed'

    def click_chair(self):
        self.CHAIR = self.driver.find_element_by_id('wheelchair')
        if not self.CHAIR.is_displayed(): return "Failed"
        self.CHAIR.click()
        return 'Passed'

    def click_menu(self):
        self.MENU = self.driver.find_element_by_id('menubtn')
        if not self.MENU.is_displayed(): return "Failed"
        self.MENU.click()
        time.sleep(1)
        return 'Passed'

    def click_flip(self):
        self.FLIP = self.driver.find_element_by_id('flip')
        if not self.FLIP.is_displayed(): return "Failed"
        self.FLIP.click()
        time.sleep(1)
        return 'Passed'

    def send_date(self):
        self.DATE = self.driver.find_element_by_id('birthdaytime')
        if not self.DATE.is_displayed(): return "Failed"
        self.DATE.clear()
        self.DATE.click()

        self.DATE.send_keys('3')  # month
        self.DATE.send_keys('11')  # day
        self.DATE.send_keys('2020')  # year
        self.DATE.send_keys(Keys.TAB)  # skip
        self.DATE.send_keys('12')  # hour
        self.DATE.send_keys('30')  # minute
        self.DATE.send_keys('2')  # am/pm

        return 'Passed'


    def click_flip(self):
        self.FLIP = self.driver.find_element_by_xpath('flip')
        if not self.FLIP.is_displayed(): return "Failed"
        self.FLIP.click()
        time.sleep(1)
        return 'Passed'

    def click_drop_down(self):

        # self.DROPS = self.driver.find_element_by_xpath('/html/body/div[5]/div[2]/')

        time.sleep(1)
        total_downs = len(self.driver.find_elements_by_class_name('fa-caret-down'))
        for i in range(total_downs, 0, -1):
            self.driver.find_element_by_xpath('/html/body/div[5]/div[2]/span['+str(i)+']/button/i').click()

        return 'Passed'

    def send_start(self, text):
        self.END = self.driver.find_element_by_id('currentLocation')
        if not self.END.is_displayed(): return "Failed"
        self.END.clear()
        time.sleep(1)
        self.END.send_keys(text)
        time.sleep(1)

        action = webdriver.common.action_chains.ActionChains(self.driver)
        action.move_to_element_with_offset(self.END, 20, 60)
        action.click()
        action.perform()

        return 'Passed'

    def send_end(self, text):
        self.END = self.driver.find_element_by_id('destination')
        if not self.END.is_displayed(): return "Failed"
        self.END.clear()
        time.sleep(1)
        self.END.send_keys(text)
        time.sleep(1)

        action = webdriver.common.action_chains.ActionChains(self.driver)
        action.move_to_element_with_offset(self.END, 20, 60)
        action.click()
        action.perform()

        return 'Passed'

    def dir_visible(self):
        time.sleep(2)

        try:
            self.driver.find_element_by_id('output')
            return 'Passed'
        except:
            return 'Failed'
        return
