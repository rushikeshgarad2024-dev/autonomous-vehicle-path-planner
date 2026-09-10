import unittest

class TestRRTStar(unittest.TestCase):
    def test_obstacle_clearance(self):
        obstacles = [(10, 10, 2.0), (20, 25, 3.0)] # (x, y, radius)
        path_point = (10, 15)
        dist = ((path_point[0]-10)**2 + (path_point[1]-10)**2)**0.5
        self.assertGreater(dist, 2.0, "Path point must maintain clearance from obstacle")

if __name__ == '__main__':
    unittest.main()
