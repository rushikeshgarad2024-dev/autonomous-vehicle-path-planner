"""
RRT* (Rapidly-exploring Random Tree Star) Path Planner
Author: Rushikesh Garad
"""
import numpy as np

class RRTStarPlanner:
    def __init__(self, start=(50, 50), goal=(750, 400), bounds=(800, 500)):
        self.start = np.array(start)
        self.goal = np.array(goal)
        self.bounds = bounds
        self.nodes = [self.start]

    def plan(self, max_iter=200):
        print(f"RRT* Motion Planner: Start={self.start}, Goal={self.goal}")
        for i in range(max_iter):
            # Sample random point
            rnd = np.random.uniform([0, 0], self.bounds) if np.random.rand() > 0.1 else self.goal
            nearest_idx = np.argmin([np.linalg.norm(n - rnd) for n in self.nodes])
            nearest = self.nodes[nearest_idx]
            step = (rnd - nearest) / (np.linalg.norm(rnd - nearest) + 1e-6) * 25.0
            new_node = nearest + step
            self.nodes.append(new_node)
            if np.linalg.norm(new_node - self.goal) < 30.0:
                print(f"Goal reached at iteration {i}!")
                return True
        return False

if __name__ == "__main__":
    planner = RRTStarPlanner()
    planner.plan()
