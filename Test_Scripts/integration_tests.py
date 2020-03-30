import unittest
import time
from AggieMap import AggieMap

TIME_FOR_TEST = 3

class inti_test(unittest.TestCase):
    def test_bus(self):
        map = AggieMap()
        result = map.click_bus()

        result = map.send_start('Zachry')
        result = map.send_end("Mosher Circle")
        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')

    def test_bike(self):
        map = AggieMap()
        result = map.click_bike()

        result = map.send_start('Zachry')
        result = map.send_end("Mosher Circle")
        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')

    def test_walk(self):
        map = AggieMap()
        result = map.click_walk()

        result = map.send_start('Zachry')
        result = map.send_end("Mosher Circle")
        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')

    def test_car(self):
        map = AggieMap()
        result = map.click_car()

        result = map.send_start('Zachry')
        result = map.send_end("Mosher Circle")
        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')

    def test_chair(self):
        map = AggieMap()
        result = map.click_chair()

        result = map.send_start('Zachry')
        result = map.send_end("Mosher Circle")
        result = map.dir_visible()

        time.sleep(TIME_FOR_TEST)

        self.assertEqual(result, 'Passed')



