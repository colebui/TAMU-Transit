import unittest
import time
from AggieMap import AggieMap

TIME_FOR_TEST = 1

class inti_test(unittest.TestCase):
    def test_demo(self):

        map = AggieMap()
        map.click_chair()

        map.send_start('Memorial Student Center, Joe Routt Boulevard, College Station, TX, USA')
        map.send_end("Zachry Engineering Center, Spence Street, College Station, TX, USA")
        map.send_date()
        result = map.click_drop_down()

        self.assertEqual(result, 'Passed')


    def test_bus(self):
        map = AggieMap()
        map.click_bus()

        map.send_start('Zachry')
        map.send_end("Mosher Circle")
        map.send_date()
        map.click_drop_down()

        result = map.dir_visible()

        self.assertEqual(result, 'Passed')

    def test_bike(self):
        map = AggieMap()

        map.click_bike()
        map.click_menu()
        map.click_menu()

        map.send_start('Memorial Student Center, Joe Routt Boulevard, College Station, TX, USA')
        map.send_end("Zachry Engineering Center, Spence Street, College Station, TX, USA")
        map.send_date()
        map.click_drop_down()

        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')

    def test_walk_1(self):
        map = AggieMap()
        map.click_walk()

        map.send_start('Zachry')
        map.send_end("Mosher Circle")
        map.send_date()
        map.click_flip()
        map.click_flip()
        map.click_drop_down()

        result = map.dir_visible()

        self.assertEqual(result, 'Passed')

    def test_car(self):
        map = AggieMap()
        result = map.click_car()

        result = map.send_start('Zachry')
        result = map.send_end("MSC")
        map.send_date()
        map.click_drop_down()

        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')

    def test_chair(self):
        map = AggieMap()
        result = map.click_chair()

        result = map.send_start('Memorial Student Center, Joe Routt Boulevard, College Station, TX, USA')
        result = map.send_end("Zachry Engineering Center, Spence Street, College Station, TX, USA")
        map.send_date()
        map.click_flip()
        map.click_flip()
        map.click_drop_down()

        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')



