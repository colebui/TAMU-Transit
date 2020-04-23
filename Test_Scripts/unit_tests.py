import unittest
import time
from AggieMap import AggieMap

TIME_FOR_TEST = 3


class unit_tests(unittest.TestCase):
    def test_bus(self):
        map = AggieMap()
        result = map.click_bus()
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_bike(self):
        map = AggieMap()
        result = map.click_bike()
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_walk(self):
        map = AggieMap()
        result = map.click_walk()
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_car(self):
        map = AggieMap()
        result = map.click_car()
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_chair(self):
        map = AggieMap()
        result = map.click_chair()
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_menu(self):
        map = AggieMap()
        result = map.click_menu()
        result = map.click_menu()
        result = map.click_menu()
        result = map.click_menu()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_flip(self):
        map = AggieMap()
        result = map.click_flip()
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_date(self):
        map = AggieMap()
        result = map.send_date()
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_start(self):
        map = AggieMap()
        result = map.send_start('Zachr')
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')


    def test_end(self):
        map = AggieMap()
        result = map.send_end("Mosh")
        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')
