from locust import HttpLocust, TaskSet, task

import random
import time

urls = [l.strip() for l in open('access_log.txt').readlines()]

class WebsiteTasks(TaskSet):

    @task
    def request(self):
        url = random.choice(urls)
        self.client.get(url + '&=' + str(time.time()), verify=False)

class WebsiteUser(HttpLocust):
    task_set = WebsiteTasks
    min_wait = 1000
    max_wait = 5000
