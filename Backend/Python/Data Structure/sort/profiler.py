"""
算法探测器

使用方式:
from profiler import Profiler
from algorithms import *

p = Profiler()
p.test(selection_sort, size=15, comp=True)

"""

import time
import random

class Profiler(object):

    def test(self, function, lyst=None, size=10,
            unique=True, comp=True, exch=True,
            trace=False):
        """
        function    函数名
        lyst        列表
        size        大小
        unique      生成列表值是否唯一
        comp        是否计算比较次数
        exch        是否计算交换次数
        trace       是否打印排序后的列表
        """
        self._comp = comp
        self._exch = exch
        self._trace = trace
        if lyst != None:
            self._lyst = lyst
        elif unique:
            self._lyst = [i for i in range(1, size + 1)]
            random.shuffle(self._lyst)
        else:
            self._lyst = []
            for count in range(size):
                self._lyst.append(random.randint(1, size))
        self._exchCount = 0
        self._cmpCount = 0
        self._startClock()
        function(self._lyst, self)
        self._stopClock()
        print(self)

    def exchange(self):
        """交换次数"""
        if self._exch:
            self._exchCount += 1
        if self._trace:
            print(self._lyst)

    def comparison(self):
        """比较次数"""
        if self._comp:
            self._cmpCount += 1

    def _startClock(self):
        """开始时间"""
        self._start = time.time()

    def _stopClock(self):
        """结束时间"""
        self._elapsed_time = round(time.time() - self._start, 3)

    def __str__(self):
        """结果"""
        result = "Problem size: "
        result += str(len(self._lyst)) + "\n"
        result += "Elapsed time: "
        result += str(self._elapsed_time) + "\n"
        if self._comp:
            result += "Comparison: "
            result += str(self._cmpCount) + "\n"
        if self._exch:
            result += "Exchanges: "
            result += str(self._exchCount)
        return result
